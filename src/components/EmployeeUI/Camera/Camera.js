import React, { useEffect, useRef, useState } from 'react';
import'../Camera/Camera.css';
import { storage } from '../../../firebase';

function CameraCapture({ processId,onCaptureImage }) {
  const [currentCamera, setCurrentCamera] = useState('user');
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [defaultImageSize, setDefaultImageSize] = useState({ width: 0, height: 0 });
  
  

  const openCamera = () => { 
    navigator.mediaDevices.getUserMedia({ video: { facingMode: currentCamera } })
      .then(function (stream) {
        videoRef.current.srcObject = stream;
      })
      .catch(function (error) {
        console.log('Không thể truy cập camera: ', error);
      });
  };

  const captureImage = () => {
    const video = videoRef.current;
    const image = imageRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    image.src = imageData;

    setCapturedImage(imageData);
  };

  const uploadImageToFirebase = async () => {
    if (capturedImage) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`Process/process${processId}/${Date.now()}.png`);
      await imageRef.putString(capturedImage, 'data_url');
      const imgUrl = await imageRef.getDownloadURL();
      console.log('Đã tải ảnh lên Firebase Storage:', imgUrl);
      onCaptureImage(imgUrl);
    }
  };
  const switchCamera = () => {
    setCurrentCamera(prevCamera => (prevCamera === 'user' ? 'environment' : 'user'));
    openCamera();
  };

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });
  };
  useEffect(() => {
    openCamera();
    const getDeviceImageSize = () => {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      setDefaultImageSize({ width: screenWidth, height: screenHeight });
    };

    getDeviceImageSize();

    window.addEventListener('resize', getDeviceImageSize);

    return () => {
      window.removeEventListener('resize', getDeviceImageSize);
    };
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
        {capturedImage ? (
          <img style={{ objectFit: 'contain' }} src={capturedImage} alt="Captured" />
        ) : (
          <video ref={videoRef} autoPlay></video>
        )}
      </div>
      <br></br>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {capturedImage ? (
          <div >
            <button className="camera-button" onClick={() => { setCapturedImage(null); openCamera(); }}>Chụp lại</button>
            <button className="camera-button" onClick={uploadImageToFirebase}>Done</button>
          </div>
        ) : (
          <div >
            <button className="camera-button" onClick={captureImage}>Chụp ảnh</button>
            <button className="camera-button" onClick={switchCamera}>Xoay camera</button>
          </div>
        )}


      </div>
      <canvas ref={imageRef} style={{ display: 'none', width: defaultImageSize.width, height: defaultImageSize.height }}></canvas>
    </div>
  );
}

export default CameraCapture;

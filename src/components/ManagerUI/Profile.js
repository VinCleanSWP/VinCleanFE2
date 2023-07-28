import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css'
import 'firebase/storage';
import './FireBaseConfig';
import { storage } from './FireBaseConfig';


function Profile() {
 const [accountData, setAccountData] = useState({});
 const [tempImageUrl, setTempImageUrl] = useState('');
 const [currentImg, setCurrentImg]  = useState('');

 useEffect(() => {
    fetchAccountData();
  }, []);
  const fetchAccountData = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        const response = await axios.get(`https://localhost:7013/api/Account/${id}`);
        setAccountData(response.data.data);
        setCurrentImg(response.data.data.img);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`Employee/${file.name}`);
    await fileRef.put(file);
    const imgUrl = await fileRef.getDownloadURL();
    setTempImageUrl(imgUrl);
};

    return (
        <div className="page-container">
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Account settings
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <div className="card-body media align-items-center">
                                        <img style={{borderRadius:"100%", objectFit:'cover',width: '100px', height: "100px"}} src={tempImageUrl||currentImg  } alt="" className="" />
                                        <div className="media-body ml-4">
                                            <label className="btn btn-outline-primary"  >
                                                Upload new photo
                                                <input type="file" onChange={handleImageUpload} className="account-settings-fileinput" />
                                            </label> &nbsp;
                                            <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                            <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control mb-1" defaultValue={accountData.name} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" defaultValue={accountData.name} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="form-control mb-1" defaultValue={accountData.email} />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Current password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">New password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Repeat new password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">Save changes</button>
                    <button type="button" className="btn btn-default">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

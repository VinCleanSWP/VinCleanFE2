import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Map() {
    const [search, setSearch] = useState('');
    const [coordinate, setCoords] = useState(null);
    const [address, setAddress] = useState(null);
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);

    // Lấy tọa độ
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude })
        })
    }, [])
    console.log(coordinate)
    // lấy địa chỉ
    useEffect(() => {
        // ...
        if (coordinate) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: coordinate }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        setAddress(results[0].formatted_address);
                        console.log(address);
                        // Thực hiện xử lý tên địa chỉ ở đây (ví dụ: lưu vào state)
                    }
                } else {
                    console.error("Geocoder failed due to: " + status);
                }
            });
        }
    }, [coordinate]);
    useEffect(() => {
        setIsMarkerVisible(!!address);
    }, [address]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBzPHYhJBDKgWJkoXH43NEs7P-SCGTAvnQ"
    })

    const [map, setMap] = React.useState(null)

    return isLoaded ? (
        <div>
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row m-t-30">
                                <div className="col-md-12">
                                    <form action="">
                                        <div class="table__header">
                                            <h6><strong>Address: </strong> <span>{address}</span></h6>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."
                                                    value={search}
                                                    onChange={""} />
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    <div>
                                        {/* <div className="absolute top-0 left-0 z-50 bg-white p-2">address</div> */}
                                        <GoogleMap
                                            mapContainerStyle={{ width: '100%', height: '700px' }}
                                            center={coordinate}
                                            zoom={13}
                                            onLoad={map => setMap(map)}
                                        >
                                            {isMarkerVisible && <Marker position={coordinate} />}
                                        </GoogleMap>
                                    </div>
                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More" data-bs-toggle="modal" data-bs-target="#myModal">
                                        <i className="zmdi zmdi-more" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade show" id="myModal" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <h6 className="modal-title" id="exampleModalLabel"><strong>Address:</strong>{address}</h6>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div>
                                        {/* <div className="absolute top-0 left-0 z-50 bg-white p-2">address</div> */}
                                        <GoogleMap
                                            mapContainerStyle={{ width: '100%', height: '700px' }}
                                            center={coordinate}
                                            zoom={13}
                                            onLoad={map => setMap(map)}
                                        >
                                            {isMarkerVisible && <Marker position={coordinate} />}
                                        </GoogleMap>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    ) : <></>;
}
export default Map;

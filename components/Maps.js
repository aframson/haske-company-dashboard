import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function SimpleMap() {
    const containerStyle = {
        width: '100%',
        height: '500px'
    };
    const center = {
        lat: -3.745,
        lng: -38.523
    };
    const position = {
        lat: -3.745,
        lng: -38.523
    }
    const onLoad = marker => {
        console.log('marker: ', marker)
    }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '500px', width: '100%' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyDVo1XN3CgWBV8tnc0941TqdBKe1ZQrdns"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                >
                    <Marker
                        onLoad={onLoad}
                        position={position}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
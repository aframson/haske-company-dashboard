import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function MapComponent({ lat, lng }) {
    const containerStyle = {
        width: '100%',
        height: '200px'
    };
    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    };
    const position = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    }
    const onLoad = marker => {
        console.log('marker: ', marker)
    }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '200px', width: '100%' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyDVo1XN3CgWBV8tnc0941TqdBKe1ZQrdns"

            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
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
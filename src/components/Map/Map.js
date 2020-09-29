import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map({ cityLocation, zoomLevel }) {
    const KEY = process.env.REACT_APP_KEY;
    console.log(KEY)

    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    style={{ height: "100%", width: "100%" }}
                    bootstrapURLKeys={{ key: KEY }}
                    defaultCenter={cityLocation}
                    defaultZoom={zoomLevel}
                    controlSize="400px"
                >

                </GoogleMapReact>
            </div>
        </div>
    )
}
import React, {useState} from "react";
import GoogleMapReact from "google-map-react";

export default function Map(props, { cityLocation, zoomLevel }) {
    const KEY = process.env.REACT_APP_KEY;
    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    // const handleSubmit =() => {} 

    const handleSubmit = e => {
        console.log('handleSubmit clicked')
        e.preventDefault()
        props.handleSubmit(city)
        setCity('')
    }
    const handleChange = e => {
        console.log('handleChange clicked - value', e.target.value);
        this.setState({
            city: e.target.value
        });
    };



    return (
        <div className="map">
            <div className="google-map">
                <h1>Globetrotter</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" onChange={handleChange} />
                    </div>
                    <div>
                        {/* <label htmlFor="country">Country</label>
                        <input type="text" name="country" value={country} onChange={props.handleInput} /> */}
                    </div>
                        <input value="Submit" type="submit" />
                </form>
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
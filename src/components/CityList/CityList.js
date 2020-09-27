import React, { useState, useEffect } from "react";
import axios from "axios";

import CityShow from "../CityShow/CityShow";

const CityList = (props) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3001/api/cities");
      setCities(response.data);
    }
    fetchData();
  }, [cities]);

  const showCities = cities.map((city, i) => {
    return (
      <div key={i}>
        <CityShow city={city} isLoggedIn={props.isLoggedIn} />
      </div>
    );
  });

  return <div>{showCities}</div>;
};

export default CityList;
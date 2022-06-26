import * as React from "react";
import Right from "./Right";
import RightMD from './RightMD'
import { useState, useEffect, useLayoutEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
function Map() {
  const [query,setQuery] = useState("");
  const [long,setLong] = useState(76.085601);
  const [lat,setLat] = useState(29.058776);
  const [humidity,setHumidity] = useState();
  const [cloudy,setCloudy] = useState();
  const [rain,setRain] = useState();
  const [temp,setTemp] = useState();
  const [name,setName] = useState("India");
  const [viewport, setViewport] = useState({
    latitude: lat, 
    longitude: long,
    zoom: 8,
  });
  const navControlStyle = {
    left: 10,
    top: 10,
  };
  const geolocateControlStyle = {
    left: 10,
    bottom: 30,
  };
  useEffect(() => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/find?q=${query}&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4096bc640dmsh06f42a5504aec38p1055a6jsnb0cb3448cdc6",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then(res => res.json())
      .then((rsp)=> {
        // console.log(rsp)
        setLong(rsp.list[0].coord.lon);
        setLat(rsp.list[0].coord.lat);
        var t = rsp.lis[0].main.temp-273.15;
        t = t.toFixed(2);
        setTemp(t);
        setHumidity(rsp.list[0].main.humidity);
        setRain(rsp.list[0].rain)
        setCloudy(rsp.list[0].weather[0].description);
        setName(rsp.list[0].name);
      })
      .catch((err) => {
        console.error(err);
      });
  },[query]);
  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  function handleOnChange(e){
    setQuery(e)
  }
  function handleCnt(e){
    setCnt(!e);
  }
  const [cnt,setCnt] = useState(0);
  console.log(query);
  return (
    <>
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiYW51Z295YWw5OTgiLCJhIjoiY2tyMXl0NWViMjZ1ZzMxbzY5Mng1eXJqZiJ9.V-asgihedClE3Oc_bRZWCg"
      //   mapStyle="mapbox://styles/anugoyal998/ckr3d33fyft1l19n2m7y6xa4x"
      mapStyle="mapbox://styles/anugoyal998/ckr3f2v5tf7br18pdjdx62ots"
      width={width}
      height={height}
    >
      {!cnt?<NavigationControl style={navControlStyle} />:""}
      {!cnt?<GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />:""}
      <Marker
        latitude={lat}
        longitude={long}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img
          src="https://www.pinclipart.com/picdir/big/363-3639653_location-pin-transparent-location-logo-png-vector-clipart.png"
          width={viewport.zoom * 5}
          height={viewport.zoom * 5}
          alt="marker"
        />
      </Marker>
      {width>767?<Right func={handleOnChange} temp={temp} humidity={humidity} cloudy={cloudy} rain={rain} name={name} />:cnt===0?<div id="hamburger">
          <button className="btn" onClick={()=> setCnt(!cnt)} ><i className="fas fa-bars"></i></button>
        </div>:<RightMD handleCnt={handleCnt} cnt={cnt} func={handleOnChange} temp={temp} humidity={humidity} cloudy={cloudy} rain={rain} name={name} />}
    </ReactMapGL>
  </>
  );
}

export default Map;

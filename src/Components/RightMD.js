import React, { useLayoutEffect, useState } from 'react'
export default function RightMD(props) {
    function handleOnChange(e){
        if(e.key==='Enter')props.func(e.target.value)
    }
    const useWindowSize = () => {
      const [size, setSize] = useState([window.innerWidth]);
      useLayoutEffect(() => {
        const updateSize = () => {
          setSize([window.innerWidth]);
        };
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
      }, []);
      return size;
    };
    const [width] = useWindowSize();
    return (
        <>
         <div className="row">
    <div className="col-lg-3 col-md-4 ms-auto text-white" id="right-md">
      <div className="input-group mb-3" id="first">
        <button className="btn">
          <i class="fas fa-search"></i>
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onKeyPress={handleOnChange}
        />
        <button className="btn" onClick={()=> props.handleCnt(props.cnt)}>
          <i class="fas fa-times" ></i>
        </button>
      </div>
      <div className={`${width<=767?"ms-5":""}`}>
      <div id="second">
        <h6 className="font-bold">Locations</h6>
        <h6 className="font-thin">India</h6>
        <h6 className="font-thin">Delhi</h6>
        <h6 className="font-thin">Mumbai</h6>
        <h6 className="font-thin">Gurugram</h6>
        <h6 className="font-thin">Faridabad</h6>
      </div>
      <div id="third" className="mt-3">
        <h6 className="font-bold">Weather Details</h6>
        <div className="d-flex justify-content-between pr-2">
          <h6 className="font-thin">Temperature</h6>
          <h6 className="font-thin">{props.temp}</h6>
        </div>
        <div className="d-flex justify-content-between pr-2">
          <h6 className="font-thin">Humidity</h6>
          <h6 className="font-thin">{props.humidity}</h6>
        </div>
        <div className="d-flex justify-content-between pr-2">
          <h6 className="font-thin">Cloudy</h6>
          <h6 className="font-thin">{props.cloudy}</h6>
        </div>
        <div className="d-flex justify-content-between pr-2">
          <h6 className="font-thin">Rain</h6>
          <h6 className="font-thin">{props.rain}</h6>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div id="left-bottom">
    <h1>{props.temp} C {props.name}</h1>
  </div>
        </>
    )
}

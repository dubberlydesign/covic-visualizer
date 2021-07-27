import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Figures.css";

const Figures = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/covic-data/figures").then(response => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <div className='box'>
      {data.map(item => {
        if (
          item.fields?.Image[0] &&
          item.fields?.Image[0]?.thumbnails?.large.url !== undefined
        ) {
          return (
            <div className='card' key={item.id}>
              <img
                src={item.fields?.Image[0]?.thumbnails?.large.url}
                alt=''
                className='card--image'
              />
              <div className='card--label'>
                {item.fields["Date (from Article)"]}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Figures;

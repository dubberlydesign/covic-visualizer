import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Figures.css";

const Figures = () => {
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const requestAmount = 20;

  const requestData = () => {
    axios
      .get("/api/v1/covic-data/figures", {
        params: { offset: dataOffset, requestAmount },
      })
      .then(response => {
        setData(data.concat(response.data.records));
        setDataOffset(response.data.offset);
      });
  };
  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    requestData();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={handleScroll}
        hasMore={true}
        className='box'
        loader={<CircularProgress className='loader' />}
      >
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
      </InfiniteScroll>
    </>
  );
};

export default Figures;

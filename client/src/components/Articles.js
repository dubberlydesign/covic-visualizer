import React, { useState, useEffect } from "react";
import axios from "axios";

const Articles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/covic-data").then(response => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <div>Covic Articles</div>

      <div>
        {data.map(item => {
          return item.fields["Data Source"];
        })}
      </div>
    </div>
  );
};

export default Articles;
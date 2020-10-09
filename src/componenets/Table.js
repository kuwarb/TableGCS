import React, { useEffect, useState } from "react";
import axios from "axios";

const heading = ["Id", "Name", "Status", "Description", "Delta", "CreatedOn"];

const Table = (props) => {
  const [tableData, setData] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:3001/pagination/1").then((response) => {
      console.log("Response", response);
      setData(response.data.data);
    });
  }, []);

  return (
    <>
      <p>Name Search</p>
      <input type="text"></input>
      <table className="container">
        <thead>
          <tr>
            {heading.map((thead, index) => (
              <th key={index}>
                <h1>{thead}</h1>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
              <td>{item.delta}</td>
              <td>{item.createdOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

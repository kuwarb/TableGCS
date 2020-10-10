import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const heading = ["Id", "Name", "Status", "Description", "Delta", "CreatedOn"];

const Table = (props) => {
  const [tableData, setData] = useState([]);
  const [sort, setSort] = useState({
    Id: null,
    Name: null,
    CreatedOn: null,
  });

  useEffect(() => {
    axios.get("https://localhost:3001/pagination/1").then((response) => {
      setData(response.data.data);
    });
  }, []);

  const handleOnChange = (e) => {
    let name = e.target.value;
    console.log("name", name);
    if (name === "") {
      name = null;
    }
    axios
      .get(`https://localhost:3001/users/search/${name}`)
      .then((response) => {
        console.log("Response", response.data);
        setData(response.data);
      });
  };

  const handleSort = (column) => {
    if (column === "Id" || column === "Name" || column === "CreatedOn") {
      axios
        .get(
          `https://localhost:3001/sort/${
            !sort[column] ? "asc" : "desc"
          }/${column}`
        )
        .then((response) => {
          console.log("Response", response.data);
          console.log(column + " " + sort[column]);
          setSort((prevSort) => ({ ...prevSort, [column]: !prevSort[column] }));
          setData(response.data);
        });
    }
  };

  const handleStatusChange = (e) => {
    let status = e.target.value;
    if (status !== "All") {
      axios.get(`https://localhost:3001/filter/${status}`).then((response) => {
        console.log("Status==>", response);
        setData(response.data);
      });
    } else {
      axios.get(`https://localhost:3001/pagination/1`).then((response) => {
        console.log("Response", response.data);
        setData(response.data.data);
      });
    }
  };

  return (
    <div className="main">
      <p>Name Search</p>
      <input
        type="text"
        onChange={handleOnChange}
        placeholder="Search by name..."
      ></input>

      <p>Filter By Status</p>
      <select
        id="status"
        className="status"
        onChange={(e) => handleStatusChange(e)}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
      </select>

      <table className="container">
        <thead>
          <tr>
            {heading.map((thead, index) => (
              <th onClick={() => handleSort(thead)} key={index}>
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
      <Pagination />
    </div>
  );
};

export default Table;

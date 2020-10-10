import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from './Pagination'

const heading = ["Id", "Name", "Status", "Description", "Delta", "CreatedOn"];

const Table = (props) => {
  const [tableData, setData] = useState([]);
  const [sort, setSort] = useState({
    Id: false,
    Name: false,
    CreatedOn: false,
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
      axios.get(`https://localhost:3001/users`).then((response) => {
        console.log("Response", response.data);
        setData(response.data);
      });
    } else {
      axios
        .get(`https://localhost:3001/users/search/${name}`)
        .then((response) => {
          console.log("Response", response.data);
          setData(response.data);
        });
    }
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

  return (
    <>
      <p>Name Search</p>
      <input type="text" onChange={handleOnChange}></input>
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
    </>
  );
};

export default Table;

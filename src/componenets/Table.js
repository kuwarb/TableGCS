import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const heading = ["Id", "Name", "Status", "Description", "Delta", "CreatedOn"];

const Table = (props) => {
  const [tableData, setData] = useState([]);
  const [sort, setSort] = useState({
    columName: "",
    sortDirection: null,
  });
  const [status, setStatus] = useState("All");
  const [searchedName, setSearchedName] = useState("");

  const [pageData, setPageData] = useState({
    next: 2,
    prev: null,
    activePage: 1,
    pages: [1, 2, 3, 4, 5],
    totalPages: null,
  });

  const getPageData = (page, direction, params) => {
    axios
      .get(
        `https://localhost:3001/users/${page}?params=${JSON.stringify(params)}`
      )
      .then((response) => {
        console.log("Response", response.data);
        setData(response.data.data);
        setPageData((prevPageData) => ({
          ...prevPageData,
          next: response.data.next,
          prev: response.data.prev,
          activePage: response.data.page,
          totalPages: response.data.total_pages,
          pages:
            direction === "next" && response.data.page > prevPageData.pages[4]
              ? [
                  ...new Array(
                    Math.min(
                      5,
                      response.data.total_pages - response.data.page + 1
                    )
                  ),
                ].map((_, i) => response.data.page + i)
              : direction === "prev" &&
                response.data.page < prevPageData.pages[0]
              ? [...new Array(5)].map((_, i) => response.data.page - 4 + i)
              : prevPageData.pages,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const params = {
      sort: sort,
      name: null,
      pageData: pageData,
      status: status,
    };
    getPageData(pageData.activePage, "", params);
  }, []);

  const handlePagination = (page, direction) => {
    
    const params = {
      sort: sort,
      name: searchedName,
      pageData: {...pageData,activePage:page},
      status: status,
    };
    getPageData(page, direction, params);
  }

  const handleOnChange = (e) => {
    let name = e.target.value;
    setSearchedName(name);
    console.log("name", name);
    if (name === "") {
      name = null;
    }
    const params = {
      sort: sort,
      name: name,
      pageData: pageData,
      status: status,
    };
    getPageData(pageData.activePage, "", params);
  };

  const handleSort = (column) => {
    if (column === "Id" || column === "Name" || column === "CreatedOn") {
      let sortDir = null;
      if (sort.columName === column) {
        sortDir = sort["sortDirection"] === "asc" ? "desc" : "asc";
      } else {
        sortDir = "asc";
      }
      setSort({ columName: column, sortDirection: sortDir });
      const params = {
        sort: { columName: column, sortDirection: sortDir },
        name: searchedName,
        pageData: pageData,
        status: status,
      };

      getPageData(pageData.activePage, "", params);
    }
  };

  const handleStatusChange = (e) => {
    let statusNew = e.target.value;
    setStatus(statusNew);
    const params = {
      sort: sort,
      name: searchedName,
      pageData: pageData,
      status: statusNew,
    };
    getPageData(pageData.activePage, "", params);
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
        <option value="COMPLETED">Completed</option>
        <option value="CANCELED">Canceled</option>
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
      <Pagination handlePagination={handlePagination} pageData={pageData} />
    </div>
  );
};

export default Table;

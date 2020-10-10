import React, { useEffect } from "react";
import "./assets/Pagination.css";

const Pagination = (props) => {

  return (
    <ul className="pagination">
      <li>
        <span>&lt; </span>
      </li>
      <li>
        <span className="active" href="#0">
          1
        </span>
      </li>
      <li>
        <span href="#0">2</span>
      </li>
      <li>
        <span href="#0">3</span>
      </li>
      <li>
        <span href="#0">4</span>
      </li>
      <li>
        <span href="#0">5</span>
      </li>
      <li>
        <span href="#0">&gt;</span>
      </li>
    </ul>
  );
};

export default Pagination;

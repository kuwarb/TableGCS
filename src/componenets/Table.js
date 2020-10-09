import React from "react";

const heading = ["Id", "Name", "Status", "Description", "Delta", "CreatedOn"];

const Table = (props) => {
  return (
    <table class="container">
      <thead>
        <tr>
          {heading.map((thead) => (
            <th>
              <h1>{thead}</h1>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Google</td>
          <td>9518</td>
          <td>6369</td>
          <td>01:32:50</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
        <tr>
          <td>Twitter</td>
          <td>7326</td>
          <td>10437</td>
          <td>00:51:22</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
        <tr>
          <td>Amazon</td>
          <td>4162</td>
          <td>5327</td>
          <td>00:24:34</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
        <tr>
          <td>LinkedIn</td>
          <td>3654</td>
          <td>2961</td>
          <td>00:12:10</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
        <tr>
          <td>CodePen</td>
          <td>2002</td>
          <td>4135</td>
          <td>00:46:19</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
        <tr>
          <td>GitHub</td>
          <td>4623</td>
          <td>3486</td>
          <td>00:31:52</td>
          <td>6369</td>
          <td>01:32:50</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

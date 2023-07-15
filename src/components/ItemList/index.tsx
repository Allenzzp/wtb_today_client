import React from "react";
import { ItemData } from "../../App";
import { formatAvailability } from "../../helpers/formatters";

const ItemList: React.FC<{ items: ItemData[] }> = ({ items }) => {
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Origin</th>
            <th scope="col">Unit</th>
            <th scope="col">Price</th>
            <th scope="col">Per Bunch</th>
            <th scope="col">Category</th>
            <th scope="col">Availability</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{item.name}</td>
              <td>{item.origin}</td>
              <td>{item.unit}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                {item.bunch} {item.bunch > 1 ? "St" : ""}
              </td>
              <td>{item.category}</td>
              <td>{formatAvailability(item.availability)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;

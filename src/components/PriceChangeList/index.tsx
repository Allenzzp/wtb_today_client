import React from "react";
import { Table } from "react-bootstrap";
import { formatAvailability } from "../../helpers/formatters";
import { CombinedItemData } from "../../App";
import "./PriceChangeList.css";

interface PriceChangeListProps {
  items: CombinedItemData[];
}

const PriceChangeList: React.FC<PriceChangeListProps> = ({ items }) => {
  return (
    <Table striped bordered hover className="priceChangeList">
      <thead>
        <tr>
          <th>Name</th>
          <th>Origin</th>
          <th>Unit</th>
          <th>Old Price</th>
          <th>New Price</th>
          <th>Percentage Change</th>
          <th>Bunch</th>
          <th>Category</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.origin}</td>
            <td>{item.unit}</td>
            <td>{item.old_price}</td>
            <td className="newPrice">{item.new_price}</td>
            <td
              className={`percentageChange ${
                item.percentage_change > 0 ? "positive" : "negative"
              }`}
            >
              {item.percentage_change}%
            </td>
            <td>{item.bunch}</td>
            <td>{item.category}</td>
            <td>{formatAvailability(item.availability)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PriceChangeList;

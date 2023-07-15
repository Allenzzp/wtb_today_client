import React, { useState } from "react";
import axios from "axios";
import { ItemData } from "../../App";

interface SearchBarProps {
  setItemData: React.Dispatch<React.SetStateAction<ItemData[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setItemData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.match(/^[a-zA-Z\s]*$/)) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/search`, {
          params: { name: searchQuery },
        })
        .then((res) => {
          // Sort items in Alphabetical order
          // const sortedItems = res.data.sort((a: ItemData, b: ItemData) =>
          //   a.name.localeCompare(b.name)
          // );
          const sortedItems = res.data;
          // Convert items' availability into Date if the value is neither "yes" nor "No"
          const items = sortedItems.map((item: ItemData) => {
            if (
              typeof item.availability === "string" &&
              !["Yes", "No"].includes(item.availability)
            ) {
              return { ...item, availability: new Date(item.availability) };
            }
            return item;
          });
          //
          setItemData(items);
        })
        .catch((err) => {
          console.error("Error searching for items", err);
        });
    } else {
      console.log("Invalid Search Item");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary mt-2"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

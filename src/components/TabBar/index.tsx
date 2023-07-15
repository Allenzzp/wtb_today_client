import React from "react";

interface TabBarProps {
  setDisplayType: React.Dispatch<
    React.SetStateAction<
      "inStock" | "priceChange" | "notAvailable" | "availableFuture"
    >
  >;
}

const TabBar: React.FC<TabBarProps> = ({ setDisplayType }) => {
  return (
    <div>
      <button onClick={() => setDisplayType("inStock")}>In Stock</button>
      <button onClick={() => setDisplayType("priceChange")}>
        Price Change
      </button>
      <button onClick={() => setDisplayType("notAvailable")}>
        Not Available
      </button>
      <button onClick={() => setDisplayType("availableFuture")}>
        Available in the Future
      </button>
    </div>
  );
};

export default TabBar;

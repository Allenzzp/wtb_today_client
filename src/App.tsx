import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import NavigationBar from "./components/NavigationBar";
import TabBar from "./components/TabBar";
import PriceChangeList from "./components/PriceChangeList";

export enum Origin {
  California = "California",
  Local = "Local",
  Italy = "Italy",
  "Costa Rica" = "Costa Rica",
  Colombia = "Colombia",
  Ecuador = "Ecuador",
  Chile = "Chile",
  "Costa Rica Truck" = "Costa Rica Truck",
  Thailand = "Thailand",
  Florida = "Florida",
  "Ecuador Air Ship" = "Ecuador Air Ship",
  Holland = "Holland",
  "South Africa" = "South Africa",
  Oregon = "Oregon",
  Guatemala = "Guatemala",
  Australia = "Australia",
  "South America" = "South America",
  Israel = "Israel",
  "New Zealand" = "New Zealand",
  Peru = "Peru",
}

export enum Unit {
  BU = "BU",
  ST = "ST",
  POT = "POT",
  EA = "EA",
  BOX = "BOX",
}

export enum Category {
  Green = "Green",
  "Flowers/ Fillers" = "Flowers/ Fillers",
  null = "null",
  "Dried/ Preserved" = "Dried/ Preserved",
  Plants = "Plants",
  Tropicals = "Tropicals",
}

export type Availability = "Yes" | "No" | Date;

export enum UpdateType {
  PriceUpdate = "Price Update",
  AvailabilityUpdate = "AvailabilityUpdate",
}

export interface ItemData {
  name: string;
  origin: Origin;
  unit: Unit;
  price: number;
  bunch: number;
  category: Category;
  availability: Availability;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface UpdateInfo {
  old_price: number;
  new_price: number;
  percentage_change: number;
  change_type: UpdateType;
}

export type CombinedItemData = ItemData & UpdateInfo;

const LoginPage: React.FC = () => {
  return <h2>Login Page</h2>;
};

const ProfilePage: React.FC = () => {
  return <h2>Profile Page</h2>;
};

const App: React.FC = () => {
  const [displayType, setDisplayType] = useState<
    "inStock" | "priceChange" | "notAvailable" | "availableFuture"
  >("inStock");
  const [itemData, setItemData] = useState<ItemData[]>([]);
  const [combinedItemData, setCombinedItemData] = useState<CombinedItemData[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/search/${displayType}`;
      const res = await axios.get(url);
      const response = res.data;
      // Convert items' availability into Date if the value is neither "yes" nor "No"
      const items = response.map((item: ItemData) => {
        if (
          typeof item.availability === "string" &&
          !["Yes", "No"].includes(item.availability)
        ) {
          return { ...item, availability: new Date(item.availability) };
        }
        return item;
      });
      if (displayType !== "priceChange") {
        setItemData(items);
      } else {
        setCombinedItemData(items);
      }
    };
    fetchData();
  }, [displayType]);

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <SearchBar setItemData={setItemData} />
      <TabBar setDisplayType={setDisplayType} />
      {displayType !== "priceChange" ? (
        <ItemList items={itemData} />
      ) : (
        <PriceChangeList items={combinedItemData} />
      )}
    </div>
  );
};

export default App;

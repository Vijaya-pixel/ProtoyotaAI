import React, { useState } from "react";
import { cars } from "../data/cars";
import "./CarGallery.css";

function CarGallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Sedan",
    "SUV",
    "Hybrid",
    "Sports Car",
    "Truck",
    "Electric SUV",
    "Minivan",
    "Full-Size SUV",
    "Off-Road SUV",
    "Premium Sedan"
  ];

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === "All" || car.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="gallery-container">

      <h1 className="gallery-title">Toyota Car Catalog</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search model (e.g., Camry, RAV4, Supra)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="car-list">
        {filteredCars.map((car, index) => (
          <div key={index} className="car-card">
            <img src={car.image} alt={car.name} />
            <div className="car-info">
              <h3>{car.name}</h3>
              <p><strong>Category:</strong> {car.category}</p>
              <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
              <p><strong>MPG:</strong> {car.mpg}</p>
              <p><strong>Horsepower:</strong> {car.horsepower}</p>
              <p><strong>Seats:</strong> {car.seats}</p>
              <p><strong>Drivetrain:</strong> {car.drivetrain}</p>
              <p><strong>Fuel Type:</strong> {car.fuel}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CarGallery;

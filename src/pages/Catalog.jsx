import React, { useState } from "react";
import { cars } from "../data/cars";
import "./Catalog.css";

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCars, setSelectedCars] = useState([]);
  const [showFinance, setShowFinance] = useState(false);
  const [financeCar, setFinanceCar] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  const categories = ["All", ...new Set(cars.map(car => car.category))];

  const toggleSelectCar = (car) => {
    if (selectedCars.includes(car)) {
      setSelectedCars(selectedCars.filter(c => c !== car));
    } else if (selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const filteredCars = cars.filter(car =>
    (selectedCategory === "All" || car.category === selectedCategory) &&
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Browse Toyota Models</h1>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by model name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          className={`compare-button ${selectedCars.length !== 2 ? "disabled" : ""}`}
          disabled={selectedCars.length !== 2}
          onClick={() => setShowCompare(true)}
        >
          Compare (2)
        </button>
      </div>

      {/* CAR GRID */}
      <div className="car-grid">
        {filteredCars.map((car, index) => (
          <div
            key={index}
            className={`car-card ${selectedCars.includes(car) ? "selected" : ""}`}
          >
            <img className="car-image" src={car.image} alt={car.name} />

            <div className="car-name">{car.name}</div>
            <div className="car-details">
              ${car.price.toLocaleString()} • {car.category} • {car.seats} seats
            </div>

            <button 
              className="compare-button-small"
              onClick={() => toggleSelectCar(car)}
            >
              {selectedCars.includes(car) ? "Remove from Compare" : "Add to Compare"}
            </button>

            <button
              className="compare-button-small"
              onClick={() => { setFinanceCar(car); setShowFinance(true); }}
            >
              Finance Calculator
            </button>
          </div>
        ))}
      </div>

      {/* FINANCE MODAL */}
      {showFinance && financeCar && (
        <FinanceModal car={financeCar} close={() => setShowFinance(false)} />
      )}

      {/* COMPARE MODAL */}
      {showCompare && selectedCars.length === 2 && (
        <CompareModal cars={selectedCars} close={() => setShowCompare(false)} />
      )}
    </div>
  );
}

/* --- FINANCE MODAL --- */
function FinanceModal({ car, close }) {
  const [down, setDown] = useState(3000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);

  const loanAmount = car.price - down;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Finance Calculator</h2>

        <label>Down Payment ($)</label>
        <input type="number" value={down} onChange={(e) => setDown(Number(e.target.value))} />

        <label>Interest Rate (% APR)</label>
        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />

        <label>Loan Term (Years)</label>
        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />

        <h3>Estimated Monthly Payment: <strong>${monthlyPayment.toFixed(2)}</strong></h3>

        <button className="close-button" onClick={close}>Close</button>
      </div>
    </div>
  );
}

/* --- COMPARE MODAL --- */
function CompareModal({ cars, close }) {
  const [carA, carB] = cars;

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Compare Models</h2>

        <div className="compare-cars">
          {[carA, carB].map((car, i) => (
            <div key={i} className="compare-car-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>${car.price.toLocaleString()}</p>
              <p>{car.category} • {car.seats} seats</p>
              <p>{car.horsepower} HP</p>
              <p>{car.mpg} MPG</p>
              <p>{car.fuel}</p>
            </div>
          ))}
        </div>

        <button className="close-button" onClick={close}>Close</button>
      </div>
    </div>
  );
}

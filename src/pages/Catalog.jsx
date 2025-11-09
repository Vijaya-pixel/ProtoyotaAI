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
  const [showDealership, setShowDealership] = useState(false);
  const [dealershipCar, setDealershipCar] = useState(null);

  const categories = ["All", ...new Set(cars.map(car => car.category))];

  const toggleSelectCar = (car) => {
    if (selectedCars.includes(car)) {
      setSelectedCars(selectedCars.filter(c => c !== car));
    } else if (selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const filteredCars = cars.filter(car =>
    (selectedCategory === "All" || car.category === selectedCategory) && // <-- fixed here
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

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
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

            <button
              className="compare-button-small"
              onClick={() => { setDealershipCar(car); setShowDealership(true); }}
            >
              Find Dealership
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

      {/* DEALERSHIP MODAL */}
      {showDealership && dealershipCar && (
        <DealershipModal 
          car={dealershipCar} 
          close={() => setShowDealership(false)} 
        />
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

  // Helper function to compare values and return class + symbol
  const getComparison = (valA, valB, lowerIsBetter = false) => {
    if (valA === valB) return { symbolA: "=", symbolB: "=", classA: "equal", classB: "equal" };
    
    if (lowerIsBetter) {
      if (valA < valB) return { symbolA: "<", symbolB: ">", classA: "better", classB: "worse" };
      return { symbolA: ">", symbolB: "<", classA: "worse", classB: "better" };
    } else {
      if (valA > valB) return { symbolA: ">", symbolB: "<", classA: "better", classB: "worse" };
      return { symbolA: "<", symbolB: ">", classA: "worse", classB: "better" };
    }
  };

  const priceComp = getComparison(carA.price, carB.price, true); // Lower price is better
  const hpComp = getComparison(carA.horsepower, carB.horsepower); // Higher HP is better
  const mpgComp = getComparison(carA.mpg, carB.mpg); // Higher MPG is better

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Compare Models</h2>

        <div className="compare-cars">
          {/* Car A */}
          <div className="compare-car-card">
            <img src={carA.image} alt={carA.name} />
            <h3>{carA.name}</h3>
            <p className={`compare-stat ${priceComp.classA}`}>
              ${carA.price.toLocaleString()} <span className="compare-symbol">{priceComp.symbolA}</span>
            </p>
            <p>{carA.category} • {carA.seats} seats</p>
            <p className={`compare-stat ${hpComp.classA}`}>
              {carA.horsepower} HP <span className="compare-symbol">{hpComp.symbolA}</span>
            </p>
            <p className={`compare-stat ${mpgComp.classA}`}>
              {carA.mpg} MPG <span className="compare-symbol">{mpgComp.symbolA}</span>
            </p>
            <p>{carA.fuel}</p>
          </div>

          {/* Car B */}
          <div className="compare-car-card">
            <img src={carB.image} alt={carB.name} />
            <h3>{carB.name}</h3>
            <p className={`compare-stat ${priceComp.classB}`}>
              <span className="compare-symbol">{priceComp.symbolB}</span> ${carB.price.toLocaleString()}
            </p>
            <p>{carB.category} • {carB.seats} seats</p>
            <p className={`compare-stat ${hpComp.classB}`}>
              <span className="compare-symbol">{hpComp.symbolB}</span> {carB.horsepower} HP
            </p>
            <p className={`compare-stat ${mpgComp.classB}`}>
              <span className="compare-symbol">{mpgComp.symbolB}</span> {carB.mpg} MPG
            </p>
            <p>{carB.fuel}</p>
          </div>
        </div>

        <button className="close-button" onClick={close}>Close</button>
      </div>
    </div>
  );
}

/* --- DEALERSHIP MODAL --- */
function DealershipModal({ car, close }) {
  const hardcodedDealerships = [
    { name: "Toyota of Dallas", address: "2610 Forest Ln, Dallas, TX 75234" },
    { name: "Cowboy Toyota", address: "9525 E R L Thornton Fwy, Dallas, TX 75228" },
    { name: "Toyota of Plano", address: "6888 TX-121, Plano, TX 75024" },
    { name: "Toyota of Richardson", address: "1221 N Central Expy, Richardson, TX 75080" }
  ];

  return (
    <div className="modal-overlay">
      <div className="compare-modal">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Find Dealerships</h2>

        <p>Nearest dealerships for the {car.name}:</p>

        <ul>
          {hardcodedDealerships.map((dealership, index) => (
            <li key={index}>{dealership.name} - {dealership.address}</li>
          ))}
        </ul>

        <button className="close-button" onClick={close}>Close</button>
      </div>
    </div>
  );
}

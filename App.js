import React, { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    course: "Starter",
    price: "",
  });

  const courses = ["Starter", "Main", "Dessert"];

  const addMenuItem = () => {
    if (newDish.name && newDish.description && newDish.price) {
      setMenuItems([...menuItems, newDish]);
      setNewDish({ name: "", description: "", course: "Starter", price: "" });
      alert("Dish added successfully!");
      setScreen("home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const toggleSelect = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const removeSelected = () => {
    setMenuItems(menuItems.filter((_, i) => !selectedItems.includes(i)));
    setSelectedItems([]);
  };

  const filterByCourse = (course) =>
    menuItems.filter((item) => item.course === course);

  return (
    <div className="App">
      {/* HOME SCREEN */}
      {screen === "home" && (
        <div className="section">
          <h1>Christoffel’s</h1>
          <div className="box">
            <h2>Welcome to Christoffel’s Private Dining Experience</h2>
          </div>
          <div className="box">
            <p>
              Discover a world where fine dining meets comfort. Chef Christoffel
              curates each dish with passion, using only the freshest
              ingredients and a touch of creative flair. From elegant classics
              to locally inspired flavours, every plate is designed to delight
              your senses.
            </p>
          </div>
          <button onClick={() => setScreen("menu")}>View Menu</button>
          <p>Total Menu Items: {menuItems.length}</p>
        </div>
      )}

      {/* FILTER SCREEN */}
      {screen === "filter" && (
        <div className="section">
          <h2>Filter Course</h2>
          {courses.map((c) => (
            <div key={c} className="box">
              <label>
                <input type="checkbox" /> {c}
              </label>
            </div>
          ))}
          <button>Apply Filter</button>
        </div>
      )}

      {/* MENU SCREEN */}
      {screen === "menu" && (
        <div className="section">
          <h1>MENU</h1>
          {courses.map((c) => (
            <div key={c}>
              <h2>{c}s</h2>
              {filterByCourse(c).length === 0 ? (
                <p>No {c.toLowerCase()}s available</p>
              ) : (
                filterByCourse(c).map((item, index) => (
                  <div className="menu-item" key={index}>
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Price:</strong> R{item.price}
                    </p>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD ITEM SCREEN */}
      {screen === "add" && (
        <div className="section">
          <h2>ADD ITEM TO MENU</h2>
          <label>Dish Name:</label>
          <input
            type="text"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <label>Description:</label>
          <textarea
            value={newDish.description}
            onChange={(e) =>
              setNewDish({ ...newDish, description: e.target.value })
            }
          />
          <label>Select the Course:</label>
          <select
            value={newDish.course}
            onChange={(e) => setNewDish({ ...newDish, course: e.target.value })}
          >
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label>Price (R):</label>
          <input
            type="number"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          />
          <button onClick={addMenuItem}>ADD ITEM TO MENU</button>
        </div>
      )}

      {/* ADD/REMOVE ITEM SCREEN */}
      {screen === "edit" && (
        <div className="section">
          <h2>Add/Remove Item</h2>
          {courses.map((c) => (
            <div key={c}>
              <h2>{c}s</h2>
              {filterByCourse(c).map((item, index) => (
                <div key={index} className="menu-item">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Price:</strong> R{item.price}
                  </p>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleSelect(index)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => alert("Selected items added!")}>
            Add Selected Items
          </button>
          <button onClick={removeSelected}>Remove Selected Items</button>
        </div>
      )}

      {/* NAVBAR */}
      <div className="navbar">
        <button onClick={() => setScreen("home")}>🏠</button>
        <button onClick={() => setScreen("add")}>➕</button>
        <button onClick={() => setScreen("filter")}>⚙️</button>
        <button onClick={() => setScreen("menu")}>🍽️</button>
        <button onClick={() => setScreen("edit")}>🧾</button>
      </div>
    </div>
  );
}

export default App;

// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [menuItems, setMenuItems] = useState([
  ]);
  const [selectedIds, setSelectedIds] = useState([]); // ids selected on edit screen
  const [filterChecks, setFilterChecks] = useState({
    Starter: true,
    Main: true,
    Dessert: true,
  });
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    course: "Starter",
    price: "",
  });

  const courses = ["Starter", "Main", "Dessert"];

  // helper: generate a simple unique id (no extra libs)
  const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  // add new menu item (validates fields)
  const addMenuItem = () => {
    if (!newDish.name.trim() || !newDish.description.trim() || !newDish.price) {
      alert("Please fill in all fields!");
      return;
    }
    const priceNum = Number(newDish.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Please enter a valid non-negative price");
      return;
    }

    const item = {
      id: makeId(),
      name: newDish.name.trim(),
      description: newDish.description.trim(),
      course: newDish.course,
      price: priceNum,
    };

    setMenuItems((prev) => [...prev, item]);
    setNewDish({ name: "", description: "", course: "Starter", price: "" });
    alert("Dish added successfully!");
    setScreen("menu");
  };

  // toggle selection by id (used in edit screen)
  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // remove selected items (by id)
  const removeSelected = () => {
    if (selectedIds.length === 0) {
      alert("No items selected to remove.");
      return;
    }
    if (!window.confirm(`Remove ${selectedIds.length} selected item(s)?`)) return;

    setMenuItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    alert("Selected items removed.");
  };

  // filter menu items by course
  const filterByCourse = (course) => menuItems.filter((item) => item.course === course);

  // compute average price for a course (returns 0 if no items)
  const getAveragePrice = (course) => {
    const items = filterByCourse(course);
    if (items.length === 0) return "0.00";
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += Number(items[i].price);
    }
    return (total / items.length).toFixed(2);
  };

  // apply filters to whole menu (used to show only allowed courses)
  const getFilteredMenu = () => {
    return menuItems.filter((item) => !!filterChecks[item.course]);
  };

  // toggle checkboxes on filter screen (without applying until user hits Apply)
  const toggleFilterCheck = (course) => {
    setFilterChecks((prev) => ({ ...prev, [course]: !prev[course] }));
  };

  // clear all filters (set all to true)
  const clearFilters = () => {
    setFilterChecks({ Starter: true, Main: true, Dessert: true });
  };

  return (
    <div className="App">
      {/* HOME SCREEN */}
      {screen === "home" && (
        <div className="section">
          <h1>Christoffel’s Private Dining</h1>

          <div className="box">
            <h2>Welcome</h2>
            <p>
              Discover a world where fine dining meets comfort. Chef Christoffel curates each dish with passion,
              using only the freshest ingredients and a touch of creative flair.
            </p>
          </div>

          <div className="box stats">
            <p>Total Menu Items: <strong>{menuItems.length}</strong></p>
            <p>Average Starter Price: <strong>R{getAveragePrice("Starter")}</strong></p>
            <p>Average Main Price: <strong>R{getAveragePrice("Main")}</strong></p>
            <p>Average Dessert Price: <strong>R{getAveragePrice("Dessert")}</strong></p>
          </div>

          <div className="home-buttons">
            <button onClick={() => setScreen("menu")}>View Menu</button>
            <button onClick={() => setScreen("add")}>Add Item</button>
            <button onClick={() => setScreen("filter")}>Filter</button>
            <button onClick={() => setScreen("edit")}>Edit Menu</button>
          </div>
        </div>
      )}

      {/* FILTER SCREEN */}
      {screen === "filter" && (
        <div className="section">
          <h2>Filter Courses</h2>
          <p>Select which courses a guest should see in the menu:</p>

          <div className="filter-list">
            {courses.map((c) => (
              <label key={c} className="filter-item">
                <input
                  type="checkbox"
                  checked={filterChecks[c]}
                  onChange={() => toggleFilterCheck(c)}
                />{" "}
                {c}
              </label>
            ))}
          </div>

          <div className="filter-actions">
            <button onClick={() => setScreen("menu")}>Apply & View Menu</button>
            <button onClick={clearFilters}>Reset (show all)</button>
            <button onClick={() => setScreen("home")}>Back Home</button>
          </div>
        </div>
      )}

      {/* MENU SCREEN */}
      {screen === "menu" && (
        <div className="section">
          <h1>MENU</h1>

          {courses.map((c) => (
            filterChecks[c] ? (
              <div key={c} className="course-block">
                <h2>
                  {c}s — Average Price: R{getAveragePrice(c)}
                </h2>

                {filterByCourse(c).filter(item => filterChecks[item.course]).length === 0 ? (
                  <p className="muted">No {c.toLowerCase()}s available</p>
                ) : (
                  filterByCourse(c)
                    .filter(item => filterChecks[item.course]) // show only if allowed by filters
                    .map((item) => (
                      <div className="menu-item" key={item.id}>
                        <div className="menu-left">
                          <p className="menu-name">{item.name}</p>
                          <p className="menu-desc">{item.description}</p>
                        </div>
                        <div className="menu-right">
                          <p className="menu-price">R{Number(item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                )}
              </div>
            ) : null
          ))}

          <div className="nav-row">
            <button onClick={() => setScreen("add")}>Add Item</button>
            <button onClick={() => setScreen("filter")}>Adjust Filters</button>
            <button onClick={() => setScreen("home")}>Home</button>
          </div>
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
            placeholder="e.g. Creamy Mushroom Soup"
          />

          <label>Description:</label>
          <textarea
            value={newDish.description}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
            placeholder="Short description of dish"
          />

          <label>Select the Course:</label>
          <select
            value={newDish.course}
            onChange={(e) => setNewDish({ ...newDish, course: e.target.value })}
          >
            {courses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Price (R):</label>
          <input
            type="number"
            min="0"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
            placeholder="e.g. 85"
          />

          <div className="add-actions">
            <button onClick={addMenuItem}>ADD ITEM TO MENU</button>
            <button onClick={() => setScreen("menu")}>Cancel</button>
          </div>
        </div>
      )}

      {/* ADD/REMOVE ITEM (EDIT) SCREEN */}
      {screen === "edit" && (
        <div className="section">
          <h2>Edit Menu — Select items to remove</h2>

          {menuItems.length === 0 && <p className="muted">No menu items yet. Add items first.</p>}

          {courses.map((c) => (
            <div key={c}>
              <h3>{c}s</h3>
              {filterByCourse(c).length === 0 ? (
                <p className="muted">No {c.toLowerCase()}s</p>
              ) : (
                filterByCourse(c).map((item) => (
                  <div className="menu-item edit-item" key={item.id}>
                    <label className="edit-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                      <div className="edit-details">
                        <p className="menu-name">{item.name}</p>
                        <p className="menu-desc">{item.description}</p>
                      </div>
                    </label>
                    <div className="menu-right">
                      <p>R{Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}

          <div className="edit-actions">
            <button onClick={removeSelected}>Remove Selected</button>
            <button onClick={() => { setSelectedIds([]); setScreen("menu"); }}>Done</button>
          </div>
        </div>
      )}

      {/* NAVBAR (persistent) */}
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

https://github.com/ST10466575/MASTPOE.git
# Christoffel’s Private Dining App  
### README & Change Log

This document outlines all updates made to the Christoffel’s Private Dining App since **Part 2**, as well as all **refactoring changes** completed in the final version of the project.

---

# 📌 Project Overview

The app allows Chef Christoffel to:

- Add new menu items  
- Remove existing menu items  
- View the full menu broken down by course  
- Filter items that guests can see  
- View average prices per course  
- Store menu items in an array  
- Use multiple screens (Home, Menu, Add, Filter, Edit)  
- Navigate using a persistent bottom navigation bar  

The final version includes all required programming concepts:

- **For loop**
- **While loop**
- **For-in loop**
- **Global variables**
- **Functions to organise code**
- **Screen-based navigation**
- **Array storage of items**

---

# 📘 **Change Log (Changes Since Part 2)**

## ✅ **1. Added a Separate Add-Item Screen**
- The “Add Item to Menu” form was moved off the Home screen and placed into its own dedicated screen.
- This matches the Part 3 requirement.
- Navigation updated to support the new screen.

---

## ✅ **2. Implemented Average Price Calculations**
- The Home screen now displays:
  - Average Starter Price  
  - Average Main Price  
  - Average Dessert Price  
- The Menu screen also shows the **average price for each course**.
- Uses a **for loop** to compute averages.

---

## ✅ **3. Added a Filter Screen (Guest Filter by Course)**
- New screen created to allow guests to select which courses they want to see.
- Checkbox controls added for Starter / Main / Dessert.
- “Apply Filter” and “Reset Filter” functions implemented.
- Filtered results now displayed in Menu screen.

---

## ✅ **4. Implemented Add & Remove Menu Item System**
### Add Feature:
- New dishes can be added with:
  - Name  
  - Description  
  - Course selection  
  - Price  
- Uses object destructuring and state updates.

### Remove Feature:
- “Edit Menu” screen created to remove items.
- Items selectable using checkboxes.
- Removal based on unique item IDs (improves reliability).

---

## ✅ **5. Menu Items Saved in an Array**
- All menu items stored in the `menuItems` state array.
- Items include:
  - `id`
  - `name`
  - `description`
  - `course`
  - `price`

---

## ✅ **6. Added Three Required Loops**
### **For Loop**
- Used inside `getAveragePrice()` to calculate totals.

### **While Loop**
- Implemented in `countDesserts()` to count dessert items.

### **For-In Loop**
- Used inside `addMenuItem()` to inspect object properties for assignment requirements.

All loops integrated into real working features.

---

## ✅ **7. Refactored Navigation System**
- Replaced previous ad-hoc navigation with a **centralized `screen` state**.
- Navigation buttons now properly switch screens.
- Bottom navigation bar always visible and functional.

---

## ✅ **8. Improved Component Structure and Functions**
- All major operations placed inside properly named functions:
  - `addMenuItem()`
  - `removeSelected()`
  - `toggleSelect()`
  - `toggleFilterCheck()`
  - `clearFilters()`
  - `filterByCourse()`
  - `getAveragePrice()`
  - `countDesserts()`

This satisfies the requirement:  
**“Use functions to organize code.”**

---

## ✅ **9. Introduced Global Variables**
- `courses` array declared as a top-level variable.
- Used across Add, Edit, Filter, and Menu screens.
- Satisfies the “Use Global Variables” requirement.

---

## ✅ **10. UI and User Experience Improvements**
- Menu items now formatted consistently.
- Prices normalized using `.toFixed(2)`.
- Error messages added for invalid inputs.
- Confirm dialog added before deleting items.
- Clean spacing, labels, and visual structure implemented.

---

# 🔧 **Refactoring Summary**

The following refactoring steps were performed to improve the quality of the code:

### ✔ Replaced index-based removal with **ID-based removal**  
Prevents deletion errors when filters are applied.

### ✔ Separated logic into reusable functions  
Improves readability and reduces duplication.

### ✔ Cleaned up state management  
All screens and data flows simplified.

### ✔ Improved validation for adding items  
Prevents empty or invalid entries.

### ✔ Simplified filtering logic  
Filter state stored cleanly in `filterChecks`.

### ✔ Consolidated repeated UI patterns  
Menu sections now use consistent layouts.

---

# 📱 How to Run the App

1. Place `App.js` and `App.css` inside your `src/` folder.  
2. Install dependencies:
3. Start the app:
4. App opens at:

# Hooli Commander

**Hooli Commander** is a university project that demonstrates the principles of clean architecture, design patterns, and component-based development using only **vanilla JavaScript**, **HTML**, and **CSS**. The backend runs on **Node.js**, and the project showcases a custom-built file manager with a two-panel layout, dynamic rendering, and modular logic organization.

---

## 🚀 Technologies & Concepts Used

- **Vanilla JavaScript (ES6+)**
- **Node.js**
- **HTML5, CSS3**
- **Design Patterns**
  - MVC (Model-View-Controller)
  - Observer
  - Singleton

---

## ▶️ Installation

1. Clone repository: `git clone https://github.com/Nikolas321654/Hooli_Commander.git`

2. `cd BackEnd`
3. `npm install`

4. **Start:** `npm run start`  
   **Start (development mode):**
   `npm run start-dev`

The application will be available at http://localhost:8080

---

## 📊 UML Diagram

The application’s structure and flow are reflected in the UML diagram:

- MVC modules are divided into `model`, `view`, and `controller`.
- The Observer pattern is used for event dispatching between view and controller.
- Singleton (Api module) is applied for maintaining a consistent app state.
- Modules
  - App: Manages the general application flow and panel switching.
  - Panel: Manages individual panels and their specific settings.
  - Api: Manages REST API client-server communication.

> 📄 Diagram file: `HooliCommander.drawio` (open with [draw.io](https://draw.io))

---

## 📚 References & Literature

- **Clean Code** — Robert C. Martin

- **Clean Architecture** — Robert C. Martin

- **You Don’t Know JS** — Kyle Simpson

- **Design Patterns: Elements of Reusable Object-Oriented Software** — Gang of Four (GoF)

- https://uk.javascript.info/JavaScript.info

- https://developer.mozilla.org/en-US/

- https://www.youtube.com/@TimurShemsedinov/videos

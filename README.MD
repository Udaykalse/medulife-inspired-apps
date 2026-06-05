# 🏢 Vmedulife — HR Management Portal

A collection of React-based projects inspired by [Vmedulife](https://www.vmedulife.com)'s product suite. This repository serves as the master workspace containing modular, production-grade frontend applications focused on HR and employee management workflows.

> Built with React, CSS Modules, and vanilla JavaScript — no heavy UI frameworks.

---

## 📁 Repository Structure

```
Vmedulife/
└── vmedulife-Day-7-emp-management/     ← Employee Registration & Management App
    ├── public/
    └── src/
        ├── App.js
        ├── App.module.css
        ├── index.js
        ├── index.css
        ├── pages/
        │   ├── EmployeesPage.js
        │   └── EmployeesPage.module.css
        └── components/
            ├── AddEmployeesModal.js
            ├── EditEmployeesModal.js
            └── Modal.module.css
```

> More project modules will be added to this workspace over time.

---

## 🚀 Projects Inside

### 1. `vmedulife-Day-7-emp-management`
> Employee Registration & Management System

A clean, fully functional HR employee management app built in React. Manage your workforce with add, edit, delete, search, and sort — all in a polished, responsive interface.

**Key Features:**
- Add, edit, and delete employee records
- Live search by name, email, or ID
- Column sorting (ascending / descending)
- Bulk row selection with select-all
- Toast notifications for all actions
- Initials-based color avatars
- Fully accessible modals with keyboard support
- CSS Modules scoped styling — zero Bootstrap or UI library

**Tech Stack:** React 18, CSS Modules, React Hooks

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v16+`
- npm `v8+`

### Run a Project

```bash
# Step 1 — Go into the project folder
cd vmedulife-Day-7-emp-management

# Step 2 — Install dependencies
npm install

# Step 3 — Start development server
npm start
```

App runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI library |
| CSS Modules | Scoped component styling |
| React Hooks | `useState`, `useMemo`, `useEffect`, `useRef` |
| Google Fonts | Syne + DM Sans typography |
| React Testing Library | Component tests |
| Create React App | Project scaffolding |

---

## 🎨 Design Philosophy

All projects in this workspace follow a shared design language:

- **Typography:** Syne (display) + DM Sans (body)
- **Color Accent:** Indigo `#6366f1`
- **Styling:** CSS custom properties for all tokens — no inline styles
- **Layout:** Fully responsive, mobile-first
- **Interactions:** Smooth transitions, toast feedback, empty states, and loading guards

---

## 📌 Inspiration

This workspace is inspired by **[Vmedulife](https://www.vmedulife.com)** — an ERP and campus management platform used by educational institutions. Projects here explore and extend HR and employee management concepts from that domain.

---

## 👤 Author

**Uday Kalse**
- GitHub: [@Udaykalse](https://github.com/Udaykalse)

---

## 📄 License

This repository is for educational and portfolio purposes.
All Vmedulife product names and trademarks belong to their respective owners.
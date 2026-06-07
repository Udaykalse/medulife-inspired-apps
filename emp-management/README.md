# 👥 Employee Registration App

A clean, production-grade React application for managing employee records — built with zero UI framework dependencies, pure CSS Modules, and vanilla React hooks. Features live search, column sorting, bulk selection, toast notifications, and fully accessible modals.

---

## 📁 Project Structure

```
employee-app/
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── App.module.css
    ├── App.test.js
    ├── index.js
    ├── index.css
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── pages/
    │   ├── EmployeesPage.js
    │   └── EmployeesPage.module.css
    └── components/
        ├── AddEmployeesModal.js
        ├── EditEmployeesModal.js
        └── Modal.module.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v16+`
- npm `v8+` or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/employee-app.git
cd employee-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3000`.

### Other Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |

---

## ✨ Features

### Core CRUD
- **Add Employee** — modal form with ID, first name, last name, and email fields
- **Edit Employee** — pre-filled modal for updating employee details (Employee ID is read-only)
- **Delete Employee** — remove one or multiple employees at once via bulk selection

### Table Interactions
- **Live Search** — filter employees in real time by name, email, or ID
- **Column Sorting** — click any column header to sort ascending or descending
- **Select All** — header checkbox to select or deselect all rows at once
- **Click-to-Select** — click anywhere on a row to toggle its selection
- **Row Counter** — footer shows "Showing X of Y employees" at all times

### UX & Validation
- **Toast Notifications** — animated pill toasts for success and error feedback
- **Duplicate ID Guard** — prevents adding an employee with an existing ID
- **Edit Guard** — Edit button is disabled unless exactly one row is selected
- **Keyboard Support** — `Escape` key closes any open modal
- **Auto-focus** — first editable field receives focus when a modal opens
- **Empty State** — friendly icon and message when the table is empty or a search returns no results

### Visual Design
- **Initials Avatar** — auto-generated colored avatar from first and last name
- **Employee ID Badge** — styled monospace chip for each ID
- **Status Badge** — green "Active" pill on every employee row
- **Responsive Layout** — adapts cleanly to mobile, tablet, and desktop
- **CSS Variables** — centralized design tokens for colors, radii, shadows, and transitions

---

## 🎨 Design System

**Fonts** (via Google Fonts)
- Display: [Syne](https://fonts.google.com/specimen/Syne) — headings and titles
- Body: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — UI text and inputs

**Color Tokens**

```css
--accent:        #6366f1   /* Primary indigo */
--accent-hover:  #4f46e5   /* Hover state */
--accent-light:  #eef2ff   /* Light tint */
--danger:        #ef4444   /* Delete / error */
--success:       #10b981   /* Active badge */
--text-primary:  #111827
--text-secondary:#6b7280
--text-muted:    #9ca3af
--surface:       #ffffff
--surface-2:     #f7f8fc
--border:        #e4e7f0
```

---

## 🧩 Component Overview

### `EmployeesPage`
The main page component. Owns all state: `employeeDetails`, `selectedEmp`, `searchQuery`, `sortConfig`, and `toast`. Passes only the props each child needs.

### `AddEmployeesModal`
Controlled modal form for creating a new employee. Accepts `formState`, `handleOnChange`, `handleOnAdd`, and `handleCloseAdd`.

### `EditEmployeesModal`
Modal form for updating an existing employee. Maintains a local copy of the selected employee's data so edits are not committed until "Save Changes" is clicked. `employeeId` is rendered as a disabled read-only field.

### `Modal.module.css`
Shared stylesheet consumed by both modal components. Covers overlay, animation, form controls, and footer buttons.

---

## 📐 CSS Modules Convention

Every component has a co-located `.module.css` file. Class names are locally scoped and imported as objects:

```js
import styles from './EmployeesPage.module.css';

<div className={styles.tableCard}>...</div>
```

Global tokens (colors, radii, fonts, shadows) live in `index.css` as CSS custom properties and are accessible to all modules via `var(--token-name)`.

---

## 🐛 Bugs Fixed from Original

| Original Issue | Fix Applied |
|---|---|
| `selectedEmp` array mutated directly | Replaced with immutable state updates throughout |
| Delete set `employeeClone[keys] = employeeDetails` before deleting | Removed the erroneous assignment; deletes by ID only |
| `formState` reset to `""` (string) after add | Reset to `{}` (empty object) |
| Edit opened silently with 0 rows selected | Shows error toast; button disabled for ≠ 1 selection |
| `key={index}` on rows causing reconciliation bugs | Keyed by `emp.employeeId` instead |
| All debug `console.log` calls left in production code | Removed entirely |
| `react-bootstrap` required for basic table and buttons | Removed; replaced with pure CSS Modules |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `> 768px` | Full table with all columns, side-by-side toolbar |
| `≤ 768px` | Stacked page header, full-width search, ID badge hidden |
| `≤ 480px` | Modals use reduced horizontal padding |

---

## 🧪 Testing

Tests use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/).

```bash
npm test
```

The default test asserts that the "Employees" heading renders. Extend `App.test.js` to cover adding, editing, and deleting employees using `userEvent` and `fireEvent`.

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` | UI library |
| `react-dom` | DOM renderer |
| `react-scripts` | CRA build toolchain |
| `@testing-library/react` | Component testing |
| `@testing-library/jest-dom` | DOM matchers |
| `web-vitals` | Performance metrics |

No external UI component libraries are used.

---


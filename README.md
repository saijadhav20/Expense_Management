# EXPENZO

A minimal, responsive Expense Management System built using React.js + TailwindCSS+PostGRE+Express.js+Javascript+TypeScript, designed for company-wide expense tracking and sequential approval workflows.

---

## Features

### 🔐 Authentication
- Login / Signup for Admin, Manager, Employee, Finance, and Director.
- Role-based redirection after login.

### 👨‍💼 Admin Dashboard
- Manage users (create Employees, Managers).
- View company info (name, base currency).
- Configure approval rules (placeholder for now).

### 🧾 Employee Dashboard
- Submit expenses with details:
  - Description, Category, Amount, Currency, Date, Receipt.
- See expense list with:
  - Status badges (Pending, Approved, Rejected).
  - Converted amount in company base currency (mock conversion).
  - Approval history.

### ✅ Sequential Approval Dashboards
- Manager → Finance → Director approval flow.
- Each role sees only expenses currently awaiting their approval.
- Approvers can:
  - View details in modal/drawer.
  - Approve / Reject with comments.

### 🧩 Shared Components
- ExpenseCard – Displays expense info, status, and approval history.
- ApprovalDashboard – Reusable for Manager, Finance, Director.
- Navbar & Sidebar – Navigation and layout.
- Modal, Badge, Button – Common UI elements.

---

---

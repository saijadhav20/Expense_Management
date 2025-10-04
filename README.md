# EXPENZO
> Developed for **Odoo Hackathon 2025**  
> Team Name: **CodeX**

---

## 👨‍💻 Team Details

**Team Name:** CodeX  

| Member Name | Role | Contribution |
|--------------|------|--------------|
| [Sai Jadhav] | Full Stack Developer | Frontend (React, Tailwind), Backend Integration |
| [Sania Khan] | Backend Developer | Node.js APIs, Database Schema (PostgreSQL) |
| [Saket Patayeet] | UI/UX Designer | Wireframes, Component Layout, Styling |
| [Mrudul Sakharkar] | DevOps / Testing | Version Control, Deployment Setup, QA |

---

## 🧑‍🏫 Reviewer

**Reviewer Name:** [Aman Patel]

---

## 🎥 Video Presentation

🔗 **[Watch Our 5-Minute Demo Presentation Here](PASTE_YOUR_VIDEO_LINK_HERE)**

---

## 🗂️ Repository Structure


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

User Management Dashboard

A React + Material UI web app for managing users.
It supports listing, searching, adding, and editing users with a clean, responsive UI.

Features

📋 List Users — fetch users from a dummy API and display them in a responsive list.

🔍 Search with Typeahead — search users by name, email, or phone with suggestions.

➕ Add User — create a new user with validation (Name, Email, Phone, Address).

✏️ Edit User — update existing user details via the same form dialog.

📂 User Details Page — click a name to see full user info (address, company, website, etc.).

🖼️ Empty State — shows a Lottie animation when no users are found.

🎨 Responsive UI — styled with Material UI and custom theming (light/dark mode ready).

🔄 State Handling — Axios for API calls, local state for add/edit.

Tech Stack

React (Vite) – Frontend framework

Material UI (MUI) – Components and theming

React Router DOM – Client-side routing

Axios – API requests

Lottie React – Empty state animations

Getting Started
1. Clone the repo
git clone https://github.com/<your-username>/user-management-dashboard.git
cd user-management-dashboard

2. Install dependencies
npm install

3. Run locally
npm run dev


App will be available at http://localhost:5173

Project Structure
src/
 ├── api/                # Axios API wrappers
 ├── assets/             # Static assets (Lottie JSON, images)
 ├── components/         # Reusable components (dialogs, etc.)
 ├── pages/              # Route pages (UsersPage, UserDetailPage)
 ├── theme.js              # MUI theme setup
 ├── App.jsx             # Routes and layout
 └── main.jsx            # Entry point
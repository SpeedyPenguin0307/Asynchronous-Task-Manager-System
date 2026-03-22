# Asynchronous-Task-Manager-System
An asynchronous task manager for decentralized organizations, enabling secure, role-based task creation, assignment, and updates. Enforces hierarchical delegation, preventing cross-level conflicts. Centralized tracking, status updates, and role-specific views improve visibility, accountability, and team collaboration.

## Overview
The system supports role-based access control where:
- Upper Senior Managers have full access
- Senior Managers manage Managers and Employees
- Managers manage Employees
- Employees can only view and update their assigned tasks

## Features

### Task Management
- Create tasks
- Update task details
- Delete tasks
- View tasks dynamically

### Role-Based Access
- Different UI and permissions based on user role
- Controlled task assignment hierarchy

### Filtering & Sorting
- Filter tasks by:
  - Status
  - Priority
  - Due Date
- Role-based task visibility

### Real-Time UI Updates
- No page reload required
- Dynamic updates using React state

## Tech Stack
### Frontend
- React.js
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MySQL

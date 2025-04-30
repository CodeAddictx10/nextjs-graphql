# 🚀 Documentation

This document provides an overview of the application's features and instructions on how to run it locally.

---

## 📚 Overview

This application is designed to manage departments and sub-departments through a custom dashboard interface built with **Next.js** and **Apollo GraphQL**.

### 🔐 Authentication

- Authentication is handled using **NextAuth** with the **Credentials Provider**.
- To access the department and sub-department pages, users must be logged in.
- A logout option is also provided.

### 🏢 Department Management

- The department page displays a paginated table of all departments in the system.
- A **"Create Department"** button opens a modal form to add new departments.
- Each row includes action buttons to **Edit** or **Delete** a department.

### 🧩 Sub-Department Management

- The sub-department page includes all the same features as the department page.

### ⚡ Caching

- Apollo Client's caching mechanism is implemented.
- Cache is automatically refreshed after a mutation occurs to keep data in sync.

---

## 🛠 How to Run the App Locally

### ✅ Prerequisites

Ensure the following are installed:

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- Properly configured environment variables (see `.env.example`)

### 📦 Installation

```bash
git clone https://github.com/CodeAddictx10/nextjs-graphql.git app

cd app

yarn install

cp .env.example .env.local # Create a local environment file

yarn run dev # Start the local development server

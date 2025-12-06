# Product Showcase & Enquiry Application

A full-stack application built with React, Node.js/Express, and SQLite to browse products and submit enquiries.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup & Installation

1.  **Clone/Open the repository**
     Navigate to the project root.

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - This will install dependencies like `express`, `sqlite3`, `cors`, etc.
    - The database `products.sqlite` is already seeded or will be created/seeded on start if `seed.js` is run.
    - To re-seed the database: `node seed.js`

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```
    - Installs React and other dependencies.

## Running the Application

1.  **Start the Backend Server**
    In the `backend` directory:
    ```bash
    node index.js
    ```
    - Server runs on `http://localhost:3001`.

2.  **Start the Frontend Application**
    In the `frontend` directory:
    ```bash
    npm start
    ```
    - Opens the app at `http://localhost:3000`.

## Features

- **Product Listing**: Browse products with pagination, search, and category filtering.
- **Product Details**: View detailed information about a product.
- **Enquiry System**: Submit an enquiry for a specific product via a modal form.
- **Admin API**: Backend endpoints to retrieve enquiries (e.g., via Postman).

## Tech Stack

- **Frontend**: React, React Router, Axios, CSS Modules (or App.css).
- **Backend**: Node.js, Express.
- **Database**: SQLite.

## Assumptions & Trade-offs

- **No Authentication**: For simplicity as per requirements, no user login is implemented.
- **Local Database**: Uses SQLite file-based DB to avoid external service deps.
- **Styling**: Custom CSS used instead of a UI library to demonstrate core CSS skills.

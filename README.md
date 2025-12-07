# Product Showcase & Enquiry Application

A full-stack application built with React, Node.js/Express, and SQLite to browse products and submit enquiries.

## Features

- **Product Listing**: Browse products with pagination, search, and category filtering.
- **Product Details**: View detailed information about a product, including custom AI-generated images.
- **Enquiry System**: Submit an enquiry for a specific product via a modal form.
- **Admin Dashboard**: View all customer enquiries in a dedicated admin interface.
- **Responsive Design**: Modern UI styled with **Tailwind CSS**.

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS.
- **Backend**: Node.js, Express.
- **Database**: SQLite.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Dhivyabj/product-showcase.git
    cd product-showcase
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - The database `products.sqlite` will be created and seeded automatically when you run the seed script.
    - **Initialize Data**: `node seed.js` (This resets the DB and adds sample products).

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```

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
    - Opens the app at `http://localhost:3000` (or another available port like 3001, 3002, etc.).

## Usage

- **User View**: Navigate to the home page to browse products. Click "View Details" to see more and "Enquire Now" to contact.
- **Admin View**: Click the "Admin" link in the header or navigate to `/admin` to view submitted enquiries.

## Project Structure

- `backend/`: Express server, API routes, database (SQLite), and seed script.
- `frontend/`: React application, components, and Tailwind configuration.


<img width="1889" height="910" alt="image" src="https://github.com/user-attachments/assets/4e29733b-c102-4fa5-9f53-dce1c2c20016" />

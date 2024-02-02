# RESTful API using Node.js

## Introduction

This is a simple Rest API built with Node.js. It provides endpoints for managing products and variants, as well as a search functionality.


## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository :** git clone https://github.com/arpit-srivastava33/Backend-Assignment.git
2. **Create a .env file in the root directory with the following content :** MONGO_URI= [Your MongoDB connection string](readme.com)
3.  **Start Server :** npm run start

## Interacting with the API:

### Product Endpoints
- **Get All Products:**
   - Endpoint: **GET /api/allProducts**
- **Create** Products with variants:
    - Endpoint: **POST /api/createProduct**
- **Delete** Product by ProductID:
    - Endpoint: **GET /api/product/:productId**
- **Update** Product by ProductID:
    - Endpoint: **PATCH /updateProduct/:productId**
 
 ### Search Endpoint
 - **Search** Product by product name, description or variants name:
    - Endpoint: **GET /api/product/search?q=your-search-term**

## Tech Stack:
  - **Node.js** for the server.
  - **Express.js** for handling HTTP requests.
  - **MongoDB** as the database using Mongoose.
  - **Mocha** and **Chai** for **Test Driven Development (TDD)**.

## Assumption:
- The API assumes a basic understanding of RESTful principles.
- Whenever creating a product, variants value must also be passed as nested object for a particular project.

## API Documentation:
- For detailed API documentation, refer to the [API documentation](https://documenter.getpostman.com/view/24375730/2s9Yyv9zXL) file.

## For Testing:
 -  Tests for the model **run command :**
      - **npm run** test-model
 -   Tests for the search functionality **run command :**
     - **npm run** test-search
 -   Tests for API :
       - **npm run** test-getAllProduct
       - **npm run** test-createProduct



  


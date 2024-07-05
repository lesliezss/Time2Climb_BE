# API Documentation

## Overview

This API provides endpoints for managing grades and users. Below are the details of each endpoint, including the request format and potential error responses.

## Endpoints

### Grades

#### Get All Grades

- **Endpoint:** `GET /api/grades`
- **Description:** Retrieves all grades.
- **Response:**
  - **200 OK:** Returns an array of all grades.

#### Get Grade by ID

- **Endpoint:** `GET /api/grades/:grade_id`
- **Description:** Retrieves a grade by its ID.
- **Response:**
  - **200 OK:** Returns the grade details.
  - **400 Bad Request:** Invalid `grade_id` (not a number).
  - **404 Not Found:** Grade not found for the provided `grade_id`.

### Users

#### Get All Users

- **Endpoint:** `GET /api/users`
- **Description:** Retrieves all users.
- **Response:**
  - **200 OK:** Returns an array of users. Each user object includes:
    - `id` (Number)
    - `first_name` (String)
    - `last_name` (String)
    - `age` (Number)
    - `level_id` (Number)

#### Create User

- **Endpoint:** `POST /api/users`
- **Description:** Creates a new user.
- **Request Body:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "age": 28,
    "level_id": 2
  }

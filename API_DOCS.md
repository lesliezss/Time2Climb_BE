# Time 2 Climb App API Documentation

## Overview

This API allows users to manage climbing sessions, climbs, grades, and walls. Below are the details of each endpoint, including their request and response formats.

## Endpoints

### Users

#### GET /api/users

- **Description:** Fetch all users.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "users": [
        {
          "id": 1,
          "first_name": "Chris",
          "last_name": "Doe",
          "age": 25,
          "level_id": 3,
          "firebase_id": "abc123"
        },
        ...
      ]
    }
    ```

#### GET /api/users/:user_id

- **Description:** Fetch a user by their ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "user": {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "age": 28,
        "level_id": 2,
        "firebase_id": "def456"
      }
    }
    ```

#### POST /api/users

- **Description:** Add a new user.
- **Request:**
  - **Body:**
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "age": 28,
      "level_id": 2,
      "firebase_id": "wklenrlkwnlr"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": 3,
      "first_name": "John",
      "last_name": "Doe",
      "age": 28,
      "level_id": 2,
      "firebase_id": "wklenrlkwnlr"
    }
    ```

#### PATCH /api/users/:user_id

- **Description:** Update user details.
- **Request:**
  - **Body:**
    ```json
    {
      "last_name": "Updated",
      "age": 36
    }
    ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": 1,
      "first_name": "Chris",
      "last_name": "Updated",
      "age": 36,
      "level_id": 3
    }
    ```

#### DELETE /api/users/:user_id

- **Description:** Delete a user by ID.
- **Response:**
  - **Status:** 204 No Content

### Sessions

#### GET /api/sessions/users/:user_id

- **Description:** Fetch all sessions of a particular user.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "userSessions": [
        {
          "user_id": 1,
          "wall_id": 1,
          "date": "2023-07-10",
          "duration_minutes": 90
        },
        ...
      ]
    }
    ```

#### GET /api/sessions/:session_id

- **Description:** Fetch a session by its ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "userSession": [
        {
          "wall_name": "Main Wall",
          "climb_count": "10",
          "id": 1,
          "user_id": 1,
          "wall_id": 1,
          "date": "2023-07-10",
          "duration_minutes": 90
        }
      ]
    }
    ```

#### POST /api/sessions

- **Description:** Add a new session.
- **Request:**
  - **Body:**
    ```json
    {
      "user_id": 2,
      "wall_id": 6,
      "date": "2023-07-10",
      "duration_minutes": 45
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "user_id": 2,
      "wall_id": 6,
      "date": "2023-07-10",
      "duration_minutes": 45
    }
    ```

#### PATCH /api/sessions/:session_id

- **Description:** Update a session.
- **Request:**
  - **Body:**
    ```json
    {
      "date": "2023-06-11T23:00:00.000Z",
      "duration_minutes": 60
    }
    ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "wall_id": 3,
      "date": "2023-06-10T23:00:00.000Z",
      "duration_minutes": 60
    }
    ```

#### DELETE /api/sessions/:session_id

- **Description:** Delete a session by ID.
- **Response:**
  - **Status:** 204 No Content

### Climbs

#### GET /api/climbs/:session_id

- **Description:** Fetch all climbs of a particular session.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "climbs": [
        {
          "id": 1,
          "session_id": 1,
          "grade_id": 5,
          "grade_label": "5.10a",
          "grade_system_id": 1,
          "grade_system_label": "YDS",
          "type_id": 1,
          "type_label": "Lead",
          "climb_outcome_id": 1,
          "outcome_label": "Completed"
        },
        ...
      ]
    }
    ```

#### GET /api/climbs/users/:user_id

- **Description:** Fetch all climbs of a particular user.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "climbs": [
        {
          "user_id": 1,
          "id": 1,
          "session_id": 1,
          "grade_id": 5,
          "grade_label": "5.10a",
          "grade_system_id": 1,
          "grade_system_label": "YDS",
          "type_id": 1,
          "type_label": "Lead",
          "climb_outcome_id": 1,
          "outcome_label": "Completed"
        },
        ...
      ]
    }
    ```

#### POST /api/climbs

- **Description:** Add a new climb.
- **Request:**
  - **Body:**
    ```json
    {
      "session_id": 5,
      "grade_id": 15,
      "type_id": 4,
      "climb_outcome_id": 3
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": 3,
      "session_id": 5,
      "grade_id": 15,
      "type_id": 4,
      "climb_outcome_id": 3
    }
    ```

#### PATCH /api/climbs/:climb_id

- **Description:** Update a climb.
- **Request:**
  - **Body:**
    ```json
    {
      "grade_id": 2,
      "climb_outcome_id": 1
    }
    ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": 2,
      "session_id": 1,
      "grade_id": 2,
      "type_id": 1,
      "climb_outcome_id": 1
    }
    ```

#### DELETE /api/climbs/:climb_id

- **Description:** Delete a climb by ID.
- **Response:**
  - **Status:** 204 No Content

### Grades

#### GET /api/grades

- **Description:** Fetch all grades.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "grades": [
        {
          "id": 1,
          "label": "5.9",
          "system_id": 1,
          "system_label": "YDS"
        },
        ...
      ]
    }
    ```

#### GET /api/grades/:grade_id

- **Description:** Fetch a grade by its ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "grade": {
        "id": 5,
        "label": "5.10a",
        "system_id": 1,
        "system_label": "YDS"
      }
    }
    ```

### Walls

#### GET /api/walls

- **Description:** Fetch all walls.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "walls": [
        {
          "id": 1,
          "name": "Main Wall",
          "location": "Gym A"
        },
        ...
      ]


    }
    ```

#### GET /api/walls/:wall_id

- **Description:** Fetch a wall by its ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "wall": {
        "id": 1,
        "name": "Main Wall",
        "location": "Gym A"
      }
    }
    ```

#### POST /api/walls

- **Description:** Add a new wall.
- **Request:**
  - **Body:**
    ```json
    {
      "name": "New Wall",
      "location": "Gym B"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": 2,
      "name": "New Wall",
      "location": "Gym B"
    }
    ```

#### PATCH /api/walls/:wall_id

- **Description:** Update a wall.
- **Request:**
  - **Body:**
    ```json
    {
      "name": "Updated Wall",
      "location": "Gym C"
    }
    ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": 1,
      "name": "Updated Wall",
      "location": "Gym C"
    }
    ```

#### DELETE /api/walls/:wall_id

- **Description:** Delete a wall by ID.
- **Response:**
  - **Status:** 204 No Content

---

This documentation covers the basic CRUD operations for managing users, sessions, climbs, grades, and walls within the climbing application.
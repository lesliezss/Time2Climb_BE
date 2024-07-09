### GET /api/grades
- **Description**: Retrieves all grades.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/grades`
- **Example Response**:
  ```json
  [
    {
      "grade_id": 1,
      "grade_label": "5a",
      "grade_system_id": 1,
      "grade_system_label": "UIAA"
    },
    {
      "grade_id": 2,
      "grade_label": "5b",
      "grade_system_id": 1,
      "grade_system_label": "UIAA"
    }
  ]
  ```

### GET /api/grades/:grade_id
- **Description**: Retrieves a specific grade by grade ID.
- **Parameters**:
  - `grade_id` (required): The ID of the grade to retrieve.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/grades/5`
- **Example Response**:
  ```json
  {
    "grade_id": 5,
    "grade_label": "6a",
    "grade_system_id": 1,
    "grade_system_label": "UIAA"
  }
  ```

### GET /api/users
- **Description**: Retrieves all users.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/users`
- **Example Response**:
  ```json
  {
    "users": [
      {
        "id": 1,
        "first_name": "Alice",
        "last_name": "Smith",
        "age": 29,
        "level_id": 2
      },
      {
        "id": 2,
        "first_name": "Bob",
        "last_name": "Brown",
        "age": 34,
        "level_id": 3
      }
    ]
  }
  ```

### GET /api/users/:user_id
- **Description**: Retrieves a specific user by user ID.
- **Parameters**:
  - `user_id` (required): The ID of the user to retrieve.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/users/2`
- **Example Response**:
  ```json
  {
    "user": {
      "id": 2,
      "first_name": "Bob",
      "last_name": "Brown",
      "age": 34,
      "level_id": 3
    }
  }
  ```

### POST /api/users
- **Description**: Creates a new user.
- **Example Request**:
  - **Method**: POST
  - **URL**: `https://your-api-domain.com/api/users`
  - **Request Body**:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "age": 28,
      "level_id": 2
    }
    ```
- **Example Response**:
  ```json
  {
    "id": 4,
    "first_name": "John",
    "last_name": "Doe",
    "age": 28,
    "level_id": 2
  }
  ```

### PATCH /api/users/:user_id
- **Description**: Updates user details.
- **Parameters**:
  - `user_id` (required): The ID of the user to update.
- **Example Request**:
  - **Method**: PATCH
  - **URL**: `https://your-api-domain.com/api/users/1`
  - **Request Body**:
    ```json
    {
      "first_name": "Chris",
      "last_name": "Updated",
      "age": 36,
      "level_id": 3
    }
    ```
- **Example Response**:
  ```json
  {
    "id": 1,
    "first_name": "Chris",
    "last_name": "Updated",
    "age": 36,
    "level_id": 3
  }
  ```

### DELETE /api/users/:user_id
- **Description**: Deletes a user by user ID.
- **Parameters**:
  - `user_id` (required): The ID of the user to delete.
- **Example Request**:
  - **Method**: DELETE
  - **URL**: `https://your-api-domain.com/api/users/1`
- **Example Response**:
  ```json
  {}
  ```

### GET /api/walls/:wall_id
- **Description**: Retrieves a specific wall by wall ID.
- **Parameters**:
  - `wall_id` (required): The ID of the wall to retrieve.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls/3`
- **Example Response**:
  ```json
  {
    "wall": {
      "id": 3,
      "name": "The Climbing Works",
      "postcode": "S8 0UJ",
      "lat": "53.352327",
      "long": "-1.483694",
      "county": "South Yorkshire"
    }
  }
  ```

### GET /api/walls
- **Description**: Retrieves all walls.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls`
- **Example Response**:
  ```json
  {
    "walls": [
      {
        "id": 1,
        "name": "Wall One",
        "postcode": "A1 1AA",
        "lat": "52.123456",
        "long": "-0.123456",
        "county": "County One"
      },
      {
        "id": 2,
        "name": "Wall Two",
        "postcode": "B2 2BB",
        "lat": "53.654321",
        "long": "-1.654321",
        "county": "County Two"
      }
    ]
  }
  ```

### GET /api/walls/user/:user_id
- **Description**: Retrieves walls for a specified user.
- **Parameters**:
  - `user_id` (required): The ID of the user to retrieve walls for.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls/user/1`
- **Example Response**:
  ```json
  {
    "walls": [
      {
        "id": 1,
        "name": "Wall One",
        "postcode": "A1 1AA",
        "lat": "52.123456",
        "long": "-0.123456",
        "county": "County One"
      },
      {
        "id": 3,
        "name": "The Climbing Works",
        "postcode": "S8 0UJ",
        "lat": "53.352327",
        "long": "-1.483694",
        "county": "South Yorkshire"
      }
    ]
  }
  ```

  ```markdown
### GET /api/climbs/:session_id
- **Description**: Responds with an array of climbs at a particular session.
- **Parameters**:
  - `session_id` (required): The ID of the session to retrieve climbs for.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/climbs/1`
- **Example Response**:
  ```json
  {
    "climbs": [
      {
        "climb_id": 1,
        "session_id": 1,
        "grade_id": 51,
        "grade_label": "6b+",
        "grade_system_id": 3,
        "grade_system_label": "Font",
        "climb_type_id": 2,
        "climb_type_label": "Boulder (font)",
        "climb_outcome_id": 1,
        "climb_outcome_label": "Onsight (first attempt - no beta)"
      }
    ]
  }
  ```

### GET /api/climbs/users/:user_id
- **Description**: Responds with an array of climbs of a particular user.
- **Parameters**:
  - `user_id` (required): The ID of the user to retrieve climbs for.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/climbs/users/1`
- **Example Response**:
  ```json
  {
    "climbs": [
      {
        "user_id": 1,
        "climb_id": 1,
        "session_id": 1,
        "grade_id": 51,
        "grade_label": "6b+",
        "grade_system_id": 3,
        "grade_system_label": "Font",
        "climb_type_id": 2,
        "climb_type_label": "Boulder (font)",
        "climb_outcome_id": 1,
        "climb_outcome_label": "Onsight (first attempt - no beta)"
      }
    ]
  }
  ```

### POST /api/climbs
- **Description**: Adds a climb for a user, responds with the posted climb.
- **Example Request**:
  - **Method**: POST
  - **URL**: `https://your-api-domain.com/api/climbs`
  - **Request Body**:
    ```json
    {
      "session_id": 5,
      "grade_id": 15,
      "type_id": 4,
      "climb_outcome_id": 3
    }
    ```
- **Example Response**:
  ```json
  {
    "newClimb": {
      "climb_id": 14,
      "session_id": 5,
      "grade_id": 15,
      "type_id": 4,
      "climb_outcome_id": 3
    }
  }
  ```



### GET /api/walls/:wall_id
- **Description**: Retrieves a specific wall by wall ID.
- **Parameters**:
  - `wall_id` (required): The ID of the wall to retrieve.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls/3`
- **Example Response**:
  ```json
  {
    "wall": {
      "id": 3,
      "name": "The Climbing Works",
      "postcode": "S8 0UJ",
      "lat": "53.352327",
      "long": "-1.483694",
      "county": "South Yorkshire"
    }
  }
  ```

### GET /api/walls
- **Description**: Retrieves all walls.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls`
- **Example Response**:
  ```json
  {
    "walls": [
      {
        "id": 1,
        "name": "Wall One",
        "postcode": "A1 1AA",
        "lat": "52.123456",
        "long": "-0.123456",
        "county": "County One"
      },
      {
        "id": 2,
        "name": "Wall Two",
        "postcode": "B2 2BB",
        "lat": "53.654321",
        "long": "-1.654321",
        "county": "County Two"
      }
    ]
  }
  ```

### GET /api/walls/user/:user_id
- **Description**: Retrieves walls for a specified user.
- **Parameters**:
  - `user_id` (required): The ID of the user to retrieve walls for.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/walls/user/1`
- **Example Response**:

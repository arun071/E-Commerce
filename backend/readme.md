
 ## API Endpoints

- **Authentication:**

  - `POST /api/v1/auth/register` - Register a new user.
  - `POST /api/v1/auth/login` - User login.
  - `GET /api/v1/auth/logout` - User logout.

- **Users:**

  - `GET /api/v1/users` - Get all users (admin only).
  - `GET /api/v1/users/:id` - Get a single user by ID (admin only).
  - `PUT /api/v1/users/:id` - Update a user by ID (admin only).
  - `DELETE /api/v1/users/:id` - Delete a user by ID (admin only).

- **Products:**

  - `GET /api/v1/products` - Get all products.
  - `GET /api/v1/products/:id` - Get a single product by ID.
  - `POST /api/v1/products` - Create a new product (admin only).
  - `PUT /api/v1/products/:id` - Update a product by ID (admin only).
  - `DELETE /api/v1/products/:id` - Delete a product by ID (admin only).

- **Reviews:**

  - `GET /api/v1/reviews` - Get all reviews.
  - `GET /api/v1/reviews/:id` - Get a single review by ID.
  - `POST /api/v1/reviews` - Create a new review.
  - `PUT /api/v1/reviews/:id` - Update a review by ID.
  - `DELETE /api/v1/reviews/:id` - Delete a review by ID.

- **Orders:**
  - `GET /api/v1/orders` - Get all orders (admin only).
  - `GET /api/v1/orders/:id` - Get a single order by ID (admin only).
  - `POST /api/v1/orders` - Create a new order.
  - `PUT /api/v1/orders/:id` - Update an order by ID (admin only).
  - `DELETE /api/v1/orders/:id` - Delete an order by ID (admin only).

const apiConfig = {
  baseUrl: "https://e-commerce-api-84qw.onrender.com/api",
  authentication: {
    description:
      "Most endpoints require authentication. Include your API key in the request header.",
    example: "Authorization: Bearer YOUR_API_KEY",
  },
  sections: [
    {
      id: "base-url",
      title: "Base URL",
      type: "simple",
      content: "https://e-commerce-api-84qw.onrender.com/api",
      showInNav: true,
    },
    {
      id: "authentication",
      title: "Authentication",
      type: "simple",
      content: {
        description:
          "Most endpoints require authentication. Include your API key in the request header.",
        example: "Authorization: Bearer YOUR_API_KEY",
        note: "User registration and login endpoints don't require authentication.",
      },
      showInNav: true,
    },
    {
      id: "products",
      title: "Products",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "GET",
          path: "/api/products",
          requiresAuth: true,
          title: "Get All Products",
          description: "Retrieve a list of all products.",
          response: {
            success: true,
            data: [
              {
                id: "123",
                name: "Laptop",
                description: "High-performance laptop",
                price: 899.99,
                categoryId: "electronics123",
                brand: "Dell",
                stock: 20,
                ratings: 4.2,
                reviews: [],
                images: [{ url: "https://example.com/image1.jpg" }],
                createdBy: "user123",
                createdAt: "2025-01-01T12:00:00Z",
                updatedAt: "2025-01-05T09:00:00Z",
              },
            ],
          },
        },
        {
          method: "GET",
          path: "/api/products/category/:categoryId",
          requiresAuth: true,
          title: "Get Products by Category",
          description: "Retrieve all products for a specific category.",
          parameters: [
            {
              name: "categoryId",
              type: "string",
              description: "The ID of the category",
            },
          ],
          response: {
            success: true,
            data: [],
          },
        },
        {
          method: "POST",
          path: "/api/products",
          requiresAuth: true,
          title: "Create Product",
          description: "Create a new product.",
          parameters: [
            { name: "name", type: "string", description: "Product name" },
            {
              name: "description",
              type: "string",
              description: "Product description",
            },
            { name: "price", type: "number", description: "Product price" },
            { name: "categoryId", type: "string", description: "Category ID" },
            { name: "brand", type: "string", description: "Product brand" },
            { name: "stock", type: "number", description: "Product stock" },
            {
              name: "images",
              type: "array",
              description: "Array of image URLs",
            },
          ],
          response: {
            success: true,
            data: {
              id: "123",
              name: "New Product",
              description: "Created product",
              price: 100,
              categoryId: "cat001",
              brand: "Apple",
              stock: 100,
              images: [{ url: "https://example.com/img.jpg" }],
              createdBy: "userId",
            },
          },
        },
        {
          method: "PUT",
          path: "/api/products/:id",
          requiresAuth: true,
          title: "Update Product",
          description: "Update a product you created.",
          parameters: [
            { name: "id", type: "string", description: "Product ID" },
            { name: "body", type: "object", description: "Fields to update" },
          ],
          response: {
            message: "Product updated successfully",
            data: {
              id: "123",
              name: "Updated Name",
              price: 199.99,
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/products/:id",
          requiresAuth: true,
          title: "Delete Product",
          description: "Delete a product you created.",
          parameters: [
            { name: "id", type: "string", description: "Product ID" },
          ],
          response: {
            message: "Product deleted successfully",
            products: {
              id: "123",
              name: "Deleted Product",
            },
          },
        },
      ],
    },
    {
      id: "categories",
      title: "Categories",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "GET",
          path: "/api/categories",
          requiresAuth: false,
          title: "Get All Categories",
          description: "Retrieve a list of all product categories.",
          response: {
            success: true,
            data: [
              {
                id: "60f8c8b2a4d3f9b9c8d7e3e9",
                name: "Electronics",
                description: "Electronic gadgets and devices",
                parenCategory: null,
                isActive: true,
                createdAt: "2023-01-01T00:00:00.000Z",
              },
            ],
          },
        },
        {
          method: "POST",
          path: "/api/categories",
          requiresAuth: true,
          title: "Create Category",
          description: "Create a new product category.",
          requestBody: {
            name: "string (required)",
            description: "string (optional)",
            parenCategory: "ObjectId (optional)",
            isActive: "boolean (optional)",
          },
          response: {
            success: true,
            message: "Category created successfully",
            category: {
              id: "60f8c8b2a4d3f9b9c8d7e3e9",
              name: "Electronics",
              description: "Electronic gadgets and devices",
              parenCategory: null,
              isActive: true,
              createdAt: "2023-01-01T00:00:00.000Z",
            },
          },
        },
        {
          method: "PUT",
          path: "/api/categories/:id",
          requiresAuth: true,
          title: "Update Category",
          description: "Update an existing product category.",
          requestBody: {
            name: "string (optional)",
            description: "string (optional)",
            parenCategory: "ObjectId (optional)",
            isActive: "boolean (optional)",
          },
          response: {
            success: true,
            message: "Category updated successfully",
            category: {
              id: "60f8c8b2a4d3f9b9c8d7e3e9",
              name: "Updated Category",
              description: "Updated description",
              parenCategory: null,
              isActive: true,
              createdAt: "2023-01-01T00:00:00.000Z",
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/categories/:id",
          requiresAuth: true,
          title: "Delete Category",
          description: "Delete an existing product category.",
          response: {
            success: true,
            message: "Category deleted successfully",
            category: {
              id: "60f8c8b2a4d3f9b9c8d7e3e9",
              name: "Electronics",
              description: "Electronic gadgets and devices",
              parenCategory: null,
              isActive: true,
              createdAt: "2023-01-01T00:00:00.000Z",
            },
          },
        },
      ],
    },
    {
      id: "users",
      title: "Users",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "POST",
          path: "/api/users/register",
          requiresAuth: false,
          title: "Register User",
          description: "Register a new user with name, email, and password.",
          requestBody: {
            name: "string",
            email: "string",
            password: "string",
          },
          headers: {
            "x-api-secret": "your_api_secret_key",
          },
          response: {
            message: "User registered successfully",
            token: "JWT Token",
            user: {
              id: "string",
              name: "string",
              email: "string",
              role: "string",
            },
          },
        },
        {
          method: "POST",
          path: "/api/users/login",
          requiresAuth: false,
          title: "Login User",
          description: "Login with email and password and receive a token.",
          requestBody: {
            email: "string",
            password: "string",
          },
          headers: {
            "x-api-secret": "your_api_secret_key",
          },
          response: {
            message: "Login successful",
            token: "JWT Token",
            user: {
              id: "string",
              name: "string",
              email: "string",
              role: "string",
            },
          },
        },
        {
          method: "GET",
          path: "/api/users",
          requiresAuth: true,
          title: "Get All Users",
          description: "Returns all users in the system.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            users: [
              {
                id: "string",
                name: "string",
                email: "string",
                role: "string",
              },
            ],
          },
        },
        {
          method: "GET",
          path: "/api/users/profile",
          requiresAuth: true,
          title: "Get Profile",
          description: "Retrieve current logged-in user profile.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            id: "string",
            name: "string",
            email: "string",
            role: "string",
          },
        },
        {
          method: "PUT",
          path: "/api/users",
          requiresAuth: true,
          title: "Update User",
          description: "Update current user’s profile data.",
          headers: {
            Authorization: "Bearer <token>",
          },
          requestBody: {
            name: "string (optional)",
            email: "string (optional)",
            password: "string (optional)",
          },
          response: {
            message: "User updated successfully",
            data: {
              id: "string",
              name: "string",
              email: "string",
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/users",
          requiresAuth: true,
          title: "Delete User",
          description: "Delete the current authenticated user account.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            message: "User has been deleted successfully",
            data: {
              id: "string",
              name: "string",
              email: "string",
            },
          },
        },
        {
          method: "POST",
          path: "/api/users",
          requiresAuth: true,
          title: "Create or Update Cart",
          description:
            "Add product to cart or update quantity if it already exists.",
          headers: {
            Authorization: "Bearer <token>",
          },
          requestBody: {
            items: [
              {
                product: "string (product ID)",
                quantity: "number",
              },
            ],
            user: {
              id: "string (user ID)",
            },
          },
          response: {
            id: "string",
            user: "string",
            items: [
              {
                product: "string",
                quantity: "number",
              },
            ],
            createdAt: "ISODate",
            updatedAt: "ISODate",
          },
        },
      ],
    },

    {
      id: "orders",
      title: "Orders",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "POST",
          path: "/api/orders",
          requiresAuth: true,
          title: "Create Order",
          description: "Place a new order.",
          requestBody: {
            items: [
              { product: "product_id_1", quantity: 2 },
              { product: "product_id_2", quantity: 1 },
            ],
            shippingAddress: {
              address: "123 Main St",
              city: "New York",
              postalCode: "10001",
              country: "USA",
            },
            paymentMethod: "credit_card",
          },
        },
        {
          method: "GET",
          path: "/api/orders/myorders",
          requiresAuth: true,
          title: "Get User Orders",
          description: "Retrieve all orders for the authenticated user.",
        },
      ],
    },
    {
      id: "cart",
      title: "Cart",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "POST",
          path: "/api/cart",
          requiresAuth: true,
          title: "Add Item to Cart",
          description:
            "Add a product to the cart or increase quantity if it already exists.",
          headers: {
            Authorization: "Bearer <token>",
          },
          requestBody: {
            items: [
              {
                product: "string (product ID)",
                quantity: "number",
              },
            ],
          },
          response: {
            message: "Cart updated",
            cart: {
              id: "string",
              user: "string",
              items: [
                {
                  product: "string",
                  quantity: "number",
                },
              ],
              createdAt: "ISODate",
              updatedAt: "ISODate",
            },
          },
        },
        {
          method: "GET",
          path: "/api/cart",
          requiresAuth: true,
          title: "Get User's Cart",
          description: "Retrieve the authenticated user's cart.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            cart: {
              id: "string",
              user: "string",
              items: [
                {
                  product: {
                    id: "string",
                    name: "string",
                    price: "number",
                  },
                  quantity: "number",
                },
              ],
              createdAt: "ISODate",
              updatedAt: "ISODate",
            },
          },
        },
        {
          method: "PATCH",
          path: "/api/cart/items/:itemId",
          requiresAuth: true,
          title: "Update Cart Item Quantity",
          description: "Update the quantity of a specific item in the cart.",
          headers: {
            Authorization: "Bearer <token>",
          },
          requestBody: {
            quantity: "number",
          },
          response: {
            message: "Quantity updated successfully",
            cart: {
              id: "string",
              items: [
                {
                  product: "string",
                  quantity: "number",
                },
              ],
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/cart",
          requiresAuth: true,
          title: "Delete Entire Cart",
          description: "Delete the entire cart of the current user.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            message: "Cart deleted successfully",
          },
        },
        {
          method: "DELETE",
          path: "/api/cart/items/:itemId",
          requiresAuth: true,
          title: "Remove Item from Cart",
          description:
            "Remove a specific item from the authenticated user's cart.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            message: "Item removed successfully",
            cart: {
              id: "string",
              items: [
                {
                  product: "string",
                  quantity: "number",
                },
              ],
            },
          },
        },
      ],
    },

    {
      id: "reviews",
      title: "Reviews",
      type: "notice",
      showInNav: true,
      content:
        "All review endpoints require authentication. Use the <code>/api/reviews</code> route for review operations.",
    },

    {
      id: "wishlist",
      title: "Wishlist",
      type: "endpoints",
      showInNav: true,
      endpoints: [
        {
          method: "GET",
          path: "/api/wishlist",
          requiresAuth: true,
          title: "Get Wishlist",
          description:
            "Retrieve the current user's wishlist with populated product details.",
          headers: {
            Authorization: "Bearer <token>",
          },
          response: {
            message: "Wishlist fetched successfully",
            wishlist: {
              id: "string",
              user: "string",
              products: [
                {
                  id: "string",
                  name: "string",
                  price: "number",
                  description: "string",
                },
              ],
            },
          },
        },
        {
          method: "POST",
          path: "/api/wishlist",
          requiresAuth: true,
          title: "Add to Wishlist",
          description: "Add a product to the authenticated user's wishlist.",
          headers: {
            Authorization: "Bearer <token>",
          },
          requestBody: {
            productId: "string (Product ID)",
          },
          response: {
            message: "Product added to wishlist",
            wishlist: {
              id: "string",
              products: ["string (Product ID)"],
            },
          },
        },
        {
          method: "DELETE",
          path: "/api/wishlist/:productId",
          requiresAuth: true,
          title: "Remove from Wishlist",
          description:
            "Remove a specific product from the authenticated user's wishlist.",
          headers: {
            Authorization: "Bearer <token>",
          },
          pathParams: {
            productId: "string (Product ID to remove)",
          },
          response: {
            message: "Product removed from wishlist",
            wishlist: {
              id: "string",
              products: ["string (Remaining Product IDs)"],
            },
          },
        },
      ],
    },
    {
      id: "errors",
      title: "Error Responses",
      type: "errors",
      showInNav: true,
      errors: [
        {
          code: "400",
          title: "Bad Request",
          example: {
            success: false,
            error: "Validation Error",
            message: "Name is required",
          },
        },
      ],
    },
  ],
};

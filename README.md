# Distributed E-Commerce Platform

A production-ready, modular microservices-based e-commerce platform built with Node.js, Express, MongoDB, and Socket.IO.

## Project Overview

This is a comprehensive e-commerce system structured as independent microservices that can be deployed and scaled individually. The platform includes real-time features, JWT authentication, role-based access control, and comprehensive analytics.

## Architecture

- **User Service**: Authentication and user management (Port 3001)
- **Product Service**: Product catalog and inventory management (Port 3002)
- **Cart Service**: Real-time shopping cart with Socket.IO (Port 3003)
- **Order Service**: Order processing and lifecycle management (Port 3004)
- **Analytics Service**: Business intelligence and reporting (Port 3005)
- **API Gateway**: NGINX reverse proxy for routing (Port 80/443)
- **MongoDB**: Primary database for all services
- **Redis**: Caching and real-time features

## Installation & Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Quick Start with Docker

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd ecommerce-platform

# Start all services
npm run dev

# View logs
npm run dev:logs

# Shutdown services
npm run dev:down
\`\`\`

## Environment Variables

Each service requires the following environment variables (see docker-compose.yml):

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_REFRESH_SECRET`: Secret for refresh tokens (User Service only)
- `REDIS_URL`: Redis connection string (Cart Service only)
- `PORT`: Service port number

## API Endpoints

### User Service (Port 3001)
\`\`\`
POST   /auth/register        - Register new user
POST   /auth/login           - Login user
POST   /auth/refresh         - Refresh access token
GET    /users/:id            - Get user profile
PATCH  /users/:id            - Update user profile
\`\`\`

### Product Service (Port 3002)
\`\`\`
GET    /products             - List all products with filters
GET    /products/:id         - Get product details
POST   /products             - Create product (admin)
PUT    /products/:id         - Update product (admin)
DELETE /products/:id         - Delete product (admin)
\`\`\`

### Cart Service (Port 3003)
\`\`\`
GET    /cart                 - Get current user's cart
POST   /cart/items           - Add item to cart
PATCH  /cart/items/:itemId   - Update cart item
DELETE /cart/items/:itemId   - Remove item from cart
\`\`\`

### Order Service (Port 3004)
\`\`\`
POST   /orders/checkout      - Create new order
GET    /orders               - Get user's orders
GET    /orders/:id           - Get order details
PUT    /orders/:id/status    - Update order status (admin)
\`\`\`

### Analytics Service (Port 3005)
\`\`\`
GET    /admin/analytics/sales    - Daily sales report
GET    /admin/analytics/products - Top products
GET    /admin/analytics/metrics  - System metrics
\`\`\`

## Real-Time Events (Socket.IO)

- `cart:update` - Cart item updated
- `cart:sync` - Cart synchronized across clients
- `order:statusChanged` - Order status changed
- `admin:statsUpdate` - Analytics updated

## Docker Services

- **MongoDB**: mongodb:6.0 (Port 27017)
- **Redis**: redis:7-alpine (Port 6379)
- **NGINX**: nginx:latest (Port 80/443)

## Database Schema

### Users Collection
- `_id`: ObjectId
- `name`: String
- `email`: String (unique)
- `passwordHash`: String
- `role`: String (user/admin)
- `createdAt`: Date

### Products Collection
- `_id`: ObjectId
- `title`: String
- `description`: String
- `price`: Number
- `images`: Array
- `inventoryCount`: Number
- `category`: String
- `createdAt`: Date

### Orders Collection
- `_id`: ObjectId
- `userId`: ObjectId
- `items`: Array (productId, qty, price)
- `totalAmount`: Number
- `status`: String (created/processing/shipped/delivered)
- `createdAt`: Date

### Carts Collection
- `_id`: ObjectId
- `userId`: ObjectId
- `items`: Array (productId, qty)
- `updatedAt`: Date

## Security Features

- JWT authentication with short-lived access tokens
- Refresh token rotation
- Role-based access control (RBAC)
- bcrypt password hashing
- Input validation with Joi
- Rate limiting
- CORS restrictions
- SQL injection prevention

## Deployment

### Local Development
\`\`\`bash
npm run dev
\`\`\`

### Production
1. Replace JWT secrets in environment variables
2. Configure MongoDB Atlas or managed database
3. Setup Redis cluster or managed service
4. Configure HTTPS certificates
5. Deploy to Docker orchestration platform (Kubernetes, Swarm, etc.)

## Project Structure

\`\`\`
root/
├── services/
│   ├── user-service/
│   ├── product-service/
│   ├── cart-service/
│   ├── order-service/
│   └── analytics-service/
├── gateway/
│   └── nginx.conf
├── docker-compose.yml
├── package.json
└── README.md
\`\`\`

## License

MIT

# ShopHub — Full-Stack E-Commerce Platform

[![Repo](https://img.shields.io/badge/GitHub-furqan137%2Fecomplat-0C3B40)](https://github.com/furqan137/ecomplat)

**ShopHub** is a full-stack, microservices-based e-commerce platform for curated electronics and desk accessories. It pairs a branded Next.js storefront with independently deployable Node.js services, MongoDB, Redis, Socket.IO, and an NGINX API gateway.

---

## Overview

ShopHub lets users browse products, manage a real-time cart, authenticate securely, place orders, and (for admins) view analytics. The frontend delivers a professional landing experience and a creative shop; the backend is split into focused microservices that can scale independently.

---

## Features

- Professional landing page and creative shop UI
- Product catalog with search, filter, and sort
- Shared cart with slide-in bag drawer
- JWT authentication with refresh tokens
- Role-based access control (user / admin)
- Real-time cart sync via Socket.IO
- Order checkout and lifecycle management
- Admin analytics (sales, top products, metrics)
- Docker Compose orchestration for local and deployable environments

---

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Auth** | JWT, bcrypt, Joi validation |
| **Realtime** | Socket.IO, Redis |
| **Database** | MongoDB |
| **Gateway** | NGINX |
| **Infra** | Docker, Docker Compose |

---

## Architecture

```
┌─────────────────┐
│  Next.js UI     │  Landing + Shop (port 3000)
└────────┬────────┘
         │
┌────────▼────────┐
│  NGINX Gateway  │  Ports 80 / 443
└────────┬────────┘
         │
   ┌─────┴──────────────────────────────────┐
   │                                        │
   ▼          ▼          ▼          ▼       ▼
 User      Product     Cart      Order   Analytics
 :3001      :3002      :3003      :3004    :3005
   │          │          │          │        │
   └──────────┴──── MongoDB ───────┴────────┘
                     Redis (cart / realtime)
```

| Service | Port | Responsibility |
|---------|------|----------------|
| **User Service** | 3001 | Register, login, JWT refresh, profiles, RBAC |
| **Product Service** | 3002 | Catalog, inventory, admin CRUD |
| **Cart Service** | 3003 | Cart CRUD + Socket.IO real-time sync |
| **Order Service** | 3004 | Checkout, order history, status updates |
| **Analytics Service** | 3005 | Sales reports, top products, system metrics |
| **API Gateway (NGINX)** | 80/443 | Routing, reverse proxy, SSL-ready |

---

## Frontend

- **`/`** — Full-bleed branded landing (ShopHub hero, craft story, featured collection)
- **`/shop`** — Product grid with search, category filters, sorting, and cart drawer
- Design system: Syne + Figtree, teal/aqua palette, purposeful motion
- Shared cart state across pages via React context

### Frontend scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

---

## API Endpoints

### User Service (3001)

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
GET    /users/:id
PATCH  /users/:id
```

### Product Service (3002)

```
GET    /products
GET    /products/:id
POST   /products          # admin
PUT    /products/:id      # admin
DELETE /products/:id      # admin
```

### Cart Service (3003)

```
GET    /cart
POST   /cart/items
PATCH  /cart/items/:itemId
DELETE /cart/items/:itemId
```

### Order Service (3004)

```
POST   /orders/checkout
GET    /orders
GET    /orders/:id
PUT    /orders/:id/status # admin
```

### Analytics Service (3005)

```
GET    /admin/analytics/sales
GET    /admin/analytics/products
GET    /admin/analytics/metrics
```

---

## Real-Time Events (Socket.IO)

- `cart:update` — Cart item updated
- `cart:sync` — Cart synchronized across clients
- `order:statusChanged` — Order status changed
- `admin:statsUpdate` — Analytics updated

---

## Environment Variables

Configured in `docker-compose.yml` (and per-service env as needed):

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_REFRESH_SECRET` | Refresh token secret (User Service) |
| `REDIS_URL` | Redis URL (Cart Service) |
| `PORT` | Service port |

---

## Database Schema

**Users** — `name`, `email` (unique), `passwordHash`, `role` (`user` / `admin`), `createdAt`  
**Products** — `title`, `description`, `price`, `images[]`, `inventoryCount`, `category`, `createdAt`  
**Carts** — `userId`, `items[{ productId, qty }]`, `updatedAt`  
**Orders** — `userId`, `items[{ productId, qty, price }]`, `totalAmount`, `status`, `createdAt`

Order status: `created` → `processing` → `shipped` → `delivered`

---

## Security

- JWT access tokens + refresh token rotation
- Role-based access control (RBAC)
- bcrypt password hashing
- Input validation with Joi
- Rate limiting and CORS restrictions

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for full backend stack)
- Git

### Clone

```bash
git clone https://github.com/furqan137/ecomplat.git
cd ecomplat
```

### Frontend only

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Full stack with Docker

```bash
docker compose up --build
```

Services start on ports `3001`–`3005`, MongoDB `27017`, Redis `6379`, gateway `80`.

---

## Project Structure

```
ecomplat/
├── app/                    # Next.js App Router (landing + shop)
├── components/             # UI, cart provider, header, drawer
├── lib/                    # Shared utilities & product data
├── public/                 # Static assets
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
```

---

## Deployment Notes

1. Replace JWT secrets in production environment variables
2. Use MongoDB Atlas (or another managed MongoDB)
3. Use a managed Redis instance for cart/realtime
4. Configure HTTPS certificates on the NGINX gateway
5. Deploy services via Docker / Kubernetes / Swarm as needed

---

## License

MIT

---

**Repo:** [github.com/furqan137/ecomplat](https://github.com/furqan137/ecomplat)

# FlyRank – Multi-Platform Social Campaign Publisher

A production-ready backend platform that automates publishing marketing campaigns across multiple social media platforms. The application supports campaign management, AI-generated captions, image processing, scheduled publishing, webhook verification, retry mechanisms, and API usage tracking.

---

# Features

- Campaign CRUD Operations
- Image Upload & Processing
- Platform-specific Image Variants
- AI Caption Generation using Google Gemini
- Fake Instagram Publisher
- Fake X Publisher
- Scheduled Publishing with BullMQ
- Redis Queue Processing
- Automatic Retry Mechanism
- Webhook Signature Verification
- Duplicate Webhook Protection
- Idempotent Publishing
- API Usage & Cost Tracking
- Production Logging
- Health Check API

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- Prisma ORM

## Queue

- Redis
- BullMQ

## AI

- Google Gemini API

## Image Processing

- Sharp
- Multer

## Logging

- Winston
- Morgan

---

# Project Structure

```
src
│
├── adapters
│   ├── fakeInstagramPublisher.js
│   ├── fakeXPublisher.js
│   └── socialPublisher.js
│
├── config
│   ├── database.js
│   ├── gemini.js
│   ├── logger.js
│   └── redis.js
│
├── controllers
│
├── jobs
│
├── middleware
│
├── routes
│
├── services
│
├── utils
│
├── workers
│
├── app.js
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside the project

```bash
cd flyrank-capstone-social-publisher
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5433/social_publisher?schema=public

JWT_SECRET=your_jwt_secret

REDIS_URL=redis://localhost:6379

GEMINI_API_KEY=your_gemini_api_key
```

---

# Running the Application

Start PostgreSQL

```bash
docker start social-postgres
```

Start Redis

```bash
docker start redis
```

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start the server

```bash
npm run dev
```

---

# API Endpoints

## Campaigns

| Method | Endpoint |
|---------|----------|
| POST | `/api/campaigns` |
| GET | `/api/campaigns` |
| GET | `/api/campaigns/:id` |
| PUT | `/api/campaigns/:id` |
| DELETE | `/api/campaigns/:id` |
| POST | `/api/campaigns/:id/schedule` |

---

## Images

| Method | Endpoint |
|---------|----------|
| POST | `/api/images/upload` |

---

## AI Captions

| Method | Endpoint |
|---------|----------|
| POST | `/api/captions/generate` |

---

## Publishing

| Method | Endpoint |
|---------|----------|
| POST | `/api/publish/:id` |

---

## Webhooks

| Method | Endpoint |
|---------|----------|
| POST | `/api/webhooks` |

---

## Cost Tracking

| Method | Endpoint |
|---------|----------|
| GET | `/api/costs` |

---

## Health Check

| Method | Endpoint |
|---------|----------|
| GET | `/health` |

---

# Workflow

```
Create Campaign
       │
       ▼
Upload Image
       │
       ▼
Generate AI Captions
       │
       ▼
Schedule Campaign
       │
       ▼
BullMQ Queue
       │
       ▼
Worker
       │
       ▼
Fake Instagram Publisher
       │
       ▼
Fake X Publisher
       │
       ▼
Webhook Verification
       │
       ▼
Campaign Updated
```

---

# Implemented Features

- Campaign CRUD
- Image Processing
- AI Caption Generation
- Queue-based Publishing
- Retry Mechanism
- Redis Integration
- BullMQ Worker
- Scheduled Publishing
- Webhook Verification
- Duplicate Webhook Detection
- Idempotent Publishing
- API Usage Tracking
- Cost Tracking
- Health Monitoring
- Production Logging

---

# Production Features

- Helmet Security
- Compression
- Winston Logging
- Morgan Request Logging
- Graceful Shutdown
- Global Error Handler
- Health Check Endpoint

---

# Testing

The project was tested using:

- Postman
- Prisma Studio
- PostgreSQL
- Redis
- BullMQ Worker
- Google Gemini API

---

# Future Improvements

- Real Instagram Graph API
- Real X API
- User Authentication
- Dashboard
- Analytics
- Email Notifications
- Docker Compose Deployment

---

# Author

**Chinmayee B L**

Backend AI Engineering Capstone Project
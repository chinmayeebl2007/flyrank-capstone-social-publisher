# DESIGN

# FlyRank – Multi-Platform Social Campaign Publisher

---

# Overview

The system is designed as a modular backend that automates the lifecycle of a social media campaign, from campaign creation to scheduled publishing. It follows a layered architecture that separates routing, business logic, data access, and external integrations, making the application easier to maintain, test, and extend.

---

# System Architecture

```
                Client
                   │
                   ▼
            Express Routes
                   │
                   ▼
             Controllers
                   │
                   ▼
              Services
         ┌────────┼────────┐
         │        │        │
         ▼        ▼        ▼
     Prisma    Gemini   BullMQ
         │                 │
         ▼                 ▼
   PostgreSQL          Redis Queue
         │                 │
         └────────┬────────┘
                  ▼
          Publisher Worker
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Fake Instagram       Fake X Publisher
```

---

# Project Structure

```
src/

├── adapters/
├── config/
├── controllers/
├── jobs/
├── middleware/
├── routes/
├── services/
├── utils/
├── workers/
├── app.js
└── server.js
```

---

# Design Decisions

## Layered Architecture

Responsibilities are divided into:

- Routes
- Controllers
- Services
- Database
- External integrations

This improves readability and maintainability.

---

## Prisma ORM

Prisma was selected because it provides:

- Type-safe database operations
- Schema migrations
- Simplified PostgreSQL integration
- Easy model management

---

## PostgreSQL

PostgreSQL is used for persistent storage because it provides:

- ACID transactions
- Strong relational support
- Reliability for production systems

---

## BullMQ + Redis

Publishing jobs are processed asynchronously.

Reasons:

- Prevent blocking API requests
- Handle delayed publishing
- Automatic retry support
- Better scalability

---

## Adapter Pattern

Publishing platforms are abstracted using adapters.

```
SocialPublisher
      │
      ├──────────────┐
      ▼              ▼
Instagram       X Publisher
```

Benefits:

- Loose coupling
- Easy to add new platforms
- Platform-specific implementations remain isolated

---

## Service Layer

Business logic is placed inside services.

Controllers only:

- Validate requests
- Call services
- Return responses

---

## Queue Processing

Scheduling flow:

```
Campaign Scheduled
        │
        ▼
BullMQ Queue
        │
        ▼
Redis
        │
        ▼
Worker
        │
        ▼
Publish Service
        │
        ▼
Platform Publisher
```

---

# Database Design

Main entities:

## Campaign

Stores:

- title
- body
- url
- status
- scheduledAt

---

## WebhookEvent

Stores:

- eventId
- campaignId
- platform
- payload
- signature
- processed

---

# AI Integration

Google Gemini is used for generating:

- Instagram captions
- X captions
- LinkedIn captions

The prompt instructs Gemini to return structured JSON, which is parsed before being returned to the client.

---

# Image Processing

Sharp generates platform-specific image variants.

Examples:

- Instagram (1080 × 1080)
- X (1600 × 900)

---

# Retry Strategy

BullMQ handles failures using:

- 3 retry attempts
- Exponential backoff
- Failed job logging

This improves reliability when temporary errors occur.

---

# Webhook Security

Incoming webhooks are protected using:

- HMAC SHA256 signature verification
- Secret key validation
- Duplicate event detection

Only valid requests update campaign status.

---

# Idempotency

Duplicate processing is prevented by:

- Checking existing webhook event IDs
- Ignoring already published campaigns

This ensures consistent behavior even if requests are retried.

---

# Logging

Winston provides:

- Console logging
- File logging
- Error logging
- Request tracking

This simplifies debugging and monitoring.

---

# Health Monitoring

A dedicated endpoint provides:

- Application status
- Server uptime
- Environment information
- Current timestamp

---

# Scalability

The architecture supports future enhancements such as:

- Real Instagram API integration
- Real X API integration
- Additional social platforms
- User authentication
- Analytics dashboard
- Notification services

---

# Conclusion

The project follows a modular and production-oriented architecture using asynchronous processing, queue-based scheduling, AI integration, secure webhook handling, and reliable publishing workflows. The design emphasizes maintainability, scalability, and clear separation of responsibilities.
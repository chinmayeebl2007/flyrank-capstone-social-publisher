# BUILDLOG

## Project

FlyRank – Multi-Platform Social Campaign Publisher

---

# Objective

Build a production-ready backend capable of:

- Managing social media campaigns
- Processing uploaded images
- Generating AI captions
- Scheduling posts
- Publishing through adapter pattern
- Handling webhooks
- Supporting retries
- Tracking API costs

---

# Development Log

## Step 1

Project initialization

Completed

- Node.js project created
- Express configured
- Folder structure created

---

## Step 2

Database setup

Completed

- PostgreSQL configured
- Prisma installed
- Prisma schema created
- Initial migration completed

---

## Step 3

Campaign module

Completed

Implemented

- Create Campaign
- Get Campaign
- Update Campaign
- Delete Campaign
- List Campaigns

---

## Step 4

Image processing

Completed

Implemented

- Multer upload
- Sharp image processing
- Platform image variants

Supported

- Instagram
- X

---

## Step 5

AI Caption Generation

Completed

Implemented

- Google Gemini integration
- Instagram captions
- X captions
- LinkedIn captions

---

## Step 6

Social Publisher Adapter

Completed

Implemented

- Abstract publisher interface
- Fake Instagram Publisher
- Fake X Publisher

---

## Step 7

Queue System

Completed

Implemented

- Redis
- BullMQ
- Delayed publishing
- Queue worker

---

## Step 8

Retry Logic

Completed

Implemented

- Automatic retries
- Exponential backoff
- Failed job handling

---

## Step 9

Webhook Verification

Completed

Implemented

- HMAC SHA256 signature verification
- Campaign status updates

---

## Step 10

Idempotency

Completed

Implemented

- Duplicate webhook detection
- Duplicate publish prevention

---

## Step 11

Monitoring

Completed

Implemented

- Winston logging
- Health endpoint
- Cost tracking
- Request logging

---

# Challenges Faced

## PostgreSQL Authentication

Issue

Prisma authentication failed.

Resolution

Created a dedicated PostgreSQL container and updated the database connection configuration.

---

## Prisma Version Compatibility

Issue

Prisma v7 introduced schema validation changes.

Resolution

Downgraded to Prisma v6.16.3 for compatibility with the existing project.

---

## BullMQ Scheduling

Issue

Scheduled jobs were not executing due to UTC time handling.

Resolution

Corrected scheduling and verified worker execution with Redis and BullMQ.

---

## Google Gemini Integration

Issue

Invalid API key caused authentication failures.

Resolution

Generated a valid Gemini API key and configured it through environment variables.

---

# Features Delivered

- Campaign CRUD
- Image Upload
- Image Variants
- AI Captions
- Queue Processing
- Retry Mechanism
- Fake Publishers
- Webhook Verification
- Duplicate Protection
- Cost Tracking
- Logging
- Health Check

---

# Outcome

Successfully built a production-style backend demonstrating asynchronous processing, AI integration, queue management, webhook handling, and backend architecture suitable for scalable social media publishing.
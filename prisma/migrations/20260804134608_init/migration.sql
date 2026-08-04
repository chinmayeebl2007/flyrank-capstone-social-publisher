-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('INSTAGRAM', 'X');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('QUEUED', 'PUBLISHING', 'PUBLISHED', 'FAILED');

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_posts" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "caption" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'QUEUED',
    "platformPostId" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_tokens" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "accessTokenEncrypted" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_events" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "signature" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "campaign_posts_idempotencyKey_key" ON "campaign_posts"("idempotencyKey");

-- CreateIndex
CREATE INDEX "campaign_posts_campaignId_idx" ON "campaign_posts"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_posts_campaignId_platform_key" ON "campaign_posts"("campaignId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "platform_tokens_platform_key" ON "platform_tokens"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_eventId_key" ON "webhook_events"("eventId");

-- CreateIndex
CREATE INDEX "webhook_events_campaignId_idx" ON "webhook_events"("campaignId");

-- AddForeignKey
ALTER TABLE "campaign_posts" ADD CONSTRAINT "campaign_posts_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

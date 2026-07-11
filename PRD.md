# 📄 Product Requirements Document (PRD)

**Project Name:** EFT Course - High-Converting Landing Page & Payment Gateway
**Platform:** Web (Responsive, Mobile-First)
**Architecture:** Single Page Application (SPA) feel with Server-Side Actions

## 1. Project Overview
EFT Course requires a high-performance landing page designed for extreme conversion rates. The primary goal is to sell a highly affordable English mentoring package (Rp 50.000/month for 3x sessions/week). The funnel strictly follows a "Guest Checkout" flow: No user registration required. The user selects a schedule, pays via a Midtrans Snap pop-up, and is immediately redirected to a WhatsApp Group upon success.

## 2. Tech Stack & Environment
- **Framework:** Next.js (App Router) using `src/` directory.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Animations:** Framer Motion (Scroll-triggered & micro-interactions).
- **Database:** PostgreSQL.
- **ORM:** Prisma (`prisma` & `@prisma/client`).
- **Payment Gateway:** Midtrans (`midtrans-client` / Snap API).
- **Compiler constraint:** STRICTLY DO NOT use React Compiler (React Forget). Keep standard Next.js compilation.

## 3. Brand Identity & Design System
- **Primary Color:** Deep Purple (e.g., Tailwind `slate-900` or `indigo-950`).
- **Accent/Action Color:** Vibrant Pink (e.g., Tailwind `pink-500` to `pink-600`) - Strictly for CTAs, Promos, and active states.
- **Background Color:** White to very soft purple/gray tint (`slate-50`).
- **Typography:** Modern Sans-Serif (Inter or Montserrat).
- **Vibe:** Persuasive, animative, modern, floating UI elements, organic shapes.

## 4. User Journey & Core Flow
1. **Landing:** User scrolls through persuasive copy and team introduction.
2. **Checkout Section (Multi-step UI, no page reload):**
   - *Step 1:* Select Category (Kids | Teen | Adult).
   - *Step 2:* Select Schedule Block (Senin-Selasa-Rabu OR Kamis-Jumat-Sabtu).
   - *Step 3:* Select Time (based on block selected).
   - *Step 4:* Input Details (Full Name & WhatsApp Number).
3. **Payment Initiation:** User clicks "Bayar Rp 50.000". Next.js Server Action saves data to PostgreSQL as `PENDING` and requests a Midtrans Snap Token.
4. **Payment Execution:** Midtrans Snap pop-up appears seamlessly over the UI.
5. **Post-Payment:** Upon success, auto-redirect the user to a predefined WhatsApp Group Invite Link. 

## 5. Information Architecture (Page Sections)
- **Hero:** Floating promo badge (Rp 50.000/Bulan), headline, sub-headline, and primary CTA.
- **Pain Points:** Split-layout validating user struggles (blank, grammar fear, interview insecurity).
- **The Transformation:** 3 floating cards highlighting outcomes for Kids, Teen, and Adult.
- **Meet The Experts:** Cards for Sayusni Tri Irawan (Founder/Mentor), Erray Eryandi (Founder/Mentor), and Ahmad Faisal Qodri (Digital Strategist) with "Live Interactive" badges.
- **How It Works:** 3-step visual guide (Isi Data -> Bayar Instan -> Grup WA).
- **Checkout / Booking Form:** The interactive transaction component.
- **FAQ:** Accordion component resolving doubts about price, schedule, and categories.
- **Footer:** Logo, Copyright, and Social Links.

## 6. Database Schema (Prisma)
The agent must generate a `schema.prisma` file containing at least this model to handle the transactions:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Order {
  id               String   @id @default(cuid())
  orderId          String   @unique // Generated for Midtrans (e.g., EFT-123456)
  fullName         String
  whatsappNumber   String
  category         String   // "Kids", "Teen", or "Adult"
  scheduleBlock    String   // e.g., "Senin-Selasa-Rabu"
  scheduleTime     String   // e.g., "08.00-09.00"
  amount           Int      @default(50000)
  status           String   @default("PENDING") // PENDING, SUCCESS, FAILED
  snapToken        String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
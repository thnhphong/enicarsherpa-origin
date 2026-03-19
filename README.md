# Enicar Chronicle Presentation Website

Interactive storytelling website built with **React + Vite** to present the history and products of the Enicar watch brand.

This project initially **clones the structure and interaction style** of the Omega Chronicle website(https://www.omegawatches.com/chronicle/), then replaces content with Enicar-specific materials (images, history timeline, products).

Goal: Create a **designer-friendly presentation website -> clone https://www.omegawatches.com/chronicle/** with animations, timeline storytelling, and responsive UI.

---

## Tech Stack

Frontend
- React
- Vite
- TypeScript
- TailwindCSS

Animation
- Framer Motion
- GSAP (optional for timeline)
- ScrollTrigger

Assets
- Local images / video
- Designer-provided assets

Tools
- Antigravity
- Claude (UIUX Promax skill)

---

# Project Structure
src/
components/
HeroSection/
Timeline/
ProductShowcase/
Gallery/
Contact/
ui/

pages/
Home
Timeline
Products
ProviderLink
Contact

data/
timelineData.ts
productsData.ts

assets/
images/
videos/

styles/



---

# Development Setup

## Install


Open:

http://localhost:5173
Design Strategy

The site is divided into 5 main sections:

Introduction

Timeline Story

Product Showcase

Provider Link Page

Contact Page

Focus: scroll storytelling + animation

Key UI Features

Scroll-driven storytelling

Timeline animation

Fade / pop animations

Video playback

Responsive design

Designer-friendly content replacement

Content Replacement Workflow

Designer will provide:

Images

Text

Product highlights

Timeline events

Video

These assets go into:

src/assets/
src/data/
Timeline Implementation

The timeline uses:

vertical scroll
→ event reveal
→ image transitions
→ animated progress indicator

Recommended libraries:

framer-motion

GSAP ScrollTrigger
<div align="center">
  <br />
  <img src="public/lodexi-logo.svg" width="300" alt="LODEXI Logo" />
  <h1>LODEXI Portal</h1>
  <p>
    <strong>The Centralized AI Gateway & Dashboard for the LODEXI Ecosystem</strong>
  </p>
</div>

<br />

## Overview

**LODEXI Portal** is a modern, high-performance web application built to serve as the front-facing dashboard and management portal for the LODEXI Core Engine. It allows users and organizations to manage their AI knowledge bases, monitor API usage, and interact seamlessly with the underlying RAG (Retrieval-Augmented Generation) engine.

Built with an elegant stack: **Laravel 13**, **React**, **Inertia.js**, and **Tailwind CSS**.

---

## Key Features

- **Multi-Tenant Authentication**: Built-in secure authentication system powered by Laravel Breeze.
- **Modern Aesthetics**: A beautifully crafted UI using LODEXI's signature Coral palette and glassmorphism components.
- **AI Knowledge Management**: Upload, manage, and monitor your organizational documents directly from the portal.
- **Seamless Core Integration**: Connects effortlessly to the `lodexi-core` Python engine via optimized REST services (`LodexService.php`).
- **Real-time API Metrics**: Generate and manage `X-API-Key` tokens for your downstream applications.

---

## Tech Stack

- **Backend**: Laravel 13 (PHP 8.2+)
- **Frontend**: React 18
- **Routing**: Inertia.js (SPA experience without building an API)
- **Styling**: Tailwind CSS v3
- **Build Tool**: Vite

---

## Quickstart Guide

### 1. Requirements
- PHP 8.2 or higher
- Composer
- Node.js & npm
- SQLite / MySQL / PostgreSQL

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/lodexi/portal.git lodexi-portal
cd lodexi-portal

# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate
```

Configure your `.env` file to connect to the `lodexi-core` engine:
```env
LODEXI_CORE_URL=http://localhost:8000
```

### 4. Run Development Servers

You will need two terminals to run the frontend and backend simultaneously:

**Terminal 1 (Laravel Backend):**
```bash
php artisan serve --port=8080
```

**Terminal 2 (Vite Frontend):**
```bash
npm run dev
```

Visit **http://localhost:8080** in your browser.

---

## License

Copyright © 2026 LODEXI. All rights reserved.

This software is proprietary. You may not use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software without explicit written permission.

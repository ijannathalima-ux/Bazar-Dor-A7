# 🛒 Bazar Dor — বাজার দর

Bazar Dor is a Bengali market price tracking web application built with Next.js. It helps users explore daily product prices, compare market prices, track price changes, and find updated market information through a simple and responsive interface.

## ✨ Features

- View daily prices of different products.
- Explore products with increasing and decreasing prices.
- Browse products by category.
- Sort products by price and name.
- View detailed product information.
- Compare minimum, average, and maximum market prices.
- Track product price changes and percentages.
- View scrolling market price updates.
- Sign up and sign in using email and password.
- Sign in with Google and GitHub.
- Access protected product details after authentication.
- Update profile information and sign out.
- Receive notifications through toast messages.
- Responsive design for mobile, tablet, and desktop.
- Custom loading and 404 pages.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- HeroUI
- DaisyUI
- React Icons
- React Toastify
- react-marquee-text
- REST API

## 🌐 API

Bazar Dor uses the following API to retrieve product and market price information.

**Base URL:**

`https://openapi.programming-hero.com/api/bazardor`

**Products Endpoint:**

`/products`

**Categories Endpoint:**

`/categories`


## 🔐 Authentication

The application uses Better Auth and MongoDB for authentication and user management.

- Email and password authentication.
- Google and GitHub sign-in options.
- User session management.
- Protected product detail pages.
- Profile information updates.
- Sign-out functionality.

## 📁 Project Structure

```text
bazar-dor-a7/
├── app/
│   ├── category/
│   ├── product-details/
│   ├── sign-in/
│   ├── sign-up/
│   ├── profile/
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── layout.tsx
├── components/
├── lib/
├── public/
└── proxy.ts
```

## 🎯 Project Goal

The goal of Bazar Dor is to make daily market price information easier to access. Users can explore products, compare prices across markets, and understand price changes through a Bengali-language interface.

## 👩‍💻 Developer

**Israt Jannat Halima**

Frontend Developer | Aspiring Full-Stack Developer

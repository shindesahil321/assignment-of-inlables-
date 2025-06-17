# 📝 Notes App (Svelte + TypeScript + Vite)

A simple yet powerful note-taking app built using **Svelte**, **TypeScript**, and **Vite**, styled with **Tailwind CSS** and integrated with a **MockAPI** backend.

---

## 🚀 Tech Stack

- **Svelte** – Lightweight reactive UI framework
- **TypeScript** – Strongly typed JavaScript
- **Vite** – Lightning-fast frontend tooling
- **Tailwind CSS** – Utility-first CSS framework
- **MockAPI** – Simulated backend for CRUD operations

---

## 📦 Features

- Create, edit, delete, and search notes
- Modal-based form handling
- Beautiful UI with empty state and loading indicators
- **Dark Mode support**
- Uses a mock REST API for storing data

---

## 🛠️ Getting Started

### 📁 Project Setup




⚖️ Trade-offs or Assumptions Made
🔧 Mock API Used Instead of Real Backend
I used MockAPI to simulate backend functionality for quicker development and easier testing. This avoids setting up a real database or authentication, but limits real-time features and security.

⚡ Tailwind Utility Classes over Component Libraries
To keep the bundle size light and gain more control over styling, I opted for Tailwind CSS instead of UI libraries like Bootstrap or Material UI.

💡 Dark Mode via Class Strategy Only
I assumed users would manually toggle their OS/browser theme, or we could later integrate a switch. There's no localStorage persistence or UI toggle yet.

🔍 No Routing or Auth
The app is kept single-page and simple. Authentication, protected routes, or multiple views were avoided to focus on core CRUD functionality and clean UI.

⏱️ Limited Form Validation
Basic validation is used (e.g., required fields). Full error handling, edge case coverage, and UX polish are reserved for future improvements.

⏳ What I'd Do With More Time
🔐 Add User Authentication using Firebase/Auth0 so users can have personal note collections

🌙 Implement Theme Toggle with Persistence using localStorage to remember dark/light mode preference

🗂️ Add Categories or Tags to organize notes better

🔎 Improve Search Functionality with fuzzy search or filter by tags

🧪 Write Unit & Integration Tests using Vitest or Playwright

📱 Make the UI more Mobile-Optimized with gestures and responsive transitions

⏫ Add Pagination or Infinite Scrolling for better performance with many notes

⬆️ Integrate with a real backend like Firebase, Supabase, or a Node.js/Express API



1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME

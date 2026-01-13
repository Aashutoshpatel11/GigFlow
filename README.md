# GigFlow Platform

**GigFlow** is a mini-freelance marketplace platform where Clients can post jobs (Gigs) and Freelancers can apply for them (Bids). This project demonstrates complex database relationships, secure authentication, state management, transactional integrity, and real-time updates.

## 🎥 [Website Demo](https://gig-flow-llhb.onrender.com/)
## 🎥 [Video Demo](https://drive.google.com/file/d/1PE5aGLqT5QtY9NYfH2H1kczia0FZ9RUf/view?usp=sharing)

## 📋 Project Overview

This full-stack application was built as part of a Full Stack Development Internship Assignment. It includes:
* **User Roles:** Fluid roles where any user can act as a Client (post jobs) or a Freelancer (bid on jobs).
* **Gig Management:** CRUD operations for Gigs with search and filter capabilities.
* **Bidding System:** Freelancers can submit proposals for specific gigs.
* **Hiring Logic:** Clients can review bids and hire freelancers.
* **Real-Time Features:** Instant notifications and status updates using Socket.io.
* **Data Integrity:** Robust handling of race conditions using MongoDB transactions.

## 🛠️ Technical Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Redux Toolkit.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (via Mongoose).
* **Authentication:** JWT (JSON Web Tokens) with HttpOnly cookies.
* **Real-time Communication:** Socket.io.

## ✨ Core Features

### A. User Authentication
* Secure Sign-up and Login.
* JWT-based authentication with HttpOnly cookies for security.

### B. Gig Management
* **Browse:** Public feed showing all "Open" gigs.
* **Search:** Filter gigs by title.
* **Post:** Logged-in users can create new Gigs with a title, description, and budget.

### C. Hiring Logic & Bidding
* **Bidding:** Freelancers can submit a message and price for a gig.
* **Review:** Clients can view all bids received for their posts.
* **Hiring:** Clients can "Hire" a freelancer. This action atomically updates the Gig status to "Assigned" and the Bid status to "Hired".

## 🚀 Bonus Features (Implemented)

### 1. Transactional Integrity (Race Conditions)
Implemented MongoDB Transactions to ensure the "Hire" logic is atomic. If multiple admins attempt to hire different freelancers for the same gig simultaneously, the system ensures only one is processed, preventing data inconsistency.

### 2. Real-time Updates
Integrated **Socket.io** to provide instant feedback. When a Client hires a Freelancer, the Freelancer receives a real-time notification in their dashboard without needing to refresh the page.

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v14+ recommended)
* MongoDB (Local or Atlas URL)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GigFlow
```
### 2. Backend Setup
Navigate to the server directory and install dependencies:Bashcd Server
```bash
npm install
```
Create a .env file in the Server directory with the following keys:
Code snippet
```bash
CORS_ORIGIN=
MONGODB_URI=
DB_NAME=
PORT=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
```
Start the server
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies
```Bash
cd ../Client
npm install
```
Create a .env file in the Client directory:
Code snippet
```bash
VITE_API_URL=
VITE_SOCKET_URL=
```
Start the frontend
```Bash
npm run dev
```
## 📡 API Endpoints

### Auth
|Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Login user & set cookie | Public |

### Gigs
|Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/gigs | List all open gigs (supports search) | Public |
| POST | /api/gigs | Create a new gig | Auth User |
| GET | /api/gigs/:id | Get details of a specific gig | Public |

### Gigs
|Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/bids | Submit a bid for a gig | Auth User |
| GET | /api/bids/:gigId | Get all bids for a gig | Gig Owner |

### Hiring
|Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| PATCH | /api/bids/:bidId/hire | Atomic "Hire" operation | Gig Owner |


## 🗄️ Database SchemaUser: 
* **name**, email, password
* **Gig**: title, description, budget, ownerId, status (open/assigned)
* **Bid**: gigId, freelancerId, message, status (pending/hired/rejected)

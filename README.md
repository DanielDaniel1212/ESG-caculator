# 🌱 ESG Scoring Web Application

A full-stack ESG (Environmental, Social, and Governance) scoring platform where companies can register, submit sustainability data, and receive automated ESG scores. This project implements the MSCI ESG scoring methodology and enables tracking historical performance over time.

🟢 **Live on AWS:** [http://18.217.148.44:5173/](http://18.217.148.44:5173/)

---

## 🧱 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Containerization**: Docker + Docker Compose
- **Cloud Hosting**: AWS EC2
- **Scoring Method**: MSCI-based ESG model

---

## 🚀 Features

### ✅ Company Login & Registration
- JWT-secured login system
- Company-specific session handling
- Passwords securely hashed with bcrypt

### 📝 ESG Submission Form
- Submit data for:
  - Carbon Footprint
  - Energy Efficiency
  - Waste Management
  - Water Usage
- Form data stored with timestamp in MongoDB
- Scores generated based on a weighted model

### 📊 ESG Score History
- Authenticated users can view past ESG submissions
- Scores displayed with dates and details
- Option to delete past entries

### 📄 Documentation Page
- ESG scoring explanation
- Category descriptions and tips for improving scores

---

## 🌐 Deployment

### 🟢 Live Demo

The application is hosted on an **AWS EC2 instance**:  
🔗 [http://18.217.148.44:5173/](http://18.217.148.44:5173/)

### Docker-Based Deployment (Local)

```bash
docker-compose up --build

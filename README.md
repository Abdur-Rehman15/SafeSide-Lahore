# 🛡️ SafeSide Lahore — Safety Navigation Web App for Pakistan

SafeSide Lahore is a full-stack web application designed to enhance **women’s safety in Pakistan** by providing real-time incident reports, safe route navigation, and reporting unsafe incidents. This app empowers users to make informed travel decisions based on real-time crime data and community reports.

---

## 🌐 Live Demo

**[SafeSide Lahore](https://safeside-lahore.onrender.com/)**   _(Best viewed on mobile with location permissions enabled)_

---

## 📌 Key Features

- 🗺️ **Safe Navigation**  
  View your route and surrounding areas with visual indicators of risky zones based on past reports and real-time data.
  
- 🔴 **Analysis of area**  
  Users can check the security score of current location based on reports in particular proximity.

- 🚦 **Crime Heatmap & Danger Zones**  
  Areas with frequent incidents are highlighted to warn users and suggest safer alternatives.

- 🚍 **Report a Crime**  
  Users can instantly report incidents like harassment, robbery, or other suspicious activities with geolocation and crime type.

- 📡 **Real-time Sync (via Socket.io)**  
  All reported incidents are instantly synced across the app without needing a page reload.

- 👤 **User Authentication**  
  Secure user login/registration to personalize reporting and protect data integrity.

---

## 🧱 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| **Frontend** | React + Vite, Tailwind CSS          |
| **Backend**  | Node.js, Express.js,                |
| **Database**  | MongoDB                            |
| **Real-time**| Socket.io                           |
| **Map APIs** | Mapbox GL JS, Mapbox Geocoding API  |
| **Deployment**  | Docker and Render|
| **Others**   | Mongoose, Dotenv, CORS, JWT         |

---


## 📌 Crime Categories Supported

- Harassment
- Robbery
- Theft
- Suspicious Activity

Each category is tagged with color-coded markers on the map for clarity.

## 📂 Basic Folder Structure
```
SafeSide/
├── backend/
│ ├── routes/
│ ├── models/
| ├── middlewares/
│ ├── controllers/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ ├── public/
│ └── index.html
├── Dockerfile 
└── README.md

```


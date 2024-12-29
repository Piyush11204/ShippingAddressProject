# Shipping Management System

## ⚠️ Important Note
This project includes API keys and environment variables in the codebase for demonstration and quick testing purposes only. In a production environment, these should be properly secured and never committed to version control.

If Needed, we can also add the payment getway like this to the: [Phone Pe Integration Demo](https://phone-pe-eta.vercel.app/)

## 🚀 Project Overview
This is a full-stack shipping management system built with React + Vite for the frontend and Node.js with MongoDB Atlas for the backend. The project demonstrates the integration of mapping functionality using Mapbox and can be extended with payment gateway integration.

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Router v6

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- cors
- dotenv

## 📋 Features
- User Authentication & Authorization
- Real-time Shipment Tracking
- Interactive Map Interface using Mapbox
- Location Clustering
- Responsive Design
- REST API Integration
- MongoDB Atlas Database Integration

## 🏗️ Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── .env
│   └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Piyush11204/ShippingAddressProject.git
cd ShippingAddressProject
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd backend
npm install
```

4. Start Development Servers

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## 🗺️ Mapbox Integration
The project uses Mapbox for mapping functionality. Key features include:
- Location tracking
- Marker clustering
- Custom popups
- Interactive navigation

## 💳 Payment Gateway Integration
A sample payment gateway component is available at [Phone Pe Integration Demo](https://phone-pe-eta.vercel.app/). This can be integrated into the project for handling payments.

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
```

### Shipment Endpoints
```
POST /api/ - add product
GET /api/getallproducts - Get all products
GET /api/userproducts - All product added my that user
GET /api/products/:productId/:id/buy - product buyed my user
GET /api/buyproductlist - lest of buyed products
DELETE /:productId - Delete shipment
```

## 🔐 Security Note
The current implementation includes API keys and environment variables for demonstration purposes. In a production environment:
- Remove all API keys from the codebase
- Use environment variables
- Implement proper security measures
- Add rate limiting
- Enable CORS protection
- Implement proper error handling

## 🚧 Future Improvements
1. Implement complete payment gateway integration
2. Add real-time tracking using WebSocket
3. Enhance security measures
4. Add automated testing
5. Implement CI/CD pipeline
6. Add documentation using Swagger/OpenAPI

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

# Goa Yellow Pages

A modern business directory application built with TypeScript, React, and Express.

## Project Structure

```
goa-yellow-pages/
├── client/                 # React TypeScript Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript type definitions
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                 # Express TypeScript Backend
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── server.ts      # Main server file
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Features

### Frontend (React + TypeScript + Tailwind CSS)

- Modern, responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- React Router for navigation
- Axios for API communication
- Component-based architecture

### Backend (Express + TypeScript + MongoDB)

- RESTful API with Express
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT authentication
- Middleware for security and validation
- Structured folder organization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd goa-yellow-pages
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the server directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/goa-yellow-pages
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

5. **Start the development servers**

   In the server directory:

   ```bash
   npm run dev
   ```

   In the client directory (new terminal):

   ```bash
   npm run dev
   ```

## Available Scripts

### Server

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Client

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Businesses

- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get business by ID
- `POST /api/businesses` - Create new business
- `PUT /api/businesses/:id` - Update business
- `DELETE /api/businesses/:id` - Delete business

## Technologies Used

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Vite

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cors
- helmet
- morgan

## Development

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for both client and server
- Prettier for code formatting (recommended)

### Database

- MongoDB with Mongoose ODM
- User and Business models with proper relationships
- Indexed fields for better performance

### Security

- JWT authentication
- Password hashing with bcryptjs
- CORS configuration
- Helmet for security headers
- Input validation with express-validator

## Deployment

### Server

1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

### Client

1. Build the React app: `npm run build`
2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

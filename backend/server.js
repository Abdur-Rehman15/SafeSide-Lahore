import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
// Serve frontend static files
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import CrimeReportRoutes from './routes/crimeReports.js';

dotenv.config();

const app = express();

// Normalize FRONTEND_URL to remove trailing slash for CORS matching
const FRONTEND_URL = process.env.FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:5173';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  }
});

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/user', authRoutes);
app.use('/report', CrimeReportRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, '../frontend/dist');

app.use(express.static(frontendBuildPath));

// Catch-all: serve index.html for React Router (non-API routes)
app.get(/^\/(?!user|report).*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Routes
import contactRouter from './routes/contact.js';
import admissionsRouter from './routes/admissions.js';
import healthRouter from './routes/health.js';
import adminRouter from './routes/admin.js';

// Middleware
import { requestLogger, rotateLogsDaily } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

// Database
import { initializeDatabase, closeDatabase } from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ═══════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body Parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Request Logging Middleware
app.use(requestLogger);

// Static files
app.use(express.static(__dirname, {
  index: ['index.html'],
  extensions: ['html', 'css', 'js']
}));

// ═══════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════

// Health check
app.use('/api/health', healthRouter);

// Contact form
app.use('/api/contact', contactRouter);

// Admissions form
app.use('/api/admissions', admissionsRouter);

// ═══════════════════════════════════════════════════════════
// ERROR HANDLING & 404

// Admin routes (for retrieving submissions)
app.use('/api/admin', adminRouter);
// ═══════════════════════════════════════════════════════════

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err })
  });
});

// ═══════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    // Initialize database first
    await initializeDatabase();

    // Rotate logs daily
    rotateLogsDaily();

    // Start server
    server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         🎓 YUVA'S SCHOOL - Backend Server                 ║
║                                                            ║
║  ✓ Server running on http://localhost:${PORT}              ║
║  ✓ Environment: ${process.env.NODE_ENV}                   ║
║  ✓ Database: Connected & Ready                            ║
║  ✓ Email Service: Configured                              ║
║  ✓ Logging: Enabled                                       ║
║  ✓ CORS: Enabled                                          ║
║                                                            ║
║  📚 API Documentation:                                    ║
║  • POST   /api/contact     - Submit contact form          ║
║  • POST   /api/admissions  - Submit admission form        ║
║  • GET    /api/health      - Health check                 ║
║  • GET    /api/admin/stats           - Get statistics     ║
║  • GET    /api/admin/contact-submissions                  ║
║  • GET    /api/admin/admission-submissions                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(async () => {
      await closeDatabase();
      console.log('Server closed');
      process.exit(0);
    });
  }
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received. Shutting down gracefully...');
  if (server) {
    server.close(async () => {
      await closeDatabase();
      console.log('Server closed');
      process.exit(0);
    });
  }
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't crash the process, just log it
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Attempt to close gracefully
  if (server) {
    server.close(async () => {
      await closeDatabase();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Start the server
startServer();
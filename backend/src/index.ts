import app from './app';
import { config, validateConfig } from './config';

// Validate configuration on startup
validateConfig();

const server = app.listen(config.port, () => {
  console.log('='.repeat(50));
  console.log(`Server is running at http://localhost:${config.port}`);
  console.log(`API key status: ${config.apiKey ? 'Configured' : 'Not configured'}`);
  if (!config.apiKey) {
    console.log('Please set API_KEY in the .env file.');
  }
  console.log('='.repeat(50));
});

// Graceful shutdown
const gracefulShutdown = (signal: string): void => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;

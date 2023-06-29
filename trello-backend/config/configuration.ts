import { registerAs } from '@nestjs/config';

export const configuration = registerAs('configuration', () => ({
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/trello-db',
  // Add other configuration options here
}));

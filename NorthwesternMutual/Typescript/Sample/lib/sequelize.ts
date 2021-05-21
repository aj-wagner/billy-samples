import { Sequelize } from 'sequelize-typescript';

const dbName: string = process.env.DB_NAME || '';
const username: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASS || '';
const host: string = process.env.DB_HOST || '';
const port: number = Number(process.env.DB_PORT) || 5432;

export const db = new Sequelize({
  database: dbName,
  host,
  username,
  password,
  port,
  dialect: 'postgres',
  models: [__dirname + '/../models'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export const options = {
  paranoid: true, // Enables soft delete
  underscored: true, // Enables snake_case column naming in DB
  freezeTableName: true, // Ensures model name is the same as in DB
};

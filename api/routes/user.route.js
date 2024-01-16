import express from 'express';
import { test } from '../controllers/user.controller.js';

const Route = express.Router();

Route.get("/test", test)

export default Route;
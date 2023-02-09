const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const roleRoutes = require('./routes/roles');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const timesheetRoutes = require('./routes/timesheets');
const taskRoutes = require('./routes/tasks');

/* CONFIGURATION */
const server = express();
dotenv.config();
server.use(morgan('tiny'));
server.use(express.json());
server.use(cors({ credentials: true, origin: '*' }));
connectDB();

/* ROUTES */
const BASE_PREFIX = process.env.BASE_PREFIX;
server.use(BASE_PREFIX, roleRoutes);
server.use(BASE_PREFIX, authRoutes);
server.use(BASE_PREFIX, userRoutes);
server.use(BASE_PREFIX, timesheetRoutes);
server.use(BASE_PREFIX, taskRoutes);

/* ERROR HANDER */
server.use(errorHandler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`PORT:${PORT} | The server is up and running...`);
});

import mongoose from 'mongoose';
import connectDB from './mongoose.js';

import User from '../models/user.js';

const users = [
    {
      username: 'JohnDoe',
      hashedPassword: 'hashedPassword1',
      progress: [
        {
          topic: new mongoose.Types.ObjectId('610b0fe61b1b973130dbc536'),
          percentage: 65,
        },
        {
          topic: new mongoose.Types.ObjectId('610b0fe61b1b973130dbc539'),
          percentage: 75,
        },
      ],
      currentSolutions: [
        {
          problem: new mongoose.Types.ObjectId('610b0fe61b1b973130dbc531'),
          language: 'JavaScript',
          solution: 'function solve() {...}',
        },
      ],
      problemsCompleted: [
        new mongoose.Types.ObjectId('610b0fe61b1b973130dbc532'),
      ],
      problemsRecommended: [
        new mongoose.Types.ObjectId('610b0fe61b1b973130dbc533'),
      ],
    },
    // more users...
  ];

connectDB('mongodb+srv://root:root1234@algochamp-cluster.npdxemw.mongodb.net/test')
  .then(() => {
    console.log('Connected to the seed Database successfully');
    User.insertMany(users)
      .then(() => {
        console.log('Data seeding completed');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log('Data seeding failed: ', error);
      });
  })
  .catch((err) => console.log('DB Connection Error: ', err));

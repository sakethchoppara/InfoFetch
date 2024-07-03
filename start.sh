#!/bin/bash

cd backend
npm insall &
npm start &
cd ..

cd frontend
npm install &
npm start
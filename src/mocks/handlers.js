// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Handles a POST request
  rest.post('/login', (req, res, ctx) => {
    
  }),
]
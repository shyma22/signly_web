# Signly Web - AI Coding Agent Instructions

## Project Overview
**Signly Web** is an Express.js backend application for learning and teaching sign language through modules, lessons, quizzes, and user progress tracking. The project uses Node.js with ES modules, MongoDB for persistence, and a RESTful API architecture.

## Architecture

### Core Stack
- **Runtime**: Node.js with ES modules (`"type": "module"`)
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB (local instance at `mongodb://127.0.0.1:27017/signly`)
- **ORM**: Mongoose v9.1.4
- **CORS**: Enabled for cross-origin requests

### Data Model Hierarchy
```
Module (title, description)
  ├── Lesson (title, content, module ref)
  ├── Quiz (module ref)
  └── Progress (user ref, module/lesson/quiz refs)

User (name, email unique)
```

Key patterns:
- All models use MongoDB ObjectId references with `mongoose.Schema.Types.ObjectId`
- Lesson and Quiz have `module` field with `ref: "Module"` for population
- Progress tracks user advancement across modules/lessons/quizzes

## API Routes & Patterns

### Route Structure
- `/modules` - CRUD operations on modules (GET all, GET/:id, POST, PATCH/:id, DELETE/:id)
- `/lessons` - Lesson operations with filtering by module (includes `.populate("module")`)
- `/quiz` - Quiz retrieval and submission with score calculation
  - `GET /:moduleId` - Get quiz for a specific module
  - `POST /submit` - Submit quiz answers and calculate score
  - `GET /progress/:userId/:moduleId` - Get user's quiz attempts for a module
- Future routes: `/users`

### Established Patterns
1. **Error Handling**: Try-catch with consistent error responses
   - 400: Validation/save errors
   - 404: Resource not found
   - 500: Server errors

2. **Database Operations**: Always use async/await with error catching
3. **Response Format**: JSON with `.json()` method
4. **Population**: Use `.populate("module")` or `.populate("quiz")` to include referenced document data
5. **Quiz Scoring**: Calculates percentage (0-100), marks complete if score ≥ 70%
6. **Progress Tracking**: Stores userId, moduleId, quiz attempts with scores and timestamps

## Getting Started

### Setup Commands
```bash
# Install dependencies
npm install

# Start MongoDB (must be running locally)
# Then run:
npm start  # Starts server on port 5000

# Seed database
node ./seed/seed.js
```

## Key Developer Workflows

- **Adding a new route**: Create file in `/routes/`, import model, export Express router
- **Adding a new model**: Create schema in `/models/`, use consistent naming (PascalCase exported as `mongoose.model()`)
- **Testing APIs**: Server listens on `port 5000`; all routes respond with JSON
- **Database seeding**: Use `seed.js` for test data; clears collections before inserting

## Important Notes

- Import statements must use `.js` extension (ES modules requirement)
- All routes are async functions with proper error handling
- MongoDB must be running locally before starting the server
- Quiz schema supports nested questions with multiple-choice options and correct answer indices
- Progress model tracks individual quiz submissions (not just final scores)
- Completion threshold: 70% or higher marks module as complete
- CORS is enabled to allow frontend requests

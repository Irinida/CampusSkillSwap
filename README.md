# Campus SkillSwap — Trade Skills. Not Money.

A beginner-friendly MEAN-stack mini project. Angular talks to Express through HttpClient; Express uses Mongoose to store students, skills and exchange requests in MongoDB.

## Requirements
- Node.js 20.19+ (or a current Node LTS)
- Angular CLI: `npm install -g @angular/cli`
- MongoDB Community Server running locally on port 27017

## Run it
### 1. Start MongoDB
Start the MongoDB service from Windows Services, or run `mongod` if MongoDB is configured on your PATH. Keep it running.

### 2. Backend
```powershell
cd CampusSkillSwap\backend
npm install
npm run seed
npm start
```
Backend: http://localhost:5000. Health check: http://localhost:5000/api/health

`npm run seed` inserts 5 students, 10 skills and 5 requests only when the respective collection is empty. It is safe to rerun without duplicating the starter data.

### 3. Frontend (new terminal)
```powershell
cd CampusSkillSwap\frontend
npm install
npm start
```
Open http://localhost:4200.

## Demo flow
1. Home → Register a student (use a unique email).
2. Add Skill → publish an offer.
3. Explore Skills → request an exchange from a different student name.
4. Dashboard → change incoming request status to Accepted, then Completed.
5. Edit/delete a skill from Explore Skills; cancel a request from My Requests.
6. Inspect MongoDB database `campus_skillswap`, collections `students`, `skills`, `exchangerequests`.

## Notes
- This is an academic demo, not a production authentication system. The dashboard uses a student name selector rather than passwords/login.
- Sample data is created by the seed script. The app's primary data source is the REST API, not a hardcoded Angular array.
- Angular standalone components use `provideRouter`, `provideHttpClient`, `FormsModule`, and `CommonModule`.
- API errors are shown in the interface and backend responses include basic validation/error messages.

## REST API
- `GET /api/health`
- `GET /api/students`, `POST /api/students`, `GET /api/students/:id`, `PUT /api/students/:id`, `DELETE /api/students/:id`
- `GET /api/skills`, `GET /api/skills/:id`, `POST /api/skills`, `PUT /api/skills/:id`, `DELETE /api/skills/:id`
- `GET /api/requests`, `GET /api/requests/:id`, `POST /api/requests`, `PUT /api/requests/:id`, `DELETE /api/requests/:id`

## Academic mapping
| Syllabus experiment | Implementation |
|---|---|
| TypeScript | `Skill` class, interfaces, typed service functions |
| Angular components | Home, Register, Skills, Add Skill, Requests, Dashboard, About |
| Template-driven forms | Registration, add/edit skill, exchange request forms with `ngModel`, `ngSubmit`, validation |
| Angular routing | `/home`, `/register`, `/skills`, `/add-skill`, `/requests`, `/dashboard`, `/about` |
| HttpClient | `ApiService` calls Express endpoints and subscribes to Observables |
| Node.js | CommonJS modules, `EventEmitter`, async `setTimeout` callback |
| Express.js | REST routers, JSON middleware, request logger, error handler |
| MongoDB | `campus_skillswap` database and three collections |
| Mongoose | Student, Skill and ExchangeRequest schemas and CRUD controllers |
| MEAN stack | Angular → Express/Node → Mongoose → MongoDB end-to-end |

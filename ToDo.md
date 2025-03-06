Steps to Implement Save Job Post Logic with Cascade Delete

1. Backend Setup

a) Job Model

Create or update the Job model.

Add Mongoose pre-hook middleware to automatically remove job references from users' savedJobs array when the job is deleted.

b) User Model

Add savedJobs array field with ObjectId references to the Job model.

c) Controller Functions

Create the following functions in the userController.js file:

saveJob: Add job ID to user's savedJobs array.

unsaveJob: Remove job ID from user's savedJobs array.

getSavedJobs: Populate and return user's saved jobs.

d) API Routes

Define the following routes in userRoutes.js:

POST /save-job/:jobId → Save job.

DELETE /unsave-job/:jobId → Unsave job.

GET /saved-jobs → Get saved jobs.

e) Authentication Middleware

Protect the routes using JWT authentication.

2. Frontend Setup

a) API Services

Create functions using Axios:

saveJob(jobId, token) → Save job request.

unsaveJob(jobId, token) → Unsave job request.

getSavedJobs(token) → Fetch saved jobs.

b) Save Job Button Component

Create a button component that toggles between save and unsave actions.

Use useState to manage button state.

Call respective API functions.

c) Saved Jobs Page

Fetch saved jobs on component mount using useEffect.

Display saved jobs in a list/grid view.

3. Bonus

Optional

Use node-cron to clean up user saved jobs periodically.

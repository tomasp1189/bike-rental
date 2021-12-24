# Bike Rental App

## Configuration

### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import/git?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose&project-name=with-mongodb-mongoose&repository-name=with-mongodb-mongoose&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB&envLink=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose%23step-2-set-up-environment-variables)

## Design

I've decided to use [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) as a guide for folder and components structure.

## What now?

- [x] BackEnd
  - [x] Setup Auth0
    - [x] Initial Setup + SDK integration
    - [x] Add Roles and rule to attach roles
    - [x] Create Role validating middleware
  - [x] Setup DB
  - [x] Bike
    - [x] CRUD
    - [x] Search with filters + reservation dates
  - [x] Reservations
    - [x] CRUD
    - [x] Cancellation with isOwner validation
  - [x] Reviews
    - [x] CRUD
    - [x] Creation with isOwner of reservation validation
  - [x] Centralized Error Handling
  - [x] Postman integration
- [x] FrontEnd
  - [x] Material UI
  - [x] Auth
    - [x] Sign Up + Login
    - [x] Route limitation by authentication and role validation
  - [x] User Views
    - [x] Bike List
    - [x] Reservation Form
    - [x] Reservation Cancellation
    - [x] Review Form
  - [x] Admin Views
    - [x] User list
    - [x] User Create form
    - [x] User Update form
    - [x] Bike list


## Instructional Videos

- [Tech Stack and design decisions](https://www.loom.com/share/d32c4424b23c4f01851762e0576d2471)
- Admin Demo
  - [Users](https://www.loom.com/share/3631adab28fa4ed69d37a8c934a5ca03)
  - [Bikes](https://www.loom.com/share/f1fe70cc7036485a86b5175b495807c4)
- [User Demo](https://www.loom.com/share/01ef4cb245ff4d96bcf2ced9e6c9b7ea)
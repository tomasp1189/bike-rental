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

I've decided to use [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) as a guide for folder and components structure because it was already provided this way in the designs.

## What now?

- [ ] BackEnd
  - [ ] Setup Auth0
    - [x] Initial Setup + SDK integration
    - [ ] Add Roles and rule to attach roles
    - [ ] Create Role validating middleware
  - [x] Setup DB
  - [ ] Bike
    - [x] CRUD
    - [ ] Search with filters + reservation dates
  - [ ] Reservations
    - [ ] CRUD
    - [ ] Cancellation with isOwner validation
  - [ ] Reviews
    - [ ] CRUD
    - [ ] Creation with isOwner of reservation validation
  - [x] Centralized Error Handling
  - [x] Postman integration
- [ ] FrontEnd
  - [ ] Material UI
  - [ ] Auth
    - [x] Sign Up + Login
    - [ ] Route limitation by authentication and role validation
  - [ ] User Views
    - [ ] Bike List
    - [ ] Reservation Form
    - [ ] Reservation Cancellation
    - [ ] Review Form
  - [ ] Admin Views
    - [ ] User list
    - [ ] User Create form
    - [ ] User Update form
    - [ ] Bike list

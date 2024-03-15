This is a Next.js application for user authentication using NextAuth.js, MongoDB, and React. It provides functionalities for user registration, login, logout, and accessing user information.

## Features

- User registration: Users can register with their name, email, and password.
- User login: Registered users can log in with their email and password.
- User logout: Logged-in users can log out of their accounts.
- Access user information: Logged-in users can view their name and email.

## Technologies Used

- Next.js: A React framework for building server-side rendered and statically generated web applications.
- NextAuth.js: A complete authentication solution for Next.js applications.
- MongoDB: A NoSQL database used to store user data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- bcrypt.js: A library for hashing passwords.
- Tailwind CSS: A utility-first CSS framework used for styling the application.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/next-authentication-app.git
```

2. Install dependencies:

```bash
cd next-authentication-app
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following environment variables:

```plaintext
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Start the development server:

```bash
npm run dev
```

5. Access the application:

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Register: Click on the "Register" link to register as a new user. Provide your name, email, and password.
2. Login: After registering, you can log in with your email and password.
3. Logout: Logged-in users can log out by clicking the "Log Out" button.
4. User Info: Once logged in, you can view your name and email on the user information page.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# LOLDoku

LOLDoku is an open source spin on the classic Immaculate Grid using champions from the popular MOBA game League of Legends. The goal of the game is to fill in the 3x3 grid with answers that match the clues given. New puzzles are generated daily, and users can sign in to access their stats and archived puzzles.

<div align="center">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
    <img src="https://img.shields.io/badge/react%20zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Zustand">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</div>

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Scripts](#scripts)
4. [Schema](#schema)
5. [License](#license)

## Features

🌒 Dark Mode! Enjoy LOLDoku in your light or dark theme of choice.  
📆 Daily puzzles! New puzzles are generated daily at midnight EST.  
🔑 Secure GitHub and Google sign in! Sign in with your GitHub or Google account to access your stats and archived puzzles.  
📐 Stats! Sign in to access your stats and archived puzzles.  
👽 Leaderboards! See how you stack up against other players.  
✋ Open source! LOLDoku is open source and contributions are welcome.

## Game Rules

🟢 The goal of the game is to fill in all 9 boxes with the correct League of Legends champion!

❤️ You have to do so with only 9 guesses so choose wisely.

👀 Once you select a champion, you can't switch your answer or reuse that champion.

😎 Your uniqueness score is all of your answer's percentages added up. The percentages show you how many players put the same correct answer as you. The lower the score, the better!

🦟 If you run into any bugs or have feedback: [spartanhackers0+loldoku@gmail.com](mailto:spartanhackers0+loldoku@gmail.com)

## Installation

1. Fork the LOLdoku repository to your own GitHub account.
2. Clone the repository to your local environment.

```bash
git clone https://github.com/<your-github-username>/loldoku.git
```

4. Navigate to the root project directory and install dependencies

```bash
cd loldoku
npm install
```

5. Please look through the `package.json` file to see what scripts are available. Any script can be run with `npm run <scriptname>`. To run application in development, run the following command:

```bash
npm run dev
```

6. Please look at the terminal logs to see what port the application is running on.

## Scripts

The `scripts` section of the `package.json` file define various commands to streamline development and deployment processes. The following is an overview of each script:

- `"dev"`
  For development purposes. Compiles TypeScript code and concurrently runs Vite dev server for front-end and Nodemon for back-end. Allows for real-time reloading during development.

- `"start"`
  Used for running application in production-like environment. Compiles TypeScript code and starts server using Nodemon, which will automatically restart server if any changes are detected in server files.

- `"build"`
  Triggers Vite build process for front-end application. Compiles and bundles React application into static files optimized for production.

- `"build`
  Runs TypeScript compiler in watch mode, continuously monitoring for any changes in `.ts/.tsx` files and recompiles them as needed. Useful during development for immediate feedback on code changes.

- `"preview"`
  Locally preview production build of front-end application. Serves static files generated by Vite build command, allowing local testing of production build before deployment.

## Schema

![schema](./schema.png)

## License

This project is licensed under the terms of the [MIT LICENSE](./LICENSE)

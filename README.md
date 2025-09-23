# Personal Portfolio Website

This is a fully functional, customizable personal portfolio website built with modern web technologies. It includes an admin panel to easily manage your profile information, projects, and other content.

![Portfolio Preview](https://i.imgur.com/3qlqtB1.png) (https://i.imgur.com/KEMBuTw.png)

## Features

- **Modern Tech Stack:** Built with Next.js, React, and Tailwind CSS.
- **Database:** Uses Prisma as the ORM for easy database management (MySQL).
- **Admin Panel:** A secure admin panel to update your profile, projects, and other data without touching the code.
- **Email Service:** Integrated with Resend to handle contact form submissions.
- **Animations:** Smooth animations with Framer Motion.
- **Responsive Design:** Looks great on all devices, from mobile phones to desktops.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
- [MySQL](https://dev.mysql.com/downloads/installer/) (or any other SQL database compatible with Prisma)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kiritocroft/Portofolio.git
    cd Portofolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Set up environment variables:**
    Create a new file named `.env` in the root of your project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in the required values:

    - `DATABASE_URL`: Your MySQL database connection string. It should look like this:
      `mysql://USER:PASSWORD@HOST:PORT/DATABASE`
      For a local setup, it might be `mysql://root:password@localhost:3306/myportfolio`.

    - `RESEND_API_KEY`: Your API key from [Resend](https://resend.com/) for the contact form.

    - `JWT_SECRET`: A long, random string to secure the admin authentication. You can generate one [here](https://generate-secret.now.sh/32).

    - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: The credentials you will use to log in to the admin panel.

2.  **Set up the database:**
    Run the following command to apply the database schema and create the necessary tables:
    ```bash
    npx prisma migrate dev
    ```

3.  **Seed the database:**
    This command will populate your database with some initial placeholder data. You can customize this data in the `prisma/seed.ts` file.
    ```bash
    npm run prisma:seed
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application.

2.  **Build for production:**
    To create a production-ready build, run:
    ```bash
    npm run build
    ```
    And to start the production server:
    ```bash
    npm run start
    ```

## Customization

### Admin Panel

The easiest way to customize your portfolio content is through the admin panel.

1.  Navigate to `/admin` (e.g., `http://localhost:3000/admin`).
2.  Log in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in your `.env` file.
3.  From here, you can update your profile information, add or remove projects, and change other settings.

### Manual Customization

If you want to make more significant changes, here are some key files to look at:

- **`prisma/seed.ts`**: Modify this file to change the initial data that populates your database.
- **`public/`**: This directory contains static assets like your profile picture (`pp.jpg`) and CV. Replace them with your own files.
- **`app/globals.css`**: Here you can change the global styles, including the hexagon shape and its animations.
- **`components/`**: This directory contains all the React components. You can modify them to change the layout or add new sections.

## Project Structure

- **`/app`**: Contains the main pages of the application, including the admin panel and API routes.
- **`/components`**: Reusable React components used throughout the site.
- **`/context`**: React context providers for managing global state (like the active section and theme).
- **`/lib`**: Utility functions, hooks, and Prisma client setup.
- **`/prisma`**: Contains your database schema (`schema.prisma`) and seeding script (`seed.ts`).
- **`/public`**: Static assets like images and documents.

## Deployment

The easiest way to deploy your Next.js application is with [Vercel](https://vercel.com/). It's a platform built by the creators of Next.js and offers a seamless deployment experience.

For a step-by-step guide, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
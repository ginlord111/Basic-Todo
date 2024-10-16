Basic Todo
This project is built using Next.js with Prisma as the ORM to interact with the database.



Using npm:

bash
Copy code
npm install
Using yarn:

bash
Copy code
yarn install
Set up your environment variables
Create a .env file in the root of your project and add your database connection string. For example:

makefile
Copy code
DATABASE_URL=postgresql://neondb_owner:rqH6QNIDA1om@ep-wild-darkness-a1gm01io.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

Migrate the database (if needed)
Run the Prisma migration command:

bash
Copy code
npx prisma migrate dev
Running the Project
To start the development server:

With npm:

bash
Copy code
npm run dev
With yarn:

bash
Copy code
yarn dev
This will start the development server on http://localhost:3000.

Viewing the Database
To view and interact with the database using Prisma Studio:

bash
Copy code
npx prisma studio
This will open an interactive interface for viewing and managing your data.

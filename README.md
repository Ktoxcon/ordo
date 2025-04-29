# Ordo

This mono-repository contains both the backend and frontend applications for the "Atom Tech Challenge" project.

## Prerequisites

To run the project correctly, there are a few tools and processes that must be installed and set up. Below is a list of the necessary tools, recommended versions, and required processes:

### Tools

- **Terminal**  
  It is recommended to use any of the different terminals provided by your operating system.

- **Node.js**  
  A version of Node.js 18 or higher is required. It is recommended to use NVM or similar tools to manage Node.js versions.

- **PNPM**  
  This project is a monorepository containing both the frontend and backend. PNPM was chosen for its efficiency and optimized features.  
  **It is important to install PNPM before running the project.**

  You can install it easily using NPM:

  ```bash
  npm install -g pnpm
  ```

  Alternatively, you can follow the official PNPM guides for your operating system (please see their website for detailed instructions).

### Environment & Other Tools

- **Environment Variables**  
  You need a `.env` file where you can store sensitive values such as connection URLs, API keys, and more. This file must be located in the root folder of each application, and you can use the existing `.env.sample` file in each app as a reference.

> [!IMPORTANT]
> The file must be named `.env` because other filenames will not be detected by default. If you want to have multiple environment files, you must manually configure the application to do so.

This file is not tracked by Git, so it is safe to include any credentials or secure values there.

### Setting Up Project Dependencies

After installing the required tools and completing the necessary setup, you must install each application's dependencies before running them. To do this, navigate to the project's root directory and run:

```bash
pnpm install
```

Once the installation process is complete, you can follow the next section commands to run the project.

> [!IMPORTANT]  
> Please note that if you do not follow the prerequisites guide, it is likely that any of the project’s applications may not function correctly or may not run at all.

## Running the Project

### Backend (Development Mode)

To run the backend app in development mode:

1. Open your terminal and navigate to the backend location:

```bash
cd backend
```

2. Execute the following command:

```bash
pnpm dev
```

### Frontend (Development Mode)

To run the frontend app in development mode:

1. Open your terminal and navigate to the backend location:

```bash
cd frontend
```

2. Execute the following command:

```bash
pnpm dev
```

You can execute this command either from the project's root directory or by navigating to where each application is located. Make sure you have properly configured any required environment variables in the `.env` file within each app folder before running the command.

## FAQ

### Why "Ordo"?

The name Ordo comes from Latin, meaning "order" a fitting foundation for a task management app designed to bring structure to your day. In a world full of deadlines, distractions, and to-do list chaos, Ordo helps you bring things back into focus.

But there's a deeper layer.

For fans of Warhammer 40,000, Ordo also nods to the secretive and powerful branches of the Imperium like the Ordo Hereticus or Ordo Xenos dedicated to maintaining order in a universe of relentless chaos. Much like them, this app has one goal: to protect you from the heresy of disorganization.

### Why a Monorepository?

1. **Centralized Dependency Management**  
   Instead of managing multiple package configurations across different repositories, a monorepository lets you centralize all dependencies, reducing complexity and preventing duplicated packages.

2. **Consistent Development Process**  
   Keeping the frontend, backend, and even shared libraries in the same repository simplifies version synchronization and team coordination, ensuring consistency in your codebase.

3. **Code Reusability**  
   You can share modules or utilities among different applications within the same repository, avoiding code duplication and making maintenance easier.

4. **Simplified CI/CD**  
   Continuous Integration and Deployment tools operate from a single source of truth, making it more straightforward to configure and manage pipelines for all projects in one place.

### Why PNPM?

1. **Efficiency and Optimization**  
   PNPM uses symbolic links to share packages instead of duplicating them, resulting in reduced disk space usage and faster installation times.

2. **Faster Installations**  
   By leveraging caching and a unique approach to dependency resolution, PNPM often delivers higher installation speeds compared to other package managers.

3. **Native Monorepo Support**  
   PNPM includes features specifically designed to manage multiple projects and packages within a single repository, making it an excellent fit for monorepos.

4. **Fewer Version Conflicts**  
   PNPM’s approach to storing dependencies helps minimize issues with conflicting versions across different projects.

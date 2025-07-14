
# Ecommerce-backend-nestjs-microservices

This project is a NestJS-based backend for an e-commerce application, utilizing a microservices architecture.

## Project Overview

The project is structured into multiple microservices to handle different aspects of the e-commerce platform.  Based on the data provided, these likely include services for authentication and product/order management.

## Key Technologies

*   **NestJS:** A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
*   **Microservices:** An architectural style that structures an application as a collection of loosely coupled services.
*   **RabbitMQ:** A message broker used for communication between microservices.
*   **Prisma:** A modern database toolkit & ORM.
*   **Docker:** Used for containerization and simplifies setup using docker-compose.
*   **Typescript:** Primary language of the project.
*   **Jest:** For Unit and Integration Testing.

## Project Structure

The provided data suggests the existence of at least two main services:

1.  **Authentication Service (`ecommerce_backend`):** Handles user authentication and authorization.
2.  **Product/Order Management Service (`ecommerce_product_orders`):** Manages product information, orders, and related data.

## Setup Instructions

1.  **Install Dependencies:**

    Navigate to each service's directory (e.g., `ecommerce_backend`, `ecommerce_product_orders`) and run:

    ```bash
    pnpm install
    ```

2.  **Database Setup:**

    *   Ensure you have Docker installed.
    *   Start the necessary databases using Docker Compose. Example commands found in the scripts section of each `package.json` file:
        *   Authentication Service: `pnpm db:dev:up`
        *   Product/Order Management Service: `pnpm db:dev:up`
    *   Apply database migrations:
        *   Authentication Service: `pnpm prisma:dev:deploy`
        *   Product/Order Management Service: `pnpm prisma:dev:deploy`

3.  **Environment Variables:**

    *   Create `.env` files in each service's root directory (if necessary).  Configure any required environment variables, such as database connection strings, RabbitMQ URLs, and ports.

4.  **Running the Application:**

    *   Build the application:

        ```bash
        pnpm build
        ```

    *   Start the application in development mode (with hot reloading):

        ```bash
        pnpm start:dev
        ```

    *   Or, start the application in production mode:

        ```bash
        pnpm start:prod
        ```

## Available Scripts (package.json)

Each service likely has the following scripts defined in its `package.json` file:

*   `prisma:dev:deploy`:  Applies Prisma migrations.
*   `db:dev:rm`: Removes the development database container.
*   `db:dev:up`: Starts the development database container.
*   `db:dev:restart`: Restarts the development database.
*   `build`:  Builds the TypeScript code.
*   `format`: Formats code using Prettier.
*   `start`: Starts the application.
*   `start:dev`: Starts the application in development mode with watch.
*   `start:debug`: Starts the application in debug mode with watch.
*   `start:prod`: Starts the application in production mode.
*   `lint`:  Lints the code using ESLint.
*   `test`: Runs unit tests.
*   `test:watch`: Runs unit tests in watch mode.
*   `test:cov`: Runs unit tests with coverage reports.
*   `test:debug`: Runs unit tests in debug mode.
*   `test:e2e`: Runs end-to-end tests.

## Dependencies

The project uses the following key dependencies:

*   `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: Core NestJS modules.
*   `@nestjs/microservices`: For building microservices.
*   `@nestjs/jwt`: For JSON Web Token (JWT) authentication.
*   `@prisma/client`: Prisma client for database interaction.
*   `amqp-connection-manager`, `amqplib`: For RabbitMQ integration.
*   `argon2`: For password hashing.
*   `class-transformer`, `class-validator`: For data validation.
*   `rxjs`: For reactive programming.

## Microservice Communication

The microservices communicate using RabbitMQ.  The Product/Order Management service is configured to listen to the `cart_queue_v2` queue. The authentication service is likely publishing to another queue or exchange, though this information is not directly available in the provided data.

## CORS Configuration

The NestJS applications are configured to allow Cross-Origin Resource Sharing (CORS) from any origin (`origin: '*'`).  In a production environment, it is highly recommended to restrict the allowed origins to only the domains that need to access the API.

## DTOs

The project uses Data Transfer Objects (DTOs) to define the structure of data being passed between different parts of the application.  Examples include:

*   `authDTO`, `InfoDTO` (Authentication Service)
*   `orderDTO`, `ProductDTO`, `cartDTOItem` (Product/Order Management Service)

## Additional Notes

*   The `tsconfig.json` files indicate that the project uses TypeScript and compiles to CommonJS modules.
*   The project uses ESLint and Prettier for code linting and formatting.
*   The project includes Jest for unit and integration testing.
```
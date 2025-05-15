
# AVY Backend

### Overview:
The AVY Education Platform's backend development is committed to building a robust and scalable server-side framework. The focus is on creating efficient data handling, secure endpoints, and reliable integrations for supporting the platform's frontend. Utilizing a collection of mature technologies and libraries, the backend team ensures the system's integrity, security, and performance to provide a seamless backend service that powers the educational experience.

### Technologies and Libraries:

- **Programming Language**: Java (version 17)
- **Primary Framework**: Spring Boot (version 2.7.x)
- **Security**: Spring Security for user authentication and authorization.
- **Databases**: PostgreSQL, MongoDB.
- **Monitoring**: Spring Actuator for application health checks.
- **API Documentation**: Swagger for automated API documentation.
- **Messaging & Asynchronicity**: ActiveMQ for handling asynchronous events.
- **Testing**: JUnit and Mockito for unit testing.
- **Logging**: SLF4J with Logback for logging.
- **Build & Deployment**: Maven for project building, Docker for containerization.

### Requirements:

- **Java**: JDK 17
- **Maven**: 3.8.x
- **Docker**: 20.10.x (for containerization)
- **PostgreSQL**: 14.x
- **MongoDB**: 5.x
- **ActiveMQ**: 5.x

### Installation:

To set up the backend environment, follow these steps:

1. Install Java JDK 17 and set up the JAVA_HOME environment variable.
2. Install Maven for managing project dependencies and building the project.
3. Ensure PostgreSQL and MongoDB are set up and running.
4. Install ActiveMQ for messaging and event-driven architecture.
5. Clone the repository into your local development environment.
6. Navigate to the */avy-backend* directory.
7. Run the command `mvn clean install` to build the project and install the dependencies.
8. To start the application, execute `java -jar target/avy-backend.jar` or use the appropriate deployment script for your environment.
9. For containerization, ensure Docker is installed and running, then build the Docker image using the Dockerfile provided and run the container.

### Usage:

After installation, the backend services will be accessible via defined endpoints. For detailed API endpoints and usage, refer to the Swagger documentation hosted at `/swagger-ui.html` on the local server. Use Spring Actuator endpoints to monitor the health and metrics of the application.
<!-- java -jar target/AVYproject-0.0.1-SNAPSHOT.jar -->
<!-- java -jar target/original-AVYproject-0.0.1-SNAPSHOT.jar -->
<!-- java -jar target/AVYproject-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev -->
>>>>>>> 2603089 (Initial commit)

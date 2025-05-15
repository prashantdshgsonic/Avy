FROM eclipse-temurin:17-focal
LABEL authors="Sandor"
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
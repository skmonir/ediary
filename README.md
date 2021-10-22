# About
eDiary is a web application which provides users to maintain a digital diary. Since users would like to ensure their privacy for what they write here, appropriate functions are used to protect their data.
The project is built with React.js and Sprint boot.

## Requirements
- JAVA 15
- Maven 3.8.2
- Spring Boot 2.5.4
- PostgreSQL 13

## Running Client
1. Go to project client directory
2. Run command ``` npm install ``` to install the dependencies
3. Run command ``` npm start ``` to start the front-end server

## Running Server
1. Go to project server directory
2. Configure Database in ```server/src/main/resources/application.properties``` file
3. Build Spring Boot Project with Maven: <br>
```mvn clean install```
4. Run Spring Boot app using Maven: <br>
```mvn spring-boot:run```
5. [**optional**] Run Spring Boot app with java -jar command <br>
```java -jar target/webdiary-0.0.1-SNAPSHOT.jar```

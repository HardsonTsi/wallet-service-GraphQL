FROM openjdk:18-jdk-alpine3.14
COPY /target/wallet-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
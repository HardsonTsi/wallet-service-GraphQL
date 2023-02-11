# Utilise l'image officielle de MySQL en tant que base
FROM mysql:8.0
# Définir un utilisateur et un mot de passe pour MySQL
ENV MYSQL_USER=root
# Autoriser un mot de passe vide pour MySQL
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
# Créer une nouvelle base de données pour le projet
ENV MYSQL_DATABASE=walletServiceDB
FROM openjdk:18-jdk-alpine3.14
ARG JAR_FILE=/target/wallet-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8082
# Définir le point d'entrée pour le conteneur
ENTRYPOINT ["sh", "-c", "mysqld & java -jar /app.jar"]
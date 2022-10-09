-- Crea el nombre de la base de datos que se quiere crear
CREATE DATABASE application_nodejs;

-- Aca especificamos que usamos la base datos
USE application_nodejs;

-- CREAR TABLAS
-- Tabla usuarios
CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL

);


-- Tabal Links
CREATE TABLE links(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR (60) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);





-- Descirbir la tabla
-- DESCRIBE users;
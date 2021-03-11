DROP DATABASE IF EXISTS easy_work;

CREATE DATABASE easy_work;

USE easy_work;

DROP TABLE IF EXISTS tb_users;

CREATE TABLE tb_users(
	id int AUTO_INCREMENT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    tel VARCHAR(14) NOT NULL,
    email TEXT NOT NULL,
    user_password TEXT NOT NULL
);

DROP TABLE IF EXISTS tb_messages;

CREATE TABLE tb_messages (
		id int AUTO_INCREMENT PRIMARY KEY,
        msg_user_id int NOT NULL,
        msg_text TEXT NOT NULL,
        msg_time DATETIME NOT NULL
)

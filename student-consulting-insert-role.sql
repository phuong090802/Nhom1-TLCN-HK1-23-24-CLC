CREATE SCHEMA `student-consulting`;

USE `student-consulting`;

CREATE TABLE `roles` (
    `role_id` INT NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_role` PRIMARY KEY (`role_id`),
    CONSTRAINT `UC_role` UNIQUE (`role_name`)
);

CREATE TABLE `departments` (
    `department_id` INT NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `logo_url` TEXT NULL,
    CONSTRAINT `PK_department` PRIMARY KEY (`department_id`),
    CONSTRAINT `UC_department` UNIQUE (`department_name`)
);

CREATE TABLE `refresh_tokens` (
    `token_id` INT NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,
    `is_used_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `is_expired_at` DATETIME NOT NULL,
    `is_revoked` BOOLEAN NULL DEFAULT FALSE,
    `is_used` BOOLEAN NULL DEFAULT TRUE,
    `parent_id` INT NULL,
    CONSTRAINT `PK_refresh_token` PRIMARY KEY (`token_id`),
    CONSTRAINT `FK_refresh_token_refresh_token` FOREIGN KEY (`parent_id`)
        REFERENCES `refresh_tokens` (`token_id`)
);

CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `hashed_password` VARCHAR(60) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `avatar_url` TEXT NULL,
    `is_revoked` BOOLEAN NULL DEFAULT FALSE,
    `revoked_day` DATETIME NULL,
    `is_online` BOOLEAN NULL DEFAULT FALSE,
    `department_id` INT NULL,
    `token_id` INT NULL,
    CONSTRAINT `PK_user` PRIMARY KEY (`user_id`),
    CONSTRAINT `FK_user_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`department_id`),
    CONSTRAINT `FK_user_refresh_token` FOREIGN KEY (`token_id`)
        REFERENCES `refresh_tokens` (`token_id`)
);

CREATE TABLE `user_roles` (
    `user_id` INT NOT NULL,
    `role_id` INT NOT NULL,
    CONSTRAINT `PK_user_role` PRIMARY KEY (`user_id` , `role_id`),
    CONSTRAINT `FK_user_role_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_user_role_role` FOREIGN KEY (`role_id`)
        REFERENCES `roles` (`role_id`)
);

CREATE TABLE `fields` (
    `field_id` INT NOT NULL AUTO_INCREMENT,
    `field_name` VARCHAR(255) NOT NULL,
    `department_id` INT NOT NULL,
    CONSTRAINT `PK_field` PRIMARY KEY (`field_id`),
    CONSTRAINT `FK_field_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`department_id`)
);

CREATE TABLE `user_fields` (
    `user_id` INT NOT NULL,
    `field_id` INT NOT NULL,
    CONSTRAINT `PK_user_field` PRIMARY KEY (`user_id` , `field_id`),
    CONSTRAINT `FK_user_field_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_user_field_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`field_id`)
);

CREATE TABLE `questions` (
    `question_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` INT NOT NULL DEFAULT 0,
    `total_view` INT NOT NULL DEFAULT 0,
    `user_id` INT NOT NULL,
    `field_id` INT NOT NULL,
    CONSTRAINT `PK_question` PRIMARY KEY (`question_id`),
    CONSTRAINT `FK_question_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_uestion_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`field_id`)
);

CREATE TABLE `forward_questions` (
    `forward_id` INT NOT NULL AUTO_INCREMENT,
    `current_field_id` INT NOT NULL,
    `new_field_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    CONSTRAINT `PK_forward_question` PRIMARY KEY (`forward_id`),
    CONSTRAINT `FK_forward_question_field_1` FOREIGN KEY (`current_field_id`)
        REFERENCES `fields` (`field_id`),
    CONSTRAINT `FK_forward_question_field_2` FOREIGN KEY (`new_field_id`)
        REFERENCES `fields` (`field_id`),
    CONSTRAINT `FK_forward_question_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`question_id`)
);

CREATE TABLE `user_notifications` (
    `notification_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    CONSTRAINT `PK_user_notification` PRIMARY KEY (`notification_id`),
    CONSTRAINT `FK_user_notification_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_user_notification_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`question_id`)
);

CREATE TABLE `department_notifications` (
    `notification_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `department_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    CONSTRAINT `PK_department_notification` PRIMARY KEY (`notification_id`),
    CONSTRAINT `FK_department_notification_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`department_id`),
    CONSTRAINT `FK_department_notification_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`question_id`)
);

CREATE TABLE `answers` (
    `answer_id` INT NOT NULL AUTO_INCREMENT,
    `is_private` BOOLEAN NOT NULL DEFAULT FALSE,
    `content` TEXT NULL,
    `date` DATETIME NULL,
    `is_approved` BOOLEAN NULL,
    `user_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    CONSTRAINT `PK_answer` PRIMARY KEY (`answer_id`),
    CONSTRAINT `FK_answer_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`),
    CONSTRAINT `FK_answer_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`question_id`)
);

CREATE TABLE `news` (
    `new_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `file_url` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `PK_new` PRIMARY KEY (`new_id`),
    CONSTRAINT `FK_new_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
);

CREATE TABLE `messages` (
    `message_id` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
    `answer_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `PK_message` PRIMARY KEY (`message_id`),
    CONSTRAINT `FK_message_answer` FOREIGN KEY (`answer_id`)
        REFERENCES `answers` (`answer_id`),
    CONSTRAINT `FK_message_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
);

CREATE TABLE `FAQs` (
    `FAQ_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `question_content` TEXT NOT NULL,
    `answer_content` TEXT NOT NULL,
    `date` DATETIME NOT NULL,
    `total_view` INT NOT NULL DEFAULT 0,
    `author_name` VARCHAR(100) NOT NULL,
    `field_id` INT NOT NULL,
    `department_id` INT NOT NULL,
    CONSTRAINT `PK_FAQ` PRIMARY KEY (`FAQ_id`),
    CONSTRAINT `FK_FAQ_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`field_id`),
    CONSTRAINT `FK_FAQ_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`department_id`)
);

INSERT INTO `roles` (`role_name`) VALUES 
('ROLE_USER'),
('ROLE_QUESTIONER'),
('ROLE_ANSWERER'),
('ROLE_DEPARTMENT_HEAD'),
('ROLE_MODERATOR'),
('ROLE_ADMIN');
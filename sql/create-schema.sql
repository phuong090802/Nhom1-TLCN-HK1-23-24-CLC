DROP SCHEMA IF EXISTS `student-consulting`;

CREATE SCHEMA `student-consulting`;

USE `student-consulting`;

CREATE TABLE `roles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_role` PRIMARY KEY (`id`),
    CONSTRAINT `UC_role` UNIQUE (`name`)
);

CREATE TABLE `departments` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `status` BOOLEAN NULL DEFAULT TRUE,
    CONSTRAINT `PK_department` PRIMARY KEY (`id`),
    CONSTRAINT `UC_department` UNIQUE (`name`)
);

CREATE TABLE `users` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `password` VARCHAR(65) NOT NULL,
    `blob_id` VARCHAR(100) NULL,
    `avatar` TEXT NULL,
    `enabled` BOOLEAN NULL DEFAULT TRUE,
    `occupation` VARCHAR(60) NULL,
    `role_id` INT NOT NULL,
	`department_id` VARCHAR(50) NULL,
    `reset_password_token` VARCHAR(100) NULL,
    `reset_password_expire` DATETIME NULL,
    CONSTRAINT `PK_user` PRIMARY KEY (`id`),
    CONSTRAINT `FK_user_role` FOREIGN KEY (`role_id`)
        REFERENCES `roles` (`id`),
	CONSTRAINT `FK_user_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`id`),
	CONSTRAINT `UC_email_user` UNIQUE (`email`),
	CONSTRAINT `UC_phone_user` UNIQUE (`phone`)
);

CREATE TABLE `refresh_tokens` (
    `token` VARCHAR(50) NOT NULL,
    `expires` DATETIME NOT NULL,
    `status` BOOLEAN NULL DEFAULT TRUE,
    `user_id` VARCHAR(50) NOT NULL,
    `parent` VARCHAR(50) NULL,
    CONSTRAINT `PK_refresh_token` PRIMARY KEY (`token`),
    CONSTRAINT `FK_refresh_token_refresh_token` FOREIGN KEY (`parent`)
        REFERENCES `refresh_tokens` (`token`),
	CONSTRAINT `FK_refresh_token_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`),
	CONSTRAINT `UC_refresh_token` UNIQUE (`token`)
);

CREATE TABLE `fields` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
	`status` BOOLEAN NULL DEFAULT TRUE,
    CONSTRAINT `PK_field` PRIMARY KEY (`id`),
    CONSTRAINT `UC_field` UNIQUE (`name`)
);

CREATE TABLE `department_fields` (
    `department_id` VARCHAR(50) NOT NULL,
    `field_id` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_department_field` PRIMARY KEY (`department_id` , `field_id`),
    CONSTRAINT `FK_department_field_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`id`),
    CONSTRAINT `FK_department_field_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`id`)
);

CREATE TABLE `user_fields` (
    `user_id` VARCHAR(50) NOT NULL,
    `field_id` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_user_field` PRIMARY KEY (`user_id` , `field_id`),
    CONSTRAINT `FK_user_field_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`),
    CONSTRAINT `FK_user_field_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`id`)
);

CREATE TABLE `questions` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    -- 0 chua duoc trả lời, 1 đã trả lời chưa được duyệt, 2 trả lời công khai, 3 riêng tư
    `status` INT NULL DEFAULT 0,
    `views` INT NULL DEFAULT 0,
    `user_id` VARCHAR(50) NOT NULL,
    `department_id` VARCHAR(50) NOT NULL,
    `field_id` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_question` PRIMARY KEY (`id`),
    CONSTRAINT `FK_question_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`),
	CONSTRAINT `FK_question_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`id`),
    CONSTRAINT `FK_question_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`id`)
);

CREATE TABLE `forward_questions` (
    `id` VARCHAR(50) NOT NULL,
    `from_department_id` VARCHAR(50) NOT NULL,
    `to_department_id` VARCHAR(50) NOT NULL,
    `question_id` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_forward_question` PRIMARY KEY (`id`),
    CONSTRAINT `FK_forward_question_department_1` FOREIGN KEY (`from_department_id`)
        REFERENCES `departments` (`id`),
	CONSTRAINT `FK_forward_question_department_2` FOREIGN KEY (`from_department_id`)
        REFERENCES `departments` (`id`),
    CONSTRAINT `FK_forward_question_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`id`)
);

CREATE TABLE `answers` (
    `id` VARCHAR(50) NOT NULL,
    `content` TEXT NULL,
    `date` DATETIME NOT NULL,
    `approved` BOOLEAN NOT NULL,
    `user_id` VARCHAR(50) NOT NULL NOT NULL,
    `question_id` VARCHAR(50) NOT NULL NOT NULL,
    CONSTRAINT `PK_answer` PRIMARY KEY (`id`),
    CONSTRAINT `FK_answer_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`),
    CONSTRAINT `FK_answer_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`id`)
);

CREATE TABLE `conversations` (
    `id` VARCHAR(50) NOT NULL,
    `staff_id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(50) NOT NULL,
    `deleted_by_staff` BOOLEAN NULL DEFAULT FALSE,
	`deleted_by_user` BOOLEAN NULL DEFAULT FALSE,
	CONSTRAINT `PK_conversation` PRIMARY KEY (`id`),
    CONSTRAINT `FK_conversation_user_1` FOREIGN KEY (`staff_id`)
		REFERENCES `users` (`id`),
	CONSTRAINT `FK_conversation_user_2` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
);

CREATE TABLE `messages` (
    `id` VARCHAR(50) NOT NULL,
    `conversation_id` VARCHAR(50) NOT NULL,
    `sender_id` VARCHAR(50) NOT NULL,
    `message_text` TEXT NOT NULL,
    `sent_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `seen` BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT `PK_message` PRIMARY KEY (`id`),
    CONSTRAINT `FK_message_conversation` FOREIGN KEY (`conversation_id`)
		REFERENCES `conversations` (`id`),
	CONSTRAINT `FK_user_conversation` FOREIGN KEY (`sender_id`)
		REFERENCES `users` (`id`)
);

CREATE TABLE `faqs` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `field_id` VARCHAR(50) NOT NULL,
    `department_id`VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_faq` PRIMARY KEY (`id`),
    CONSTRAINT `FK_faq_field` FOREIGN KEY (`field_id`)
        REFERENCES `fields` (`id`),
    CONSTRAINT `FK_faq_department` FOREIGN KEY (`department_id`)
        REFERENCES `departments` (`id`)
);

CREATE TABLE `news` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`blob_id` VARCHAR(100) NULL,
    `file_url` TEXT NULL,
    CONSTRAINT `PK_new` PRIMARY KEY (`id`)
);

CREATE TABLE `feedbacks` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`question_id` VARCHAR(50) NOT NULL NOT NULL,
    `user_id` VARCHAR(50) NOT NULL,
    CONSTRAINT `PK_new` PRIMARY KEY (`id`),
	CONSTRAINT `FK_feedback_question` FOREIGN KEY (`question_id`)
        REFERENCES `questions` (`id`),
	CONSTRAINT `FK_feedback_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
);


INSERT INTO `roles` (`name`) VALUES 
('ROLE_USER'),
('ROLE_COUNSELLOR'),
('ROLE_DEPARTMENT_HEAD'),
('ROLE_SUPERVISOR'),
('ROLE_ADMIN');

-- 0908617109
INSERT INTO `users` (`id`,`name`, `email`, `phone`, `password`, `role_id`) VALUES
('8e92b893-2edd-45bb-832f-51e79481843b', 'Administrator', 'trungnh@hcmute.edu.vn', '0908617109', '$2a$10$QxOaGzoBjF0UgYynSQ05OeODPS4BjP.zftcJ1RZReQkfwzL3xL6Ba', 5);

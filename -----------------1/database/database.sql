create TABLE student(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
);

create TABLE teacher(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    patronymic VARCHAR(255),
    lesson VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES student (id)
);
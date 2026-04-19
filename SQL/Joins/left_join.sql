CREATE DATABASE company;

CREATE TABLE employees (
    id Serial PRIMARY KEY,
    name VArchar(100) NOT NULL,
    salary Integer NOT NULL
)

INSERT INTO employees (name, salary) VALUES
('Alice', 50000),
('Bob', 60000),
('Charlie', 55000);

SELECT * FROM employees; 
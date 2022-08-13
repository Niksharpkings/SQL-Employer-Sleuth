CREATE TABLE department (
entitlement_id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (entitlement_id)
);

CREATE TABLE entitlement (
entitlement_id INTEGER NOT NULL AUTO_INCREMENT,
profession VARCHAR(30),
salary DECIMAL(10,2),
department_id INT NOT NULL,
PRIMARY KEY (entitlement_id)
);

CREATE TABLE employee (
entitlement_id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
profession_id INTEGER NOT NULL,
manager_id INTEGER DEFAULT NULL,
PRIMARY KEY (entitlement_id)
);
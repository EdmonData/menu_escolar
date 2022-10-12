

users 
Primer registro como admin
Admin Junaeb		admin@junaeb.cl		12345678

BD

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE orders (id SERIAL PRIMARY KEY,
    date DATE, is_rectifield INT,
    observations VARCHAR(1024),
    school_id INT,
    vegetarian INT,
    vegetarian_real INT,
    celiac INT,
    celiac_real INT,
    standar INT,
    standar_real INT,
    caloric INT,
    caloric_real INT,
    ethnic INT,
    ethnic_real INT,
FOREIGN KEY (school_id) references users(id)
);

INSERT INTO users
    (name, email, password)
VALUES('Admin Junaeb', 'admin@junaeb.cl', '12345678');


npm start;



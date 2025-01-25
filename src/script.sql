--tabla de menus

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,            
    username VARCHAR(50) NOT NULL,    
    email VARCHAR(100) NOT NULL,      
    password VARCHAR(100) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);
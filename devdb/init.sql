CREATE USER rs_user WITH PASSWORD 'password1';

CREATE DATABASE rs_public_db;

GRANT ALL PRIVILEGES ON DATABASE rs_public_db to rs_user; 
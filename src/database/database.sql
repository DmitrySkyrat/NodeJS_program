create TABLE users(
  id SERIAL PRIMARY KEY,
  login VARCHAR(255),
  password VARCHAR(255),
  age INTEGER,
  isDeleted BOOLEAN
);

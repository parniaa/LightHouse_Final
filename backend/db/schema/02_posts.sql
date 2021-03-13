DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
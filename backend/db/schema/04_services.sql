DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    fee INT NOT NULL,
    created_at INT NOT NULL,
    modified_at INT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE

);
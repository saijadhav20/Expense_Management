CREATE TABLE IF NOT EXISTS company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_currency VARCHAR(10) NOT NULL,
    created_by INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add the foreign key link from users → company now that company exists
ALTER TABLE users
ADD CONSTRAINT fk_user_company
FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE;
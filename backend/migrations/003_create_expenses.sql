DROP TABLE IF EXISTS expenses CASCADE;

CREATE TABLE IF NOT EXISTS expenses (
    expense_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    company_id INT NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    description TEXT,
    category VARCHAR(100),
    amount_original NUMERIC(12,2) NOT NULL,
    currency_original VARCHAR(10) NOT NULL,
    amount_converted NUMERIC(12,2) NOT NULL,
    currency_converted VARCHAR(10) NOT NULL,
    expense_date DATE NOT NULL,
    receipt_url TEXT,
    status VARCHAR(20) CHECK (status IN ('Draft','Pending','Approved','Rejected')) DEFAULT 'Pending',
    manager_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
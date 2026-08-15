CREATE TABLE IF NOT EXISTS providers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id INT UNSIGNED NULL,
    name VARCHAR(150) NOT NULL,
    cpu VARCHAR(255) DEFAULT NULL,
    ram VARCHAR(100) DEFAULT NULL,
    disk VARCHAR(255) DEFAULT NULL,
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency ENUM('USD','EUR','IDR') NOT NULL DEFAULT 'USD',
    period ENUM('monthly','annual') NOT NULL DEFAULT 'monthly',
    due_date DATE NOT NULL,
    notes TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_servers_provider
        FOREIGN KEY (provider_id)
        REFERENCES providers(id)
        ON DELETE SET NULL
);

INSERT INTO providers (name) VALUES
('Example Provider'),
('Cloud Provider'),
('Dedicated Server Provider');

INSERT INTO servers
(provider_id, name, cpu, ram, disk, price, currency, period, due_date, notes, sort_order)
VALUES
(1, 'DEMO-NODE-01', 'AMD Ryzen 5950X', '128 GB DDR4', '1 TB NVMe SSD',
 157.00, 'USD', 'monthly', '2026-08-20', 'Demo server', 1),

(2, 'DEMO-NODE-02', 'Intel Xeon', '64 GB DDR4', '2 TB SSD',
 95.00, 'EUR', 'monthly', '2026-08-24', 'Demo server', 2),

(3, 'DEMO-NODE-03', 'AMD EPYC', '128 GB ECC', '2 TB SSD RAID-1',
 2800000.00, 'IDR', 'monthly', '2026-08-28', 'Demo server', 3),

(1, 'DEMO-NODE-04', 'Intel Core i9', '64 GB RAM', '1 TB NVMe',
 92.00, 'USD', 'monthly', '2026-09-02', 'Demo server', 4);

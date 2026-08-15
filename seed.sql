-- Server Expense Tracker
-- Public demo seed. Contains no real infrastructure data.

CREATE TABLE IF NOT EXISTS servers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  provider VARCHAR(120) NOT NULL,
  name VARCHAR(180) NOT NULL,
  price DECIMAL(15,2) NOT NULL DEFAULT 0,
  currency ENUM('USD','EUR','IDR') NOT NULL DEFAULT 'USD',
  period ENUM('monthly','annual') NOT NULL DEFAULT 'monthly',
  due_day TINYINT UNSIGNED NOT NULL,
  due_month TINYINT UNSIGNED NOT NULL DEFAULT 1,
  cpu VARCHAR(255) DEFAULT NULL,
  ram VARCHAR(255) DEFAULT NULL,
  disk VARCHAR(255) DEFAULT NULL,
  meta VARCHAR(500) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_due(due_month,due_day)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO servers
(provider,name,price,currency,period,due_day,due_month,cpu,ram,disk,meta,notes)
VALUES
('Example Provider','DEMO-NODE-01',92,'USD','monthly',5,1,
 'AMD Ryzen 9','64 GB DDR4','1 TB NVMe',NULL,'Public demo data'),
('Cloud Provider','DEMO-NODE-02',157,'USD','monthly',12,1,
 'AMD EPYC','128 GB DDR4','2 TB NVMe',NULL,'Public demo data'),
('Dedicated Provider','DEMO-NODE-03',95,'EUR','monthly',18,1,
 'Intel Xeon','64 GB ECC','2 x 960 GB SSD',NULL,'Public demo data'),
('Example Provider','DEMO-NODE-04',2800000,'IDR','monthly',22,1,
 'Intel Xeon','64 GB RAM','2 TB SSD','Demo location','Public demo data'),
('Cloud Provider','DEMO-NODE-05',2850000,'IDR','annual',1,7,
 '6 CPU','24 GB RAM','300 GB SSD',NULL,'Public demo data');

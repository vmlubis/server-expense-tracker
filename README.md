# Server Expense Tracker

A simple self-hosted PHP application for tracking server expenses, recurring costs, and billing due dates.

## Features

- Monthly and annual billing
- USD, EUR, and IDR support
- Due dates highlighted on server cards
- Provider information
- Add, edit, and delete servers
- Drag & drop card ordering
- Responsive interface
- PHP session authentication
- Password hashing with `password_hash()` / `password_verify()`
- CSRF protection
- PDO prepared statements
- Asia/Jakarta timezone
- No framework required

## Requirements

- PHP 8.0+
- MySQL / MariaDB
- PDO MySQL extension
- Apache with `.htaccess` support

## Installation

1. Clone or upload the repository.
2. Create a MySQL/MariaDB database.
3. Copy `config/config.example.php` to `config/config.php`.
4. Put your own database host, database name, username, and password in `config/config.php`.
5. Generate a password hash with:

```php
echo password_hash('your-password', PASSWORD_DEFAULT);
```

6. Put the generated hash into `APP_PASSWORD_HASH`.
7. Import `seed.sql` for demo data, or create your own server records.
8. Open the application in your browser.

## Demo

This public repository contains **dummy infrastructure data only**.

The example configuration includes a demo password hash for `demo123`. Change it before using the application anywhere outside a demo environment.

## Security

Never commit `config/config.php`, `.env` files, production database dumps, real server IPs, credentials, invoices, or other private infrastructure information.

## License

MIT

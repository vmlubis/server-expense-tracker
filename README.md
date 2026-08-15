# Server Expense Tracker

Simple self-hosted server expense tracker built with PHP and MySQL.

Track recurring server costs, billing dates, providers, and infrastructure expenses from a simple web interface.

## Features

- Server expense tracking
- Monthly and annual billing
- Multiple currencies (USD, EUR, IDR)
- Billing due dates
- Provider management
- Add, edit, and delete servers
- Drag & drop server ordering
- Responsive interface
- PHP session authentication
- MySQL database
- Lightweight — no framework required

## Tech Stack

- PHP 8+
- MySQL / MariaDB
- JavaScript
- HTML
- CSS

## Installation

1. Clone the repository.
2. Create a MySQL database.
3. Import `seed.sql`.
4. Copy `config.example.php` to `config.php`.
5. Configure your database credentials.
6. Configure the application password.
7. Open the application in your browser.

## Configuration

Never commit your production credentials.

Copy:

`config.example.php`

to:

`config.php`

and configure your database connection.

## Demo

This repository uses dummy data and is safe for public demonstration.

## License

MIT

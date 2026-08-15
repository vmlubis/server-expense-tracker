<?php
require __DIR__ . '/config/config.php';
if (!empty($_SESSION['authenticated'])) { header('Location: index.php'); exit; }
$error='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
    $p=(string)($_POST['password']??'');
    if (defined('APP_PASSWORD_HASH') && password_verify($p, APP_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['authenticated']=true;
        $_SESSION['csrf']=bin2hex(random_bytes(32));
        header('Location: index.php'); exit;
    }
    $error='Password salah.';
}
?>
<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Login · Server Reminder</title><link rel="stylesheet" href="assets/css/style.css"></head>
<body class="login"><main class="login-card"><div class="lock">🔒</div><h1>Server Reminder</h1><p>Masukkan password untuk membuka aplikasi.</p><?php if($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?><form method="post"><input type="password" name="password" placeholder="Password" required autofocus><button class="btn primary">Masuk</button></form></main></body></html>

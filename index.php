<?php
require __DIR__ . '/config/config.php';
require_auth();
?>
<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080d18"><title>Server Reminder</title><link rel="stylesheet" href="assets/css/style.css"></head>
<body>
<div class="wrap">
<header class="topbar">
  <div><h1>SERVER <span>REMINDER</span></h1><p>Simple server billing reminder · WIB</p></div>
  <div class="actions"><button class="btn primary" id="addBtn">＋ Tambah Server</button><button class="btn" id="resetBtn">↺ Reset Urutan</button><a class="btn" href="logout.php">Lock</a></div>
</header>
<div id="totals" class="totals"></div>
<div id="info" class="info"></div>
<div id="grid" class="grid"></div>
<div class="footer">Drag card untuk mengubah urutan · Perubahan tersimpan di browser ini</div>
</div>

<div class="modal" id="modal"><div class="modal-box">
<div class="modal-head"><h3 id="modalTitle">Tambah Server</h3><button class="x" data-close>×</button></div>
<form id="form" class="form">
<input type="hidden" id="id">
<div class="form-grid">
<label>Provider<select id="providerSelect"></select><input id="providerNew" class="hidden" placeholder="Nama provider baru"></label>
<label>Nama / Alias<input id="name" required></label>
<label>Harga<input id="price" type="number" min="0" step="0.01" required></label>
<label>Mata uang<select id="currency"><option>USD</option><option>EUR</option><option>IDR</option></select></label>
<label>Periode<select id="period"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
<label>Due day<input id="dueDay" type="number" min="1" max="31" required></label>
<label>Due month (annual)<select id="dueMonth">
<option value="1">Januari</option><option value="2">Februari</option><option value="3">Maret</option><option value="4">April</option><option value="5">Mei</option><option value="6">Juni</option><option value="7">Juli</option><option value="8">Agustus</option><option value="9">September</option><option value="10">Oktober</option><option value="11">November</option><option value="12">Desember</option>
</select></label>
<label>CPU<input id="cpu"></label><label>RAM<input id="ram"></label><label>Disk<input id="disk"></label><label>Detail/ID<input id="meta"></label>
<label class="full">Catatan<textarea id="notes" rows="3"></textarea></label>
</div>
<div class="form-actions"><button type="button" class="btn" data-close>Batal</button><button class="btn primary">Simpan</button></div>
</form></div></div>
<div id="toast"></div>
<script>window.CSRF_TOKEN=<?=json_encode(csrf_token())?>;</script>
<script src="assets/js/app.js"></script>
</body></html>

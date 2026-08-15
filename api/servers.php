<?php
require __DIR__ . '/../config/config.php';
require_auth();

if ($_SERVER['REQUEST_METHOD']==='GET') {
    $rows=db()->query("SELECT * FROM servers ORDER BY due_month, due_day, name")->fetchAll();
    foreach($rows as &$r) $r['id']=(int)$r['id'];
    json_response(['servers'=>$rows]);
}
verify_csrf();
$input=json_decode(file_get_contents('php://input'), true) ?? $_POST;
$action=$input['action']??'';

if($action==='save'){
    $id=(int)($input['id']??0);
    $provider=trim((string)($input['provider']??''));
    $name=trim((string)($input['name']??''));
    $price=(float)($input['price']??0);
    $currency=(string)($input['currency']??'USD');
    $period=(string)($input['period']??'monthly');
    $dueDay=max(1,min(31,(int)($input['due_day']??1)));
    $dueMonth=max(1,min(12,(int)($input['due_month']??1)));
    $cpu=trim((string)($input['cpu']??'')); $ram=trim((string)($input['ram']??''));
    $disk=trim((string)($input['disk']??'')); $meta=trim((string)($input['meta']??''));
    $notes=trim((string)($input['notes']??''));
    if($provider===''||$name==='') json_response(['error'=>'Provider dan nama wajib diisi'],422);

    if($id){
        db()->prepare("UPDATE servers SET provider=?,name=?,price=?,currency=?,period=?,due_day=?,due_month=?,cpu=?,ram=?,disk=?,meta=?,notes=?,updated_at=NOW() WHERE id=?")
          ->execute([$provider,$name,$price,$currency,$period,$dueDay,$dueMonth,$cpu,$ram,$disk,$meta,$notes,$id]);
    }else{
        db()->prepare("INSERT INTO servers(provider,name,price,currency,period,due_day,due_month,cpu,ram,disk,meta,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)")
          ->execute([$provider,$name,$price,$currency,$period,$dueDay,$dueMonth,$cpu,$ram,$disk,$meta,$notes]);
        $id=(int)db()->lastInsertId();
    }
    json_response(['ok'=>true,'id'=>$id]);
}
if($action==='delete'){
    $id=(int)($input['id']??0);
    db()->prepare("DELETE FROM servers WHERE id=?")->execute([$id]);
    json_response(['ok'=>true]);
}
json_response(['error'=>'Unknown action'],400);

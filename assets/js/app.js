const $=s=>document.querySelector(s);
let servers=[];
let orderIds=JSON.parse(localStorage.getItem("server_order_v1")||"[]");

const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const fmt=(n,c)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:c,maximumFractionDigits:c==="IDR"?0:2}).format(Number(n));
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

async function api(url,opt={}){
  opt.headers={...(opt.headers||{}),"X-CSRF-TOKEN":window.CSRF_TOKEN};
  const r=await fetch(url,opt);
  const j=await r.json().catch(()=>({error:"Response server bukan JSON"}));
  if(!r.ok) throw Error(j.error||"Request gagal");
  return j;
}
function dueLabel(s){
  return s.period==="annual" ? `${s.due_day} ${months[s.due_month-1]} setiap tahun` : `Tanggal ${s.due_day} setiap bulan`;
}
function dateSort(a,b){
  if(Number(a.due_month)!==Number(b.due_month)) return Number(a.due_month)-Number(b.due_month);
  if(Number(a.due_day)!==Number(b.due_day)) return Number(a.due_day)-Number(b.due_day);
  return a.name.localeCompare(b.name);
}
function applyOrder(){
  const known=new Map(servers.map(s=>[Number(s.id),s]));
  const used=new Set();
  const custom=[];
  orderIds.forEach(id=>{if(known.has(Number(id))){custom.push(known.get(Number(id)));used.add(Number(id));}});
  const rest=servers.filter(s=>!used.has(Number(s.id))).sort(dateSort);
  servers=[...custom,...rest];
  orderIds=servers.map(s=>Number(s.id));
  localStorage.setItem("server_order_v1",JSON.stringify(orderIds));
}
async function load(){servers=(await api("api/servers.php")).servers||[];applyOrder();render();}
function render(){
  const totals={USD:{monthly:0,annual:0},EUR:{monthly:0,annual:0},IDR:{monthly:0,annual:0}};
  servers.forEach(s=>{
    if(totals[s.currency] && totals[s.currency][s.period]!==undefined){
      totals[s.currency][s.period]+=Number(s.price||0);
    }
  });
  $("#totals").innerHTML=["USD","EUR","IDR"].map(c=>`
    <div class="total-card">
      <div class="total-currency">${c}</div>
      <div class="total-row"><span>Monthly</span><b>${fmt(totals[c].monthly,c)}</b></div>
      <div class="total-row"><span>Annual</span><b>${fmt(totals[c].annual,c)}</b></div>
    </div>
  `).join("");
  $("#info").textContent=`${servers.length} server · Urutan tersimpan`;
  $("#grid").innerHTML=servers.length?servers.map((s,i)=>card(s,i)).join(""):`<div class="empty">Belum ada server.</div>`;
  enableDrag();
}
function card(s,i){
  const isAnnual=s.period==="annual";
  return `<article class="server" draggable="true" data-id="${s.id}">
    <div class="date-badge"><span>DUE</span><b>${s.due_day}</b><small>${isAnnual?months[s.due_month-1].toUpperCase():"SETIAP BULAN"}</small></div>
    <div class="server-body">
      <div class="top"><div><div class="name">${esc(s.name)}</div><div class="provider">${esc(s.provider)}</div></div>
      <div class="tools"><button class="icon" onclick="editServer(${s.id})">✎</button><button class="icon" onclick="removeServer(${s.id})">×</button></div></div>
      <div class="specs">
        ${s.cpu?`<div><label>CPU</label><span>${esc(s.cpu)}</span></div>`:""}
        ${s.ram?`<div><label>RAM</label><span>${esc(s.ram)}</span></div>`:""}
        ${s.disk?`<div><label>DISK</label><span>${esc(s.disk)}</span></div>`:""}
        ${s.meta?`<div><label>INFO</label><span>${esc(s.meta)}</span></div>`:""}
      </div>
      <div class="price">${fmt(s.price,s.currency)} <small>/${isAnnual?"year":"month"}</small></div>
      <div class="due-text">📅 ${esc(dueLabel(s))}</div>
      ${s.notes?`<div class="note">${esc(s.notes)}</div>`:""}
    </div>
  </article>`;
}
function enableDrag(){
  $$(".server").forEach(el=>{
    el.addEventListener("dragstart",()=>el.classList.add("dragging"));
    el.addEventListener("dragend",()=>{el.classList.remove("dragging");saveOrderFromDOM()});
    el.addEventListener("dragover",e=>{e.preventDefault();const dragging=document.querySelector(".dragging");if(!dragging||dragging===el)return;const box=el.getBoundingClientRect();const after=e.clientY>box.top+box.height/2||e.clientX>box.left+box.width/2; if(after)el.after(dragging);else el.before(dragging);});
  });
}
function saveOrderFromDOM(){orderIds=[...document.querySelectorAll(".server")].map(x=>Number(x.dataset.id));localStorage.setItem("server_order_v1",JSON.stringify(orderIds));servers.sort((a,b)=>orderIds.indexOf(Number(a.id))-orderIds.indexOf(Number(b.id)));toast("Urutan disimpan")}
function providers(){return [...new Set(servers.map(s=>s.provider).filter(Boolean))].sort((a,b)=>a.localeCompare(b));}
function fillProvider(value=""){
  const opts=['<option value="">Pilih provider…</option>',...providers().map(p=>`<option value="${esc(p)}">${esc(p)}</option>`),'<option value="__new__">＋ Provider baru…</option>'];
  $("#providerSelect").innerHTML=opts.join("");
  if(providers().includes(value)) $("#providerSelect").value=value;
  else if(value){$("#providerSelect").value="__new__";$("#providerNew").classList.remove("hidden");$("#providerNew").value=value;}
  else $("#providerSelect").value="";
}
function openModal(id=null){
  $("#modal").classList.add("open");$("#form").reset();$("#id").value=id||"";
  $("#modalTitle").textContent=id?"Edit Server":"Tambah Server";
  $("#providerNew").classList.add("hidden");$("#providerNew").value="";
  if(id){
    const s=servers.find(x=>Number(x.id)===Number(id));
    fillProvider(s.provider); $("#name").value=s.name;$("#price").value=s.price;$("#currency").value=s.currency;$("#period").value=s.period;$("#dueDay").value=s.due_day;$("#dueMonth").value=s.due_month;$("#cpu").value=s.cpu||"";$("#ram").value=s.ram||"";$("#disk").value=s.disk||"";$("#meta").value=s.meta||"";$("#notes").value=s.notes||"";
  }else fillProvider("");
}
function closeModal(){ $("#modal").classList.remove("open"); }
$("#addBtn").onclick=()=>openModal(); document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModal);
$("#providerSelect").onchange=()=>{const v=$("#providerSelect").value;$("#providerNew").classList.toggle("hidden",v!=="__new__");if(v!=="__new__")$("#providerNew").value="";};
$("#form").onsubmit=async e=>{
  e.preventDefault();
  const pv=$("#providerSelect").value==="__new__"?$("#providerNew").value.trim():$("#providerSelect").value;
  if(!pv)return toast("Pilih atau isi provider");
  const payload={action:"save",id:$("#id").value,provider:pv,name:$("#name").value.trim(),price:$("#price").value,currency:$("#currency").value,period:$("#period").value,due_day:$("#dueDay").value,due_month:$("#dueMonth").value,cpu:$("#cpu").value.trim(),ram:$("#ram").value.trim(),disk:$("#disk").value.trim(),meta:$("#meta").value.trim(),notes:$("#notes").value.trim()};
  try{await api("api/servers.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});closeModal();toast("Server tersimpan");await load();}catch(e){toast(e.message);}
};
async function editServer(id){openModal(id)}
async function removeServer(id){
  const s=servers.find(x=>Number(x.id)===Number(id));if(!s)return;
  if(confirm(`Hapus ${s.name}?`)){try{await api("api/servers.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"delete",id})});orderIds=orderIds.filter(x=>Number(x)!==Number(id));localStorage.setItem("server_order_v1",JSON.stringify(orderIds));toast("Server dihapus");await load();}catch(e){toast(e.message)}}
}
$("#resetBtn").onclick=()=>{if(confirm("Kembalikan urutan berdasarkan tanggal due?")){orderIds=[];localStorage.removeItem("server_order_v1");load();}};
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
load().catch(e=>toast(e.message));

// gn-math script.js — FINAL 2025 VERSION (works instantly, no fullscreen needed)
const c=document.getElementById('container'),v=document.getElementById('zoneViewer'),s=document.getElementById('searchBar'),o=document.getElementById('sortOptions'),n=document.getElementById('zoneCount');
const Z="https://cdn.jsdelivr.net/gh/NikeGtag/data@main/games.json",C="https://cdn.jsdelivr.net/gh/gn-math/covers@main",H="https://cdn.jsdelivr.net/gh/gn-math/html@main";
let z=[],p={},f=null,u=null;

document.addEventListener("DOMContentLoaded",()=>{v.style.display="none";v.style.visibility="hidden";s.focus()});

async function L(){try{let r=await fetch(Z+"?t="+Date.now());z=await r.json();await P();S();let q=new URLSearchParams(location.search).get('id');if(q){let x=z.find(e=>e.id+""===q);x&&O(x)}}catch(e){c.innerHTML=`<div style="color:red;padding:20px">Error: ${e}</div>`}}

async function P(){try{let r=await fetch("https://data.jsdelivr.com/v1/stats/packages/gh/gn-math/html@main/files?period=year"),d=await r.json();d.forEach(e=>{let m=e.name.match(/\/(\d+)\.html$/);m&&(p[parseInt(m[1])]=e.hits.total)})}catch{}}

function S(){let t=o.value;t==="name"?z.sort((a,b)=>a.name.localeCompare(b.name)):t==="id"?z.sort((a,b)=>a.id-b.id):t==="popular"&&z.sort((a,b)=>(p[b.id]||0)-(p[a.id]||0));z.sort((a,b)=>a.id===-1?-1:b.id===-1?1:0);D(z)}

function D(l){c.innerHTML="";l.forEach(e=>{let d=document.createElement("div");d.className="zone-item";d.onclick=()=>O(e);let i=document.createElement("img");i.src=e.cover.replace("{COVER_URL}",C).replace("{HTML_URL}",H)+"?t="+Date.now();i.loading="lazy";d.appendChild(i);let b=document.createElement("button");b.textContent=e.name;b.onclick=x=>{x.stopPropagation();O(e)};d.appendChild(b);c.appendChild(d)});n.textContent=l.length?`Zones Loaded: ${l.length}`:"No zones found"}

function F(){let q=s.value.toLowerCase(),x=z.filter(e=>e.name.toLowerCase().includes(q)||(e.tags&&e.tags.some(t=>t.toLowerCase().includes(q))));D(x)}

function O(e){u=e;if(e.url.startsWith("http"))return void window.open(e.url,"_blank");v.style.display="block";v.style.visibility="visible";let t=e.url.replace("{COVER_URL}",C).replace("{HTML_URL}",H);fetch(t+"?t="+Date.now()).then(r=>r(r.ok)?r.text():Promise.reject("Not found")).then(h=>{f&&f.parentNode&&f.remove();f=document.createElement("iframe");f.id="zoneFrame";f.sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-popups-to-escape-sandbox allow-downloads";f.allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking";v.appendChild(f);let d=f.contentDocument||f.contentWindow.document;d.open();d.write(h);d.close();document.getElementById("zoneName").textContent=e.name||"Game";let a=document.getElementById("zoneAuthor");a.textContent=e.author?"by "+e.author:"by Unknown";a.href=e.authorLink||"#";v.scrollTop=0}).catch(()=>{alert("Failed to load game");X()})}

function X(){v.style.display="none";v.style.visibility="hidden";f&&f.parentNode&&(f.remove(),f=null);u=null}

function A(){f&&(f.requestFullscreen||f.webkitRequestFullscreen||f.mozRequestFullScreen||f.msRequestFullscreen||(()=>alert("Fullscreen blocked — press F11"))())}

function B(){if(!u)return alert("No game open");let w=window.open("about:blank","_blank");if(!w)return alert("Popup blocked!");let t=u.url.replace("{COVER_URL}",C).replace("{HTML_URL}",H);fetch(t+"?t="+Date.now()).then(r=>r.text()).then(h=>{w.document.open();w.document.write(h);w.document.close();w.document.title=u.name||"Game"})}

function W(){if(!u)return alert("No game open");let t=u.url.replace("{HTML_URL}",H)+"?t="+Date.now();fetch(t).then(r=>r.text()).then(x=>{let b=new Blob([x],{type:"text/html"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=(u.name||"game").replace(/[^a-z0-9]/gi,"_")+".html";a.click();URL.revokeObjectURL(a.href)})}

function darkMode(){document.body.classList.toggle("dark-mode")}
function cloakName(t){document.title=t.trim()||"homework bro bro"}
function cloakIcon(u){let l=document.querySelector("link[rel*='icon']")||(l=document.createElement("link"),l.rel="icon",document.head.appendChild(l));l.href=u.trim()||"favicon.png"}
function tabCloak(){closePopup();document.getElementById("popupTitle").textContent="Tab Cloak";document.getElementById("popupBody").innerHTML=`<label>Title:</label><br><input type="text" placeholder="Google Docs" oninput="cloakName(this.value)"><br><br><label>Icon:</label><br><input type="text" placeholder="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" oninput="cloakIcon(this.value)">`;document.getElementById("popupOverlay").style.display="flex"}
function showContact(){closePopup();document.getElementById("popupTitle").textContent="Contact";document.getElementById("popupBody").innerHTML=`<p>Discord: <a href="https://discord.gg/NAFw4ykZ7n" target="_blank">discord.gg/NAFw4ykZ7n</a></p>`;document.getElementById("popupOverlay").style.display="flex"}
function closePopup(){document.getElementById("popupOverlay").style.display="none"}
document.getElementById("settings").onclick=()=>{document.getElementById("popupTitle").textContent="Settings";document.getElementById("popupBody").innerHTML=`<button onclick="darkMode()">Toggle Dark Mode</button><br><br><button onclick="tabCloak()">Tab Cloak</button><br><br><button onclick="showContact()">Contact</button>`;document.getElementById("popupOverlay").style.display="flex"}
document.getElementById("popupOverlay").onclick=e=>{e.target===document.getElementById("popupOverlay")&&closePopup()}

s.addEventListener("input",F);o.addEventListener("change",S);
L();

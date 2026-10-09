const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

const HTML = `<!DOCTYPE html>
<html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"><meta name="theme-color" content="#0f172a"><title>LiteChat</title><style>
*{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,sans-serif;-webkit-tap-highlight-color:transparent}html,body{height:100%;overflow:hidden}body{background:#0f172a;color:#fff}
#login{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;padding:24px;background:linear-gradient(135deg,#0f172a 0%,#1a2332 100%)}
.login-box{background:#1e293b;padding:32px 24px;border-radius:24px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 1px rgba(34,197,94,.1)}
.login-logo{width:72px;height:72px;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px;box-shadow:0 8px 24px rgba(34,197,94,.4)}
.login-box h2{text-align:center;font-size:24px;margin-bottom:4px}
.login-sub{text-align:center;color:#94a3b8;font-size:13px;margin-bottom:24px}
.login-box input{width:100%;padding:14px 18px;margin-bottom:12px;border:2px solid #334155;border-radius:14px;background:#0f172a;color:#fff;outline:none;font-size:15px}
.login-box input:focus{border-color:#22c55e}
.login-box button{width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 14px rgba(34,197,94,.4)}
#chat{display:none;flex-direction:column;height:100vh}
#header{background:#1e293b;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;flex-shrink:0;box-shadow:0 2px 10px rgba(0,0,0,.3);z-index:5}
.header-left{display:flex;align-items:center;gap:10px}
.header-logo{width:40px;height:40px;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px}
.header-title{font-size:16px;font-weight:700}
.header-sub{font-size:11px;color:#94a3b8;display:flex;align-items:center;gap:4px;margin-top:2px}
.live-dot{width:7px;height:7px;background:#22c55e;border-radius:50%;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,.7)}50%{opacity:.6;box-shadow:0 0 0 6px rgba(34,197,94,0)}}
.me-badge{display:flex;align-items:center;gap:6px;background:#334155;padding:6px 12px;border-radius:20px;font-size:12px}
.me-avatar{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;color:#fff}
#messages{flex:1;overflow-y:auto;padding:16px;background:linear-gradient(180deg,#0f172a 0%,#131c2e 100%);scroll-behavior:smooth}
.msg-row{display:flex;gap:8px;margin-bottom:14px;align-items:flex-end;animation:slideIn .2s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-row.me{flex-direction:row-reverse}
.avatar{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.3)}
.bubble{max-width:72%;padding:9px 14px;border-radius:18px;font-size:14px;line-height:1.4;word-wrap:break-word}
.bubble .bubble-name{font-size:11px;font-weight:700;margin-bottom:3px;opacity:.9}
.bubble.them{background:#1e293b;color:#e2e8f0;border-bottom-left-radius:4px}
.bubble.me{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border-bottom-right-radius:4px;box-shadow:0 2px 8px rgba(34,197,94,.3)}
.bubble .time{font-size:10px;opacity:.7;margin-top:3px;text-align:right}
.system-msg{text-align:center;color:#64748b;font-size:12px;padding:6px 12px;margin:8px auto;background:#1e293b;border-radius:12px;display:table;max-width:80%}
#typing{padding:0 20px 8px;font-size:12px;color:#22c55e;font-style:italic;height:20px;flex-shrink:0;display:flex;align-items:center;gap:6px}
.typing-dots{display:inline-flex;gap:2px}
.typing-dots span{width:4px;height:4px;background:#22c55e;border-radius:50%;animation:bounce 1.4s infinite ease-in-out}
.typing-dots span:nth-child(1){animation-delay:-.32s}.typing-dots span:nth-child(2){animation-delay:-.16s}
@keyframes bounce{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
#inputArea{background:#1e293b;padding:10px 12px;display:flex;gap:8px;align-items:center;border-top:1px solid #334155;flex-shrink:0}
#msgInput{flex:1;background:#0f172a;border:1.5px solid #334155;border-radius:24px;padding:12px 18px;color:#fff;font-size:15px;outline:none}
#msgInput:focus{border-color:#22c55e}
#sendBtn{width:46px;height:46px;border-radius:50%;border:none;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;box-shadow:0 4px 12px rgba(34,197,94,.4)}
</style></head><body>
<div id="login"><div class="login-box"><div class="login-logo">💬</div><h2>LiteChat</h2><p class="login-sub">হালকা, সুন্দর, রিয়েল-টাইম চ্যাট</p><input id="username" placeholder="আপনার নাম লিখুন" maxlength="20"><button onclick="joinChat()">চ্যাটে যান →</button></div></div>
<div id="chat"><div id="header"><div class="header-left"><div class="header-logo">💬</div><div><div class="header-title">LiteChat</div><div class="header-sub"><div class="live-dot"></div><span id="onlineCount">০ জন অনলাইনে</span></div></div></div><div class="me-badge"><div class="me-avatar" id="meAvatar">?</div><span id="meName">You</span></div></div>
<div id="messages"></div><div id="typing"></div>
<div id="inputArea"><input id="msgInput" placeholder="মেসেজ লিখুন..." autocomplete="off"><button id="sendBtn" onclick="sendMsg()"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div></div>
<script src="/socket.io/socket.io.js"></script>
<script>
const socket=io();let username='',myColor='#22c55e',typingTimeout=null;
const AVATAR_COLORS=['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#8b5cf6','#ec4899','#f43f5e','#06b6d4'];
function getColor(n){let h=0;for(let i=0;i<n.length;i++)h=n.charCodeAt(i)+((h<<5)-h);return AVATAR_COLORS[Math.abs(h)%AVATAR_COLORS.length]}
function joinChat(){const n=document.getElementById('username').value.trim();if(!n)return alert('নাম লিখুন!');username=n;myColor=getColor(n);document.getElementById('login').style.display='none';document.getElementById('chat').style.display='flex';document.getElementById('meName').textContent=username;const av=document.getElementById('meAvatar');av.textContent=username[0].toUpperCase();av.style.background=myColor;socket.emit('user join',username);setTimeout(()=>document.getElementById('msgInput').focus(),100)}
function sendMsg(){const i=document.getElementById('msgInput');const t=i.value.trim();if(!t)return;socket.emit('chat message',{user:username,text:t});socket.emit('stop typing');i.value='';i.focus()}
document.getElementById('msgInput').addEventListener('keypress',e=>{if(e.key==='Enter')sendMsg()});
document.getElementById('username').addEventListener('keypress',e=>{if(e.key==='Enter')joinChat()});
document.getElementById('msgInput').addEventListener('input',()=>{socket.emit('typing',username);clearTimeout(typingTimeout);typingTimeout=setTimeout(()=>socket.emit('stop typing'),1200)});
const messagesEl=document.getElementById('messages');
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function addMsg(d){const isMe=d.user===username;const r=document.createElement('div');r.className='msg-row'+(isMe?' me':'');const a=document.createElement('div');a.className='avatar';a.textContent=d.user[0].toUpperCase();a.style.background=d.color||getColor(d.user);const b=document.createElement('div');b.className='bubble '+(isMe?'me':'them');b.innerHTML=(isMe?'':'<div class="bubble-name" style="color:'+(d.color||getColor(d.user))+'">'+d.user+'</div>')+'<div>'+escapeHtml(d.text)+'</div><div class="time">'+d.time+(isMe?' ✓✓':'')+'</div>';r.appendChild(a);r.appendChild(b);messagesEl.appendChild(r);messagesEl.scrollTop=messagesEl.scrollHeight}
function addSys(t){const d=document.createElement('div');d.className='system-msg';d.textContent=t;messagesEl.appendChild(d);messagesEl.scrollTop=messagesEl.scrollHeight}
socket.on('chat history',m=>{messagesEl.innerHTML='';m.forEach(addMsg)});
socket.on('chat message',addMsg);socket.on('system message',addSys);
socket.on('online users',u=>{const b=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];const n=u.length.toString().split('').map(d=>b[parseInt(d)]).join('');document.getElementById('onlineCount').textContent=n+' জন অনলাইনে'});
socket.on('user typing',n=>{if(n===username)return;document.getElementById('typing').innerHTML=n+' টাইপ করছে <span class="typing-dots"><span></span><span></span><span></span></span>'});
socket.on('stop typing',()=>{document.getElementById('typing').innerHTML=''});
</script></body></html>`;

app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.send(HTML);
});

const messages = [];
const onlineUsers = new Map();
const AVATAR_COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#8b5cf6','#ec4899','#f43f5e','#06b6d4'];
function getColor(name){let h=0;for(let i=0;i<name.length;i++)h=name.charCodeAt(i)+((h<<5)-h);return AVATAR_COLORS[Math.abs(h)%AVATAR_COLORS.length]}

io.on('connection', (socket) => {
  socket.emit('chat history', messages);
  socket.on('user join', (name) => {
    onlineUsers.set(socket.id, { name, color: getColor(name) });
    io.emit('online users', Array.from(onlineUsers.values()));
    io.emit('system message', name + ' যুক্ত হয়েছেন');
  });
  socket.on('chat message', (data) => {
    const msg = { id: Date.now() + Math.random(), user: data.user, text: data.text, color: getColor(data.user), time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }), timestamp: Date.now() };
    messages.push(msg);
    if (messages.length > 200) messages.shift();
    io.emit('chat message', msg);
  });
  socket.on('typing', (n) => socket.broadcast.emit('user typing', n));
  socket.on('stop typing', () => socket.broadcast.emit('stop typing'));
  socket.on('disconnect', () => {
    const u = onlineUsers.get(socket.id);
    if (u) { onlineUsers.delete(socket.id); io.emit('online users', Array.from(onlineUsers.values())); io.emit('system message', u.name + ' চলে গেছেন'); }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('সার্ভার চালু: পোর্ট ' + PORT));

/* NURVA whale companion: face-based moods (SVG), daily check-in questions, and the "story room" chat.
   Everything is scripted (no AI, no server). Used by child-dashboard, parent-dashboard and report pages. */
(function(){
  var LINE='#4A3A3A', uid=0, CRISIS=/bunuh diri|ingin mati|mau mati|pengen mati|pengin mati|menyakiti diri|nyakitin diri|melukai diri|akhiri hidup|(gak|ga|nggak|tidak|ngga) (mau|ingin|pengen) hidup|kill myself|want to die|hurt myself|self.?harm|end my life/i;
  function drop(x,y,s,c){ return '<path d="M'+x+' '+(y-5*s)+' C'+(x+3*s)+' '+(y-s)+' '+(x+3*s)+' '+(y+3*s)+' '+x+' '+(y+3*s)+' C'+(x-3*s)+' '+(y+3*s)+' '+(x-3*s)+' '+(y-s)+' '+x+' '+(y-5*s)+'Z" fill="'+c+'" stroke="'+LINE+'" stroke-width="1.7" stroke-linejoin="round"/>'; }
  var ST='fill="none" stroke="'+LINE+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
  function eyes(r){ return [40,64].map(function(x){ return '<circle cx="'+x+'" cy="56" r="'+r+'" fill="'+LINE+'"/><circle cx="'+(x+1.3)+'" cy="54.6" r="1.1" fill="#fff"/>'; }).join(''); }
  var FACE={
    senang:{eyes:'<path d="M35.5 58 Q40 50 44.5 58 M59.5 58 Q64 50 68.5 58" '+ST+'/>',
      mouth:'<path d="M43 63 Q52 78 61 63 Z" fill="#8B4A4A" stroke="'+LINE+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M48 70 Q52 66 56 70 Q52 74 48 70Z" fill="#F28B8B"/>',
      spout:drop(44,17,1,'#B8DCEF')+drop(54,10,1.15,'#B8DCEF')+drop(64,17,1,'#B8DCEF'), cheek:'#F4D79A'},
    baik:{eyes:eyes(3.6), mouth:'<path d="M44 65 Q52 73 60 65" '+ST+'/>', spout:drop(47,17,1,'#B8DCEF')+drop(58,13,1.1,'#B8DCEF'), cheek:'#F6E2B0'},
    biasa:{eyes:eyes(3.4), mouth:'<path d="M46 68 L58 68" '+ST+'/>', spout:drop(52,18,.9,'#B8DCEF'), cheek:'#F6E2B0'},
    sedih:{eyes:eyes(3.9)+'<path d="M34 53 L45 48 M59 48 L70 53" '+ST+'/><path d="M35 65 C32 69 32 72 35 72 C38 72 38 69 35 65Z" fill="#8EC5EA" stroke="'+LINE+'" stroke-width="1.6"/>',
      mouth:'<path d="M45 71 Q52 63 59 71" '+ST+'/>', spout:drop(50,24,.7,'#A9CBE3')+drop(58,27,.55,'#A9CBE3'), cheek:'#EFE3C8'},
    marah:{eyes:eyes(3)+'<path d="M34 47 L46 53 M58 53 L70 47" '+ST+'/>',
      mouth:'<path d="M45 70 L48.5 66 L52 70 L55.5 66 L59 70" '+ST+'/>',
      spout:'<path d="M47 11 L52 17 M61 11 L56 17 M47 24 L52 19 M61 24 L56 19" fill="none" stroke="#D9534F" stroke-width="3" stroke-linecap="round"/>', cheek:'#F4A9A0'}
  };
  function svg(m,size){
    var f=FACE[m]||FACE.baik, id='wc'+(++uid), body=m==='sedih'?'#A9CBE3':'#B8DCEF';
    return '<svg class="whale whale-'+m+'" viewBox="0 0 120 100" width="'+size+'" height="'+Math.round(size*100/120)+'" xmlns="http://www.w3.org/2000/svg" role="img">'+
      '<defs><clipPath id="'+id+'"><ellipse cx="54" cy="58" rx="38" ry="30"/></clipPath></defs>'+f.spout+
      '<path d="M86 62 C97 62 101 55 100 47 C96 48 91 45 89 40 C93 35 99 36 102 41 C104 35 110 33 115 36 C115 49 107 63 90 70Z" fill="'+body+'" stroke="'+LINE+'" stroke-width="2.6" stroke-linejoin="round"/>'+
      '<ellipse cx="54" cy="58" rx="38" ry="30" fill="'+body+'" stroke="'+LINE+'" stroke-width="2.6"/>'+
      '<g clip-path="url(#'+id+')"><ellipse cx="54" cy="90" rx="36" ry="17" fill="#FBF0D8"/></g>'+
      '<ellipse cx="54" cy="58" rx="38" ry="30" fill="none" stroke="'+LINE+'" stroke-width="2.6"/>'+
      '<ellipse cx="54" cy="29" rx="3.2" ry="1.5" fill="'+LINE+'"/>'+
      '<path d="M29 46 Q33 38 43 35" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/>'+
      '<ellipse cx="62" cy="85" rx="10" ry="5.5" transform="rotate(28 62 85)" fill="'+body+'" stroke="'+LINE+'" stroke-width="2.4"/>'+
      '<ellipse cx="30" cy="65" rx="5" ry="3.2" fill="'+f.cheek+'"/><ellipse cx="74" cy="65" rx="5" ry="3.2" fill="'+f.cheek+'"/>'+
      f.eyes+f.mouth+'</svg>';
  }
  var T={
   id:{
    whale:'Paus', room:'Ruang cerita', friend:'teman', placeholder:'Tulis ceritamu di sini...', send:'Kirim',
    note:'Paus adalah teman virtual dengan jawaban sederhana, bukan pengganti orang dewasa atau konselor.',
    q:['Hai {n}! Hari ini perasaanmu lagi seperti apa?','Halo {n}, kalau hari ini itu lautan, ombaknya tenang atau besar?','{n}, apa yang paling kamu rasakan sejak bangun tidur tadi?','Paus penasaran nih, gimana hari ini di sekolah atau di rumah?','Hai {n}! Ada yang bikin kamu tersenyum atau kesal hari ini?','{n}, kalau perasaanmu hari ini punya wajah paus, yang mana ya?','{n}, energimu hari ini penuh, setengah, atau hampir habis?','Selamat datang, {n}! Aku mau tahu kabar hatimu hari ini.','Hari ini ada kejadian yang masih kepikiran, {n}?','Kita check-in dulu yuk, {n}. Hatimu lagi terasa gimana?'],
    after:{senang:'Wah, senangnya! Aku ikut senang. Mau cerita apa yang bikin kamu senang?',baik:'Syukurlah kamu baik-baik saja. Mau cerita tentang harimu?',biasa:'Hari yang biasa juga nggak apa-apa. Mau cerita sedikit?',sedih:'Terima kasih sudah jujur, ya. Aku di sini. Mau cerita apa yang bikin kamu sedih?',marah:'Kesal itu wajar kok. Mau cerita apa yang terjadi?'},
    wantTell:'Mau cerita', later:'Nanti saja', laterReply:'Oke, kapan pun kamu siap, aku di sini.', again:'Cerita ke Paus',
    open:{senang:'Wah, kamu lagi senang! Ceritain dong, apa yang bikin harimu begini?',baik:'Syukurlah kamu baik-baik saja. Ceritain harimu ya, aku dengerin.',biasa:'Hari yang biasa juga penting, lho. Mau cerita apa yang kamu rasakan?',sedih:'Aku di sini dan aku dengerin. Apa yang bikin kamu sedih hari ini? Pelan-pelan aja ya.',marah:'Kesal itu wajar. Tarik napas dulu kalau perlu. Apa yang terjadi?'},
    reply:{senang:'Seru banget! Aku ikut senang dengarnya.',baik:'Terima kasih sudah cerita. Aku senang mendengarnya.',biasa:'Aku mengerti. Terima kasih sudah mau cerita ke aku.',sedih:'Terima kasih sudah percaya cerita ke aku. Perasaanmu penting, dan kamu nggak salah merasa begitu.',marah:'Aku dengar kamu. Wajar banget kalau kamu kesal. Terima kasih sudah menceritakannya.'},
    more:'Ada lagi yang mau kamu ceritakan? Kalau sudah cukup, tekan tombol di bawah.', moreAgain:'Aku dengerin kok. Masih ada lagi? Kalau sudah cukup, tekan tombol di bawah.',
    enough:'Cukup segitu', thanks:'Terima kasih sudah bercerita banyak. Kamu hebat.',
    shareAsk:'Mau aku sampaikan ceritamu ke orang tuamu? Kamu yang memutuskan.', shareExtra:'Orang tuamu bisa membantu lebih baik kalau mereka tahu.',
    yes:'Ya, sampaikan', no:'Jangan dulu', done:'Selesai',
    sent:'Sudah aku sampaikan ke orang tuamu. Kamu berani banget sudah cerita.', kept:'Oke, ceritanya tetap jadi rahasia kita berdua. Kalau berubah pikiran, kamu bisa cerita lagi kapan saja.',
    crisis:'Aku khawatir mendengarnya. Kamu penting, dan kamu nggak harus menghadapi ini sendirian. Tolong cerita sekarang ke orang dewasa yang kamu percaya, seperti orang tua, guru, atau wali kelas.',
    help:'<b>Butuh bantuan sekarang?</b><br>SAPA 129 (Kemen PPPA): telepon <a href="tel:129">129</a> atau <a href="https://wa.me/628111129129" target="_blank" rel="noopener">WhatsApp 08111-129-129</a>. Kalau ada bahaya langsung, hubungi polisi di <a href="tel:110">110</a>.'
   },
   en:{
    whale:'Whale', room:'Story room', friend:'friend', placeholder:'Write your story here...', send:'Send',
    note:'Whale is a virtual friend with simple replies, not a replacement for a trusted adult or counselor.',
    q:['Hi {n}! How are you feeling today?','Hello {n}, if today were an ocean, would the waves be calm or big?','{n}, what have you felt the most since you woke up?','I\'m curious, how was today at school or at home?','Hi {n}! Did anything make you smile or feel upset today?','{n}, if your feeling today had a whale face, which one would it be?','{n}, is your energy full, half, or almost gone today?','Welcome, {n}! I\'d love to hear how your heart is today.','Is something from today still on your mind, {n}?','Let\'s check in, {n}. How does your heart feel right now?'],
    after:{senang:'Yay, so happy! I\'m happy too. Want to tell me what made you happy?',baik:'I\'m glad you\'re doing well. Want to tell me about your day?',biasa:'An ordinary day is okay too. Want to share a little?',sedih:'Thank you for being honest. I\'m here. Want to tell me what made you sad?',marah:'Feeling upset is normal. Want to tell me what happened?'},
    wantTell:'I want to talk', later:'Maybe later', laterReply:'Okay, whenever you\'re ready, I\'m here.', again:'Talk to Whale',
    open:{senang:'You\'re happy today! Tell me, what made your day like this?',baik:'I\'m glad you\'re doing well. Tell me about your day, I\'m listening.',biasa:'Ordinary days matter too. Want to tell me how you feel?',sedih:'I\'m here and I\'m listening. What made you sad today? Take your time.',marah:'Feeling upset is okay. Take a breath if you need. What happened?'},
    reply:{senang:'That sounds awesome! I\'m happy to hear it.',baik:'Thank you for sharing. I\'m glad to hear it.',biasa:'I understand. Thank you for telling me.',sedih:'Thank you for trusting me. Your feelings matter, and it\'s okay to feel this way.',marah:'I hear you. It makes sense to feel upset. Thank you for telling me.'},
    more:'Is there more you want to share? If that\'s enough, tap the button below.', moreAgain:'I\'m listening. Anything else? If that\'s enough, tap the button below.',
    enough:'That\'s enough', thanks:'Thank you for sharing so much. You\'re brave.',
    shareAsk:'Would you like me to share your story with your parent? It\'s your decision.', shareExtra:'Your parent can help you better if they know.',
    yes:'Yes, share it', no:'Not now', done:'Done',
    sent:'I\'ve shared it with your parent. It was brave of you to talk.', kept:'Okay, your story stays just between us. If you change your mind, you can talk to me anytime.',
    crisis:'I\'m worried to hear this. You matter, and you don\'t have to face this alone. Please talk now to an adult you trust, like a parent, teacher, or homeroom teacher.',
    help:'<b>Need help right now?</b><br>SAPA 129 (Ministry of Women Empowerment and Child Protection): call <a href="tel:129">129</a> or <a href="https://wa.me/628111129129" target="_blank" rel="noopener">WhatsApp 08111-129-129</a>. If someone is in immediate danger, call the police at <a href="tel:110">110</a>.'
   }
  };
  function tr(l){ return T[l]||T.en; }
  function qIndex(){ return Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5); }
  function question(l,name){ var L=tr(l); return L.q[qIndex()%L.q.length].replace('{n}',name||L.friend); }

  var css='.whale-bob{animation:whaleBob 3.2s ease-in-out infinite}@keyframes whaleBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}'+
  '.wc-overlay{position:fixed;inset:0;background:#EAF3FF;z-index:100;display:flex;flex-direction:column;font-family:"Plus Jakarta Sans",sans-serif;color:#182338}'+
  '.wc-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#2E6BF2,#17399E);color:#fff}'+
  '.wc-av{width:48px;height:48px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}'+
  '.wc-close{border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer}'+
  '.wc-note{font-size:11px;color:#6C7A93;text-align:center;padding:8px 16px 0;line-height:1.5}'+
  '.wc-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;width:100%;max-width:520px;margin:0 auto}'+
  '.wc-msg{max-width:82%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.55;font-weight:600;white-space:pre-wrap;overflow-wrap:anywhere}'+
  '.wc-w{align-self:flex-start;background:#fff;border:1px solid #E2EAF8;border-bottom-left-radius:4px}.wc-c{align-self:flex-end;background:#2E6BF2;color:#fff;border-bottom-right-radius:4px}'+
  '.wc-help{align-self:stretch;background:#FFF2DD;border:1px solid #F0A93E;border-radius:14px;padding:12px;font-size:13px;font-weight:600;line-height:1.6}.wc-help a{color:#17399E;font-weight:800}'+
  '.wc-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 8px;width:100%;max-width:520px;margin:0 auto}'+
  '.wc-chip{border:1.5px solid #2E6BF2;background:#fff;color:#17399E;border-radius:999px;padding:10px 15px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}'+
  '.wc-input{display:flex;gap:8px;padding:10px 14px calc(12px + env(safe-area-inset-bottom));width:100%;max-width:520px;margin:0 auto}'+
  '.wc-input input{flex:1;min-width:0;border:1.5px solid #E2EAF8;border-radius:13px;padding:12px;font:600 14px "Plus Jakarta Sans",sans-serif;background:#fff}'+
  '.wc-send{border:none;background:#2E6BF2;color:#fff;border-radius:13px;padding:0 16px;font-weight:700;cursor:pointer;font-family:inherit}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  function openChat(o){
    var L=tr(o.lang), key=o.key, texts=[], crisis=false, stage='story', cnt=0;
    var ov=document.createElement('div'); ov.className='wc-overlay';
    ov.innerHTML='<div class="wc-head"><div class="wc-av">'+svg(key,40)+'</div><div style="flex:1"><div style="font-weight:800;font-size:15px">'+L.whale+'</div><div style="font-size:11.5px;opacity:.85">'+L.room+'</div></div><button class="wc-close" aria-label="close">✕</button></div>'+
      '<div class="wc-note">'+L.note+'</div><div class="wc-log"></div><div class="wc-chips"></div><div class="wc-input"><input type="text" maxlength="400" placeholder="'+L.placeholder+'"><button class="wc-send">'+L.send+'</button></div>';
    document.body.appendChild(ov);
    var log=ov.querySelector('.wc-log'), chips=ov.querySelector('.wc-chips'), box=ov.querySelector('.wc-input'), inp=box.querySelector('input');
    function add(cls,text,html){ var d=document.createElement('div'); d.className=cls; if(html) d.innerHTML=html; else d.textContent=text; log.appendChild(d); log.scrollTop=log.scrollHeight; return d; }
    function say(arr,cb){ if(!arr.length){ if(cb) cb(); return; } var el=add('wc-msg wc-w','…'); setTimeout(function(){ el.textContent=arr[0]; log.scrollTop=log.scrollHeight; say(arr.slice(1),cb); },650); }
    function setChips(list){ chips.innerHTML=''; list.forEach(function(c){ var b=document.createElement('button'); b.className='wc-chip'; b.textContent=c[0]; b.onclick=function(){ chips.innerHTML=''; c[1](); }; chips.appendChild(b); }); }
    function enable(on){ box.style.display=on?'flex':'none'; if(on) inp.focus(); }
    function close(){ ov.remove(); if(o.onClose) o.onClose(); }
    function finish(){ setChips([[L.done,close]]); }
    function toShare(){ stage='share'; enable(false); say([L.shareAsk+((crisis||key==='sedih'||key==='marah')?' '+L.shareExtra:'')],function(){
      setChips([[L.yes,function(){ if(o.onSend) o.onSend(texts.join('\n'),crisis); say([L.sent],finish); }],[L.no,function(){ say([L.kept],finish); }]]); }); }
    function onUser(){
      var v=inp.value.trim(); if(!v||stage!=='story') return;
      inp.value=''; add('wc-msg wc-c',v); texts.push(v); cnt++; chips.innerHTML=''; enable(false);
      if(CRISIS.test(v)){ crisis=true; say([L.crisis],function(){ add('wc-help','',L.help); toShare(); }); return; }
      if(cnt>=4){ say([L.thanks],toShare); return; }
      say([cnt===1?L.reply[key]+' '+L.more:L.moreAgain],function(){ enable(true); setChips([[L.enough,toShare]]); });
    }
    ov.querySelector('.wc-close').onclick=close;
    box.querySelector('button').onclick=onUser;
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') onUser(); });
    enable(false); say([L.open[key]],function(){ enable(true); });
  }
  window.WHALE={svg:svg,moods:['senang','baik','biasa','sedih','marah'],T:T,tr:tr,question:question,qIndex:qIndex,openChat:openChat};
})();

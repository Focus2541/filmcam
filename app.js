'use strict';
/* FilmCam — free film camera PWA. All photos stay on the device. */

/* ================= DATA ================= */
const CAMS=[
 {id:'classic',name:'Classic S',sub:'35mm · 2:3',ic:'📷',aspect:2/3,stamp:true},
 {id:'instant',name:'Instant Square',sub:'ขอบโพลารอยด์',ic:'🖼️',aspect:1,frame:'instant',stamp:false},
 {id:'toy',name:'Toy Plastic',sub:'1:1 · แสงรั่ว',ic:'🧸',aspect:1,leak:true,stamp:true},
 {id:'half',name:'Half Frame',sub:'3:4 · ขอบฟิล์ม',ic:'🎞️',aspect:3/4,frame:'strip',stamp:false},
 {id:'disposable',name:'Disposable',sub:'2:3 · แฟลชจัด',ic:'📦',aspect:2/3,stamp:true,leak:true,punch:true},
 {id:'wide',name:'Panorama',sub:'ภาพยาว 1:2',ic:'🌄',aspect:1/2,stamp:true},
 {id:'_booth',name:'Photo Booth',aspect:4/3,hidden:true},
 {id:'_digi',name:'Digicam 2005',aspect:3/4,stamp:true,stampStyle:'digi',punch:true,hidden:true},
 {id:'_gif',name:'GIF 1:1',aspect:1,hidden:true},
 {id:'_video',name:'Video 9:16',aspect:9/16,hidden:true}
];
const LENSES=[
 {id:'35',name:'35mm f2',sub:'มาตรฐาน',vig:.22},
 {id:'28',name:'28mm Wide',sub:'กว้างนิดๆ',vig:.32,k:.12},
 {id:'50',name:'50mm f1.4',sub:'ซูมเล็กน้อย',vig:.25,zoom:1.25,soft:.12},
 {id:'85',name:'85mm Portrait',sub:'ซูม 1.7x',vig:.3,zoom:1.7,soft:.15},
 {id:'soft',name:'Soft-Focus',sub:'ฟุ้งฝัน',vig:.3,soft:.5},
 {id:'fish',name:'Fisheye 8mm',sub:'ตาปลาวงกลม',vig:.45,k:.9,circle:true},
 {id:'_digi',name:'Digital Zoom',vig:.05,hidden:true}
];
const FILMS=[
 {id:'golden200',name:'Golden 200',iso:200,c:['#f2a93b','#fff1d0'],exp:.05,con:1.08,sat:1.1,temp:.5,fade:.04,sh:[.02,0,-.02],hi:[.04,.02,-.04],grain:.05,halo:.25},
 {id:'tungsten800',name:'Tungsten 800',iso:800,c:['#2f62c9','#dfe8ff'],con:1.1,sat:.95,temp:-.6,fade:.05,sh:[-.02,.01,.05],hi:[0,.01,.04],grain:.09,halo:.35},
 {id:'instantfade',name:'Instant Fade',iso:100,c:['#e8e1d3','#7fb0c9'],con:.85,sat:.8,temp:.15,fade:.12,sh:[.03,.03,.06],hi:[.03,.02,-.02],grain:.04},
 {id:'charcoal400',name:'Charcoal 400',iso:400,c:['#222','#e0e0e0'],bw:true,con:1.25,grain:.1,fade:.03},
 {id:'skin160',name:'Skin 160',iso:160,c:['#e7c9a3','#fff'],con:.95,sat:.9,temp:.2,fade:.05,hi:[.03,.01,0],grain:.03,halo:.15},
 {id:'vivid50',name:'Vivid 50',iso:50,c:['#1f9d55','#fff'],con:1.2,sat:1.4,temp:.05,sh:[0,0,.02],grain:.02},
 {id:'coastal100',name:'Coastal 100',iso:100,c:['#2bb3c0','#f4fbff'],con:1.05,sat:1.05,temp:-.15,sh:[-.02,.02,.04],hi:[.02,.03,.02],grain:.03},
 {id:'mint400',name:'Mint 400',iso:400,c:['#8fd3b6','#fff'],sat:.95,tint:.3,fade:.06,sh:[-.02,.04,.02],hi:[.02,.03,0],grain:.06},
 {id:'rose400',name:'Rose 400',iso:400,c:['#e98aa6','#fff'],sat:.9,temp:.1,fade:.06,sh:[.04,-.01,.03],hi:[.04,.01,.02],grain:.06},
 {id:'expired98',name:"Expired '98",iso:200,c:['#a35a3a','#e9d2a0'],sat:.75,temp:.35,tint:-.2,fade:.1,sh:[.06,.02,-.04],hi:[.02,.01,-.05],grain:.12,halo:.2},
 {id:'cine500t',name:'Cine 500T',iso:500,c:['#1b2a3a','#ff7a3d'],con:1.1,sat:.9,temp:-.3,sh:[-.03,.02,.05],hi:[.05,.02,-.03],grain:.06,halo:.5},
 {id:'sunny400',name:'Sunny 400',iso:400,c:['#ffcc1a','#d9262a'],exp:.1,con:1.05,sat:1.2,temp:.35,grain:.05,halo:.15},
 {id:'pastel160',name:'Pastel 160',iso:160,c:['#f6c8d8','#c8e2f6'],exp:.08,con:.8,sat:.75,fade:.1,hi:[.02,.02,.03],grain:.03},
 {id:'cross',name:'Cross Pro',iso:200,c:['#c6e03a','#2a55d9'],con:1.3,sat:1.3,tint:.2,sh:[0,0,.08],hi:[.06,.06,-.08],grain:.05},
 {id:'lomo100',name:'Lomo 100',iso:100,c:['#d9262a','#111'],con:1.35,sat:1.35,vig:.35,sh:[0,0,.05],hi:[.05,.04,-.03],grain:.05},
 {id:'noir3200',name:'Noir 3200',iso:3200,c:['#000','#888'],bw:true,exp:-.05,con:1.45,grain:.2},
 {id:'sepia100',name:'Sepia 100',iso:100,c:['#704214','#f1dcb5'],bw:true,sepia:true,fade:.06,sh:[.07,.02,-.05],hi:[.06,.03,-.04],grain:.05},
 {id:'silver100',name:'Silver 100',iso:100,c:['#c9ccd1','#333'],bw:true,con:1.05,fade:.02,grain:.04},
 {id:'ccd2005',name:'CCD 2005',iso:100,c:['#8a8f99','#29a3ff'],exp:.12,con:1.12,sat:1.25,temp:-.25,tint:-.05,sh:[0,0,.03],hi:[0,.02,.04],grain:.035,halo:.2},
 {id:'moody400',name:'Moody 400',iso:400,dark:1,c:['#2b2f36','#9aa3ad'],exp:-.1,gam:1.35,dim:.15,con:1.1,sat:.68,temp:-.2,fade:.03,sh:[-.01,.01,.04],hi:[.01,.01,0],grain:.06,vig:.25},
 {id:'darkteal',name:'Dark Teal',iso:400,dark:1,c:['#0f3d3e','#e08a4a'],exp:-.1,gam:1.3,dim:.1,con:1.2,sat:.8,temp:-.3,sh:[-.05,.03,.07],hi:[.04,.02,-.03],grain:.05,vig:.3},
 {id:'bleach',name:'Bleach Bypass',iso:200,dark:1,c:['#6e6e6e','#d8d8d8'],exp:-.05,gam:1.25,dim:.05,con:1.5,sat:.4,temp:-.05,grain:.06,vig:.2},
 {id:'matte',name:'Matte Shadow',iso:400,dark:1,c:['#1a1a1a','#5a5a5a'],exp:-.1,gam:1.4,dim:.2,con:1.1,sat:.62,temp:-.1,fade:.06,sh:[0,0,.02],grain:.06,vig:.25},
 {id:'midnight1600',name:'Midnight 1600',iso:1600,dark:1,c:['#0c1530','#4a6cff'],exp:-.15,gam:1.5,dim:.2,con:1.2,sat:.65,temp:-.6,sh:[-.03,0,.08],grain:.12,halo:.3,vig:.35},
 {id:'ember800',name:'Ember 800',iso:800,dark:1,c:['#2a0f08','#ff6a2a'],exp:-.1,gam:1.45,dim:.15,con:1.25,sat:.85,temp:.45,sh:[.02,-.01,-.03],hi:[.05,.02,-.04],grain:.08,halo:.35,vig:.35},
 {id:'forest',name:'Forest Dark',iso:200,dark:1,c:['#13291c','#9cc48a'],exp:-.1,gam:1.35,dim:.15,con:1.15,sat:.72,temp:-.15,tint:.35,sh:[-.03,.03,0],hi:[.02,.02,-.02],grain:.06,vig:.3},
 {id:'inknoir',name:'Ink Noir',iso:1600,dark:1,c:['#000','#444'],bw:true,exp:-.1,gam:1.4,dim:.1,con:1.7,grain:.12,vig:.35}
];
const MODES=[
 {id:'film',name:'ฟิล์ม',hint:'แตะจอโฟกัส · ลากขึ้น/ลงปรับแสง · แตะสองครั้งรีเซ็ต'},
 {id:'booth',name:'บูธ 4 ช่อง',hint:'กดครั้งเดียว ถ่ายต่อกัน 4 รูป ได้แถบรูปแบบตู้ถ่ายรูป'},
 {id:'digi',name:'ดิจิ 2000',hint:'กล้องดิจิทัลยุค 2000 · แฟลชจัด สีสด วันที่แบบกล้องเก่า'},
 {id:'video',name:'วิดีโอ',hint:'กดเพื่อเริ่ม/หยุดอัด · สูงสุด 30 วินาที'},
 {id:'gif',name:'GIF',hint:'ถ่ายรัว 1 วินาที ได้ภาพขยับวนไปมา'},
 {id:'night',name:'กลางคืน',hint:'ถือมือถือนิ่งๆ ประมาณ 1 วินาที ภาพในที่มืดจะชัดขึ้น'}
];
const FONTS={hand:{f:'Sriracha',w:'400',n:'ลายมือ'},cute:{f:'Mali',w:'600',n:'น่ารัก'},clean:{f:'Kanit',w:'500',n:'เรียบๆ'}};
const STICKERS=['❤️','✨','⭐','🌸','☀️','🌙','😎','🎞️','📸','🍓','🌈','💫','🔥','🍀'];
const BOOTH_BG=[['#ffffff','ขาว'],['#111111','ดำ'],['#f7c6d9','ชมพู'],['#bfe3f7','ฟ้า'],['#f3efe6','ครีม']];

/* ================= STATE ================= */
const LS={get(k,d){try{const v=localStorage.getItem('fc_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('fc_'+k,JSON.stringify(v))}catch(e){}}};
LS.get('myFilms',[]).forEach(f=>FILMS.unshift(f));
const byId=(arr,id)=>arr.find(x=>x.id===id)||arr.find(x=>!x.hidden);
const S={
 cam:byId(CAMS,LS.get('cam')),lens:byId(LENSES,LS.get('lens')),film:byId(FILMS,LS.get('film')),
 mode:LS.get('mode','film'),facing:LS.get('facing','environment'),
 stamp:LS.get('stamp',true),sound:LS.get('sound',true),grid:LS.get('grid',false),hq:LS.get('hq',false),
 autosave:LS.get('autosave',false),dust:LS.get('dust',false),
 roll:LS.get('roll',36),left:LS.get('left',LS.get('roll',36)),rollId:LS.get('rollId',1),frameNo:LS.get('frameNo',1),
 devMode:LS.get('devMode','instant'),dateMode:LS.get('dateMode','today'),customDate:LS.get('customDate','1998-06-15'),
 albums:LS.get('albums',[]),album:LS.get('album',''),
 timer:LS.get('timer',0),ev:0,torch:false,dbl:false,pending:null
};
if(S.cam.hidden)S.cam=CAMS[0];
const $=id=>document.getElementById(id);
const video=$('video');
let stream=null,track=null,busy=false;
const effCam=()=>({booth:byId(CAMS,'_booth'),digi:byId(CAMS,'_digi'),gif:byId(CAMS,'_gif'),video:byId(CAMS,'_video')})[S.mode]||S.cam;
const effLens=()=>S.mode==='digi'?byId(LENSES,'_digi'):S.lens;
const effFilm=()=>S.mode==='digi'?byId(FILMS,'ccd2005'):S.film;

/* ================= HELPERS ================= */
function toast(t,ms=2000){const e=$('toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),ms)}
const pad2=n=>String(n).padStart(2,'0');
function dateStr(d,style){if(style==='digi')return `${d.getFullYear()}/${pad2(d.getMonth()+1)}/${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;return `${pad2(d.getMonth()+1)} ${pad2(d.getDate())} '${String(d.getFullYear()).slice(2)}`}
function stampDate(){return S.dateMode==='custom'?new Date(S.customDate+'T12:00:00'):new Date()}
function mk(w,h){const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c}
function rng(seed){let a=seed>>>0||1;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const newSeed=()=>(Math.random()*4294967295)>>>0||7;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const toBlob=(c,q=.92)=>new Promise(r=>c.toBlob(r,'image/jpeg',q));
function canSVG(f,cls='can'){const[c1,c2]=f.c;return `<div class="${cls}" style="background:linear-gradient(#2a2a2a 0 12%,${c2} 12% 34%,${c1} 34% 66%,${c2} 66% 88%,#2a2a2a 88%)"></div>`}
function cropRect(sw,sh,A,z){let cw=sw,ch=cw/A;if(ch>sh){ch=sh;cw=ch*A}cw/=z;ch/=z;return{x:(sw-cw)/2,y:(sh-ch)/2,w:cw,h:ch}}
function el(html){const d=document.createElement('div');d.innerHTML=html.trim();return d.firstElementChild}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function downscale(src,max){const w=src.width,h=src.height,s=Math.min(1,max/Math.max(w,h)),c=mk(w*s,h*s);c.getContext('2d').drawImage(src,0,0,c.width,c.height);return c}
function viaImg(file){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=u})}
function loadImg(file){if(window.createImageBitmap)return createImageBitmap(file,{imageOrientation:'from-image'}).catch(()=>viaImg(file));return viaImg(file)}
async function blobToBmp(b){if(window.createImageBitmap)return createImageBitmap(b);return viaImg(b)}
function pickFile(input){return new Promise(res=>{const i=$(input);i.value='';i.onchange=()=>res(i.files[0]||null);i.click()})}
async function ensureFont(key){const F=FONTS[key];if(!F||!document.fonts)return;try{await document.fonts.load(`${F.w} 40px "${F.f}"`,'กขABC')}catch(e){}}

/* ================= FILM ENGINE ================= */
function buildLUT(f,punch,ev){
 const L=[new Uint8ClampedArray(256),new Uint8ClampedArray(256),new Uint8ClampedArray(256)];
 const exp=Math.pow(2,(f.exp||0)+(punch?.08:0)+(ev||0)),con=(f.con||1)+(punch?.1:0),fade=f.fade||0,t=f.temp||0,tn=f.tint||0;
 const sh=f.sh||[0,0,0],hi=f.hi||[0,0,0],mul=f.bw&&!f.sepia?[1,1,1]:[1+t*.12,1+tn*.08,1-t*.12],M=f.match;
 for(let c=0;c<3;c++)for(let v=0;v<256;v++){
  let y=Math.min(1,(M?M[c][v]:v)/255*exp);
  if(f.gam)y=Math.pow(y,f.gam);
  y=y<.5?.5*Math.pow(2*y,con):1-.5*Math.pow(2*(1-y),con);
  if(f.dim)y=y*(1-f.dim*y);
  y=y*mul[c];
  y+=sh[c]*(1-y)*(1-y)*1.5+hi[c]*y*y*1.5;
  y=fade+y*(1-fade*1.5);
  L[c][v]=Math.round(Math.max(0,Math.min(1,y))*255);
 }
 return L;
}
function colorize(img,f,P){
 const d=img.data,w=img.width,h=img.height,[R,G,B]=buildLUT(f,P.punch,P.ev),sat=f.sat||1,bw=!!f.bw,gr=P.grain*255,I=P.I,vig=P.vig,evm=Math.pow(2,P.ev||0);
 const cx=w/2,cy=h/2,rn=P.circle?Math.min(w,h)/2:Math.hypot(cx,cy);
 let seed=P.seed>>>0||1;
 for(let j=0,p=0;j<h;j++){
  const dy=(j-cy)/rn,dy2=dy*dy;
  for(let i=0;i<w;i++,p+=4){
   const r0=d[p],g0=d[p+1],b0=d[p+2];let r,g,b;
   if(bw){const l=(.3*r0+.59*g0+.11*b0)|0;r=R[l];g=G[l];b=B[l]}
   else{r=R[r0];g=G[g0];b=B[b0];if(sat!==1){const l=.299*r+.587*g+.114*b;r=l+(r-l)*sat;g=l+(g-l)*sat;b=l+(b-l)*sat}}
   if(I<1){r=r0*evm+(r-r0*evm)*I;g=g0*evm+(g-g0*evm)*I;b=b0*evm+(b-b0*evm)*I}
   if(vig){const dx=(i-cx)/rn,dd=Math.sqrt(dx*dx+dy2);if(dd>.45){const s=Math.min(1,(dd-.45)/.6);const k=1-vig*s*s*(3-2*s);r*=k;g*=k;b*=k}}
   if(gr){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const n=((seed>>>0)/4294967295-.5)*gr;const l=(r+g+b)/765;const m=n*(1-Math.abs(l-.5)*1.2);r+=m;g+=m;b+=m}
   d[p]=r;d[p+1]=g;d[p+2]=b;
  }
 }
}
function distort(img,k,circle){
 const w=img.width,h=img.height,s=img.data,o=new ImageData(w,h),d=o.data,cx=w/2,cy=h/2,R=circle?Math.min(w,h)/2:Math.hypot(cx,cy),K=1+k;
 for(let j=0,p=0;j<h;j++)for(let i=0;i<w;i++,p+=4){
  const nx=(i-cx)/R,ny=(j-cy)/R,r2=nx*nx+ny*ny;
  if(circle&&r2>1){d[p+3]=255;continue}
  const f=(1+k*r2)/K;let sx=(cx+nx*f*R)|0,sy=(cy+ny*f*R)|0;
  sx=sx<0?0:sx>=w?w-1:sx;sy=sy<0?0:sy>=h?h-1:sy;const q=(sy*w+sx)*4;
  d[p]=s[q];d[p+1]=s[q+1];d[p+2]=s[q+2];d[p+3]=255;
 }
 return o;
}
function glow(c,x,soft,halo){
 if(!soft&&!halo)return;const w=c.width,h=c.height,t=mk(w,h),tx=t.getContext('2d');
 if(!('filter' in tx))return;
 if(soft){tx.filter=`blur(${Math.max(2,Math.round(w*.012))}px)`;tx.drawImage(c,0,0);x.globalAlpha=soft*.7;x.drawImage(t,0,0);x.globalAlpha=1}
 if(halo){
  const t2=mk(w,h),t2x=t2.getContext('2d');t2x.filter=`blur(${Math.round(w*.02)}px) brightness(.9) contrast(3)`;t2x.drawImage(c,0,0);
  t2x.filter='none';t2x.globalCompositeOperation='multiply';t2x.fillStyle='#ff6a3a';t2x.fillRect(0,0,w,h);
  x.globalCompositeOperation='screen';x.globalAlpha=halo*.45;x.drawImage(t2,0,0);
 }
 x.globalAlpha=1;x.globalCompositeOperation='source-over';
}
function leak(x,w,h,R){
 x.globalCompositeOperation='screen';
 const side=R()<.5?0:w,y=h*(.15+R()*.7),r=Math.max(w,h)*(.5+R()*.3);
 const g=x.createRadialGradient(side,y,0,side,y,r);
 g.addColorStop(0,'rgba(255,80,20,.8)');g.addColorStop(.35,'rgba(255,140,40,.35)');g.addColorStop(1,'rgba(255,160,60,0)');
 x.fillStyle=g;x.fillRect(0,0,w,h);
 if(R()<.5){const g2=x.createLinearGradient(0,0,0,h*.4);g2.addColorStop(0,'rgba(255,60,90,.3)');g2.addColorStop(1,'rgba(255,60,90,0)');x.fillStyle=g2;x.fillRect(0,0,w,h)}
 x.globalCompositeOperation='source-over';
}
function dust(x,w,h,R){
 const m=Math.max(w,h);x.save();
 const n=50+(R()*70|0);
 for(let i=0;i<n;i++){const r=R()*R()*m*.0035+m*.0004;x.globalAlpha=.25+R()*.5;x.fillStyle=R()<.7?'#fffdf5':'#0a0805';x.beginPath();x.arc(R()*w,R()*h,r,0,6.3);x.fill()}
 x.lineCap='round';x.lineJoin='round';
 const hairs=2+(R()*3|0);
 for(let i=0;i<hairs;i++){x.globalAlpha=.35+R()*.3;x.strokeStyle=R()<.6?'#fffdf5':'#0a0805';x.lineWidth=m*.0011;let px=R()*w,py=R()*h;x.beginPath();x.moveTo(px,py);
  for(let k=0;k<5;k++){const qx=px+(R()-.5)*m*.04,qy=py+(R()-.5)*m*.04;px+=(R()-.5)*m*.05;py+=(R()-.5)*m*.05;x.quadraticCurveTo(qx,qy,px,py)}x.stroke()}
 const sc=R()*3|0;
 for(let i=0;i<sc;i++){x.globalAlpha=.12+R()*.12;x.strokeStyle='#fff';x.lineWidth=1+R()*1.5;const sx=R()*w;x.beginPath();x.moveTo(sx,0);x.lineTo(sx+(R()-.5)*w*.02,h);x.stroke()}
 x.restore();
}
function drawStamp(o,X,Y,W,H,when,style){
 o.save();
 if(style==='digi'){
  const fs=Math.round(Math.max(W,H)*.026);o.font=`700 ${fs}px ui-monospace,Menlo,Consolas,monospace`;o.textAlign='right';o.textBaseline='bottom';
  o.fillStyle='#ffae1a';o.shadowColor='rgba(0,0,0,.6)';o.shadowBlur=2;o.shadowOffsetX=1;o.shadowOffsetY=1;
  o.fillText(dateStr(when,'digi'),X+W-W*.04,Y+H-H*.03);
 }else{
  const fs=Math.round(Math.max(W,H)*.032);o.font=`600 ${fs}px ui-monospace,Menlo,Consolas,monospace`;o.textAlign='right';o.textBaseline='bottom';
  o.fillStyle='#ff7b1c';o.shadowColor='rgba(255,90,0,.9)';o.shadowBlur=fs*.5;o.globalAlpha=.9;
  o.fillText(dateStr(when).split('').join(String.fromCharCode(8202)),X+W-W*.06,Y+H-H*.045);
 }
 o.restore();
}
function drawDeco(x,W,H,ox,oy,w,h,cam,o){
 if(o.text){
  const F=FONTS[o.font]||FONTS.hand,inst=cam.frame==='instant',fs=Math.round(w*(inst?.075:.065));
  x.save();x.font=`${F.w} ${fs}px "${F.f}",sans-serif`;x.textAlign='center';x.textBaseline='middle';
  let col=o.tcolor||'auto';if(col==='auto')col=inst?'#3a332c':'#ffffff';
  if(!inst||col==='#ffffff'){x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=fs*.3}
  x.fillStyle=col;x.fillText(o.text,ox+w/2,inst?oy+h+(H-oy-h)/2:oy+h*.86,w*.9);x.restore();
 }
 (o.stickers||[]).forEach(s=>{const fs=Math.round(Math.min(W,H)*.14);x.save();x.font=`${fs}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(s.e,s.x*W,s.y*H);x.restore()});
}
function finish(c,cam,film,o){
 const w=c.width,h=c.height;let out=c,ox=0,oy=0,x=c.getContext('2d');
 if(cam.frame==='instant'){
  const b=Math.round(w*.055),bb=Math.round(w*.24);out=mk(w+2*b,h+b+bb);x=out.getContext('2d');
  x.fillStyle='#f3efe6';x.fillRect(0,0,out.width,out.height);x.drawImage(c,b,b);ox=b;oy=b;
 }else if(cam.frame==='strip'){
  const b=Math.round(Math.max(w,h)*.05);out=mk(w+2*b,h+2*b);x=out.getContext('2d');
  x.fillStyle='#0d0b0a';x.fillRect(0,0,out.width,out.height);x.drawImage(c,b,b);ox=b;oy=b;
  const fs=Math.round(b*.42);x.font=`700 ${fs}px ui-monospace,Menlo,monospace`;x.fillStyle='#f29a3a';x.textBaseline='middle';
  x.textAlign='left';x.fillText(`FILMCAM ${film.iso}`,b,b/2);
  x.textAlign='right';x.fillText(`▸ ${o.frameNo||1}A`,b+w,b+h+b/2);
  x.textAlign='left';x.fillText(`${o.frameNo||1}`,b,b+h+b/2);
 }
 if(o.stamp)drawStamp(x,ox,oy,w,h,new Date(o.date),cam.stampStyle);
 drawDeco(x,out.width,out.height,ox,oy,w,h,cam,o);
 return out;
}
/* o = {cam,lens,film,ev,I,grain,leak,dust,stamp,date,seed,frameNo,mirror,max,text,font,tcolor,stickers} */
function develop(src,sw0,sh0,o){
 const cam=byId(CAMS,o.cam),lens=byId(LENSES,o.lens),film=o.filmObj||byId(FILMS,o.film),R=rng(o.seed);
 const cr=cropRect(sw0,sh0,cam.aspect,lens.zoom||1),A=cam.aspect;
 const MAX=o.max||(S.hq?2400:1600);let w,h;
 if(A>=1){w=Math.min(MAX,Math.round(cr.w));h=Math.round(w/A)}else{h=Math.min(MAX,Math.round(cr.h));w=Math.round(h*A)}
 const c=mk(w,h),x=c.getContext('2d',{willReadFrequently:true});
 if(o.mirror){x.translate(w,0);x.scale(-1,1)}
 x.drawImage(src,cr.x,cr.y,cr.w,cr.h,0,0,w,h);x.setTransform(1,0,0,1,0,0);
 let img=x.getImageData(0,0,w,h);
 if(lens.k)img=distort(img,lens.k,lens.circle);
 const I=o.I==null?1:o.I;
 colorize(img,film,{punch:cam.punch,ev:o.ev||0,I,grain:(film.grain||0)*(o.grain==null?1:o.grain),vig:Math.min(.85,((film.vig||0)+lens.vig+(cam.punch?.15:0))*(.4+.6*I)),circle:lens.circle,seed:o.seed});
 x.putImageData(img,0,0);
 glow(c,x,lens.soft||0,(film.halo||0)*I);
 if(o.leak)leak(x,w,h,R);
 if(o.dust)dust(x,w,h,R);
 if(lens.circle){x.globalCompositeOperation='destination-in';x.fillStyle='#000';x.globalAlpha=1;x.beginPath();x.arc(w/2,h/2,Math.min(w,h)/2,0,Math.PI*2);x.fill();x.globalCompositeOperation='destination-over';x.fillStyle='#000';x.fillRect(0,0,w,h);x.globalCompositeOperation='source-over'}
 return finish(c,cam,film,o);
}
function defaultOpts(){const cam=effCam();return{cam:cam.id,lens:effLens().id,film:effFilm().id,ev:S.ev,I:1,grain:1,leak:!!cam.leak,dust:S.dust,stamp:S.stamp&&!!cam.stamp,date:+stampDate(),seed:newSeed(),frameNo:S.frameNo,mirror:false,text:'',font:'hand',tcolor:'auto',stickers:[]}}

/* ================= COPY TONE (histogram match) ================= */
function hist(c){const s=downscale(c,256),d=s.getContext('2d').getImageData(0,0,s.width,s.height).data,H=[new Float64Array(256),new Float64Array(256),new Float64Array(256)];
 for(let i=0;i<d.length;i+=4){H[0][d[i]]++;H[1][d[i+1]]++;H[2][d[i+2]]++}
 return H.map(h=>{let t=0;const n=d.length/4,cdf=new Float64Array(256);for(let v=0;v<256;v++){t+=h[v];cdf[v]=t/n}return cdf})}
function makeMatch(src,ref){
 const A=hist(src),B=hist(ref);
 return A.map((ca,c)=>{const cb=B[c],m=new Array(256);let u=0;
  for(let v=0;v<256;v++){while(u<255&&cb[u]<ca[v])u++;m[v]=u}
  const sm=m.map((_,v)=>{let s=0,n=0;for(let k=-4;k<=4;k++){const q=v+k;if(q>=0&&q<256){s+=m[q];n++}}return s/n});
  let last=0;return sm.map((y,v)=>{y=Math.round(y*.85+v*.15);if(y<last)y=last;last=y;return Math.min(255,y)});
 });
}
function avgColor(c){const s=downscale(c,32),d=s.getContext('2d').getImageData(0,0,s.width,s.height).data;let r=0,g=0,b=0,n=d.length/4;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2]}const h=v=>pad2(Math.round(v/n).toString(16));return '#'+h(r)+h(g)+h(b)}
async function createToneFilm(src){
 const file=await pickFile('refIn');if(!file)return null;
 toast('กำลังก๊อปโทนสี…');
 const ref=await loadImg(file),refC=downscale(ref,512),mine=LS.get('myFilms',[]);
 const f={id:'my'+Date.now(),name:`ของฉัน ${mine.length+1}`,iso:'★',mine:true,c:[avgColor(refC),'#fff'],match:makeMatch(src,refC),grain:.03};
 mine.push(f);LS.set('myFilms',mine);FILMS.unshift(f);toast(`สร้าง "${f.name}" แล้ว ✨`);return f;
}
function deleteMyFilm(id){const mine=LS.get('myFilms',[]).filter(f=>f.id!==id);LS.set('myFilms',mine);const i=FILMS.findIndex(f=>f.id===id);if(i>=0)FILMS.splice(i,1);if(S.film.id===id){S.film=byId(FILMS,'golden200');LS.set('film',S.film.id)}}

/* ================= PORTRAIT BLUR (MediaPipe, loads on demand) ================= */
let segP=null;
function getSegmenter(){
 if(!segP)segP=(async()=>{
  const V='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
  const {FilesetResolver,ImageSegmenter}=await import(V+'/vision_bundle.mjs');
  const fs=await FilesetResolver.forVisionTasks(V+'/wasm');
  return ImageSegmenter.createFromOptions(fs,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',delegate:'CPU'},runningMode:'IMAGE',outputConfidenceMasks:true,outputCategoryMask:false});
 })().catch(e=>{segP=null;throw e});
 return segP;
}
async function portraitBlur(src,strength=1){
 const seg=await getSegmenter(),small=downscale(src,512),res=seg.segment(small),m=res.confidenceMasks[0],mw=m.width,mh=m.height,md=m.getAsFloat32Array();
 const mc=mk(mw,mh),mx=mc.getContext('2d'),id=mx.createImageData(mw,mh);
 for(let i=0;i<md.length;i++){const a=Math.max(0,Math.min(1,(md[i]-.3)/.4));id.data[i*4+3]=a*255}
 mx.putImageData(id,0,0);if(res.close)res.close();
 const w=src.width,h=src.height,out=mk(w,h),ox=out.getContext('2d');
 ox.filter=`blur(${Math.round(Math.max(w,h)*.012*strength)}px)`;ox.drawImage(src,0,0,w,h);ox.filter='none';
 const fg=mk(w,h),fx=fg.getContext('2d');fx.drawImage(src,0,0,w,h);fx.globalCompositeOperation='destination-in';fx.filter='blur(2px)';fx.drawImage(mc,0,0,w,h);
 ox.drawImage(fg,0,0);return out;
}

/* ================= LIVE PREVIEW (WebGL) ================= */
const GL={ok:false};
function initGL(){
 try{
  const cv=$('live'),gl=cv.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:false});if(!gl)return false;
  const vs=`attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}`;
  const fs=`precision mediump float;varying vec2 v;uniform sampler2D uVid,uLut;uniform vec2 uRes,uOff,uSize;
uniform float uK,uCircle,uMirror,uBW,uSat,uVig,uGrain,uI,uEvm,uT;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec2 px=(v-.5)*uRes;float R=uCircle>.5?min(uRes.x,uRes.y)*.5:length(uRes)*.5;vec2 n=px/R;float r2=dot(n,n);
if(uCircle>.5&&r2>1.){gl_FragColor=vec4(0.,0.,0.,1.);return;}
vec2 q=v;if(uK!=0.){float f=(1.+uK*r2)/(1.+uK);q=.5+n*f*R/uRes;}q=clamp(q,0.,1.);if(uMirror>.5)q.x=1.-q.x;
vec3 s=texture2D(uVid,uOff+q*uSize).rgb;vec3 c0=min(s*uEvm,1.);
if(uBW>.5){float l=dot(s,vec3(.3,.59,.11));s=vec3(l);}
vec3 c=vec3(texture2D(uLut,vec2(s.r*.996+.002,.5)).r,texture2D(uLut,vec2(s.g*.996+.002,.5)).g,texture2D(uLut,vec2(s.b*.996+.002,.5)).b);
if(uBW<.5){float l=dot(c,vec3(.299,.587,.114));c=vec3(l)+(c-vec3(l))*uSat;}
c=mix(c0,c,uI);float dd=length(px)/R;if(dd>.45){float t=clamp((dd-.45)/.6,0.,1.);c*=1.-uVig*t*t*(3.-2.*t);}
float l=(c.r+c.g+c.b)/3.;c+=(hash(floor(v*uRes)+uT)-.5)*uGrain*(1.-abs(l-.5)*1.2);gl_FragColor=vec4(c,1.);}`;
  const sh=(t,src)=>{const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s};
  const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error('link');gl.useProgram(p);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const al=gl.getAttribLocation(p,'a');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
  const tex=u=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,t);
   [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);return t};
  GL.vt=tex(0);GL.lt=tex(1);
  const U={};['uVid','uLut','uRes','uOff','uSize','uK','uCircle','uMirror','uBW','uSat','uVig','uGrain','uI','uEvm','uT'].forEach(n=>U[n]=gl.getUniformLocation(p,n));
  gl.uniform1i(U.uVid,0);gl.uniform1i(U.uLut,1);
  Object.assign(GL,{gl,U,cv,ok:true});updateLUT();return true;
 }catch(e){console.warn('WebGL off',e);GL.ok=false;return false}
}
function updateLUT(){
 if(!GL.ok)return;const gl=GL.gl,L=buildLUT(effFilm(),effCam().punch,S.ev),d=new Uint8Array(1024);
 for(let i=0;i<256;i++){d[i*4]=L[0][i];d[i*4+1]=L[1][i];d[i*4+2]=L[2][i];d[i*4+3]=255}
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,GL.lt);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,256,1,0,gl.RGBA,gl.UNSIGNED_BYTE,d);
}
let frameT=0;
function loop(){
 requestAnimationFrame(loop);
 if(!GL.ok||!stream||video.readyState<2||!video.videoWidth||document.hidden)return;
 const gl=GL.gl,U=GL.U,cv=GL.cv,vw=video.videoWidth,vh=video.videoHeight;
 const dpr=Math.min(S.mode==='video'?2:1.5,devicePixelRatio||1),W=Math.round($('vf').clientWidth*dpr),H=Math.round($('vf').clientHeight*dpr);
 if(!REC.on&&(cv.width!==W||cv.height!==H)){cv.width=W;cv.height=H}
 gl.viewport(0,0,cv.width,cv.height);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,GL.vt);
 try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,video)}catch(e){return}
 const f=effFilm(),l=effLens(),cam=effCam(),cr=cropRect(vw,vh,cam.aspect,l.zoom||1);
 gl.uniform2f(U.uRes,cv.width,cv.height);gl.uniform2f(U.uOff,cr.x/vw,cr.y/vh);gl.uniform2f(U.uSize,cr.w/vw,cr.h/vh);
 gl.uniform1f(U.uK,l.k||0);gl.uniform1f(U.uCircle,l.circle?1:0);gl.uniform1f(U.uMirror,S.facing==='user'?1:0);
 gl.uniform1f(U.uBW,f.bw?1:0);gl.uniform1f(U.uSat,f.sat||1);gl.uniform1f(U.uVig,Math.min(.85,(f.vig||0)+l.vig+(cam.punch?.15:0)));
 gl.uniform1f(U.uGrain,(f.grain||0)*.8);gl.uniform1f(U.uI,1);gl.uniform1f(U.uEvm,Math.pow(2,S.ev));gl.uniform1f(U.uT,(frameT++%97)*13.7);
 gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}
function cssFor(f,l){
 const a=[`brightness(${(1+(f.exp||0)*.8+S.ev*.5-(f.fade||0)*.3-(f.gam?(f.gam-1)*.5:0)).toFixed(2)})`,`contrast(${((f.con||1)*(1-(f.fade||0)*1.2)).toFixed(2)})`];
 a.push(f.bw?'grayscale(1)':`saturate(${(f.sat||1).toFixed(2)})`);
 const t=f.temp||0;if(f.sepia)a.push('sepia(.7)');else if(t>0)a.push(`sepia(${(t*.3).toFixed(2)})`);
 if(t<0)a.push(`hue-rotate(${(t*10).toFixed(0)}deg)`);if(l.soft)a.push(`blur(${(l.soft*1.2).toFixed(1)}px)`);
 return a.join(' ');
}

/* ================= UI ================= */
function applyUI(){
 const cam=effCam(),lens=effLens(),film=effFilm(),z=lens.zoom||1,mir=S.facing==='user'?'scaleX(-1) ':'';
 $('lblCam').textContent=cam.name;$('lblLens').textContent=lens.name;$('lblFilm').textContent=film.name;
 document.querySelectorAll('.sel').forEach(b=>{const k=b.dataset.kind,locked=S.mode==='digi'||(k==='cam'&&cam.hidden);b.classList.toggle('locked',locked)});
 if(GL.ok){$('live').style.display='block';video.style.opacity='0';$('vig').style.background='none';$('circle').style.display='none';updateLUT()}
 else{video.style.filter=cssFor(film,lens);video.style.transform=`${mir}scale(${z})`;
  const v=Math.min(.8,(film.vig||0)+lens.vig);$('vig').style.background=`radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,${v}) 100%)`;
  $('circle').style.display=lens.circle?'block':'none'}
 $('ghost').style.transform=`scale(${z})`;
 $('grid').style.display=S.grid?'block':'none';
 $('stamp').style.display=(S.stamp&&cam.stamp)?'block':'none';$('stamp').textContent=dateStr(stampDate(),cam.stampStyle);
 $('stamp').style.color=cam.stampStyle==='digi'?'#ffae1a':'';
 $('counter').textContent=S.roll?pad2(Math.max(0,S.left)):'∞';
 $('btnTimer').innerHTML=S.timer?`<small>${S.timer}s</small>`:'⏱';$('btnTimer').classList.toggle('on',!!S.timer);
 $('btnTimer').style.display=['film','digi','night'].includes(S.mode)?'grid':'none';
 $('btnDbl').style.display=S.mode==='film'?'grid':'none';
 $('btnDbl').classList.toggle('on',S.dbl);$('dblLbl').style.display=S.dbl&&S.mode==='film'?'block':'none';
 $('dblLbl').textContent=S.pending?'ภาพซ้อน 2/2':'ภาพซ้อน 1/2';
 $('hint').textContent=(MODES.find(m=>m.id===S.mode)||MODES[0]).hint;
 $('shutter').classList.toggle('vid',S.mode==='video');
 document.querySelectorAll('#modes button').forEach(b=>b.classList.toggle('on',b.dataset.m===S.mode));
 fitVF();
}
function fitVF(){const w0=$('wrap').clientWidth-28,h0=$('wrap').clientHeight-12,A=effCam().aspect;let w=w0,h=w/A;if(h>h0){h=h0;w=h*A}$('vf').style.width=w+'px';$('vf').style.height=h+'px'}
addEventListener('resize',fitVF);
MODES.forEach(m=>{const b=el(`<button data-m="${m.id}">${m.name}</button>`);b.onclick=()=>setMode(m.id);$('modes').appendChild(b)});
function setMode(m){if(REC.on||busy)return;S.mode=m;LS.set('mode',m);if(m!=='film'&&S.dbl){S.dbl=false;clearPending()}applyUI();const b=document.querySelector(`#modes [data-m="${m}"]`);if(b)b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})}

function openSheet(title,body){$('sheetTitle').textContent=title;const b=$('sheetBody');b.innerHTML='';b.appendChild(body);$('sheet').classList.add('open');$('scrim').classList.add('open')}
function closeSheet(){$('sheet').classList.remove('open');$('scrim').classList.remove('open')}
$('scrim').onclick=closeSheet;

function pick(kind){
 if(S.mode==='digi'){toast('โหมดดิจิ 2000 ใช้กล้อง เลนส์ และสีแบบกล้องดิจิทัลเก่า');return}
 if(kind==='cam'&&effCam().hidden){toast('โหมดนี้ใช้ขนาดภาพเฉพาะ เปลี่ยนกล้องได้ในโหมดฟิล์ม');return}
 const list={cam:CAMS,lens:LENSES,film:FILMS}[kind].filter(x=>!x.hidden),title={cam:'เลือกกล้อง',lens:'เลือกเลนส์',film:'เลือกฟิล์ม'}[kind];
 const box=el('<div class="opts"></div>');
 if(kind==='film'){
  const add=el('<button class="opt"><div class="ic">🎯</div><b>ก๊อปโทนจากรูป</b><span>เลือกรูปที่ชอบ</span></button>');
  add.onclick=async()=>{if(!stream||!video.videoWidth){toast('ต้องเปิดกล้องก่อน หรือก๊อปโทนในหน้าแต่งรูปแทน');return}closeSheet();const f=await createToneFilm(grabFrame());if(f){S.film=f;LS.set('film',f.id);applyUI()}};
  box.appendChild(add);
 }
 list.forEach(it=>{
  const o=el(`<button class="opt${S[kind].id===it.id?' active':''}"></button>`);
  const icon=kind==='film'?canSVG(it):`<div class="ic">${kind==='lens'?(it.circle?'🐟':'🔘'):it.ic}</div>`;
  o.innerHTML=`${icon}<b>${esc(it.name)}</b><span>${kind==='film'?(it.mine?'ฟิล์มของฉัน':'ISO '+it.iso+(it.dark?' · โทนมืด':'')+(it.bw?' · ขาวดำ':'')):it.sub}</span>`;
  o.onclick=()=>{S[kind]=it;LS.set(kind,it.id);applyUI();closeSheet();toast(it.name)};
  box.appendChild(o);
 });
 openSheet(title,box);
}
document.querySelectorAll('.sel').forEach(b=>b.onclick=()=>pick(b.dataset.kind));

function toggleRow(box,label,get,set){const r=el(`<label class="row"><span>${label}</span><input type="checkbox"></label>`);const i=r.querySelector('input');i.checked=get();i.onchange=()=>set(i.checked);box.appendChild(r);return r}
function selectRow(box,label,opts,get,set){const r=el(`<div class="row"><span>${label}</span><select></select></div>`);const s=r.querySelector('select');opts.forEach(([v,t])=>s.appendChild(new Option(t,v)));s.value=String(get());s.onchange=()=>set(s.value);box.appendChild(r);return r}
function rangeRow(box,label,min,max,step,get,set,fmt){const r=el(`<div class="row"><span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}"><span class="val"></span></div>`);const i=r.querySelector('input'),v=r.querySelector('.val');i.value=get();const show=()=>v.textContent=fmt(+i.value);show();i.oninput=()=>{show();set(+i.value)};box.appendChild(r);return r}
function btn(label,cls,fn){const b=el(`<button class="bigbtn ${cls||''}">${label}</button>`);b.onclick=fn;return b}

$('btnSettings').onclick=()=>{
 const box=el('<div class="rows"></div>');
 box.appendChild(btn('💾 สำรองรูปทั้งหมด','',()=>{closeSheet();backupAll()}));
 box.appendChild(btn('📥 กู้คืนจากไฟล์สำรอง','sec',()=>{closeSheet();restoreBackup()}));
 const lb=LS.get('lastBackup',0);box.appendChild(el(`<div class="note" style="padding:6px 0 4px">${lb?'สำรองล่าสุด '+new Date(lb).toLocaleDateString('th-TH'):'ยังไม่เคยสำรองรูป'} · ไฟล์สำรองเลือกเก็บใน Google Drive ได้ตอนกดแชร์</div>`));
 const b=(k,label)=>toggleRow(box,label,()=>S[k],v=>{S[k]=v;LS.set(k,v);applyUI()});
 b('stamp','แสดงวันที่บนรูป');
 selectRow(box,'วันที่ที่ใช้',[['today','วันนี้'],['custom','กำหนดเอง']],()=>S.dateMode,v=>{S.dateMode=v;LS.set('dateMode',v);dateIn.style.display=v==='custom'?'flex':'none';applyUI()});
 const dateIn=el(`<div class="row"><span>เลือกวันที่</span><input type="date"></div>`);const di=dateIn.querySelector('input');di.value=S.customDate;di.onchange=()=>{if(di.value){S.customDate=di.value;LS.set('customDate',di.value);applyUI()}};box.appendChild(dateIn);dateIn.style.display=S.dateMode==='custom'?'flex':'none';
 b('dust','ฝุ่นและรอยขีดข่วนแบบฟิล์มเก่า');
 selectRow(box,'การล้างฟิล์ม',[['instant','เห็นรูปทันที'],['hour','รอ 1 ชั่วโมง'],['roll','รอให้หมดม้วน']],()=>S.devMode,v=>{S.devMode=v;LS.set('devMode',v);if(v==='roll'&&!S.roll)toast('โหมดนี้ต้องกดเปลี่ยนม้วนเองเพื่อล้าง')});
 selectRow(box,'ขนาดม้วนฟิล์ม',[['24','24 รูป'],['36','36 รูป'],['0','ไม่จำกัด']],()=>S.roll,v=>{S.roll=+v;S.left=S.roll;LS.set('roll',S.roll);LS.set('left',S.left);applyUI()});
 b('sound','เสียงชัตเตอร์');b('grid','เส้นตารางช่วยจัดภาพ');b('hq','ความละเอียดสูง (ช้าลงนิดหน่อย)');b('autosave','ดาวน์โหลดลงเครื่องทันทีหลังล้างเสร็จ');
 const mine=FILMS.filter(f=>f.mine);
 if(mine.length){box.appendChild(el('<div class="lbl">ฟิล์มของฉัน (ก๊อปโทนมา)</div>'));mine.forEach(f=>{const r=el(`<div class="row"><span>${esc(f.name)}</span><button class="iconbtn" style="width:34px;height:34px">🗑️</button></div>`);r.querySelector('button').onclick=()=>{deleteMyFilm(f.id);r.remove();applyUI();toast('ลบแล้ว')};box.appendChild(r)})}
 box.appendChild(el('<div class="note">ฟรี ไม่มีโฆษณา รูปเก็บอยู่ในเครื่องคุณเท่านั้น<br>รูปในแอปจะหายถ้าล้างข้อมูลเบราว์เซอร์ — กด "สำรองรูปทั้งหมด" ไว้เป็นระยะ</div>'));
 openSheet('ตั้งค่า',box);
};

$('counter').onclick=()=>{
 const box=el('<div class="rows"></div>');
 box.appendChild(el(`<div class="note" style="padding-top:0">${S.roll?`ม้วนนี้เหลือ ${Math.max(0,S.left)} จาก ${S.roll} รูป`:'ม้วนไม่จำกัดจำนวน'}${S.devMode==='roll'?'<br>เปลี่ยนม้วนใหม่ = ส่งม้วนนี้ไปล้าง รูปจะขึ้นในอัลบั้ม':''}</div>`));
 box.appendChild(btn('🎞️ เปลี่ยนม้วนใหม่','',()=>{S.left=S.roll;S.rollId++;LS.set('left',S.left);LS.set('rollId',S.rollId);applyUI();closeSheet();loadThumb();toast(S.devMode==='roll'?'ส่งล้างแล้ว รูปขึ้นในอัลบั้มแล้ว 🎉':'ใส่ฟิล์มม้วนใหม่แล้ว')}));
 openSheet('ม้วนฟิล์ม',box);
};
$('btnTimer').onclick=()=>{S.timer=S.timer===0?3:S.timer===3?10:0;LS.set('timer',S.timer);applyUI();toast(S.timer?`ตั้งเวลา ${S.timer} วินาที`:'ปิดตั้งเวลา')};
$('btnDbl').onclick=()=>{S.dbl=!S.dbl;if(!S.dbl)clearPending();applyUI();toast(S.dbl?'ภาพซ้อน: ถ่าย 2 ช็อตแล้วรวมเป็นรูปเดียว':'ปิดภาพซ้อน')};
function clearPending(){S.pending=null;$('ghost').style.display='none';$('ghost').removeAttribute('src');applyUI()}

/* ================= CAMERA ================= */
async function startCam(){
 if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
 $('msg').style.display='grid';$('msg').textContent='กำลังเปิดกล้อง…';
 try{
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('nomedia');
  stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:S.facing},width:{ideal:2560},height:{ideal:1920}},audio:false});
  video.srcObject=stream;await video.play().catch(()=>{});
  track=stream.getVideoTracks()[0];
  const caps=track.getCapabilities?track.getCapabilities():{};
  $('btnTorch').style.display=caps.torch?'grid':'none';S.torch=false;$('btnTorch').classList.remove('on');
  $('msg').style.display='none';
 }catch(e){
  $('msg').innerHTML='เปิดกล้องไม่ได้ 📷<br><small>ต้องเปิดผ่านลิงก์ https และกดอนุญาตกล้อง<br>หรือกดปุ่มชัตเตอร์/🖼️ เพื่อเลือกรูปจากเครื่องมาแต่ง</small>';
 }
 applyUI();
}
$('btnFlip').onclick=()=>{if(REC.on)return;S.facing=S.facing==='user'?'environment':'user';LS.set('facing',S.facing);startCam()};
$('btnTorch').onclick=()=>{S.torch=!S.torch;$('btnTorch').classList.toggle('on',S.torch);toast(S.torch?'แฟลชเปิด':'แฟลชปิด')};
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(REC.on)REC.mr.stop();if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}else startCam()});

(()=>{
 const vf=$('vf');let sy=0,ev0=0,moved=false,lastTap=0,down=false;
 const showEV=()=>{const e=$('evLbl');e.textContent=`☀ ${S.ev>0?'+':''}${S.ev.toFixed(1)}`;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),1200)};
 vf.addEventListener('pointerdown',e=>{down=true;sy=e.clientY;ev0=S.ev;moved=false});
 vf.addEventListener('pointermove',e=>{if(!down)return;const dy=sy-e.clientY;if(Math.abs(dy)>10)moved=true;if(moved){S.ev=Math.round(Math.max(-2,Math.min(2,ev0+dy/110))*10)/10;applyUI();showEV()}});
 vf.addEventListener('pointerup',e=>{if(!down)return;down=false;if(moved)return;
  const now=Date.now();if(now-lastTap<300){S.ev=0;applyUI();showEV();lastTap=0;return}lastTap=now;
  const r=vf.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  const ring=$('ring');ring.style.left=(px*100)+'%';ring.style.top=(py*100)+'%';ring.classList.remove('show');void ring.offsetWidth;ring.classList.add('show');
  clearTimeout(ring._t);ring._t=setTimeout(()=>ring.classList.remove('show'),900);
  focusAt(px,py);
 });
 vf.addEventListener('pointercancel',()=>down=false);
})();
async function focusAt(px,py){
 if(!track||!video.videoWidth)return;
 const vw=video.videoWidth,vh=video.videoHeight,cr=cropRect(vw,vh,effCam().aspect,effLens().zoom||1);
 if(S.facing==='user')px=1-px;
 const x=(cr.x+px*cr.w)/vw,y=(cr.y+py*cr.h)/vh;
 const caps=track.getCapabilities?track.getCapabilities():{};const adv={pointsOfInterest:[{x,y}]};
 if(caps.focusMode&&caps.focusMode.includes('single-shot'))adv.focusMode='single-shot';
 else if(caps.focusMode&&caps.focusMode.includes('continuous'))adv.focusMode='continuous';
 if(caps.exposureMode&&caps.exposureMode.includes('continuous'))adv.exposureMode='continuous';
 try{await track.applyConstraints({advanced:[adv]})}catch(e){}
}

let actx=null;
function audio(){actx=actx||new (window.AudioContext||window.webkitAudioContext)();return actx}
function click(){
 if(!S.sound)return;
 try{const a=audio(),n=a.sampleRate*.09|0,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<n;i++){const t=i/n;d[i]=(Math.random()*2-1)*(t<.15?1:t<.35?.15:t<.5?.8:.05)*(1-t)}
  const s=a.createBufferSource();s.buffer=b;const g=a.createGain();g.gain.value=.5;s.connect(g).connect(a.destination);s.start()}catch(e){}
}
function beep(f=880){if(!S.sound)return;try{const a=audio(),o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.06)}catch(e){}}

function grabFrame(){
 const vw=video.videoWidth,vh=video.videoHeight,g=mk(vw,vh),x=g.getContext('2d');
 if(S.facing==='user'){x.translate(vw,0);x.scale(-1,1)}
 x.drawImage(video,0,0,vw,vh);return g;
}
const nextFrame=()=>new Promise(r=>{if(video.requestVideoFrameCallback)video.requestVideoFrameCallback(()=>r());else setTimeout(r,40)});
function blendDouble(a,b){
 const c=mk(a.width,a.height),x=c.getContext('2d');x.drawImage(a,0,0);
 x.globalCompositeOperation='screen';x.globalAlpha=.85;
 const s=Math.max(a.width/b.width,a.height/b.height),w=b.width*s,h=b.height*s;x.drawImage(b,(a.width-w)/2,(a.height-h)/2,w,h);
 x.globalAlpha=1;x.globalCompositeOperation='source-over';return c;
}
async function countdown(n,label){const c=$('count');c.style.display='grid';for(let i=n;i>0;i--){c.innerHTML=`${i}${label?`<div style="position:absolute;bottom:18%;font-size:16px;font-weight:600">${label}</div>`:''}`;beep();await sleep(1000)}c.style.display='none'}
function flashFx(strong){const fl=$('flash');fl.style.transition='none';fl.style.opacity=strong?'.9':'.6';requestAnimationFrame(()=>requestAnimationFrame(()=>{fl.style.transition='opacity .35s';fl.style.opacity='0'}))}
async function torchOn(){if(S.torch&&track){try{await track.applyConstraints({advanced:[{torch:true}]});await sleep(350)}catch(e){}}}
async function torchOff(){if(S.torch&&track){try{await track.applyConstraints({advanced:[{torch:false}]})}catch(e){}}}
function needCam(){if(!stream||!video.videoWidth){$('fileIn').click();return false}return true}
function rollOK(){if(S.roll&&S.left<=0){toast('ฟิล์มหมดม้วน แตะตัวเลขมุมซ้ายบนเพื่อเปลี่ยนม้วน');return false}return true}
function useRoll(){if(S.roll){S.left--;LS.set('left',S.left)}applyUI();if(S.devMode==='roll'&&S.roll&&S.left===0){toast('หมดม้วนแล้ว ล้างฟิล์มเสร็จ ดูรูปในอัลบั้มได้เลย 🎉');loadThumb()}}

$('shutter').onclick=async()=>{
 if(S.mode==='video'){toggleRec();return}
 if(busy)return;if(!needCam())return;
 busy=true;
 try{
  if(S.mode==='booth')await shootBooth();
  else if(S.mode==='gif')await shootGif();
  else await shootStill();
 }catch(e){console.error(e);toast('ถ่ายไม่สำเร็จ ลองใหม่อีกครั้ง')}
 $('dev').style.display='none';$('count').style.display='none';busy=false;
};
async function shootStill(){
 if(!rollOK())return;
 if(S.timer)await countdown(S.timer);
 const night=S.mode==='night',digi=S.mode==='digi';
 await torchOn();click();flashFx(S.torch||digi||effCam().punch);
 let g;
 if(night){$('dev').style.display='grid';$('dev').textContent='ถือนิ่งๆ…';g=await nightStack(8);$('dev').textContent='กำลังล้างฟิล์ม…'}
 else g=grabFrame();
 await torchOff();
 if(S.dbl&&S.mode==='film'&&!S.pending){
  S.pending=g;const t=mk(g.width/3,g.height/3);t.getContext('2d').drawImage(g,0,0,t.width,t.height);
  $('ghost').src=t.toDataURL('image/jpeg',.7);$('ghost').style.display='block';applyUI();toast('ช็อตแรกแล้ว ถ่ายช็อตที่สองซ้อนได้เลย');return;
 }
 if(S.dbl&&S.pending){g=blendDouble(S.pending,g);clearPending()}
 $('dev').style.display='grid';await sleep(50);
 const o=defaultOpts();if(night)o.ev+=.35;
 if(byId(CAMS,o.cam).frame==='strip'){S.frameNo=S.frameNo%36+1;LS.set('frameNo',S.frameNo)}
 await saveShot(g,o,g.width,g.height);useRoll();
}
async function nightStack(N){
 let acc=null,w,h;
 for(let i=0;i<N;i++){
  const g=downscale(grabFrame(),2000),d=g.getContext('2d').getImageData(0,0,g.width,g.height).data;
  if(!acc){acc=new Float32Array(d.length);w=g.width;h=g.height}
  if(g.width===w)for(let k=0;k<d.length;k++)acc[k]+=d[k];
  await nextFrame();
 }
 const c=mk(w,h),x=c.getContext('2d'),im=x.createImageData(w,h);for(let k=0;k<acc.length;k++)im.data[k]=acc[k]/N;x.putImageData(im,0,0);return c;
}

/* ---- Photo booth ---- */
async function shootBooth(){
 const shots=[];
 for(let i=0;i<4;i++){
  await countdown(i===0?3:2,`รูปที่ ${i+1}/4`);
  click();flashFx(true);const g=grabFrame();
  shots.push(develop(g,g.width,g.height,{...defaultOpts(),stamp:false,max:900}));
  await sleep(250);
 }
 openBooth(shots);
}
function boothStrip(frames,bg,caption,font,date){
 const W=600,pad=30,fw=W-2*pad,fh=Math.round(fw*3/4),gap=18,bottom=170,H=pad+4*fh+3*gap+bottom,c=mk(W,H),x=c.getContext('2d');
 x.fillStyle=bg;x.fillRect(0,0,W,H);
 frames.forEach((f,i)=>{const y=pad+i*(fh+gap);const s=Math.max(fw/f.width,fh/f.height),sw=fw/s,sh=fh/s;x.drawImage(f,(f.width-sw)/2,(f.height-sh)/2,sw,sh,pad,y,fw,fh)});
 const dark=bg==='#111111',F=FONTS[font]||FONTS.hand,ty=H-bottom+bottom*.45;
 x.fillStyle=dark?'#f3efe6':'#2b2521';x.textAlign='center';x.textBaseline='middle';
 x.font=`${F.w} 44px "${F.f}",sans-serif`;x.fillText(caption||'',W/2,ty,fw);
 x.font='600 18px ui-monospace,Menlo,monospace';x.globalAlpha=.7;x.fillText(dateStr(date).replace(/ /g,'.'),W/2,ty+46);x.globalAlpha=1;
 return c;
}
function openBooth(frames){
 const st={bg:'#ffffff',caption:'FilmCam',font:'hand'};
 const box=el('<div class="rows" style="padding-top:0"></div>'),prev=el('<div class="prev"></div>');box.appendChild(prev);
 let out=null;const draw=async()=>{await ensureFont(st.font);out=boothStrip(frames,st.bg,st.caption,st.font,stampDate());prev.innerHTML='';prev.appendChild(out)};
 chipGroup(box,'สีกรอบ',BOOTH_BG,()=>st.bg,v=>{st.bg=v;draw()});
 box.appendChild(el('<div class="lbl">ข้อความใต้รูป</div>'));
 const ti=el('<input class="txtin" maxlength="30">');ti.value=st.caption;ti.oninput=()=>{st.caption=ti.value;draw()};box.appendChild(ti);
 chipGroup(box,'ฟอนต์',Object.entries(FONTS).map(([k,v])=>[k,v.n]),()=>st.font,v=>{st.font=v;draw()});
 box.appendChild(btn('💾 บันทึกลงอัลบั้ม','',async()=>{const rec=await addRecord({kind:'booth',blob:await toBlob(out,.94)});closeSheet();await openGallery();openViewer(rec);toast('บันทึกแล้ว')}));
 box.appendChild(btn('📤 แชร์','sec',async()=>shareBlob(await toBlob(out,.94),`FilmCam_booth_${Date.now()}.jpg`)));
 box.appendChild(btn('🔁 ถ่ายใหม่','sec',()=>closeSheet()));
 openSheet('โฟโต้บูธ 4 ช่อง',box);draw();
}

/* ---- GIF ---- */
let gifLib=null;
async function shootGif(){
 if(!gifLib)gifLib=import('./gifenc.js').catch(e=>{gifLib=null;throw e});
 click();const raws=[];
 $('dev').style.display='grid';$('dev').textContent='ถ่ายรัว…';
 for(let i=0;i<8;i++){raws.push(downscale(grabFrame(),900));await sleep(110)}
 $('dev').textContent='กำลังทำ GIF…';await sleep(30);
 const base=defaultOpts(),frames=raws.map(g=>develop(g,g.width,g.height,{...base,seed:newSeed(),leak:false,max:480}));
 const {GIFEncoder,quantize,applyPalette}=await gifLib;
 const seq=[...frames,...frames.slice(1,-1).reverse()],w=frames[0].width,h=frames[0].height,enc=GIFEncoder();
 for(const f of seq){const d=f.getContext('2d').getImageData(0,0,w,h).data,pal=quantize(d,256),idx=applyPalette(d,pal);enc.writeFrame(idx,w,h,{palette:pal,delay:110})}
 enc.finish();
 const blob=new Blob([enc.bytes()],{type:'image/gif'});
 $('dev').textContent='กำลังล้างฟิล์ม…';
 const rec=await addRecord({kind:'gif',blob,film:effFilm().name});toast('ได้ GIF แล้ว 🎞️ ดูในอัลบั้ม');
}

/* ---- Video ---- */
const REC={on:false,mr:null,chunks:[],t0:0,timer:0,aStream:null};
async function toggleRec(){
 if(REC.on){REC.mr.stop();return}
 if(!needCam())return;
 if(!GL.ok||!GL.cv.captureStream||!window.MediaRecorder){toast('เครื่องนี้ยังไม่รองรับวิดีโอโทนฟิล์ม');return}
 const vs=GL.cv.captureStream(30);
 try{REC.aStream=await navigator.mediaDevices.getUserMedia({audio:true});REC.aStream.getAudioTracks().forEach(t=>vs.addTrack(t))}catch(e){REC.aStream=null;toast('อัดแบบไม่มีเสียง (ไม่ได้อนุญาตไมค์)')}
 const mime=['video/mp4;codecs=avc1,mp4a','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(m=>MediaRecorder.isTypeSupported(m))||'';
 REC.chunks=[];REC.mr=new MediaRecorder(vs,mime?{mimeType:mime,videoBitsPerSecond:6e6}:{});
 REC.mr.ondataavailable=e=>{if(e.data&&e.data.size)REC.chunks.push(e.data)};
 REC.mr.onstop=async()=>{
  REC.on=false;clearInterval(REC.timer);$('recLbl').style.display='none';$('shutter').classList.remove('rec');
  if(REC.aStream)REC.aStream.getTracks().forEach(t=>t.stop());
  const blob=new Blob(REC.chunks,{type:(REC.mr.mimeType||'video/webm').split(';')[0]});
  if(blob.size<1000){toast('วิดีโอสั้นเกินไป');return}
  await addRecord({kind:'video',blob,film:effFilm().name});toast('บันทึกวิดีโอแล้ว 🎬');
 };
 REC.mr.start(500);REC.on=true;REC.t0=Date.now();$('shutter').classList.add('rec');$('recLbl').style.display='block';
 const tick=()=>{const s=Math.floor((Date.now()-REC.t0)/1000);$('recLbl').textContent=`● REC 0:${pad2(s)}`;if(s>=30&&REC.on)REC.mr.stop()};tick();REC.timer=setInterval(tick,250);
}

$('btnImport').onclick=()=>$('fileIn').click();
$('fileIn').onchange=async e=>{
 const files=[...e.target.files];e.target.value='';if(!files.length)return;
 busy=true;$('dev').style.display='grid';let ok=0;
 for(const f of files){
  try{const bmp=await loadImg(f);const o=defaultOpts();if(S.dateMode==='today'&&f.lastModified)o.date=f.lastModified;o.ev=0;
   const g=downscale(bmp,2560);await saveShot(g,o,g.width,g.height,true);ok++}catch(err){console.error(err);toast('เปิดรูปนี้ไม่ได้')}
 }
 $('dev').style.display='none';busy=false;if(ok)toast(`แต่ง ${ok} รูปเป็นฟิล์มแล้ว`);
};

/* ================= STORAGE ================= */
const DB=new Promise((res,rej)=>{try{const r=indexedDB.open('filmcam',1);r.onupgradeneeded=()=>r.result.createObjectStore('photos',{keyPath:'id',autoIncrement:true});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}});
async function store(mode,fn){const db=await DB;return new Promise((res,rej)=>{const t=db.transaction('photos',mode),r=fn(t.objectStore('photos'));t.oncomplete=()=>res(r&&r.result);t.onerror=()=>rej(t.error)})}
const getAll=()=>store('readonly',s=>s.getAll()).catch(()=>[]);
function isReady(r){
 if(!r.lock)return true;
 if(r.lock.t==='time')return Date.now()>=r.lock.until;
 if(r.lock.t==='roll')return r.lock.roll<S.rollId||(r.lock.roll===S.rollId&&S.roll>0&&S.left<=0);
 return true;
}
function lockText(r){if(r.lock.t==='time'){const m=Math.ceil((r.lock.until-Date.now())/60000);return `อีก ${m} นาที`}return 'รอหมดม้วน'}
function metaOf(o){return{film:(o.filmObj||byId(FILMS,o.film)).name,cam:byId(CAMS,o.cam).name,lens:byId(LENSES,o.lens).name}}
async function saveShot(raw,o,w,h,imported){
 const out=develop(raw,w,h,o);
 const [blob,orig]=await Promise.all([toBlob(out),toBlob(downscale(raw,2560),.9)]);
 const rec={kind:'photo',ts:Date.now(),blob,orig,o,album:S.album,...metaOf(o)};
 const f=byId(FILMS,o.film);if(f.mine)rec.o={...o,filmObj:f};
 if(!imported&&S.devMode==='hour')rec.lock={t:'time',until:Date.now()+3600e3};
 if(!imported&&S.devMode==='roll')rec.lock={t:'roll',roll:S.rollId};
 try{rec.id=await store('readwrite',s=>s.add(rec))}catch(e){toast('เก็บในอัลบั้มไม่ได้ — ดาวน์โหลดให้แทน');download(rec);return}
 if(rec.lock)toast(S.devMode==='hour'?'ส่งล้างแล้ว ⏳ รอ 1 ชั่วโมง':'ส่งล้างแล้ว ⏳ รอหมดม้วน');
 else if(S.autosave)download(rec);
 loadThumb();
}
async function addRecord(rec){rec.ts=rec.ts||Date.now();if(rec.album==null)rec.album=S.album;rec.id=await store('readwrite',s=>s.add(rec));loadThumb();return rec}
let thumbURL=null;
async function loadThumb(){
 const all=await getAll(),t=$('thumb');if(thumbURL){URL.revokeObjectURL(thumbURL);thumbURL=null}
 const last=all[all.length-1],ready=all.filter(r=>isReady(r)&&r.kind!=='video').pop();
 if(last&&!isReady(last)){t.style.backgroundImage='none';t.textContent='⏳';return}
 t.textContent='';if(ready){thumbURL=URL.createObjectURL(ready.blob);t.style.backgroundImage=`url(${thumbURL})`}else{t.style.backgroundImage='none';if(last&&last.kind==='video')t.textContent='🎬'}
}
function extOf(b){const t=(b&&b.type)||'';return t.includes('gif')?'gif':t.includes('mp4')?'mp4':t.includes('webm')?'webm':t.includes('zip')?'zip':'jpg'}
function fname(r){const d=new Date(r.ts||Date.now());return `FilmCam_${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}.${extOf(r.blob)}`}
function download(r,name){const u=URL.createObjectURL(r.blob),a=document.createElement('a');a.href=u;a.download=name||fname(r);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),8000)}
async function shareBlob(blob,name){
 const file=new File([blob],name,{type:blob.type||'image/jpeg'});
 if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:'FilmCam'});return true}catch(e){if(e&&e.name==='AbortError')return false}}
 download({blob,ts:Date.now()},name);toast('เครื่องนี้แชร์ตรงไม่ได้ เลยดาวน์โหลดให้แทน');return true;
}

/* ================= BACKUP (zip, no compression) ================= */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(u8){let c=-1;for(let i=0;i<u8.length;i++)c=CRC[(c^u8[i])&255]^(c>>>8);return(c^-1)>>>0}
function makeZip(files){
 const parts=[],central=[],enc=new TextEncoder();let off=0;
 for(const f of files){
  const nm=enc.encode(f.name),crc=crc32(f.data),sz=f.data.length,h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(12,0x21,true);h.setUint32(14,crc,true);h.setUint32(18,sz,true);h.setUint32(22,sz,true);h.setUint16(26,nm.length,true);
  parts.push(h.buffer,nm,f.data);
  const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(14,0x21,true);c.setUint32(16,crc,true);c.setUint32(20,sz,true);c.setUint32(24,sz,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  central.push(c.buffer,nm);off+=30+nm.length+sz;
 }
 const cs=central.reduce((a,b)=>a+b.byteLength,0),e=new DataView(new ArrayBuffer(22));
 e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
 return new Blob([...parts,...central,e.buffer],{type:'application/zip'});
}
function readZip(buf){
 const dv=new DataView(buf),u8=new Uint8Array(buf),dec=new TextDecoder();let e=-1;
 for(let i=buf.byteLength-22;i>=Math.max(0,buf.byteLength-65557);i--)if(dv.getUint32(i,true)===0x06054b50){e=i;break}
 if(e<0)throw new Error('not zip');
 const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out={};
 for(let i=0;i<n;i++){
  if(dv.getUint32(p,true)!==0x02014b50)throw new Error('bad zip');
  const method=dv.getUint16(p+10,true),sz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);
  const name=dec.decode(u8.subarray(p+46,p+46+nl));
  const lnl=dv.getUint16(lo+26,true),lxl=dv.getUint16(lo+28,true),ds=lo+30+lnl+lxl;
  if(method===0)out[name]=u8.subarray(ds,ds+sz);
  p+=46+nl+xl+cl;
 }
 return out;
}
async function backupAll(){
 const all=await getAll();if(!all.length){toast('ยังไม่มีรูปให้สำรอง');return}
 toast(`กำลังเตรียม ${all.length} รายการ…`,4000);
 const files=[],items=[],used=new Set();
 for(const r of all){
  let base=fname(r).replace(/\.\w+$/,'');while(used.has(base))base+='_';used.add(base);
  const it={...r};delete it.blob;delete it.orig;it.file=`${base}.${extOf(r.blob)}`;it.type=r.blob.type;
  files.push({name:it.file,data:new Uint8Array(await r.blob.arrayBuffer())});
  if(r.orig){it.origFile=`originals/${base}.jpg`;files.push({name:it.origFile,data:new Uint8Array(await r.orig.arrayBuffer())})}
  items.push(it);
 }
 const meta={app:'filmcam',v:1,created:Date.now(),albums:S.albums,myFilms:LS.get('myFilms',[]),items};
 files.push({name:'filmcam-backup.json',data:new TextEncoder().encode(JSON.stringify(meta))});
 const zip=makeZip(files),d=new Date(),name=`FilmCam_backup_${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}.zip`;
 const box=el('<div class="rows"></div>');
 box.appendChild(el(`<div class="note" style="padding-top:0">ไฟล์สำรอง ${all.length} รายการ · ${(zip.size/1048576).toFixed(1)} MB<br>แนะนำ: กด "แชร์" แล้วเลือก <b>Google Drive</b> เพื่อเก็บไว้บนคลาวด์</div>`));
 box.appendChild(btn('📤 แชร์ไป Google Drive / แอปอื่น','',async()=>{if(await shareBlob(zip,name)){LS.set('lastBackup',Date.now());closeSheet()}}));
 box.appendChild(btn('⬇️ ดาวน์โหลดลงเครื่อง','sec',()=>{download({blob:zip},name);LS.set('lastBackup',Date.now());closeSheet();toast('กำลังดาวน์โหลด…')}));
 openSheet('สำรองรูปทั้งหมด',box);
}
async function restoreBackup(){
 const file=await pickFile('zipIn');if(!file)return;
 try{
  toast('กำลังกู้คืน…',4000);
  const Z=readZip(await file.arrayBuffer()),mj=Z['filmcam-backup.json'];if(!mj)throw new Error('no meta');
  const meta=JSON.parse(new TextDecoder().decode(mj)),have=new Set((await getAll()).map(r=>r.kind+':'+r.ts));let n=0;
  for(const it of meta.items||[]){
   if(have.has(it.kind+':'+it.ts)||!Z[it.file])continue;
   const rec={...it};delete rec.id;delete rec.file;delete rec.origFile;delete rec.type;
   rec.blob=new Blob([Z[it.file]],{type:it.type||'image/jpeg'});if(it.origFile&&Z[it.origFile])rec.orig=new Blob([Z[it.origFile]],{type:'image/jpeg'});
   await store('readwrite',s=>s.add(rec));n++;
  }
  (meta.albums||[]).forEach(a=>{if(!S.albums.includes(a))S.albums.push(a)});LS.set('albums',S.albums);
  const mine=LS.get('myFilms',[]);(meta.myFilms||[]).forEach(f=>{if(!mine.find(m=>m.id===f.id)){mine.push(f);FILMS.unshift(f)}});LS.set('myFilms',mine);
  loadThumb();toast(n?`กู้คืนแล้ว ${n} รายการ 🎉`:'ไม่มีรูปใหม่ให้กู้คืน (มีครบแล้ว)');
 }catch(e){console.error(e);toast('ไฟล์นี้ไม่ใช่ไฟล์สำรองของ FilmCam')}
}

/* ================= GALLERY ================= */
let gURLs=[],cur=null,curURL=null,selMode=false,picked=[];
function renderAlbums(){
 const row=$('albRow');row.innerHTML='';
 const mkb=(name,label)=>{const b=el(`<button class="${S.album===name?'on':''}">${esc(label)}</button>`);b.onclick=()=>{S.album=name;LS.set('album',name);openGallery()};row.appendChild(b)};
 mkb('','ทั้งหมด');S.albums.forEach(a=>mkb(a,'📁 '+a));
 const add=el('<button>＋ อัลบั้มใหม่</button>');add.onclick=()=>newAlbum(n=>{S.album=n;LS.set('album',n);openGallery()});row.appendChild(add);
 $('albNote').textContent=S.album?`รูปที่ถ่ายใหม่จะเข้าอัลบั้ม "${S.album}" · แตะ "ทั้งหมด" เพื่อเลิกใช้`:'';
}
function newAlbum(done){
 const box=el('<div class="rows" style="padding-top:0"></div>'),ti=el('<input class="txtin" maxlength="24" placeholder="เช่น ญี่ปุ่น 2026">');box.appendChild(ti);
 box.appendChild(btn('สร้างอัลบั้ม','',()=>{const n=ti.value.trim();if(!n)return;if(!S.albums.includes(n)){S.albums.push(n);LS.set('albums',S.albums)}closeSheet();done(n);toast(`สร้างอัลบั้ม "${n}" แล้ว`)}));
 openSheet('อัลบั้มใหม่',box);setTimeout(()=>ti.focus(),300);
}
async function openGallery(){
 $('gallery').classList.add('open');renderAlbums();const grid=$('ggrid');grid.innerHTML='';gURLs.forEach(u=>URL.revokeObjectURL(u));gURLs=[];
 let all=(await getAll()).reverse();if(S.album)all=all.filter(r=>r.album===S.album);
 $('gCount').textContent=all.length?`· ${all.length}`:'';
 if(!all.length){grid.innerHTML=`<div class="empty">${S.album?'อัลบั้มนี้ยังว่าง<br>รูปที่ถ่ายต่อจากนี้จะเข้าอัลบั้มนี้':'ยังไม่มีรูปเลย<br>ไปถ่ายรูปแรกกันเถอะ 🎞️'}</div>`;return}
 all.forEach(r=>{
  if(!isReady(r)){const t=el(`<div class="tile locked"><div><b>🎞️</b>กำลังล้าง<br>${lockText(r)}</div></div>`);t.onclick=()=>toast(`ยังล้างไม่เสร็จ (${lockText(r)})`);grid.appendChild(t);return}
  const u=URL.createObjectURL(r.blob);gURLs.push(u);const isV=r.kind==='video';
  const t=el(`<div class="tile">${isV?'<video muted playsinline preload="metadata"></video><div class="play">▶ วิดีโอ</div>':'<img loading="lazy" alt="">'}${r.kind==='gif'?'<div class="play">GIF</div>':''}<div class="badge" style="display:${selMode&&!isV?'grid':'none'}"></div></div>`);
  if(isV)t.querySelector('video').src=u+'#t=0.1';else t.querySelector('img').src=u;
  const idx=picked.findIndex(p=>p.id===r.id);if(idx>=0){t.classList.add('picked');t.querySelector('.badge').textContent=idx+1}
  t.onclick=()=>{if(selMode){if(!isV)togglePick(r)}else openViewer(r)};
  grid.appendChild(t);
 });
 const lb=LS.get('lastBackup',0);if(all.length>=20&&Date.now()-lb>14*864e5&&!openGallery._warned){openGallery._warned=1;toast('อย่าลืมสำรองรูป ⚙️ ตั้งค่า → สำรองรูปทั้งหมด',3500)}
}
function togglePick(r){const i=picked.findIndex(p=>p.id===r.id);if(i>=0)picked.splice(i,1);else{if(picked.length>=9){toast('เลือกได้สูงสุด 9 รูป');return}picked.push(r)}$('selGo').textContent=`รวมรูป (${picked.length})`;openGallery()}
function setSel(on){selMode=on;picked=[];$('gSelect').classList.toggle('on',on);$('gSelect').textContent=on?'กำลังเลือก':'รวมรูป';$('selbar').classList.toggle('show',on);$('selGo').textContent='รวมรูป (0)';openGallery()}
$('gSelect').onclick=()=>setSel(!selMode);
$('selCancel').onclick=()=>setSel(false);
$('selGo').onclick=()=>{if(picked.length<2){toast('เลือกอย่างน้อย 2 รูป');return}openCollage(picked.slice())};
$('thumb').onclick=()=>{setSel(false)};
$('gClose').onclick=()=>{$('gallery').classList.remove('open');selMode=false;gURLs.forEach(u=>URL.revokeObjectURL(u));gURLs=[]};

const KIND_T={collage:'ภาพรวม',post:'ภาพสำหรับลง IG',booth:'โฟโต้บูธ',gif:'GIF',video:'วิดีโอ'};
function openViewer(r){
 cur=r;if(curURL)URL.revokeObjectURL(curURL);curURL=URL.createObjectURL(r.blob);
 const isV=r.kind==='video';$('vImg').style.display=isV?'none':'';$('vVid').style.display=isV?'':'none';
 if(isV){$('vVid').src=curURL;$('vVid').play().catch(()=>{})}else{$('vVid').pause();$('vVid').removeAttribute('src');$('vImg').src=curURL}
 $('vTitle').textContent=KIND_T[r.kind]?(KIND_T[r.kind]+(r.film&&(r.kind==='gif'||isV)?' · '+r.film:'')):r.film;
 $('vMeta').textContent=(r.kind==='photo'?`${r.cam} · ${r.lens} · `:'')+new Date(r.ts).toLocaleString('th-TH')+(r.album?` · 📁 ${r.album}`:'');
 $('vEdit').disabled=!r.orig;$('vPost').disabled=isV||r.kind==='gif';$('viewerWrap').classList.add('open');
}
$('vClose').onclick=()=>{$('viewerWrap').classList.remove('open');$('vVid').pause()};
$('vSave').onclick=()=>{if(cur){download(cur);toast('กำลังดาวน์โหลด…')}};
$('vShare').onclick=()=>{if(cur)shareBlob(cur.blob,fname(cur))};
$('vEdit').onclick=()=>{if(cur&&cur.orig)openEditor(cur)};
$('vPost').onclick=()=>{if(cur)openPost(cur)};
$('vAlb').onclick=()=>{
 if(!cur)return;const box=el('<div class="rows" style="padding-top:0"></div>');
 const move=async name=>{cur.album=name;await store('readwrite',s=>s.put(cur));closeSheet();openViewer(cur);openGallery();toast(name?`ย้ายไป "${name}" แล้ว`:'เอาออกจากอัลบั้มแล้ว')};
 box.appendChild(btn('ไม่อยู่ในอัลบั้ม',cur.album?'sec':'',()=>move('')));
 S.albums.forEach(a=>box.appendChild(btn('📁 '+esc(a),cur.album===a?'':'sec',()=>move(a))));
 box.appendChild(btn('＋ อัลบั้มใหม่','sec',()=>newAlbum(n=>move(n))));
 openSheet('ย้ายไปอัลบั้ม',box);
};
let delArm=0;
$('vDel').onclick=async()=>{
 if(!cur)return;if(Date.now()-delArm>2500){delArm=Date.now();$('vDel').innerHTML='<i>⚠️</i>แตะอีกครั้ง';setTimeout(()=>$('vDel').innerHTML='<i>🗑️</i>ลบ',2500);return}
 delArm=0;$('vDel').innerHTML='<i>🗑️</i>ลบ';try{await store('readwrite',s=>s.delete(cur.id))}catch(e){}
 $('viewerWrap').classList.remove('open');$('vVid').pause();openGallery();loadThumb();toast('ลบแล้ว');
};

/* ================= EDITOR ================= */
const E={rec:null,bmp:null,src:null,o:null,tab:'film',timer:0,busy:false,out:null,placing:null};
async function openEditor(r){
 E.rec=r;E.o=Object.assign({I:1,grain:1,leak:false,dust:false,stamp:false,ev:0,frameNo:1,text:'',font:'hand',tcolor:'auto',stickers:[],blur:false},JSON.parse(JSON.stringify(r.o)),{mirror:false});
 if(!E.o.date)E.o.date=r.ts;E.o.stickers=E.o.stickers||[];
 $('editor').classList.add('open');$('eView').innerHTML='<div style="color:var(--mute)">กำลังโหลด…</div>';
 E.bmp=await blobToBmp(r.orig);E.src=E.bmp;
 if(E.o.blur){try{E.src=await portraitBlur(E.bmp)}catch(e){E.o.blur=false}}
 setTab('film');renderEd();
}
function edOpts(){const o={...E.o};if(o.filmObj){o.filmObj=FILMS.find(f=>f.id===o.filmObj.id)||o.filmObj}else{const f=byId(FILMS,o.film);if(f.mine)o.filmObj=f}return o}
function renderEd(){
 clearTimeout(E.timer);E.timer=setTimeout(async()=>{
  if(!E.src)return;if(E.o.text)await ensureFont(E.o.font);
  const c=develop(E.src,E.src.width,E.src.height,{...edOpts(),max:1000});E.out=c;
  c.onclick=ev=>{if(!E.placing)return;const r=c.getBoundingClientRect();E.placing.x=(ev.clientX-r.left)/r.width;E.placing.y=(ev.clientY-r.top)/r.height;renderEd()};
  $('eView').innerHTML='';$('eView').appendChild(c);
 },90);
}
function setTab(t){E.tab=t;document.querySelectorAll('#eTabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
 const P=$('ePanel');P.innerHTML='';
 if(t==='film'||t==='cam'||t==='lens'){
  const list={film:FILMS,cam:CAMS,lens:LENSES}[t].filter(x=>!x.hidden||x.id===E.o[t]),box=el('<div class="chips"></div>');
  if(t==='film'){const add=el('<button class="chip"><span class="ic">🎯</span>ก๊อปโทน</button>');add.onclick=async()=>{const f=await createToneFilm(E.bmp);if(f){E.o.film=f.id;E.o.filmObj=f;setTab('film');renderEd()}};box.appendChild(add)}
  list.forEach(it=>{const b=el(`<button class="chip${E.o[t]===it.id?' active':''}"></button>`);
   b.innerHTML=(t==='film'?canSVG(it):`<span class="ic">${t==='lens'?(it.circle?'🐟':'🔘'):(it.ic||'📷')}</span>`)+esc(it.name);
   b.onclick=()=>{E.o[t]=it.id;if(t==='film')E.o.filmObj=it.mine?it:undefined;if(t==='cam'){E.o.leak=!!it.leak}box.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderEd()};box.appendChild(b)});
  P.appendChild(box);
  if(t==='film')P.appendChild(el('<div class="note" style="padding:0 16px">เลื่อนซ้าย-ขวาดูฟิล์มทั้งหมด · 🎯 ก๊อปโทน = เลือกรูปที่ชอบ แล้วแอปปรับรูปนี้ให้โทนเดียวกัน</div>'));
  setTimeout(()=>{const a=box.querySelector('.active');if(a)a.scrollIntoView({inline:'center',block:'nearest'})},0);
 }else if(t==='adj'){
  const box=el('<div class="rows" style="padding-top:0"></div>');
  rangeRow(box,'ความแรงฟิล์ม',0,1,.05,()=>E.o.I,v=>{E.o.I=v;renderEd()},v=>Math.round(v*100)+'%');
  rangeRow(box,'ความสว่าง',-2,2,.1,()=>E.o.ev,v=>{E.o.ev=v;renderEd()},v=>(v>0?'+':'')+v.toFixed(1));
  rangeRow(box,'เกรนฟิล์ม',0,3,.1,()=>E.o.grain,v=>{E.o.grain=v;renderEd()},v=>Math.round(v*100)+'%');
  toggleRow(box,'หน้าชัดหลังเบลอ (รูปคน)',()=>E.o.blur,async v=>{
   if(!v){E.o.blur=false;E.src=E.bmp;renderEd();return}
   toast('กำลังหาตัวคนในรูป… (ครั้งแรกต้องต่อเน็ต)',5000);
   try{E.src=await portraitBlur(E.bmp);E.o.blur=true;renderEd();toast('เบลอหลังแล้ว ✨')}catch(e){console.error(e);E.o.blur=false;setTab('adj');toast('ทำไม่ได้ ลองต่อเน็ตแล้วลองใหม่')}
  });
  const lk=toggleRow(box,'แสงรั่ว',()=>E.o.leak,v=>{E.o.leak=v;renderEd()});
  const rr=el('<button class="iconbtn" style="width:34px;height:34px;margin-left:auto" title="สุ่มใหม่">🎲</button>');rr.onclick=e=>{e.preventDefault();E.o.seed=newSeed();renderEd()};lk.insertBefore(rr,lk.lastChild);
  toggleRow(box,'ฝุ่นและรอยขีดข่วน',()=>E.o.dust,v=>{E.o.dust=v;renderEd()});
  toggleRow(box,'วันที่บนรูป',()=>E.o.stamp,v=>{E.o.stamp=v;renderEd()});
  const dr=el('<div class="row"><span>วันที่</span><input type="date"></div>'),di=dr.querySelector('input');
  const d0=new Date(E.o.date);di.value=`${d0.getFullYear()}-${pad2(d0.getMonth()+1)}-${pad2(d0.getDate())}`;
  di.onchange=()=>{if(di.value){E.o.date=+new Date(di.value+'T12:00:00');E.o.stamp=true;setTab('adj');renderEd()}};box.appendChild(dr);
  P.appendChild(box);
 }else{
  const box=el('<div class="rows" style="padding-top:4px"></div>');
  const ti=el('<input class="txtin" maxlength="40" placeholder="พิมพ์ข้อความ เช่น ทริปเชียงใหม่ 💛">');ti.value=E.o.text||'';ti.oninput=()=>{E.o.text=ti.value;renderEd()};box.appendChild(ti);
  chipGroup(box,'ฟอนต์',Object.entries(FONTS).map(([k,v])=>[k,v.n]),()=>E.o.font,v=>{E.o.font=v;renderEd()});
  chipGroup(box,'สีตัวอักษร',[['auto','อัตโนมัติ'],['#ffffff','ขาว'],['#2b2521','ดำ'],['#ff7b1c','ส้ม'],['#e8578a','ชมพู']],()=>E.o.tcolor,v=>{E.o.tcolor=v;renderEd()});
  box.appendChild(el('<div class="lbl">สติกเกอร์ · แตะสติกเกอร์เพื่อเพิ่ม แล้วแตะบนรูปเพื่อย้าย</div>'));
  const sg=el('<div class="minichips"></div>');
  STICKERS.forEach(e=>{const b=el(`<button class="stk">${e}</button>`);b.onclick=()=>{const s={e,x:.5+(Math.random()-.5)*.3,y:.4+(Math.random()-.5)*.3};E.o.stickers.push(s);E.placing=s;renderEd()};sg.appendChild(b)});
  box.appendChild(sg);
  box.appendChild(btn('ลบสติกเกอร์ทั้งหมด','sec',()=>{E.o.stickers=[];E.placing=null;renderEd()}));
  if(byId(CAMS,E.o.cam).frame!=='instant')box.appendChild(el('<div class="note">💡 อยากให้ข้อความอยู่บนขอบขาวแบบโพลารอยด์ ให้ไปแท็บ "กล้อง" แล้วเลือก Instant Square</div>'));
  P.appendChild(box);
 }
}
document.querySelectorAll('#eTabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.t));
$('eClose').onclick=()=>{$('editor').classList.remove('open');E.bmp=E.src=null;E.placing=null};
async function saveEd(replace){
 if(E.busy||!E.src)return;E.busy=true;toast('กำลังล้างรูป…');
 try{
  await sleep(30);if(E.o.text)await ensureFont(E.o.font);
  const o=edOpts();delete o.max;
  const blob=await toBlob(develop(E.src,E.src.width,E.src.height,o));
  const saveO={...E.o};if(o.filmObj)saveO.filmObj=o.filmObj;else delete saveO.filmObj;
  const rec={...E.rec,blob,o:saveO,...metaOf(o)};delete rec.lock;
  if(replace){await store('readwrite',s=>s.put(rec))}else{delete rec.id;rec.ts=Date.now();await addRecord(rec)}
  $('editor').classList.remove('open');E.bmp=E.src=null;E.placing=null;loadThumb();await openGallery();openViewer(rec);toast(replace?'แทนที่รูปเดิมแล้ว':'บันทึกเป็นรูปใหม่แล้ว');
 }catch(e){console.error(e);toast('บันทึกไม่สำเร็จ')}
 E.busy=false;
}
$('eReplace').onclick=()=>saveEd(true);
$('eSaveNew').onclick=()=>saveEd(false);

/* ================= IG POST / COLLAGE ================= */
const RATIOS=[['4:5',4/5,'ฟีด 4:5'],['9:16',9/16,'สตอรี่ 9:16'],['1:1',1,'จัตุรัส 1:1']];
const BGS=[['#ffffff','ขาว'],['#f3efe6','ครีม'],['#111111','ดำ']];
function coverDraw(x,img,dx,dy,dw,dh){const s=Math.max(dw/img.width,dh/img.height),sw=dw/s,sh=dh/s;x.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,dx,dy,dw,dh)}
function composePost(img,ratio,bg,margin,W=1080){
 const H=Math.round(W/ratio),c=mk(W,H),x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,W,H);
 if(!margin){coverDraw(x,img,0,0,W,H);return c}
 const mw=W*(1-2*margin),mh=H*(1-2*margin),s=Math.min(mw/img.width,mh/img.height),dw=img.width*s,dh=img.height*s;
 x.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh);return c;
}
function chipGroup(box,label,opts,get,set){
 box.appendChild(el(`<div class="lbl">${label}</div>`));const g=el('<div class="minichips"></div>');
 opts.forEach(([v,t])=>{const b=el(`<button${get()===v?' class="active"':''}>${t}</button>`);b.onclick=()=>{set(v);g.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')};g.appendChild(b)});
 box.appendChild(g);
}
async function openPost(r){
 const img=await blobToBmp(r.blob),st={ratio:'4:5',bg:'#ffffff',margin:.06};
 const box=el('<div class="rows" style="padding-top:0"></div>'),prev=el('<div class="prev"></div>');box.appendChild(prev);
 let out=null;
 const draw=()=>{out=composePost(img,RATIOS.find(x=>x[0]===st.ratio)[1],st.bg,st.margin);prev.innerHTML='';prev.appendChild(out)};
 chipGroup(box,'ขนาด',RATIOS.map(x=>[x[0],x[2]]),()=>st.ratio,v=>{st.ratio=v;draw()});
 chipGroup(box,'สีขอบ',BGS,()=>st.bg,v=>{st.bg=v;draw()});
 chipGroup(box,'ขอบ',[[0,'เต็มภาพ'],[.04,'บาง'],[.06,'กลาง'],[.1,'หนา']],()=>st.margin,v=>{st.margin=v;draw()});
 box.appendChild(btn('💾 บันทึกลงอัลบั้ม','',async()=>{const rec=await addRecord({kind:'post',blob:await toBlob(out,.94),album:r.album||''});closeSheet();await openGallery();openViewer(rec);toast('บันทึกแล้ว')}));
 box.appendChild(btn('📤 แชร์ไป IG / แอปอื่น','sec',async()=>shareBlob(await toBlob(out,.94),`FilmCam_post_${Date.now()}.jpg`)));
 openSheet('จัดรูปลง IG',box);draw();
}
function layoutGrid(imgs,ratio,bg){
 const W=1080,H=Math.round(W/ratio),c=mk(W,H),x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,W,H);
 const n=imgs.length,cols=n<=4?2:3,rows=Math.ceil(n/cols),gap=W*.02,cw=(W-gap*(cols+1))/cols,ch=(H-gap*(rows+1))/rows;
 imgs.forEach((im,i)=>{const r=Math.floor(i/cols),inRow=Math.min(cols,n-r*cols),off=(cols-inRow)*(cw+gap)/2,cI=i%cols;coverDraw(x,im,gap+off+cI*(cw+gap),gap+r*(ch+gap),cw,ch)});
 return c;
}
function layoutStrip(imgs,ratio,bg){
 const n=imgs.length,fw=800,fh=560,side=120,gy=36,CW=fw+2*side,CH=n*fh+(n+1)*gy,s=mk(CW,CH),x=s.getContext('2d');
 x.fillStyle='#0d0b0a';x.fillRect(0,0,CW,CH);
 x.fillStyle='rgba(243,239,230,.92)';const hw=40,hh=28;
 for(let y=18;y<CH-hh;y+=62){[side/2-hw/2,CW-side/2-hw/2].forEach(hx=>{x.beginPath();x.roundRect?x.roundRect(hx,y,hw,hh,6):x.rect(hx,y,hw,hh);x.fill()})}
 x.font='700 22px ui-monospace,Menlo,monospace';x.textBaseline='middle';
 imgs.forEach((im,i)=>{const y=gy+i*(fh+gy);coverDraw(x,im,side,y,fw,fh);x.fillStyle='#f29a3a';x.save();x.translate(side-16,y+fh-30);x.rotate(-Math.PI/2);x.fillText(`${i+1}A`,0,0);x.restore()});
 return composePost(s,ratio,bg,.06);
}
function layoutDump(imgs,ratio,bg,seed){
 const W=1080,H=Math.round(W/ratio),c=mk(W,H),x=c.getContext('2d'),R=rng(seed);x.fillStyle=bg;x.fillRect(0,0,W,H);
 const n=imgs.length,cols=n<=2?1:n<=4?2:3,rows=Math.ceil(n/cols),cw=W/cols,ch=H/rows,pw=Math.min(cw,ch)*(n<=2?.85:.95);
 imgs.forEach((im,i)=>{
  const r=Math.floor(i/cols),cI=i%cols,cx=cw*(cI+.5)+(R()-.5)*cw*.18,cy=ch*(r+.5)+(R()-.5)*ch*.15,b=pw*.05,bb=pw*.2,ph=pw-2*b;
  x.save();x.translate(cx,cy);x.rotate((R()-.5)*.3);x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=pw*.06;x.shadowOffsetY=pw*.02;
  const fh=b+ph+bb;x.fillStyle='#f6f3ec';x.fillRect(-pw/2,-fh/2,pw,fh);x.shadowColor='transparent';
  coverDraw(x,im,-pw/2+b,-fh/2+b,ph,ph);x.restore();
 });
 return c;
}
async function openCollage(recs){
 const imgs=await Promise.all(recs.map(r=>blobToBmp(r.blob))),st={layout:'grid',ratio:'4:5',bg:'#ffffff',seed:newSeed()};
 const box=el('<div class="rows" style="padding-top:0"></div>'),prev=el('<div class="prev"></div>');box.appendChild(prev);
 let out=null;
 const draw=()=>{const ra=RATIOS.find(x=>x[0]===st.ratio)[1];out=st.layout==='grid'?layoutGrid(imgs,ra,st.bg):st.layout==='strip'?layoutStrip(imgs,ra,st.bg):layoutDump(imgs,ra,st.bg,st.seed);prev.innerHTML='';prev.appendChild(out)};
 chipGroup(box,'แบบ',[['grid','กริด'],['strip','แถบฟิล์ม'],['dump','โพลารอยด์กระจาย']],()=>st.layout,v=>{st.layout=v;draw()});
 chipGroup(box,'ขนาด',RATIOS.map(x=>[x[0],x[2]]),()=>st.ratio,v=>{st.ratio=v;draw()});
 chipGroup(box,'พื้นหลัง',BGS,()=>st.bg,v=>{st.bg=v;draw()});
 box.appendChild(btn('🎲 สุ่มตำแหน่งโพลารอยด์ใหม่','sec',()=>{st.seed=newSeed();st.layout='dump';draw()}));
 box.appendChild(btn('💾 บันทึกลงอัลบั้ม','',async()=>{const rec=await addRecord({kind:'collage',blob:await toBlob(out,.94)});closeSheet();setSel(false);openViewer(rec);toast('บันทึกภาพรวมแล้ว')}));
 box.appendChild(btn('📤 แชร์','sec',async()=>shareBlob(await toBlob(out,.94),`FilmCam_dump_${Date.now()}.jpg`)));
 openSheet(`รวม ${recs.length} รูป`,box);draw();
}

/* ================= INIT ================= */
initGL();applyUI();startCam();loadThumb();requestAnimationFrame(loop);
setTimeout(()=>{const b=document.querySelector('#modes .on');if(b)b.scrollIntoView({inline:'center',block:'nearest'})},300);
setInterval(()=>{$('stamp').textContent=dateStr(stampDate(),effCam().stampStyle);loadThumb();if($('gallery').classList.contains('open')&&!selMode)openGallery()},60000);
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});

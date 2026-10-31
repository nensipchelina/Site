/* np-common.js — общая шапка, меню, подвал, тема, язык, карточки работ.
   Подключается на каждой странице ПЕРЕД скриптом самой страницы. */
(function(){
'use strict';
var LANGS=['ru','en','zh'];
var L={
  ru:{portfolio:'Портфолио',services:'Услуги',skills:'Навыки',contact:'Контакт',order:'Заказать проект',menu:'Меню',close:'Закрыть',
      price:'Прайс-лист',cv:'Резюме PDF',vcard:'Сохранить контакт',process:'Как мы работаем',privacy:'Политика конфиденциальности',theme:'Тема',home:'Главная'},
  en:{portfolio:'Portfolio',services:'Services',skills:'Skills',contact:'Contact',order:'Order a Project',menu:'Menu',close:'Close',
      price:'Price list',cv:'Resume PDF',vcard:'Save contact',process:'How We Work',privacy:'Privacy Policy',theme:'Theme',home:'Home'},
  zh:{portfolio:'作品集',services:'服务',skills:'技能',contact:'联系',order:'订购项目',menu:'菜单',close:'关闭',
      price:'价格表',cv:'简历PDF',vcard:'保存联系人',process:'工作流程',privacy:'隐私政策',theme:'主题',home:'首页'}
};
var file=(location.pathname.split('/').pop()||'index.html');
var isIndex=/^(index(-new)?\.html)?$/.test(file);
var base=isIndex?'':'index.html';
function curLang(){
  var h=document.documentElement.lang;
  if(LANGS.indexOf(h)>-1 && document.documentElement.dataset.npLang) return h;
  var s='ru'; try{s=localStorage.getItem('np-lang')||'ru';}catch(e){}
  return LANGS.indexOf(s)>-1?s:'ru';
}
function ico(c){return '<i class="ico '+c+'" aria-hidden="true"></i>';}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}

function active(name){
  if(name==='portfolio') return (file==='portfolio.html'||file==='project.html')?' aria-current="page"':'';
  if(name==='services') return file==='services.html'?' aria-current="page"':'';
  return '';
}

function topHTML(l){
  var t=L[l];
  return ''+
  '<header class="bar">'+
    '<div class="langs">'+
      '<button class="lang-btn'+(l==='ru'?' active':'')+'" data-lang="ru" onclick="setLang(\'ru\')">RU</button>'+
      '<button class="lang-btn'+(l==='en'?' active':'')+'" data-lang="en" onclick="setLang(\'en\')">EN</button>'+
      '<button class="lang-btn'+(l==='zh'?' active':'')+'" data-lang="zh" onclick="setLang(\'zh\')">中文</button>'+
    '</div>'+
    '<nav class="nav" aria-label="'+esc(t.home)+'">'+
      '<a href="portfolio.html"'+active('portfolio')+'>'+t.portfolio+'</a>'+
      '<a href="services.html"'+active('services')+'>'+t.services+'</a>'+
      '<a href="'+base+'#skills">'+t.skills+'</a>'+
      '<a href="'+base+'#contact">'+t.contact+'</a>'+
    '</nav>'+
    '<div class="bar-r">'+
      '<a href="price.html" class="order-link" onclick="goToPrice();return false;">'+t.order+'</a>'+
      '<button class="menu-btn" id="menu-btn" onclick="toggleMenu()" aria-expanded="false" aria-controls="menu">'+t.menu+'</button>'+
      '<button class="theme-btn" onclick="toggleTheme()" aria-label="'+esc(t.theme)+'" title="'+esc(t.theme)+'"></button>'+
    '</div>'+
  '</header>'+
  '<div class="menu" id="menu">'+
    (isIndex?'':'<a href="index.html" onclick="closeMenu()">'+t.home+'</a>')+
    '<a href="portfolio.html" onclick="closeMenu()">'+t.portfolio+'</a>'+
    '<a href="services.html" onclick="closeMenu()">'+t.services+'</a>'+
    '<a href="'+base+'#skills" onclick="closeMenu()">'+t.skills+'</a>'+
    '<a href="'+base+'#contact" onclick="closeMenu()">'+t.contact+'</a>'+
    '<a href="price.html" style="color:var(--acc)" onclick="goToPrice();return false;">'+t.order+'</a>'+
    '<div class="gap"></div>'+
    '<a class="sm" href="price.html" onclick="goToPrice();return false;">'+ico('fa-solid fa-file-lines')+t.price+'</a>'+
    '<button class="sm" onclick="downloadCV()">'+ico('fa-solid fa-file-pdf')+t.cv+'</button>'+
    '<button class="sm" onclick="downloadVCard()">'+ico('fa-solid fa-address-card')+t.vcard+'</button>'+
    '<a class="sm" href="process.html">'+ico('fa-solid fa-circle-question')+t.process+'</a>'+
    '<a class="sm" href="privacy.html">'+ico('fa-solid fa-shield-halved')+t.privacy+'</a>'+
  '</div>';
}
function footHTML(l){
  var t=L[l];
  return ''+
  '<footer class="foot">'+
    '<div class="foot-row">'+
      '<a href="https://t.me/npchel" target="_blank" rel="noopener">'+ico('fa-brands fa-telegram')+'Telegram</a>'+
      '<a href="https://wa.me/79036040666" target="_blank" rel="noopener">'+ico('fa-brands fa-whatsapp')+'WhatsApp</a>'+
      '<a href="https://www.behance.net/natalyapchelina" target="_blank" rel="noopener">'+ico('fa-brands fa-behance')+'Behance</a>'+
      '<a href="https://ru.pinterest.com/NPchelina" target="_blank" rel="noopener">'+ico('fa-brands fa-pinterest')+'Pinterest</a>'+
      '<a href="https://www.linkedin.com/in/npchelina" target="_blank" rel="noopener">'+ico('fa-brands fa-linkedin')+'LinkedIn</a>'+
      '<a href="https://www.avito.ru/brands/9582581b86f01263db98c276fccb332b" target="_blank" rel="noopener">'+ico('fa-solid fa-store')+'Avito</a>'+
      '<a href="mailto:npchel93@gmail.com">'+ico('fa-solid fa-envelope')+'npchel93@gmail.com</a>'+
    '</div>'+
    '<div class="foot-row row-mute">'+
      '<a href="price.html" onclick="goToPrice();return false;">'+ico('fa-solid fa-file-lines')+t.price+'</a>'+
      '<button onclick="downloadCV()">'+ico('fa-solid fa-file-pdf')+t.cv+'</button>'+
      '<button onclick="downloadVCard()">'+ico('fa-solid fa-address-card')+t.vcard+'</button>'+
      '<a href="process.html">'+ico('fa-solid fa-circle-question')+t.process+'</a>'+
      '<a href="privacy.html">'+ico('fa-solid fa-shield-halved')+t.privacy+'</a>'+
    '</div>'+
    '<div class="foot-copy">Наталья Пчелина © 2026</div>'+
  '</footer>';
}
function renderChrome(l){
  var a=document.getElementById('np-top'), b=document.getElementById('np-foot');
  if(a) a.innerHTML=topHTML(l);
  if(b) b.innerHTML=footHTML(l);
}

/* ── тема ───────────────────────── */
window.toggleTheme=function(){
  var h=document.documentElement, n=h.dataset.theme==='dark'?'light':'dark'; h.dataset.theme=n;
  try{localStorage.setItem('np-theme-v2',n);}catch(e){}
};
window.applyThemeIcon=function(){};
/* ── меню ───────────────────────── */
window.toggleMenu=function(){
  var m=document.getElementById('menu'), b=document.getElementById('menu-btn'); if(!m||!b) return;
  var open=m.classList.toggle('open'); b.setAttribute('aria-expanded',open);
  b.textContent=L[curLang()][open?'close':'menu']; document.body.style.overflow=open?'hidden':'';
};
window.closeMenu=function(){
  var m=document.getElementById('menu'), b=document.getElementById('menu-btn'); if(!m||!b) return;
  m.classList.remove('open'); b.setAttribute('aria-expanded','false'); b.textContent=L[curLang()].menu; document.body.style.overflow='';
};
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    window.closeMenu();
    ['service-modal','contact-popup','success-overlay'].forEach(function(id){var el=document.getElementById(id); if(el&&el.classList.contains('open')){el.classList.remove('open'); document.body.style.overflow='';}});
  }
});

/* ── переходы и загрузки ────────── */
window.goToPrice=function(){window.location.href='price.html?lang='+curLang();};
window.downloadCV=window.downloadResume=function(){window.open('resume-'+curLang()+'.pdf','_blank');};
window.downloadVCard=function(){
  const lang=curLang();
  const cfg={ru:{fn:'Наталья Пчелина',n:'Пчелина;Наталья;;;',title:'Дизайнер-конструктор'},en:{fn:'Natalya Pchelina',n:'Pchelina;Natalya;;;',title:'Fashion Designer & Pattern Maker'},zh:{fn:'娜塔利亚·普切利娜',n:'普切利娜;娜塔利亚;;;',title:'时装设计师 & 制版师'}};
  const c=cfg[lang];
  const vcard=['BEGIN:VCARD','VERSION:3.0',`FN:${c.fn}`,`N:${c.n}`,`TITLE:${c.title}`,'ORG:NP Pchelina Design','TEL;TYPE=CELL:+79036040666','EMAIL;TYPE=WORK:npchel93@gmail.com','URL:https://npchelina.ru','X-SOCIALPROFILE;TYPE=telegram:https://t.me/npchel','NOTE:Telegram: @npchel | npchelina.ru','END:VCARD'].join('\n');
  const blob=new Blob([vcard],{type:'text/vcard'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='NPchelina.vcf';a.click();
};

/* ── карточка работы (главная, портфолио) ── */
function tagsFor(p,lang){ if(lang==='en'&&p.tags_en) return p.tags_en; if(lang==='zh'&&p.tags_zh) return p.tags_zh; return p.tags||[]; }
window.NP={
  brandKeys:{'Darkside':['darkside','дарксайд'],'Твоя уникальность':['уникальност','unikalnost'],'Sunnunu':['sunnunu','саннуну'],'Zabod':['zabod','забод'],'Vincult':['vincult','vinkult','винкульт'],'Franky':['franky','франки'],'Vertango':['vertango','вертанго'],'Pachkoriya':['pachkoriya','пачкори'],'Дом музыки':['dommuzyki','дом музыки','dom muzyki'],'KraftiShop':['krafti','крафти'],'Edinovlastie':['edinovlastie','единовласт']},
  brandProjects:function(name){
    var ks=NP.brandKeys[name]||[name.toLowerCase()];
    if(typeof PROJECTS==='undefined') return [];
    return PROJECTS.filter(function(p){var t=(p.id+JSON.stringify([p.ru,p.en,p.zh])).toLowerCase(); return ks.some(function(k){return t.indexOf(k)>-1;});});
  },
  tg:{
    url:'https://np-forms.yaiscolu.workers.dev',
    h:function(v){return String(v==null||v===''?'—':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');},
    send:function(msg){
      return fetch(NP.tg.url+'/message',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:msg})})
        .then(function(r){return r.ok;}).catch(function(){return false;});
    },
    files:async function(files){
      for(var i=0;i<files.length;i++){
        var fd=new FormData(); fd.append('document',files[i]); if(i===0) fd.append('caption','Вложения к запросу');
        try{await fetch(NP.tg.url+'/file',{method:'POST',body:fd});}catch(e){}
      }
    }
  },
  lang:curLang,
  esc:esc,
  work:function(p,i,lang){
    lang=lang||curLang();
    var title=(p[lang]&&p[lang].title)||p.ru.title;
    var tags=tagsFor(p,lang).slice(0,2).join(', ');
    // первый кадр грузим сразу, остальные только когда навели курсор
    var imgs=p.photos.map(function(src,k){return k===0
      ?'<img class="on" src="'+esc(src)+'" alt="'+esc(title)+'" decoding="async">'
      :'<img data-src="'+esc(src)+'" alt="" decoding="async">';}).join('');
    return '<a class="work" href="project.html?id='+encodeURIComponent(p.id)+'" style="--i:'+(i||0)+'">'+
      '<div class="frame">'+imgs+'</div>'+
      '<div class="tape" aria-hidden="true"><i></i></div>'+
      '<div class="work-title">'+esc(title)+'</div>'+
      '<div class="work-meta"><span>'+esc(tags)+'</span><span>'+esc(p.year||'')+'</span></div>'+
    '</a>';
  },
  wire:function(root){
    root.querySelectorAll('.work').forEach(function(card){
      var frame=card.querySelector('.frame'), imgs=[].slice.call(frame.querySelectorAll('img')), mark=card.querySelector('.tape');
      if(imgs.length<2) return;
      var cur=0, loaded=false;
      function load(){ if(loaded) return; loaded=true; imgs.forEach(function(im){ if(im.dataset.src) im.src=im.dataset.src; }); }
      function show(idx){ imgs.forEach(function(im,k){im.classList.toggle('on',k===idx);}); mark.style.setProperty('--p',(idx/(imgs.length-1)*100)+'%'); cur=idx; }
      frame.addEventListener('pointerenter',function(e){ if(e.pointerType==='mouse') load(); });
      frame.addEventListener('pointermove',function(e){
        if(e.pointerType!=='mouse') return; load();
        var r=frame.getBoundingClientRect();
        var idx=Math.max(0,Math.min(imgs.length-1,Math.floor((e.clientX-r.left)/r.width*imgs.length)));
        if(idx!==cur) show(idx);
      });
      frame.addEventListener('pointerleave',function(){show(0);});
    });
  }
};

/* ── язык ───────────────────────── */
function applyLang(l){
  document.documentElement.lang=l; document.documentElement.dataset.npLang='1';
  renderChrome(l);
}
// шапка и подвал сразу, до скрипта страницы (без «мигания»)
var l0=(function(){var s='ru'; try{s=localStorage.getItem('np-lang')||'ru';}catch(e){} return LANGS.indexOf(s)>-1?s:'ru';})();
document.documentElement.lang=l0;
renderChrome(l0);
document.addEventListener('DOMContentLoaded',function(){
  var orig=window.setLang;
  if(typeof orig==='function' && !orig.__np){
    var w=function(l){ document.documentElement.lang=l; document.documentElement.dataset.npLang='1'; var r=orig.apply(this,arguments); renderChrome(l); return r; };
    w.__np=true; window.setLang=w;
  }
  applyLang(curLang());
});
})();

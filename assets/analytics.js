(()=>{
'use strict';
const id='G-S707HY11SD',key='mv_analytics_consent_v1';
const allowed=new Set(['acheiusa','minhavidausa','brfind','reddit-idiomas','ig-formatos','x-formatos','wa-formatos','ig-conversacao','x-conversacao','wa-conversacao','ig-portal','x-portal','wa-portal']);
let choice=null,loaded=false;
try{choice=localStorage.getItem(key);}catch(_){}
const save=v=>{choice=v;try{localStorage.setItem(key,v);}catch(_){}};
const cleanUrl=()=>{
 const u=new URL(location.origin+location.pathname),p=new URLSearchParams(location.search);
 ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(n=>{const v=p.get(n);if(v&&/^[\w.-]{1,80}$/.test(v))u.searchParams.set(n,v);});
 const s=p.get('src');
 if(allowed.has(s)){u.searchParams.set('src',s);if(!u.searchParams.has('utm_source')){
  u.searchParams.set('utm_source',s.startsWith('x-')?'x':s.startsWith('ig-')?'instagram':s.startsWith('wa-')?'whatsapp':s.startsWith('reddit-')?'reddit':s);
  u.searchParams.set('utm_medium','social');u.searchParams.set('utm_campaign',s);
 }}
 return u.toString();
};
const enable=()=>{
 if(loaded||choice!=='granted')return;loaded=true;
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window.gtag('consent','update',{analytics_storage:'granted'});
 window.gtag('js',new Date());
 window.gtag('config',id,{page_location:cleanUrl(),allow_google_signals:false,allow_ad_personalization_signals:false});
 const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
};
const report=(e,p)=>{if(loaded&&typeof window.gtag==='function')window.gtag('event',e,p);};
const clearCookies=()=>{try{document.cookie.split(';').forEach(v=>{
 const n=v.split('=')[0].trim();if(!/^(_ga|_gid)(_|$)/.test(n))return;
 document.cookie=n+'=; Max-Age=0; path=/; SameSite=Lax';
 document.cookie=n+'=; Max-Age=0; path=/Landing-page-1/; SameSite=Lax';
});}catch(_){}};
const banner=()=>{
 document.getElementById('mv-analytics-consent')?.remove();
 const box=document.createElement('aside');box.id='mv-analytics-consent';
 box.setAttribute('role','dialog');box.setAttribute('aria-label','Preferências de privacidade');
 box.style.cssText='position:fixed;bottom:16px;left:16px;z-index:10000;max-width:440px;width:calc(100% - 32px);background:#101418;color:#e8edef;border:1px solid #45515a;box-shadow:0 12px 36px rgba(0,0,0,.46);border-radius:8px;padding:16px;font:14px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;';
 const msg=document.createElement('p');
 msg.textContent='Usamos estatísticas do Google Analytics para entender as visitas ao site e os cliques de contato. Você pode aceitar ou recusar. O site funciona normalmente em ambos os casos.';
 msg.style.cssText='margin:0 0 14px;color:#e8edef;';
 const actions=document.createElement('div');actions.style.cssText='display:flex;flex-wrap:wrap;gap:8px;align-items:center;';
 const btn=(label,primary,v)=>{
  const el=document.createElement('button');el.type='button';el.textContent=label;
  el.style.cssText='font:600 13px system-ui,sans-serif;cursor:pointer;padding:9px 15px;border-radius:5px;border:1px solid '+(primary?'#cfd6da':'#5e6b72')+';background:'+(primary?'#e3e9ed':'transparent')+';color:'+(primary?'#111820':'#e8edef')+';';
  el.addEventListener('click',()=>{
   const previous=loaded;save(v);box.remove();
   if(v==='granted')enable();
   else{if(typeof window.gtag==='function')window.gtag('consent','update',{analytics_storage:'denied'});clearCookies();if(previous)location.reload();}
  });return el;
 };
 actions.append(btn('Aceitar estatísticas',true,'granted'),btn('Recusar',false,'denied'));
 const help=document.createElement('a');help.href='https://policies.google.com/technologies/partner-sites?hl=pt-BR';
 help.target='_blank';help.rel='noopener noreferrer';help.textContent='Como o Google usa os dados';
 help.style.cssText='font:12px system-ui,sans-serif;color:#c6d4de;text-decoration:underline;';actions.append(help);
 box.append(msg,actions);document.body.append(box);
};
document.addEventListener('click',e=>{
 const a=e.target.closest?.('a[href]');if(!a)return;
 let u;try{u=new URL(a.href);}catch(_){return;}
 if(u.hostname!=='wa.me'||u.pathname!=='/5592985273076')return;
 const src=new URLSearchParams(location.search).get('src');
 const p={contact_channel:'whatsapp',contact_origin:'link',page_path:location.pathname};
 if(allowed.has(src))p.source_marker=src;report('contact_whatsapp_click',p);
});
document.addEventListener('submit',e=>{
 if(e.target.id!=='contact-intake-form')return;
 const f=new FormData(e.target);if(!['name','level','goal','format'].every(n=>String(f.get(n)||'').trim()))return;
 const src=new URLSearchParams(location.search).get('src');
 const p={contact_channel:'whatsapp',contact_origin:'contact_form',page_path:location.pathname};
 if(allowed.has(src))p.source_marker=src;report('contact_whatsapp_click',p);
},true);
const footer=document.querySelector('.site-footer .footer-row');
if(footer&&!footer.querySelector('[data-analytics-preferences]')){
 const prefs=document.createElement('button');prefs.type='button';prefs.dataset.analyticsPreferences='true';prefs.textContent='Preferências de privacidade';
 prefs.style.cssText='background:none;border:0;padding:0;color:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;font:inherit;';
 prefs.addEventListener('click',banner);footer.append(prefs);
}
if(choice==='granted')enable();else if(choice!=='denied')banner();
})();

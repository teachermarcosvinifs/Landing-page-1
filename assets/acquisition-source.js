(()=>{
  const sourceSentences={
    'acheiusa':'Conheci seu site pelo AcheiUSA.',
    'minhavidausa':'Conheci seu site pelo Minha Vida USA.',
    'brfind':'Conheci seu site pelo BR Find.',
    'reddit-idiomas':'Cheguei ao seu site por uma divulgação no r/Idiomas.',
    'ig-formatos':'Cheguei ao seu site por uma publicação no Instagram sobre os formatos das aulas.',
    'x-formatos':'Cheguei ao seu site por uma publicação no X sobre os formatos das aulas.',
    'wa-formatos':'Cheguei ao seu site por um Status do WhatsApp sobre os formatos das aulas.',
    'ig-conversacao':'Cheguei ao seu site por uma publicação no Instagram sobre aulas de conversação.',
    'x-conversacao':'Cheguei ao seu site por uma publicação no X sobre aulas de conversação.',
    'wa-conversacao':'Cheguei ao seu site por um Status do WhatsApp sobre aulas de conversação.',
    'ig-portal':'Cheguei ao seu site por uma publicação no Instagram sobre o Portal dos Alunos.',
    'x-portal':'Cheguei ao seu site por uma publicação no X sobre o Portal dos Alunos.',
    'wa-portal':'Cheguei ao seu site por um Status do WhatsApp sobre o Portal dos Alunos.',
    'x-perfil':'Encontrei seu site pelo X',
    'ig-perfil':'Encontrei seu site pelo Instagram'
  };

  const params=new URLSearchParams(window.location.search);
  const known=(key)=>typeof key==='string'&&Object.prototype.hasOwnProperty.call(sourceSentences,key);
  const requestedSource=params.get('src');
  const explicitKey=known(requestedSource)?requestedSource:null;

  // Os links com UTM registram apenas a plataforma explicitamente informada.
  const campaignSource=(params.get('utm_source')||'').toLowerCase();
  const campaignMedium=(params.get('utm_medium')||'').toLowerCase();
  const campaignKey=campaignMedium==='social'?(campaignSource==='x'||campaignSource==='twitter'?'x-perfil':campaignSource==='instagram'?'ig-perfil':null):null;
  let sourceKey=explicitKey||campaignKey;
  const storageKey='mv_acquisition_source_v1';
  const ttlMs=30*60*1000;
  try{
    if(sourceKey){
      sessionStorage.setItem(storageKey,JSON.stringify({source:sourceKey,savedAt:Date.now()}));
    }else{
      const referer=document.referrer;
      const external=referer&&new URL(referer).origin!==window.location.origin;
      if(external){
        sessionStorage.removeItem(storageKey);
      }else{
        const previous=JSON.parse(sessionStorage.getItem(storageKey)||'null');
        if(previous&&known(previous.source)&&Number.isFinite(previous.savedAt)&&Date.now()-previous.savedAt<ttlMs)
          sourceKey=previous.source;
      }
    }
  }catch(_){/* Navegador sem armazenamento: manter apenas o marcador da URL */}
  const sourceSentence=known(sourceKey)?sourceSentences[sourceKey]:null;
  if(!sourceSentence)return;

  const appendSourceToWhatsapp=(anchor)=>{
    try{
      const url=new URL(anchor.href);
      if(url.hostname!=='wa.me'||url.pathname!=='/5592985273076')return;
      const original=url.searchParams.get('text')||'';
      if(window.location.pathname.endsWith('/qual-formato.html')&&explicitKey)return; // A ferramenta já inclui a origem
      const phrase=sourceSentence.replace(/\.$/,'');
      if(!original||original.includes(phrase))return;
      url.searchParams.set('text',`${original.trim()}\n\n${phrase}`);
      anchor.href=url.toString();
    }catch(_){/* ignore malformed external links */}
  };

  const propagateToInternal=(anchor)=>{
    if(!explicitKey)return; // Mantém propagação original de src, sem repetir UTMs internamente
    const raw=anchor.getAttribute('href');
    if(!raw||raw.startsWith('#')||raw.startsWith('javascript:')||raw.startsWith('mailto:')||raw.startsWith('tel:'))return;
    try{
      const url=new URL(raw,window.location.href);
      if(url.origin!==window.location.origin)return;
      if(!url.pathname.startsWith('/Landing-page-1/'))return;
      url.searchParams.set('src',sourceKey);
      anchor.href=url.toString();
    }catch(_){/* ignore malformed links */}
  };

  document.querySelectorAll('a[href]').forEach(anchor=>{
    appendSourceToWhatsapp(anchor);
    propagateToInternal(anchor);
  });

  // Alguns botões recebem o link do WhatsApp depois do envio de um formulário.
  document.addEventListener('click',event=>{
    const anchor=event.target.closest?.('a[href]');
    if(anchor)appendSourceToWhatsapp(anchor);
  },true);
})();

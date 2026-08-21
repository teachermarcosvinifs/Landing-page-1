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
    'wa-portal':'Cheguei ao seu site por um Status do WhatsApp sobre o Portal dos Alunos.'
  };

  const params=new URLSearchParams(window.location.search);
  const sourceKey=params.get('src');
  const sourceSentence=sourceSentences[sourceKey];
  if(!sourceSentence)return;

  const appendSourceToWhatsapp=(anchor)=>{
    try{
      const url=new URL(anchor.href);
      if(url.hostname!=='wa.me'||url.pathname!=='/5592985273076')return;
      const original=url.searchParams.get('text')||'';
      if(!original||original.includes(sourceSentence))return;
      url.searchParams.set('text',`${original.trim()} ${sourceSentence}`);
      anchor.href=url.toString();
    }catch(_){/* ignore malformed external links */}
  };

  const propagateToInternal=(anchor)=>{
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
})();

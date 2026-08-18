(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hero=document.querySelector('.hero')
  if(!hero)return

  const animateOnce=(el,keyframes,options)=>{
    if(!el||reduceMotion||typeof el.animate!=='function')return Promise.resolve()
    const animation=el.animate(keyframes,{fill:'both',...options})
    return animation.finished.catch(()=>{}).then(()=>animation.cancel())
  }

  const heroTargets=[
    [hero.querySelector('.kicker'),[{opacity:0,transform:'translateY(10px)',letterSpacing:'.16em'},{opacity:1,transform:'none',letterSpacing:'.095em'}],{duration:520,delay:70,easing:'cubic-bezier(.16,.84,.18,1)'}],
    [hero.querySelector('h1'),[{opacity:0,transform:'translateY(22px)',clipPath:'inset(0 0 24% 0)'},{opacity:1,transform:'none',clipPath:'inset(0 0 0 0)'}],{duration:760,delay:150,easing:'cubic-bezier(.16,.84,.18,1)'}],
    [hero.querySelector('.hero-promise'),[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:650,delay:310,easing:'cubic-bezier(.22,.61,.36,1)'}],
    [hero.querySelector('.lead'),[{opacity:0,transform:'translateY(13px)'},{opacity:1,transform:'none'}],{duration:600,delay:410,easing:'cubic-bezier(.22,.61,.36,1)'}],
    [hero.querySelector('.hero-proof'),[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:540,delay:500,easing:'cubic-bezier(.22,.61,.36,1)'}],
    [hero.querySelector('.hero-note'),[{opacity:0,transform:'translateY(9px)'},{opacity:1,transform:'none'}],{duration:520,delay:560,easing:'cubic-bezier(.22,.61,.36,1)'}],
    [hero.querySelector('.actions'),[{opacity:0,transform:'translateY(11px)'},{opacity:1,transform:'none'}],{duration:560,delay:650,easing:'cubic-bezier(.22,.61,.36,1)'}],
    [hero.querySelector('.hero-portrait'),[{opacity:0,transform:'perspective(1000px) translate3d(18px,12px,0) rotateY(-7deg) scale(.92)'},{opacity:1,transform:'perspective(1000px) translate3d(0,0,0) rotateY(0deg) scale(1)'}],{duration:920,delay:280,easing:'cubic-bezier(.16,.84,.18,1)'}]
  ]

  heroTargets.forEach(([el,frames,options])=>animateOnce(el,frames,options))

  const portrait=hero.querySelector('.hero-portrait')
  if(portrait&&!reduceMotion&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    let frame=0
    let tx=0,ty=0,rx=0,ry=0
    let targetTx=0,targetTy=0,targetRx=0,targetRy=0
    const tick=()=>{
      const ease=.12
      tx+=(targetTx-tx)*ease
      ty+=(targetTy-ty)*ease
      rx+=(targetRx-rx)*ease
      ry+=(targetRy-ry)*ease
      portrait.style.setProperty('--hero-tx',`${tx.toFixed(2)}px`)
      portrait.style.setProperty('--hero-ty',`${ty.toFixed(2)}px`)
      portrait.style.setProperty('--hero-rx',`${rx.toFixed(2)}deg`)
      portrait.style.setProperty('--hero-ry',`${ry.toFixed(2)}deg`)
      const moving=Math.abs(targetTx-tx)+Math.abs(targetTy-ty)+Math.abs(targetRx-rx)+Math.abs(targetRy-ry)>.03
      frame=moving?requestAnimationFrame(tick):0
    }
    const wake=()=>{if(!frame)frame=requestAnimationFrame(tick)}
    portrait.addEventListener('pointerenter',()=>portrait.classList.add('is-interacting'))
    portrait.addEventListener('pointermove',event=>{
      const rect=portrait.getBoundingClientRect()
      const nx=((event.clientX-rect.left)/rect.width)*2-1
      const ny=((event.clientY-rect.top)/rect.height)*2-1
      targetTx=nx*3.8
      targetTy=ny*2.8
      targetRy=nx*1.8
      targetRx=-ny*1.25
      wake()
    },{passive:true})
    portrait.addEventListener('pointerleave',()=>{
      portrait.classList.remove('is-interacting')
      targetTx=targetTy=targetRx=targetRy=0
      wake()
    })
  }

  const sections=[...document.querySelectorAll('main>.section,main>.final-cta')]
  sections.forEach(section=>section.classList.add('home-premium-section'))

  if(reduceMotion||!('IntersectionObserver' in window)){
    sections.forEach(section=>section.classList.add('is-home-section-visible'))
    return
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return
      const section=entry.target
      section.classList.add('is-home-section-visible')
      const kicker=section.querySelector('.kicker')
      const heading=section.querySelector('h2')
      animateOnce(kicker,[{opacity:.35,transform:'translateX(-7px)',letterSpacing:'.14em'},{opacity:1,transform:'none',letterSpacing:'.095em'}],{duration:540,easing:'cubic-bezier(.22,.61,.36,1)'})
      animateOnce(heading,[{opacity:.68,transform:'translateY(8px)',clipPath:'inset(0 0 14% 0)'},{opacity:1,transform:'none',clipPath:'inset(0 0 0 0)'}],{duration:680,delay:70,easing:'cubic-bezier(.16,.84,.18,1)'})
      observer.unobserve(section)
    })
  },{threshold:.16,rootMargin:'0px 0px -54px'})

  sections.forEach(section=>observer.observe(section))
})()

(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const figures=[...document.querySelectorAll('.professional-visual,.specialty-visual')]
  if(!figures.length)return

  const duration=1220
  const easing='cubic-bezier(.16,.82,.18,1)'

  const finishPristine=figure=>{
    const base=figure.querySelector(':scope > img')||figure.querySelector('img')
    figure.getAnimations().forEach(animation=>animation.cancel())
    base?.getAnimations().forEach(animation=>animation.cancel())
    figure.querySelectorAll('.motion-reveal-layer,.motion-reveal-sweep').forEach(node=>node.remove())
    figure.style.opacity='1'
    figure.style.clipPath='none'
    figure.style.transform='none'
    if(base){base.style.filter='none';base.style.transform='none'}
    figure.classList.remove('motion-pending','motion-running')
    figure.classList.add('reveal-complete','media-ready')
  }

  const buildLayers=(figure,base)=>{
    const mid=base.cloneNode(true)
    mid.className='motion-reveal-layer motion-reveal-mid'
    mid.alt=''
    mid.setAttribute('aria-hidden','true')
    mid.removeAttribute('loading')

    const near=base.cloneNode(true)
    near.className='motion-reveal-layer motion-reveal-near'
    near.alt=''
    near.setAttribute('aria-hidden','true')
    near.removeAttribute('loading')

    const sweep=document.createElement('span')
    sweep.className='motion-reveal-sweep'
    sweep.setAttribute('aria-hidden','true')
    figure.append(mid,near,sweep)
    return {mid,near,sweep}
  }

  const runReveal=figure=>{
    if(figure.dataset.cinematicReveal==='done'||figure.dataset.cinematicReveal==='running')return
    const base=figure.querySelector(':scope > img')||figure.querySelector('img')
    if(!base)return
    if(reduceMotion){figure.dataset.cinematicReveal='done';finishPristine(figure);return}

    figure.dataset.cinematicReveal='running'
    figure.classList.add('cinematic-reveal','motion-pending','media-ready')
    const {mid,near,sweep}=buildLayers(figure,base)

    const frame=figure.animate([
      {opacity:0,clipPath:'inset(0 100% 0 0 round 16px)',transform:'perspective(1500px) translate3d(52px,14px,-78px) rotateY(-5.2deg) scale(.94)'},
      {opacity:1,offset:.44},
      {opacity:1,clipPath:'inset(0 0 0 0 round 16px)',transform:'perspective(1500px) translate3d(0,0,0) rotateY(0deg) scale(1)'}
    ],{duration,easing,fill:'forwards'})

    const baseMotion=base.animate([
      {filter:'brightness(.80) saturate(.86) contrast(.98)',transform:'scale(1.15) translate3d(22px,0,0)'},
      {filter:'brightness(1.015) saturate(1.015) contrast(1.01)',offset:.72},
      {filter:'none',transform:'none'}
    ],{duration:duration+90,easing,fill:'forwards'})

    const midMotion=mid.animate([
      {opacity:0,transform:'translate3d(34px,4px,28px) scale(1.13)'},
      {opacity:.88,offset:.32},
      {opacity:.68,transform:'translate3d(0,0,24px) scale(1.07)',offset:.78},
      {opacity:0,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration:duration+40,delay:90,easing,fill:'forwards'})

    const nearMotion=near.animate([
      {opacity:0,transform:'translate3d(58px,10px,55px) scale(1.17)'},
      {opacity:.86,offset:.38},
      {opacity:.56,transform:'translate3d(0,0,40px) scale(1.09)',offset:.78},
      {opacity:0,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration:duration+80,delay:150,easing,fill:'forwards'})

    const sweepMotion=sweep.animate([
      {opacity:0,left:'-36%'},
      {opacity:.72,left:'5%',offset:.22},
      {opacity:.34,left:'78%',offset:.72},
      {opacity:0,left:'118%'}
    ],{duration:760,delay:310,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'})

    figure.classList.remove('motion-pending')
    figure.classList.add('motion-running')

    Promise.allSettled([frame.finished,baseMotion.finished,midMotion.finished,nearMotion.finished,sweepMotion.finished]).then(()=>{
      figure.dataset.cinematicReveal='done'
      finishPristine(figure)
    })
  }

  const armFigure=figure=>{
    const base=figure.querySelector(':scope > img')||figure.querySelector('img')
    if(!base)return
    figure.classList.add('cinematic-reveal')
    const ready=()=>{
      if(reduceMotion){runReveal(figure);return}
      const rect=figure.getBoundingClientRect()
      const visible=rect.top<window.innerHeight*.92&&rect.bottom>window.innerHeight*.08
      if(visible)window.setTimeout(()=>runReveal(figure),figure.classList.contains('specialty-visual')?120:90)
    }
    if(base.complete&&base.naturalWidth>0)ready()
    else{
      base.addEventListener('load',ready,{once:true})
      base.addEventListener('error',()=>finishPristine(figure),{once:true})
    }
  }

  const observer=!reduceMotion&&'IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return
      const figure=entry.target
      const base=figure.querySelector(':scope > img')||figure.querySelector('img')
      if(base?.complete&&base.naturalWidth>0)window.setTimeout(()=>runReveal(figure),figure.classList.contains('specialty-visual')?120:70)
      observer.unobserve(figure)
    })
  },{threshold:.26,rootMargin:'0px 0px -4%'}):null

  figures.forEach((figure,index)=>{
    armFigure(figure)
    if(observer){
      figure.style.setProperty('--cinematic-order',String(index))
      observer.observe(figure)
    }
  })
})()
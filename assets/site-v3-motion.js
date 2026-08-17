(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const revealSelectors=[
    '.section-intro','.offer-line','.split-copy','.fact-list','.context-link',
    '.article-body','.portal-frame','.portal-shot','.gallery figure','.situation',
    '.faq details','.final-grid','.question','.result'
  ]

  const revealTargets=[...document.querySelectorAll(revealSelectors.join(','))]
  if(!reduceMotion && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target
          // Progressive enhancement: content stays visible unless it is actively animating
          el.classList.add('reveal-target')
          requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('is-visible')))
          observer.unobserve(el)
        }
      })
    },{threshold:.12,rootMargin:'0px 0px -28px'})
    revealTargets.forEach(el=>observer.observe(el))
  }

  document.querySelectorAll('[data-carousel]').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('.carousel-slide')]
    const dots=[...carousel.querySelectorAll('.carousel-dot')]
    const prev=carousel.querySelector('[data-prev]')
    const next=carousel.querySelector('[data-next]')
    const count=carousel.querySelector('[data-count]')
    if(slides.length<2)return

    dots.forEach(dot=>{
      dot.style.width='36px'
      dot.style.height='36px'
      dot.style.border='0'
      dot.style.backgroundClip='content-box'
    })

    let index=0
    let timer=null
    const delay=Number(carousel.dataset.autoplay||6500)

    const render=nextIndex=>{
      index=(nextIndex+slides.length)%slides.length
      slides.forEach((slide,i)=>{
        const active=i===index
        slide.classList.toggle('is-active',active)
        slide.setAttribute('aria-hidden',String(!active))
      })
      dots.forEach((dot,i)=>{
        const active=i===index
        dot.classList.toggle('is-active',active)
        dot.setAttribute('aria-current',active?'true':'false')
        dot.style.padding=active?'13px 4px':'13px'
      })
      if(count)count.textContent=`${index+1} / ${slides.length}`
    }

    const stop=()=>{if(timer){window.clearInterval(timer);timer=null}}
    const start=()=>{
      if(reduceMotion || delay<1000)return
      stop()
      timer=window.setInterval(()=>render(index+1),delay)
    }

    prev?.addEventListener('click',()=>{render(index-1);start()})
    next?.addEventListener('click',()=>{render(index+1);start()})
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{render(i);start()}))
    carousel.addEventListener('mouseenter',stop)
    carousel.addEventListener('mouseleave',start)
    carousel.addEventListener('focusin',stop)
    carousel.addEventListener('focusout',event=>{
      if(!carousel.contains(event.relatedTarget))start()
    })

    render(0)
    start()
  })
})()

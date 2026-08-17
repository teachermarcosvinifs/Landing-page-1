(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const revealSelectors=[
    '.section-intro','.offer-line','.split-copy','.fact-list','.context-link',
    '.article-body','.portal-frame','.portal-shot','.gallery figure','.situation',
    '.faq details','.final-grid','.question','.result'
  ]

  const revealTargets=[...document.querySelectorAll(revealSelectors.join(','))]
  if(!reduceMotion && 'IntersectionObserver' in window){
    revealTargets.forEach(el=>el.classList.add('reveal-target'))
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
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

    let index=0
    let timer=null
    const delay=Number(carousel.dataset.autoplay||6500)

    const render=(nextIndex,focusDot=false)=>{
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
      })
      if(count)count.textContent=`${index+1} / ${slides.length}`
      if(focusDot && dots[index])dots[index].focus()
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

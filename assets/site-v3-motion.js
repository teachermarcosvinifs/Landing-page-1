(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sourceLabels={
    'ig-formatos':'uma publicação no Instagram sobre os formatos das aulas',
    'x-formatos':'uma publicação no X sobre os formatos das aulas',
    'wa-formatos':'um Status do WhatsApp sobre os formatos das aulas',
    'ig-conversacao':'uma publicação no Instagram sobre aulas conversacionais',
    'x-conversacao':'uma publicação no X sobre aulas conversacionais',
    'ig-portal':'uma publicação no Instagram sobre o Portal dos Alunos',
    'x-portal':'uma publicação no X sobre o Portal dos Alunos'
  }

  const setupMobileMenu=()=>{
    const nav=document.querySelector('.site-nav')
    const links=nav?.querySelector('.nav-links')
    if(!nav||!links||nav.querySelector('.mobile-menu'))return

    const style=document.createElement('style')
    style.textContent=`
      .mobile-menu{display:none}
      @media(max-width:900px){
        .site-nav.has-mobile-menu .nav-links{display:none}
        .mobile-menu{display:block;position:relative;margin-left:auto}
        .mobile-menu summary{display:flex;align-items:center;justify-content:center;min-width:64px;min-height:40px;padding:8px 12px;border:1px solid var(--line-strong);border-radius:3px;background:#090b0d;color:#d9dfe1;font-size:14px;font-weight:700;cursor:pointer;list-style:none;user-select:none}
        .mobile-menu summary::-webkit-details-marker{display:none}
        .mobile-menu[open] summary{background:#14181c;border-color:#4b555e;color:#fff}
        .mobile-menu-panel{position:absolute;right:0;top:calc(100% + 10px);width:min(290px,calc(100vw - 28px));padding:7px;border:1px solid var(--line-strong);border-radius:6px;background:#080a0d;box-shadow:0 20px 55px rgba(0,0,0,.55);z-index:80}
        .mobile-menu-panel a{display:flex;align-items:center;min-height:46px;padding:10px 12px;text-decoration:none;color:#d8dddf;font-size:15px;font-weight:600;border-bottom:1px solid var(--line)}
        .mobile-menu-panel a:last-child{border-bottom:0}
        .mobile-menu-panel a:hover,.mobile-menu-panel a:focus-visible{background:#11161a;color:#fff;outline:none}
      }
    `
    document.head.appendChild(style)

    const menu=document.createElement('details')
    menu.className='mobile-menu'
    const summary=document.createElement('summary')
    summary.textContent='Menu'
    summary.setAttribute('aria-label','Abrir navegação')
    const panel=document.createElement('div')
    panel.className='mobile-menu-panel'

    links.querySelectorAll('a').forEach(link=>{
      const clone=link.cloneNode(true)
      clone.classList.remove('nav-contact')
      clone.addEventListener('click',()=>menu.removeAttribute('open'))
      panel.appendChild(clone)
    })

    menu.append(summary,panel)
    nav.appendChild(menu)
    nav.classList.add('has-mobile-menu')

    menu.addEventListener('toggle',()=>{
      summary.setAttribute('aria-label',menu.open?'Fechar navegação':'Abrir navegação')
    })
    document.addEventListener('click',event=>{
      if(menu.open&&!menu.contains(event.target))menu.removeAttribute('open')
    })
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&menu.open){
        menu.removeAttribute('open')
        summary.focus()
      }
    })
  }

  const applySourceAttribution=()=>{
    const sourceKey=new URLSearchParams(window.location.search).get('src')
    const sourceLabel=sourceLabels[sourceKey]
    if(!sourceLabel)return

    document.querySelectorAll('a[href]').forEach(link=>{
      const raw=link.getAttribute('href')||''
      if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:')||raw.startsWith('javascript:'))return
      try{
        const url=new URL(raw,window.location.href)
        if(url.origin!==window.location.origin)return
        url.searchParams.set('src',sourceKey)
        link.setAttribute('href',`${url.pathname}${url.search}${url.hash}`)
      }catch{}
    })

    document.querySelectorAll('a[href^="https://wa.me/5592985273076"]').forEach(link=>{
      try{
        const url=new URL(link.href)
        const current=url.searchParams.get('text')||''
        const addition=`Vi esta página a partir de ${sourceLabel}`
        if(current.includes(addition))return
        url.searchParams.set('text',`${current}${current.trim()?' ':''}${addition}`)
        link.href=url.toString()
      }catch{}
    })
  }

  setupMobileMenu()
  applySourceAttribution()

  const revealSelectors=[
    '.section-intro','.offer-line','.split-copy','.fact-list','.context-link',
    '.article-body','.portal-frame','.activity-frame','.portal-shot','.gallery figure','.situation',
    '.faq details','.final-grid','.question','.result','.professional-visual','.specialty-visual'
  ]

  const revealTargets=[...document.querySelectorAll(revealSelectors.join(','))]
  if(!reduceMotion && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target
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

    const hydrate=slide=>{
      slide?.querySelectorAll('img[data-src]').forEach(img=>{
        img.src=img.dataset.src
        img.removeAttribute('data-src')
      })
    }

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
      hydrate(slides[index])
      hydrate(slides[(index+1)%slides.length])
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

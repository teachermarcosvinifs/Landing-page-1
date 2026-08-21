(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sourceLabels={
    'acheiusa':'o AcheiUSA',
    'minhavidausa':'o Minha Vida USA',
    'brfind':'o BR Find',
    'reddit-idiomas':'uma divulgação no r/Idiomas',
    'ig-formatos':'uma publicação no Instagram sobre os formatos das aulas',
    'x-formatos':'uma publicação no X sobre os formatos das aulas',
    'wa-formatos':'um Status do WhatsApp sobre os formatos das aulas',
    'ig-conversacao':'uma publicação no Instagram sobre aulas conversacionais',
    'x-conversacao':'uma publicação no X sobre aulas conversacionais',
    'wa-conversacao':'um Status do WhatsApp sobre aulas conversacionais',
    'ig-portal':'uma publicação no Instagram sobre o Portal dos Alunos',
    'x-portal':'uma publicação no X sobre o Portal dos Alunos',
    'wa-portal':'um Status do WhatsApp sobre o Portal dos Alunos'
  }

  const redirectLegacyAcquisitionForm=()=>{
    const legacyFormId='1FAIpQLSfcXQrH8jlLpLD3Z0YT6oruW5sO5hbL9EahlXDRYNCl5MayrA'
    document.querySelectorAll(`a[href*="${legacyFormId}"]`).forEach(link=>{
      link.setAttribute('href','contato.html')
      link.removeAttribute('target')
      link.removeAttribute('rel')
      link.textContent='Informar meu interesse'
    })
    document.querySelectorAll('p').forEach(paragraph=>{
      if(paragraph.textContent.includes('ou preencher o formulário')){
        paragraph.textContent=paragraph.textContent.replace('ou preencher o formulário','ou informar seu interesse antes de abrir o WhatsApp')
      }
    })
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

  const setupProfessionalMediaMotion=()=>{
    const elements=[...document.querySelectorAll('.professional-visual,.specialty-visual')]
    if(!elements.length)return

    elements.forEach(el=>{
      const img=el.querySelector('img')
      if(!img){el.classList.add('media-ready');return}
      const ready=()=>el.classList.add('media-ready')
      if(img.complete&&img.naturalWidth>0)ready()
      else{
        img.addEventListener('load',ready,{once:true})
        img.addEventListener('error',ready,{once:true})
      }
    })

    if(reduceMotion)return
    const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)').matches
    const clamp=(value,min,max)=>Math.max(min,Math.min(max,value))
    const states=elements.map(el=>({
      el,
      tiltX:0,tiltY:0,mediaX:0,mediaY:0,scrollY:0,
      targetTiltX:0,targetTiltY:0,targetMediaX:0,targetMediaY:0,targetScrollY:0
    }))
    let frame=0

    const write=state=>{
      state.el.style.setProperty('--tilt-x',`${state.tiltX.toFixed(3)}deg`)
      state.el.style.setProperty('--tilt-y',`${state.tiltY.toFixed(3)}deg`)
      state.el.style.setProperty('--media-x',`${state.mediaX.toFixed(2)}px`)
      state.el.style.setProperty('--media-y',`${state.mediaY.toFixed(2)}px`)
      state.el.style.setProperty('--scroll-y',`${state.scrollY.toFixed(2)}px`)
    }

    const tick=()=>{
      let moving=false
      states.forEach(state=>{
        const values=[
          ['tiltX','targetTiltX',.115,.004],
          ['tiltY','targetTiltY',.115,.004],
          ['mediaX','targetMediaX',.11,.025],
          ['mediaY','targetMediaY',.11,.025],
          ['scrollY','targetScrollY',.09,.025]
        ]
        values.forEach(([current,target,ease,threshold])=>{
          const delta=state[target]-state[current]
          if(Math.abs(delta)>threshold){
            state[current]+=delta*ease
            moving=true
          }else state[current]=state[target]
        })
        write(state)
      })
      frame=moving?requestAnimationFrame(tick):0
    }

    const wake=()=>{if(!frame)frame=requestAnimationFrame(tick)}

    const updateScrollTargets=()=>{
      const viewport=window.innerHeight||document.documentElement.clientHeight
      states.forEach(state=>{
        const rect=state.el.getBoundingClientRect()
        if(rect.bottom<-rect.height||rect.top>viewport+rect.height)return
        const center=rect.top+rect.height/2
        const range=(viewport+rect.height)/2
        const normalized=clamp((viewport/2-center)/range,-1,1)
        state.targetScrollY=normalized*13
      })
      wake()
    }

    if(finePointer){
      states.forEach(state=>{
        const setPointerTarget=event=>{
          const rect=state.el.getBoundingClientRect()
          if(!rect.width||!rect.height)return
          const nx=clamp(((event.clientX-rect.left)/rect.width)*2-1,-1,1)
          const ny=clamp(((event.clientY-rect.top)/rect.height)*2-1,-1,1)
          state.targetTiltX=nx*1.9
          state.targetTiltY=-ny*1.35
          state.targetMediaX=-nx*11
          state.targetMediaY=-ny*7.5
          wake()
        }
        state.el.addEventListener('pointerenter',event=>{
          state.el.classList.add('is-motion-active')
          setPointerTarget(event)
        })
        state.el.addEventListener('pointermove',setPointerTarget,{passive:true})
        state.el.addEventListener('pointerleave',()=>{
          state.el.classList.remove('is-motion-active')
          state.targetTiltX=0
          state.targetTiltY=0
          state.targetMediaX=0
          state.targetMediaY=0
          wake()
        })
      })
    }

    let scrollQueued=false
    const queueScrollUpdate=()=>{
      if(scrollQueued)return
      scrollQueued=true
      requestAnimationFrame(()=>{
        scrollQueued=false
        updateScrollTargets()
      })
    }
    window.addEventListener('scroll',queueScrollUpdate,{passive:true})
    window.addEventListener('resize',queueScrollUpdate)
    updateScrollTargets()
  }

  redirectLegacyAcquisitionForm()
  setupMobileMenu()
  applySourceAttribution()
  setupProfessionalMediaMotion()

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
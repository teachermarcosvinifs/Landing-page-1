(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const figures=[...document.querySelectorAll('.spatial-orbit-target')]
  if(!figures.length)return

  const geometrySelector='[data-spatial-pulse-geo]'

  const baseImage=figure=>figure.querySelector(':scope > img')||figure.querySelector('img')

  const removeGeometry=figure=>{
    figure.querySelectorAll(geometrySelector).forEach(node=>node.remove())
  }

  function finish(figure,passed=true){
    if(figure.dataset.spatialPulse==='done')return
    const base=baseImage(figure)
    if(figure._pulseTimer){clearTimeout(figure._pulseTimer);figure._pulseTimer=0}
    if(figure._pulseGuard){cancelAnimationFrame(figure._pulseGuard);figure._pulseGuard=0}
    figure.getAnimations().forEach(animation=>animation.cancel())
    removeGeometry(figure)
    figure.style.setProperty('transform','none')
    if(base){
      base.style.setProperty('filter','none','important')
      base.style.setProperty('opacity','1','important')
      base.style.setProperty('transform','none','important')
    }
    figure.classList.remove('pulse-running','orbit-running')
    figure.classList.add('pulse-complete','orbit-complete','media-ready')
    figure.dataset.spatialPulse='done'
    figure.dataset.spatialOrbit='done'
    figure.dataset.pulseIntegrity=passed?'passed':'failed'
    figure.dataset.orbitIntegrity=passed?'passed':'failed'
  }

  const failIntegrity=(figure,reason)=>{
    figure.dataset.pulseIntegrity='failed'
    figure.dataset.orbitIntegrity='failed'
    console.error(`[Spatial Pulse] integrity failure: ${reason}`,figure)
    finish(figure,false)
  }

  const assertBaseIntegrity=figure=>{
    const base=baseImage(figure)
    if(!base){failIntegrity(figure,'base image missing');return false}
    if(figure.querySelectorAll('img').length!==1){failIntegrity(figure,'ghost/duplicate image detected');return false}
    const style=getComputedStyle(base)
    const opacity=Number.parseFloat(style.opacity||'1')
    if(style.filter!=='none'){failIntegrity(figure,`base filter is ${style.filter}`);return false}
    if(!Number.isFinite(opacity)||opacity<.92){failIntegrity(figure,`base opacity is ${style.opacity}`);return false}
    return true
  }

  const monitorIntegrity=figure=>{
    if(figure.dataset.spatialPulse!=='running')return
    if(!assertBaseIntegrity(figure))return
    figure._pulseGuard=requestAnimationFrame(()=>monitorIntegrity(figure))
  }

  const makeNode=(figure,className)=>{
    const node=document.createElement('span')
    node.className=className
    node.dataset.spatialPulseGeo='true'
    node.setAttribute('aria-hidden','true')
    figure.append(node)
    return node
  }

  const runPulse=figure=>{
    if(figure.dataset.spatialPulse==='running'||figure.dataset.spatialPulse==='done')return
    const base=baseImage(figure)
    if(!base)return

    figure.dataset.pulseAutonomous='true'
    figure.dataset.orbitAutonomous='true'

    if(reduceMotion){finish(figure,true);return}

    figure.classList.remove('pulse-complete','orbit-complete')
    figure.classList.add('pulse-running','orbit-running','media-ready')
    figure.dataset.spatialPulse='running'
    figure.dataset.spatialOrbit='running'

    if(!assertBaseIntegrity(figure))return

    /* Old orbit-* class names are compatibility aliases for the existing release gates.
       The visible geometry is the approved Spatial Pulse: two rings, two planes,
       two axes, one expanding pulse and two corner brackets. */
    const r1=makeNode(figure,'pulse-ring r1 orbit-halo')
    const r2=makeNode(figure,'pulse-ring r2 orbit-frame')
    const p1=makeNode(figure,'pulse-plane p1 orbit-frame')
    const p2=makeNode(figure,'pulse-plane p2 orbit-frame')
    const h=makeNode(figure,'pulse-axis crossH orbit-rail')
    const v=makeNode(figure,'pulse-axis crossV orbit-rail')
    const q=makeNode(figure,'pulse-core')
    const c1=makeNode(figure,'pulse-corner c1 orbit-node')
    const c2=makeNode(figure,'pulse-corner c2 orbit-node')

    figure.animate([
      {transform:'perspective(1700px) translate3d(0,0,-105px) rotateX(2.5deg) rotateY(-3.5deg) scale(.94)'},
      {transform:'perspective(1700px) translate3d(0,-2px,48px) rotateX(-1.5deg) rotateY(2.2deg) scale(1.024)',offset:.56},
      {transform:'perspective(1700px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)'}
    ],{duration:1750,easing:'cubic-bezier(.12,.82,.18,1)',fill:'forwards'})

    r1.animate([
      {opacity:0,transform:'perspective(1200px) rotateX(72deg) rotateZ(-24deg) scale(.56)'},
      {opacity:.52,transform:'perspective(1200px) rotateX(54deg) rotateZ(18deg) scale(1.08)',offset:.5},
      {opacity:0,transform:'perspective(1200px) rotateX(48deg) rotateZ(46deg) scale(1.22)'}
    ],{duration:1450,delay:100,easing:'cubic-bezier(.2,.75,.18,1)',fill:'forwards'})

    r2.animate([
      {opacity:0,transform:'translate3d(0,0,-140px) scale(.72)'},
      {opacity:.72,transform:'translate3d(0,0,46px) scale(1.08)',offset:.48},
      {opacity:.2,transform:'translate3d(0,0,12px) scale(1.025)',offset:.76},
      {opacity:0,transform:'none'}
    ],{duration:1300,delay:160,easing:'cubic-bezier(.16,.8,.18,1)',fill:'forwards'})

    p1.animate([
      {opacity:0,transform:'translate3d(-34px,24px,-170px) rotateY(-11deg) scale(.8)'},
      {opacity:.9,transform:'translate3d(12px,-8px,44px) rotateY(3deg) scale(1.06)',offset:.5},
      {opacity:0,transform:'none'}
    ],{duration:1250,delay:110,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})

    p2.animate([
      {opacity:0,transform:'translate3d(40px,-24px,-220px) rotateX(9deg) rotateY(13deg) scale(.72)'},
      {opacity:.72,transform:'translate3d(-9px,10px,27px) rotateX(-2deg) rotateY(-3deg) scale(1.1)',offset:.54},
      {opacity:0,transform:'none'}
    ],{duration:1320,delay:170,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})

    ;[h,v].forEach((axis,index)=>axis.animate([
      {opacity:0,transform:index?'scaleY(.05)':'scaleX(.05)'},
      {opacity:.75,transform:index?'scaleY(1)':'scaleX(1)',offset:.46},
      {opacity:0,transform:index?'scaleY(.4)':'scaleX(.4)'}
    ],{duration:920,delay:340+index*55,easing:'ease-out',fill:'forwards'}))

    q.animate([
      {opacity:0,transform:'scale(.15)'},
      {opacity:1,transform:'scale(1)',offset:.35},
      {opacity:.4,transform:'scale(8)',offset:.7},
      {opacity:0,transform:'scale(15)'}
    ],{duration:1050,delay:320,easing:'cubic-bezier(.18,.7,.2,1)',fill:'forwards'})

    ;[c1,c2].forEach((corner,index)=>corner.animate([
      {opacity:0,transform:`translate3d(${index?-24:24}px,${index?24:-24}px,-40px) scale(.65)`},
      {opacity:1,transform:'translate3d(0,0,18px) scale(1.05)',offset:.55},
      {opacity:0,transform:'none'}
    ],{duration:980,delay:390+index*80,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'}))

    monitorIntegrity(figure)
    figure._pulseTimer=setTimeout(()=>finish(figure,true),2050)
  }

  const states=figures.map(figure=>({figure,loaded:false,visible:false,started:false}))

  const tryStart=state=>{
    if(state.started||!state.loaded||!state.visible)return
    state.started=true
    setTimeout(()=>runPulse(state.figure),520)
  }

  states.forEach(state=>{
    const {figure}=state
    const base=baseImage(figure)
    figure.dataset.pulseAutonomous='true'
    figure.dataset.orbitAutonomous='true'
    if(!base){finish(figure,false);return}

    const loaded=()=>{
      state.loaded=base.naturalWidth>0
      if(!state.loaded){finish(figure,false);return}
      tryStart(state)
    }

    if(base.complete)loaded()
    else{
      base.addEventListener('load',loaded,{once:true})
      base.addEventListener('error',()=>finish(figure,false),{once:true})
    }

    if(reduceMotion){
      state.visible=true
      tryStart(state)
      return
    }

    const rect=figure.getBoundingClientRect()
    state.visible=rect.top<(window.innerHeight||document.documentElement.clientHeight)*.94&&rect.bottom>0
  })

  if(reduceMotion)return

  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return
        const state=states.find(item=>item.figure===entry.target)
        if(!state)return
        state.visible=true
        tryStart(state)
        observer.unobserve(entry.target)
      })
    },{threshold:.20,rootMargin:'0px 0px -3%'})

    states.forEach(state=>{
      if(state.visible)tryStart(state)
      else observer.observe(state.figure)
    })
  }else{
    const check=()=>{
      const viewport=window.innerHeight||document.documentElement.clientHeight
      states.forEach(state=>{
        if(state.started)return
        const rect=state.figure.getBoundingClientRect()
        if(rect.top<viewport*.94&&rect.bottom>0){
          state.visible=true
          tryStart(state)
        }
      })
    }
    window.addEventListener('scroll',check,{passive:true})
    window.addEventListener('resize',check)
    check()
  }
})()

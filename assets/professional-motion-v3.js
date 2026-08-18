(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const figures=[...document.querySelectorAll('.spatial-orbit-target')]
  if(!figures.length)return

  const easing='cubic-bezier(.16,.84,.18,1)'
  const geometryClasses='.orbit-frame,.orbit-rail,.orbit-node,.orbit-halo'

  const removeGeometry=figure=>{
    figure.querySelectorAll(geometryClasses).forEach(node=>node.remove())
  }

  const baseImage=figure=>figure.querySelector(':scope > img')||figure.querySelector('img')

  const failIntegrity=(figure,reason)=>{
    figure.dataset.orbitIntegrity='failed'
    console.error(`[Spatial Frame Orbit] integrity failure: ${reason}`,figure)
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

  const finish=(figure,passed=true)=>{
    if(figure.dataset.spatialOrbit==='done')return
    const base=baseImage(figure)
    if(figure._orbitTimer){clearTimeout(figure._orbitTimer);figure._orbitTimer=0}
    if(figure._orbitGuard){cancelAnimationFrame(figure._orbitGuard);figure._orbitGuard=0}
    figure.getAnimations().forEach(animation=>animation.cancel())
    removeGeometry(figure)
    figure.style.transform=''
    figure.style.boxShadow=''
    if(base){
      base.style.setProperty('filter','none','important')
      base.style.setProperty('opacity','1','important')
    }
    figure.classList.remove('orbit-running')
    figure.classList.add('orbit-complete','media-ready')
    figure.dataset.spatialOrbit='done'
    figure.dataset.orbitIntegrity=passed?'passed':'failed'
  }

  const monitorIntegrity=figure=>{
    if(figure.dataset.spatialOrbit!=='running')return
    if(!assertBaseIntegrity(figure))return
    figure._orbitGuard=requestAnimationFrame(()=>monitorIntegrity(figure))
  }

  const makeNode=(figure,className)=>{
    const node=document.createElement('span')
    node.className=className
    node.setAttribute('aria-hidden','true')
    figure.append(node)
    return node
  }

  const runOrbit=figure=>{
    if(figure.dataset.spatialOrbit==='running'||figure.dataset.spatialOrbit==='done')return
    const base=baseImage(figure)
    if(!base)return
    figure.dataset.orbitAutonomous='true'
    if(reduceMotion){finish(figure,true);return}

    figure.classList.remove('orbit-complete')
    figure.classList.add('orbit-running','media-ready')
    figure.dataset.spatialOrbit='running'

    if(!assertBaseIntegrity(figure))return

    const compact=window.matchMedia('(max-width: 640px)').matches
    const depth=compact ? 0.58 : 1

    const frames=[
      makeNode(figure,'orbit-frame f1'),
      makeNode(figure,'orbit-frame f2'),
      makeNode(figure,'orbit-frame f3')
    ]
    const railTop=makeNode(figure,'orbit-rail top')
    const railBottom=makeNode(figure,'orbit-rail bottom')
    const n1=makeNode(figure,'orbit-node n1')
    const n2=makeNode(figure,'orbit-node n2')
    const halo=makeNode(figure,'orbit-halo')

    figure.animate([
      {transform:`perspective(1600px) translate3d(0,${10*depth}px,${-72*depth}px) rotateX(${5.6*depth}deg) rotateY(${-8.2*depth}deg) scale(.955)`,boxShadow:'0 24px 62px rgba(0,0,0,.44)'},
      {transform:`perspective(1600px) translate3d(0,${-4*depth}px,${28*depth}px) rotateX(${-1.2*depth}deg) rotateY(${1.8*depth}deg) scale(1.02)`,boxShadow:'0 54px 124px rgba(0,0,0,.60)',offset:.62},
      {transform:'perspective(1600px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)',boxShadow:'0 28px 70px rgba(0,0,0,.38)'}
    ],{duration:1480,easing,fill:'forwards'})

    const frameKeys=[
      [
        {opacity:0,transform:`perspective(1400px) translate3d(${38*depth}px,${22*depth}px,${-90*depth}px) rotateX(${8*depth}deg) rotateY(${-12*depth}deg) scale(.88)`},
        {opacity:.96,transform:`perspective(1400px) translate3d(${-12*depth}px,${-8*depth}px,${48*depth}px) rotateX(${-2*depth}deg) rotateY(${4*depth}deg) scale(1.055)`,offset:.54},
        {opacity:.48,transform:`perspective(1400px) translate3d(0,0,${6*depth}px) rotateX(0) rotateY(0) scale(1.012)`,offset:.78},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ],
      [
        {opacity:0,transform:`perspective(1400px) translate3d(${-44*depth}px,${-18*depth}px,${-130*depth}px) rotateX(${-7*depth}deg) rotateY(${15*depth}deg) scale(.82)`},
        {opacity:.74,transform:`perspective(1400px) translate3d(${18*depth}px,${10*depth}px,${28*depth}px) rotateX(${2*depth}deg) rotateY(${-5*depth}deg) scale(1.08)`,offset:.57},
        {opacity:.32,transform:`perspective(1400px) translate3d(0,0,${2*depth}px) rotateX(0) rotateY(0) scale(1.022)`,offset:.80},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ],
      [
        {opacity:0,transform:`perspective(1400px) translate3d(${12*depth}px,${52*depth}px,${-170*depth}px) rotateX(${13*depth}deg) rotateY(${7*depth}deg) scale(.76)`},
        {opacity:.52,transform:`perspective(1400px) translate3d(${-6*depth}px,${-16*depth}px,${18*depth}px) rotateX(${-3*depth}deg) rotateY(${-2*depth}deg) scale(1.12)`,offset:.60},
        {opacity:.22,transform:'perspective(1400px) translate3d(0,0,0) scale(1.032)',offset:.82},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ]
    ]

    frames.forEach((frame,index)=>frame.animate(frameKeys[index],{
      duration:1260,
      delay:70+index*65,
      easing,
      fill:'forwards'
    }))

    ;[railTop,railBottom].forEach((rail,index)=>rail.animate([
      {opacity:0,transform:'scaleX(.12)'},
      {opacity:.88,transform:'scaleX(1)',offset:.44},
      {opacity:.52,offset:.70},
      {opacity:0,transform:'scaleX(.45)'}
    ],{duration:900,delay:290+index*70,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'}))

    ;[n1,n2].forEach((node,index)=>node.animate([
      {opacity:0,transform:'scale(.2)'},
      {opacity:1,transform:'scale(1.25)',offset:.42},
      {opacity:.9,transform:'scale(1)',offset:.70},
      {opacity:0,transform:'scale(.4)'}
    ],{duration:860,delay:330+index*90,easing:'ease-out',fill:'forwards'}))

    halo.animate([
      {opacity:0,transform:'scale(.82)'},
      {opacity:.5,transform:'scale(1.025)',offset:.52},
      {opacity:0,transform:'scale(1.12)'}
    ],{duration:1050,delay:180,easing:'cubic-bezier(.2,.72,.2,1)',fill:'forwards'})

    monitorIntegrity(figure)
    figure._orbitTimer=setTimeout(()=>finish(figure,true),1750)
  }

  const states=figures.map((figure,index)=>({
    figure,
    index,
    loaded:false,
    visible:false,
    started:false
  }))

  const tryStart=state=>{
    if(state.started||!state.loaded||!state.visible)return
    state.started=true
    setTimeout(()=>runOrbit(state.figure),90+state.index*70)
  }

  states.forEach(state=>{
    const {figure}=state
    const base=baseImage(figure)
    figure.classList.add('spatial-orbit-target')
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

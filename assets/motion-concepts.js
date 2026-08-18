(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))

  const prepareLayers=figure=>{
    const base=figure.querySelector('.concept-base')
    if(!base)return null
    const mid=base.cloneNode(true); mid.className='concept-layer mid'; mid.alt=''; mid.setAttribute('aria-hidden','true')
    const near=base.cloneNode(true); near.className='concept-layer near'; near.alt=''; near.setAttribute('aria-hidden','true')
    const shade=document.createElement('span'); shade.className='concept-shade'; shade.setAttribute('aria-hidden','true')
    figure.append(mid,near,shade)
    return {base,mid,near,shade}
  }

  const optionA=document.querySelector('[data-motion-concept="a"]')
  if(optionA){
    const layers=prepareLayers(optionA)
    if(layers){
      const sweep=document.createElement('span'); sweep.className='concept-sweep'; sweep.setAttribute('aria-hidden','true'); optionA.append(sweep)
      const start=()=>{
        if(reduce){optionA.classList.add('is-ready');return}
        requestAnimationFrame(()=>requestAnimationFrame(()=>optionA.classList.add('is-ready')))
      }
      if(layers.base.complete&&layers.base.naturalWidth>0)setTimeout(start,160)
      else layers.base.addEventListener('load',()=>setTimeout(start,160),{once:true})
    }
  }

  const stage=document.querySelector('[data-motion-concept="b"]')
  if(stage){
    const figure=stage.querySelector('.concept-b')
    const copy=stage.querySelector('.scroll-copy')
    const layers=prepareLayers(figure)
    let ticking=false

    const update=()=>{
      ticking=false
      if(reduce||!figure||!layers)return
      const rect=stage.getBoundingClientRect()
      const travel=Math.max(1,stage.offsetHeight-window.innerHeight)
      const p=clamp((-rect.top)/travel,0,1)
      const ease=1-Math.pow(1-p,3)
      const first=clamp(ease/.72,0,1)
      const late=clamp((p-.24)/.76,0,1)

      const x=-108*first
      const y=22*late
      const scale=1+(.34*first)
      const rotate=-1.15*first
      figure.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale}) rotateY(${rotate}deg)`
      figure.style.borderRadius=`${18-13*first}px`
      figure.style.boxShadow=`0 ${34+30*first}px ${90+40*first}px rgba(0,0,0,${.48+.12*first})`
      figure.style.setProperty('--edge-light',(.08+.28*Math.sin(first*Math.PI)).toFixed(3))

      layers.base.style.transform=`translate3d(${4*first}px,${10*late}px,0) scale(${1.08+.035*first})`
      layers.base.style.filter=`saturate(${.92+.08*first}) brightness(${.88+.12*first})`
      layers.mid.style.transform=`translate3d(${-15*first}px,${-8*late}px,22px) scale(${1.10+.06*first})`
      layers.near.style.transform=`translate3d(${-34*first}px,${-18*late}px,44px) scale(${1.13+.105*first})`

      if(copy){
        copy.style.setProperty('--copy-x',`${-26*late}px`)
        copy.style.setProperty('--copy-opacity',`${1-.34*late}`)
        copy.style.setProperty('--cue-opacity',`${1-clamp(p/.28,0,1)}`)
      }
    }
    const queue=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}}
    window.addEventListener('scroll',queue,{passive:true})
    window.addEventListener('resize',queue)
    update()
  }
})()
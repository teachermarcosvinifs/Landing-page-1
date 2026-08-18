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
      const first=clamp(ease/.78,0,1)
      const late=clamp((p-.18)/.82,0,1)
      const arc=Math.sin(first*Math.PI)

      const x=-182*first
      const y=30*late
      const scale=1+(.70*first)
      const rotate=-2.2*arc
      figure.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale}) rotateY(${rotate}deg)`
      figure.style.borderRadius=`${18-14*first}px`
      figure.style.boxShadow=`0 ${34+42*first}px ${90+62*first}px rgba(0,0,0,${.48+.16*first})`
      figure.style.setProperty('--edge-light',(.08+.38*arc).toFixed(3))

      layers.base.style.transform=`translate3d(${7*first}px,${12*late}px,0) scale(${1.08+.055*first})`
      layers.base.style.filter=`saturate(${.90+.10*first}) brightness(${.86+.14*first})`
      layers.mid.style.transform=`translate3d(${-24*first}px,${-12*late}px,24px) scale(${1.10+.10*first})`
      layers.near.style.transform=`translate3d(${-52*first}px,${-28*late}px,52px) scale(${1.13+.17*first})`

      if(copy){
        copy.style.setProperty('--copy-x',`${-46*late}px`)
        copy.style.setProperty('--copy-opacity',`${1-.72*late}`)
        copy.style.setProperty('--cue-opacity',`${1-clamp(p/.22,0,1)}`)
      }
    }
    const queue=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}}
    window.addEventListener('scroll',queue,{passive:true})
    window.addEventListener('resize',queue)
    update()
  }
})()
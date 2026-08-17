(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)').matches
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))
  const elements=[...document.querySelectorAll('.professional-visual,.specialty-visual')]
  if(!elements.length)return

  const createShader=(gl,type,source)=>{
    const shader=gl.createShader(type)
    gl.shaderSource(shader,source)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader)||'shader compile failed')
    return shader
  }

  const createGL=(canvas)=>{
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true,preserveDrawingBuffer:false})
    if(!gl)return null
    try{
      const vertex=createShader(gl,gl.VERTEX_SHADER,`
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main(){
          v_uv=a_position*.5+.5;
          gl_Position=vec4(a_position,0.0,1.0);
        }
      `)
      const fragment=createShader(gl,gl.FRAGMENT_SHADER,`
        precision mediump float;
        varying vec2 v_uv;
        uniform vec2 u_pointer;
        uniform float u_energy;
        uniform float u_scroll;
        void main(){
          vec2 p=u_pointer*.5+.5;
          vec2 d=v_uv-p;
          d.x*=1.34;
          float dist=length(d);
          float soft=pow(max(0.0,1.0-dist*1.38),4.2);
          float ribbon=pow(max(0.0,1.0-abs(d.x*.64+d.y*.92)*4.8),7.0)*soft;
          float edge=(smoothstep(.0,.12,v_uv.x)*smoothstep(.0,.12,1.0-v_uv.x)*smoothstep(.0,.12,v_uv.y)*smoothstep(.0,.12,1.0-v_uv.y));
          float scrollLift=clamp(abs(u_scroll)*.018,0.0,.16);
          vec3 cool=vec3(.64,.82,.92);
          vec3 neutral=vec3(.96,.96,.93);
          vec3 tint=mix(cool,neutral,clamp(p.x*.55+.25,0.0,1.0));
          float alpha=(soft*(.032+.055*u_energy)+ribbon*(.018+.034*u_energy)+scrollLift*.018)*edge;
          gl_FragColor=vec4(tint,alpha);
        }
      `)
      const program=gl.createProgram()
      gl.attachShader(program,vertex)
      gl.attachShader(program,fragment)
      gl.linkProgram(program)
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'program link failed')
      const buffer=gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
      gl.useProgram(program)
      const position=gl.getAttribLocation(program,'a_position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0)
      return {
        gl,program,
        pointer:gl.getUniformLocation(program,'u_pointer'),
        energy:gl.getUniformLocation(program,'u_energy'),
        scroll:gl.getUniformLocation(program,'u_scroll')
      }
    }catch(error){
      console.warn('Professional WebGL overlay disabled:',error)
      return null
    }
  }

  const states=elements.map(el=>{
    const base=el.querySelector(':scope > img')||el.querySelector('img')
    if(!base)return null
    el.classList.add('cinematic-v3')

    const mid=base.cloneNode(true)
    mid.className='depth-layer depth-mid'
    mid.alt=''
    mid.setAttribute('aria-hidden','true')
    mid.removeAttribute('loading')

    const near=base.cloneNode(true)
    near.className='depth-layer depth-near'
    near.alt=''
    near.setAttribute('aria-hidden','true')
    near.removeAttribute('loading')

    const canvas=document.createElement('canvas')
    canvas.className='motion-gl'
    canvas.setAttribute('aria-hidden','true')

    el.append(mid,near,canvas)

    const state={
      el,base,mid,near,canvas,gl:null,
      rx:0,ry:0,baseX:0,baseY:0,midX:0,midY:0,nearX:0,nearY:0,scroll:0,energy:0,
      targetRx:0,targetRy:0,targetBaseX:0,targetBaseY:0,targetMidX:0,targetMidY:0,targetNearX:0,targetNearY:0,targetScroll:0,targetEnergy:0,
      pointerX:0,pointerY:0,targetPointerX:0,targetPointerY:0,
      strength:el.classList.contains('professional-visual')?1:.72
    }

    const initCanvas=()=>{
      if(reduceMotion)return
      state.gl=createGL(canvas)
      resizeCanvas(state)
      renderGL(state)
    }
    const ready=()=>requestAnimationFrame(initCanvas)
    if(base.complete&&base.naturalWidth>0)ready()
    else base.addEventListener('load',ready,{once:true})

    return state
  }).filter(Boolean)

  if(!states.length||reduceMotion)return

  const resizeCanvas=state=>{
    if(!state.gl)return
    const rect=state.el.getBoundingClientRect()
    const dpr=Math.min(window.devicePixelRatio||1,1.5)
    const w=Math.max(1,Math.round(rect.width*dpr))
    const h=Math.max(1,Math.round(rect.height*dpr))
    if(state.canvas.width!==w||state.canvas.height!==h){
      state.canvas.width=w
      state.canvas.height=h
      state.gl.gl.viewport(0,0,w,h)
    }
  }

  const renderGL=state=>{
    if(!state.gl)return
    const {gl,program,pointer,energy,scroll}=state.gl
    gl.useProgram(program)
    gl.uniform2f(pointer,state.pointerX,state.pointerY)
    gl.uniform1f(energy,state.energy)
    gl.uniform1f(scroll,state.scroll)
    gl.clearColor(0,0,0,0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES,0,6)
  }

  let frame=0
  const write=state=>{
    state.el.style.setProperty('--v3-rx',`${state.rx.toFixed(3)}deg`)
    state.el.style.setProperty('--v3-ry',`${state.ry.toFixed(3)}deg`)
    state.el.style.setProperty('--v3-base-x',`${state.baseX.toFixed(2)}px`)
    state.el.style.setProperty('--v3-base-y',`${state.baseY.toFixed(2)}px`)
    state.el.style.setProperty('--v3-mid-x',`${state.midX.toFixed(2)}px`)
    state.el.style.setProperty('--v3-mid-y',`${state.midY.toFixed(2)}px`)
    state.el.style.setProperty('--v3-near-x',`${state.nearX.toFixed(2)}px`)
    state.el.style.setProperty('--v3-near-y',`${state.nearY.toFixed(2)}px`)
    state.el.style.setProperty('--v3-scroll',`${state.scroll.toFixed(2)}px`)
    state.el.style.setProperty('--v3-energy',state.energy.toFixed(3))
    renderGL(state)
  }

  const tick=()=>{
    let moving=false
    states.forEach(state=>{
      const props=[
        ['rx','targetRx',.105,.003],['ry','targetRy',.105,.003],
        ['baseX','targetBaseX',.10,.02],['baseY','targetBaseY',.10,.02],
        ['midX','targetMidX',.095,.02],['midY','targetMidY',.095,.02],
        ['nearX','targetNearX',.09,.02],['nearY','targetNearY',.09,.02],
        ['scroll','targetScroll',.08,.02],['energy','targetEnergy',.09,.002],
        ['pointerX','targetPointerX',.11,.002],['pointerY','targetPointerY',.11,.002]
      ]
      props.forEach(([current,target,ease,threshold])=>{
        const delta=state[target]-state[current]
        if(Math.abs(delta)>threshold){state[current]+=delta*ease;moving=true}
        else state[current]=state[target]
      })
      write(state)
    })
    frame=moving?requestAnimationFrame(tick):0
  }
  const wake=()=>{if(!frame)frame=requestAnimationFrame(tick)}

  if(finePointer){
    states.forEach(state=>{
      const pointerTarget=event=>{
        const r=state.el.getBoundingClientRect()
        if(!r.width||!r.height)return
        const nx=clamp(((event.clientX-r.left)/r.width)*2-1,-1,1)
        const ny=clamp(((event.clientY-r.top)/r.height)*2-1,-1,1)
        const s=state.strength
        state.targetRy=nx*2.65*s
        state.targetRx=-ny*1.75*s
        state.targetBaseX=-nx*3.2*s
        state.targetBaseY=-ny*2.0*s
        state.targetMidX=-nx*8.4*s
        state.targetMidY=-ny*5.2*s
        state.targetNearX=-nx*15.8*s
        state.targetNearY=-ny*9.4*s
        state.targetPointerX=nx
        state.targetPointerY=-ny
        state.targetEnergy=1
        state.el.classList.add('is-cinematic-active')
        wake()
      }
      state.el.addEventListener('pointerenter',pointerTarget)
      state.el.addEventListener('pointermove',pointerTarget,{passive:true})
      state.el.addEventListener('pointerleave',()=>{
        state.targetRx=0;state.targetRy=0
        state.targetBaseX=0;state.targetBaseY=0
        state.targetMidX=0;state.targetMidY=0
        state.targetNearX=0;state.targetNearY=0
        state.targetPointerX=0;state.targetPointerY=0
        state.targetEnergy=.12
        state.el.classList.remove('is-cinematic-active')
        wake()
      })
    })
  }

  const updateScroll=()=>{
    const vh=window.innerHeight||document.documentElement.clientHeight
    states.forEach(state=>{
      const r=state.el.getBoundingClientRect()
      if(r.bottom<-r.height||r.top>vh+r.height)return
      const center=r.top+r.height/2
      const range=(vh+r.height)/2
      const normalized=clamp((vh/2-center)/range,-1,1)
      state.targetScroll=normalized*14*state.strength
      if(!finePointer){
        state.targetPointerX=normalized*.32
        state.targetPointerY=-normalized*.18
        state.targetEnergy=.22
      }
    })
    wake()
  }

  let queued=false
  const queueScroll=()=>{
    if(queued)return
    queued=true
    requestAnimationFrame(()=>{queued=false;updateScroll()})
  }
  window.addEventListener('scroll',queueScroll,{passive:true})
  window.addEventListener('resize',()=>{
    states.forEach(resizeCanvas)
    updateScroll()
  })
  updateScroll()
})()
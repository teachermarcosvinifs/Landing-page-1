(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const media=document.querySelector('.max-media')
  const base=media?.querySelector('.base-photo')
  const effect=document.body.dataset.effect
  if(!media||!base||!effect)return

  const ready=fn=>{
    if(base.complete&&base.naturalWidth>0)setTimeout(fn,260)
    else base.addEventListener('load',()=>setTimeout(fn,260),{once:true})
  }
  const finish=()=>{media.dataset.fxComplete='true'}
  if(reduce){finish();return}

  const clone=className=>{
    const img=base.cloneNode(true)
    img.className=`fx-clone ${className}`
    img.alt='';img.setAttribute('aria-hidden','true');img.removeAttribute('loading')
    media.appendChild(img)
    return img
  }

  const runA=()=>{
    const shade=document.createElement('span');shade.className='prism-shade';media.append(shade)
    const tl=document.createElement('span');tl.className='prism-corner tl';media.append(tl)
    const br=document.createElement('span');br.className='prism-corner br';media.append(br)
    const slices=[]
    for(let i=0;i<5;i++){
      const img=clone('prism-slice')
      const left=i*20,right=100-(i+1)*20
      img.style.clipPath=`inset(0 ${right}% 0 ${left}%)`
      slices.push(img)
      if(i<4){const e=document.createElement('span');e.className='prism-edge';e.style.left=`${(i+1)*20}%`;media.append(e)}
    }
    media.animate([
      {transform:'perspective(1500px) translate3d(0,0,-54px) rotateY(-4.2deg) scale(.965)',boxShadow:'0 22px 62px rgba(0,0,0,.46)'},
      {transform:'perspective(1500px) translate3d(0,0,14px) rotateY(.7deg) scale(1.012)',offset:.68,boxShadow:'0 48px 110px rgba(0,0,0,.58)'},
      {transform:'perspective(1500px) translate3d(0,0,0) rotateY(0) scale(1)',boxShadow:'0 34px 90px rgba(0,0,0,.5)'}
    ],{duration:1380,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    shade.animate([{opacity:0},{opacity:.55,offset:.35},{opacity:0}],{duration:1300,easing:'ease-out',fill:'forwards'})
    ;[tl,br].forEach((c,j)=>c.animate([
      {opacity:0,transform:`translate3d(${j?-18:18}px,${j?-18:18}px,0) scale(.72)`},
      {opacity:1,transform:'translate3d(0,0,0) scale(1)',offset:.42},
      {opacity:0,transform:'translate3d(0,0,0) scale(1.08)'}
    ],{duration:1180,delay:90+j*70,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'}))
    slices.forEach((img,i)=>{
      const dir=i%2===0?-1:1
      img.animate([
        {opacity:0,transform:`perspective(1500px) translate3d(${(i-2)*18}px,${dir*22}px,${74+Math.abs(i-2)*18}px) rotateY(${dir*(10+Math.abs(i-2)*3)}deg) scale(1.055)`},
        {opacity:1,transform:`perspective(1500px) translate3d(${(i-2)*5}px,${dir*4}px,18px) rotateY(${dir*1.2}deg) scale(1.018)`,offset:.56},
        {opacity:.9,transform:'perspective(1500px) translate3d(0,0,0) rotateY(0) scale(1)',offset:.80},
        {opacity:0,transform:'perspective(1500px) translate3d(0,0,0) rotateY(0) scale(1)'}
      ],{duration:1180,delay:70+i*55,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    })
    media.querySelectorAll('.prism-edge').forEach((edge,i)=>edge.animate([
      {opacity:0,transform:'scaleY(.18)'},{opacity:1,transform:'scaleY(1)',offset:.42},{opacity:.9,offset:.72},{opacity:0,transform:'scaleY(.55)'}
    ],{duration:930,delay:260+i*60,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'}))
    setTimeout(()=>{[...media.querySelectorAll('.prism-slice,.prism-edge,.prism-corner,.prism-shade')].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1650)
  }

  const runB=()=>{
    const mid=clone('depth-mid'),near=clone('depth-near')
    const frame=document.createElement('span');frame.className='depth-frame';media.append(frame)
    const axis=document.createElement('span');axis.className='depth-axis';media.append(axis)
    const pulse=document.createElement('span');pulse.className='depth-pulse';media.append(pulse)
    media.animate([
      {transform:'perspective(1500px) rotateX(4.8deg) rotateY(-7deg) translate3d(0,10px,-60px) scale(.95)'},
      {transform:'perspective(1500px) rotateX(-1deg) rotateY(1.4deg) translate3d(0,-3px,18px) scale(1.018)',offset:.66},
      {transform:'perspective(1500px) rotateX(0) rotateY(0) translate3d(0,0,0) scale(1)'}
    ],{duration:1460,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    frame.animate([
      {opacity:0,transform:'translate3d(30px,18px,-40px) scale(.92)'},
      {opacity:1,transform:'translate3d(-10px,-8px,20px) scale(1.035)',offset:.54},
      {opacity:.55,transform:'translate3d(0,0,0) scale(1.01)',offset:.78},
      {opacity:0,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration:1320,delay:80,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    mid.animate([
      {opacity:0,transform:'translate3d(38px,10px,90px) scale(1.12)'},
      {opacity:1,transform:'translate3d(-12px,-4px,54px) scale(1.08)',offset:.48},
      {opacity:.95,transform:'translate3d(0,0,20px) scale(1.035)',offset:.74},
      {opacity:0,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration:1260,delay:130,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    near.animate([
      {opacity:0,transform:'translate3d(62px,22px,140px) scale(1.17)'},
      {opacity:1,transform:'translate3d(-18px,-8px,84px) scale(1.11)',offset:.48},
      {opacity:1,transform:'translate3d(0,0,34px) scale(1.06)',offset:.73},
      {opacity:0,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration:1280,delay:190,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    axis.animate([{opacity:0,transform:'scaleY(.1)'},{opacity:.75,transform:'scaleY(1)',offset:.38},{opacity:0,transform:'scaleY(.2)'}],{duration:900,delay:240,easing:'ease-out',fill:'forwards'})
    pulse.animate([
      {opacity:0,width:'1px',height:'1px',margin:'0'},
      {opacity:.6,width:'220px',height:'220px',margin:'-110px',offset:.44},
      {opacity:0,width:'620px',height:'620px',margin:'-310px'}
    ],{duration:900,delay:350,easing:'cubic-bezier(.2,.72,.2,1)',fill:'forwards'})
    setTimeout(()=>{[mid,near,frame,axis,pulse].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1750)
  }

  const initShader=canvas=>{
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true})
    if(!gl)return null
    const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
    const vs=compile(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}');
    const fs=compile(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 uv;uniform float t;void main(){float x=t*1.55-.28;float d=abs((uv.x-uv.y*.20)-x);float core=pow(max(0.,1.-d*13.),5.);float halo=pow(max(0.,1.-d*5.5),7.);float edge=smoothstep(.02,.16,uv.x)*smoothstep(.02,.16,1.-uv.x)*smoothstep(.02,.16,uv.y)*smoothstep(.02,.16,1.-uv.y);vec3 a=vec3(.20,.76,1.);vec3 b=vec3(1.,.46,.74);vec3 c=vec3(1.,.97,.86);vec3 col=mix(a,b,uv.y);col=mix(col,c,core);float alpha=(core*.34+halo*.08)*edge;gl_FragColor=vec4(col,alpha);}');
    const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);gl.useProgram(pr)
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
    const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0)
    return {gl,pr,time:gl.getUniformLocation(pr,'t')}
  }

  const runC=()=>{
    const core=clone('refract-core'),cyan=clone('refract-cyan'),magenta=clone('refract-magenta')
    cyan.style.opacity='.16';magenta.style.opacity='.12'
    const canvas=document.createElement('canvas');canvas.className='refraction-gl';canvas.setAttribute('aria-hidden','true');media.append(canvas)
    const edge=document.createElement('span');edge.className='lens-edge';media.append(edge)
    const rect=media.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr)
    const shader=initShader(canvas);if(shader)shader.gl.viewport(0,0,canvas.width,canvas.height)
    const clipAt=x=>`polygon(${x-13}% -15%,${x+5}% -15%,${x+17}% 115%,${x-1}% 115%)`
    ;[core,cyan,magenta].forEach((img,j)=>img.animate([
      {opacity:0,clipPath:clipAt(-20)},
      {opacity:j===0?.96:(j===1?.18:.14),clipPath:clipAt(12),offset:.18},
      {opacity:j===0?.98:(j===1?.18:.14),clipPath:clipAt(58),offset:.55},
      {opacity:j===0?.92:(j===1?.12:.1),clipPath:clipAt(102),offset:.88},
      {opacity:0,clipPath:clipAt(128)}
    ],{duration:1560,delay:j*22,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'}))
    edge.animate([
      {left:'-18%',opacity:0},{left:'8%',opacity:.9,offset:.16},{left:'62%',opacity:1,offset:.58},{left:'112%',opacity:.65,offset:.9},{left:'130%',opacity:0}
    ],{duration:1540,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    media.animate([{boxShadow:'0 34px 90px rgba(0,0,0,.5)'},{boxShadow:'0 48px 120px rgba(41,131,170,.20),0 30px 90px rgba(0,0,0,.52)',offset:.52},{boxShadow:'0 34px 90px rgba(0,0,0,.5)'}],{duration:1600,easing:'ease-out',fill:'forwards'})
    const start=performance.now();const draw=now=>{const p=Math.min(1,(now-start)/1600);if(shader){const {gl,pr,time}=shader;gl.useProgram(pr);gl.uniform1f(time,p);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6)}if(p<1)requestAnimationFrame(draw)};requestAnimationFrame(draw)
    setTimeout(()=>{[core,cyan,magenta,canvas,edge].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1800)
  }

  ready(()=>{if(effect==='a')runA();else if(effect==='b')runB();else if(effect==='c')runC()})
})()
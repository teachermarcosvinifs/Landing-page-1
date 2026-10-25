(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const media=document.querySelector('.max-media')
  const base=media?.querySelector('.base-photo')
  const effect=document.body.dataset.effect
  if(!media||!base||!['b','c'].includes(effect))return
  const finish=()=>{media.dataset.fxComplete='true'}
  if(reduce){finish();return}
  const ready=fn=>{if(base.complete&&base.naturalWidth>0)setTimeout(fn,260);else base.addEventListener('load',()=>setTimeout(fn,260),{once:true})}
  const node=(tag,cls)=>{const n=document.createElement(tag);n.className=cls;media.append(n);return n}
  const clone=cls=>{const img=base.cloneNode(true);img.className=`fx-clone ${cls}`;img.alt='';img.setAttribute('aria-hidden','true');img.removeAttribute('loading');media.append(img);return img}

  const runB=()=>{
    const frames=[node('span','orbit-frame f1'),node('span','orbit-frame f2'),node('span','orbit-frame f3')]
    const railTop=node('span','orbit-rail top'),railBottom=node('span','orbit-rail bottom')
    const n1=node('span','orbit-node n1'),n2=node('span','orbit-node n2'),halo=node('span','orbit-halo')
    media.animate([
      {transform:'perspective(1600px) translate3d(0,10px,-72px) rotateX(5.6deg) rotateY(-8.2deg) scale(.955)',boxShadow:'0 24px 62px rgba(0,0,0,.44)'},
      {transform:'perspective(1600px) translate3d(0,-4px,28px) rotateX(-1.2deg) rotateY(1.8deg) scale(1.02)',boxShadow:'0 54px 124px rgba(0,0,0,.60)',offset:.62},
      {transform:'perspective(1600px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)',boxShadow:'0 34px 90px rgba(0,0,0,.5)'}
    ],{duration:1480,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'})
    const frameKeys=[
      [
        {opacity:0,transform:'perspective(1400px) translate3d(38px,22px,-90px) rotateX(8deg) rotateY(-12deg) scale(.88)'},
        {opacity:.96,transform:'perspective(1400px) translate3d(-12px,-8px,48px) rotateX(-2deg) rotateY(4deg) scale(1.055)',offset:.54},
        {opacity:.48,transform:'perspective(1400px) translate3d(0,0,6px) rotateX(0) rotateY(0) scale(1.012)',offset:.78},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ],
      [
        {opacity:0,transform:'perspective(1400px) translate3d(-44px,-18px,-130px) rotateX(-7deg) rotateY(15deg) scale(.82)'},
        {opacity:.74,transform:'perspective(1400px) translate3d(18px,10px,28px) rotateX(2deg) rotateY(-5deg) scale(1.08)',offset:.57},
        {opacity:.32,transform:'perspective(1400px) translate3d(0,0,2px) rotateX(0) rotateY(0) scale(1.022)',offset:.80},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ],
      [
        {opacity:0,transform:'perspective(1400px) translate3d(12px,52px,-170px) rotateX(13deg) rotateY(7deg) scale(.76)'},
        {opacity:.52,transform:'perspective(1400px) translate3d(-6px,-16px,18px) rotateX(-3deg) rotateY(-2deg) scale(1.12)',offset:.60},
        {opacity:.22,transform:'perspective(1400px) translate3d(0,0,0) scale(1.032)',offset:.82},
        {opacity:0,transform:'perspective(1400px) translate3d(0,0,0) scale(1)'}
      ]
    ]
    frames.forEach((f,i)=>f.animate(frameKeys[i],{duration:1260,delay:70+i*65,easing:'cubic-bezier(.16,.84,.18,1)',fill:'forwards'}))
    ;[railTop,railBottom].forEach((r,i)=>r.animate([{opacity:0,transform:'scaleX(.12)'},{opacity:.88,transform:'scaleX(1)',offset:.44},{opacity:.52,offset:.70},{opacity:0,transform:'scaleX(.45)'}],{duration:900,delay:290+i*70,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'}))
    ;[n1,n2].forEach((n,i)=>n.animate([{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'scale(1.25)',offset:.42},{opacity:.9,transform:'scale(1)',offset:.70},{opacity:0,transform:'scale(.4)'}],{duration:860,delay:330+i*90,easing:'ease-out',fill:'forwards'}))
    halo.animate([{opacity:0,transform:'scale(.82)'},{opacity:.5,transform:'scale(1.025)',offset:.52},{opacity:0,transform:'scale(1.12)'}],{duration:1050,delay:180,easing:'cubic-bezier(.2,.72,.2,1)',fill:'forwards'})
    setTimeout(()=>{[...frames,railTop,railBottom,n1,n2,halo].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1750)
  }

  const initShader=canvas=>{
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true});if(!gl)return null
    const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
    const vs=compile(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}');
    const fs=compile(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 uv;uniform float t;void main(){float x=t*1.52-.24;float d=abs((uv.x-uv.y*.16)-x);float core=pow(max(0.,1.-d*20.),8.);float halo=pow(max(0.,1.-d*10.),9.);float edge=smoothstep(.02,.13,uv.x)*smoothstep(.02,.13,1.-uv.x)*smoothstep(.02,.13,uv.y)*smoothstep(.02,.13,1.-uv.y);vec3 cool=vec3(.46,.86,1.);vec3 warm=vec3(1.,.78,.92);vec3 white=vec3(1.);vec3 col=mix(cool,warm,uv.y*.7);col=mix(col,white,core*.7);float alpha=(core*.14+halo*.035)*edge;gl_FragColor=vec4(col,alpha);}');
    const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);gl.useProgram(pr);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);return{gl,pr,time:gl.getUniformLocation(pr,'t')}
  }

  const runC=()=>{
    const core=clone('refract-band'),cyan=clone('refract-band-cyan'),violet=clone('refract-band-violet')
    const canvas=node('canvas','refraction-gl-refined');canvas.setAttribute('aria-hidden','true')
    const edge=node('span','lens-edge-refined'),shadow=node('span','lens-shadow')
    const rect=media.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);const shader=initShader(canvas);if(shader)shader.gl.viewport(0,0,canvas.width,canvas.height)
    const clipAt=x=>`polygon(${x-6}% -15%,${x+5}% -15%,${x+13}% 115%,${x+2}% 115%)`
    const bandKeys=(opacity)=>[
      {opacity:0,clipPath:clipAt(-16)},
      {opacity,clipPath:clipAt(10),offset:.18},
      {opacity,clipPath:clipAt(54),offset:.54},
      {opacity:opacity*.82,clipPath:clipAt(98),offset:.88},
      {opacity:0,clipPath:clipAt(124)}
    ]
    core.animate(bandKeys(.84),{duration:1540,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    cyan.animate(bandKeys(.075),{duration:1540,delay:12,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    violet.animate(bandKeys(.055),{duration:1540,delay:24,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    edge.animate([{left:'-16%',opacity:0},{left:'9%',opacity:.7,offset:.16},{left:'58%',opacity:.9,offset:.58},{left:'110%',opacity:.45,offset:.9},{left:'126%',opacity:0}],{duration:1540,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    shadow.animate([{left:'-18%',opacity:0},{left:'6%',opacity:.45,offset:.16},{left:'56%',opacity:.6,offset:.58},{left:'108%',opacity:.3,offset:.9},{left:'124%',opacity:0}],{duration:1540,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    media.animate([{boxShadow:'0 34px 90px rgba(0,0,0,.5)'},{boxShadow:'0 42px 104px rgba(44,126,160,.12),0 30px 90px rgba(0,0,0,.52)',offset:.55},{boxShadow:'0 34px 90px rgba(0,0,0,.5)'}],{duration:1600,easing:'ease-out',fill:'forwards'})
    const start=performance.now();const draw=now=>{const p=Math.min(1,(now-start)/1600);if(shader){const{gl,pr,time}=shader;gl.useProgram(pr);gl.uniform1f(time,p);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6)}if(p<1)requestAnimationFrame(draw)};requestAnimationFrame(draw)
    setTimeout(()=>{[core,cyan,violet,canvas,edge,shadow].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1800)
  }
  ready(()=>effect==='b'?runB():runC())
})()
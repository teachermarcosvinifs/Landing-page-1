(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const media=document.querySelector('.max-media'),base=media?.querySelector('.base-photo')
  if(!media||!base||document.body.dataset.effect!=='c')return
  const finish=()=>{media.dataset.fxComplete='true'}
  if(reduce){finish();return}
  const ready=fn=>{if(base.complete&&base.naturalWidth>0)setTimeout(fn,260);else base.addEventListener('load',()=>setTimeout(fn,260),{once:true})}
  const node=(tag,cls)=>{const n=document.createElement(tag);n.className=cls;media.append(n);return n}
  const clone=cls=>{const img=base.cloneNode(true);img.className=`fx-clone ${cls}`;img.alt='';img.setAttribute('aria-hidden','true');img.removeAttribute('loading');media.append(img);return img}
  const initShader=canvas=>{
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});if(!gl)return null
    const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
    const vs=compile(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}');
    const fs=compile(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 uv;uniform float t;void main(){float pulse=.68+.32*sin((uv.y+t)*9.0);float center=.5+.10*sin((uv.y+t)*5.0);float d=abs(uv.x-center);float core=pow(max(0.,1.-d*7.5),6.);float rim=pow(max(0.,1.-abs(d-.13)*12.),7.);vec3 cyan=vec3(.46,.88,1.);vec3 pearl=vec3(1.,.97,.92);vec3 violet=vec3(.68,.58,1.);vec3 col=mix(cyan,violet,uv.y*.34);col=mix(col,pearl,core*.65);float alpha=(core*.11+rim*.045)*pulse;gl_FragColor=vec4(col,alpha);}');
    const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);gl.useProgram(pr);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);return{gl,pr,time:gl.getUniformLocation(pr,'t')}
  }
  ready(()=>{
    const core=clone('refract-band'),cyan=clone('refract-band-cyan'),violet=clone('refract-band-violet')
    const canvas=node('canvas','refraction-gl-refined');canvas.setAttribute('aria-hidden','true')
    const edge=node('span','lens-edge-refined'),shadow=node('span','lens-shadow')
    const rect=media.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);const shader=initShader(canvas);if(shader)shader.gl.viewport(0,0,canvas.width,canvas.height)
    const clipAt=x=>`polygon(${x-5}% -15%,${x+5}% -15%,${x+12}% 115%,${x+2}% 115%)`
    const keys=(opacity)=>[{opacity:0,clipPath:clipAt(-16)},{opacity,clipPath:clipAt(9),offset:.17},{opacity,clipPath:clipAt(53),offset:.54},{opacity:opacity*.8,clipPath:clipAt(97),offset:.88},{opacity:0,clipPath:clipAt(123)}]
    core.animate(keys(.78),{duration:1520,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    cyan.animate(keys(.055),{duration:1520,delay:10,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    violet.animate(keys(.04),{duration:1520,delay:20,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    canvas.animate([{opacity:0,clipPath:clipAt(-16)},{opacity:.64,clipPath:clipAt(9),offset:.17},{opacity:.72,clipPath:clipAt(53),offset:.54},{opacity:.48,clipPath:clipAt(97),offset:.88},{opacity:0,clipPath:clipAt(123)}],{duration:1520,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    edge.animate([{left:'-16%',opacity:0},{left:'9%',opacity:.68,offset:.17},{left:'57%',opacity:.9,offset:.58},{left:'108%',opacity:.42,offset:.9},{left:'124%',opacity:0}],{duration:1520,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    shadow.animate([{left:'-18%',opacity:0},{left:'6%',opacity:.3,offset:.17},{left:'55%',opacity:.44,offset:.58},{left:'106%',opacity:.22,offset:.9},{left:'122%',opacity:0}],{duration:1520,easing:'cubic-bezier(.2,.72,.18,1)',fill:'forwards'})
    media.animate([{boxShadow:'0 34px 90px rgba(0,0,0,.5)'},{boxShadow:'0 42px 108px rgba(50,142,177,.10),0 30px 90px rgba(0,0,0,.52)',offset:.55},{boxShadow:'0 34px 90px rgba(0,0,0,.5)'}],{duration:1580,easing:'ease-out',fill:'forwards'})
    const start=performance.now();const draw=now=>{const p=Math.min(1,(now-start)/1580);if(shader){const{gl,pr,time}=shader;gl.useProgram(pr);gl.uniform1f(time,p);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6)}if(p<1)requestAnimationFrame(draw)};requestAnimationFrame(draw)
    setTimeout(()=>{[core,cyan,violet,canvas,edge,shadow].forEach(n=>n.remove());media.getAnimations().forEach(a=>a.cancel());finish()},1780)
  })
})()
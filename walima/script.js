(()=>{'use strict';const d=window.INVITATION,stage=document.querySelector('main'),pages=document.getElementById('pages'),openButton=document.getElementById('open'),cover=document.getElementById('cover'),letter=document.getElementById('letter');
 const arabic='<p class="bismillah reveal" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>';
 const divider='<div class="ornament reveal" aria-hidden="true"><span></span>✦<span></span></div>';
 const date=`<div class="date-block reveal"><span class="day">${d.day}</span><strong>${d.number}<sup>${d.number==='26'?'th':d.number==='27'?'th':'th'}</sup></strong><span class="month">November 2026</span></div>`;
 const hosts='<p class="hosts reveal">Mr. &amp; Mrs. Shahid Mahmood Dar</p><p class="invitation-line reveal">Request the pleasure of your company at the<br>Wedding Ceremony of their beloved Son</p>';
 const names=`<h2 class="name reveal">Waleed Ali Dar</h2>${d.key==='mehndi'?'':'<p class="with reveal">with</p><p class="bride reveal">D/o Nadeem Butt</p>'}`;
 const intro=d.key==='mehndi'?`<p class="smallcaps reveal">Please join us to celebrate the</p><p class="ritual reveal">Rasm-e-Hina</p><p class="with reveal">of</p>${names}<p class="event-script reveal">Mehndi</p>${divider}${date}`:`${arabic}${hosts}${names}${divider}<p class="event-title reveal">${d.title}</p>${date}`;
 const programme=`<p class="smallcaps reveal">${d.title}</p><h2 class="page-title reveal">The celebration</h2><p class="programme reveal">Programme “Insha Allah”</p>${divider}<p class="programme-date reveal">${d.day}, ${d.number}th November 2026</p><div class="schedule">${d.times.map((t,i)=>`<div class="schedule-row reveal"><span class="schedule-index">0${i+1}</span><div><p>${t[0]}</p><strong>${t[1]}</strong></div></div>`).join('')}</div>${divider}<div class="venue reveal"><span class="smallcaps">Venue</span><h3>${d.venue}</h3><p>${d.address.join('<br>')}</p></div>${d.key==='mehndi'?'<div class="awaiting reveal"><p>Awaiting Eyes:</p><strong>All Sisters &amp; Cousins</strong></div>':''}`;
 const family=`<p class="smallcaps reveal">Walima</p><h2 class="page-title reveal">With our families</h2><div class="family-grid"><section class="rsvp reveal"><h3>R.S.V.P</h3><a href="tel:03034002050"><span>M. Fahad Dar</span><span>0303-4002050</span></a><a href="tel:03034007011"><span>Wajid Ali Dar</span><span>0303-4007011</span></a><a href="tel:03390034943"><span>Shaiz Ali Dar</span><span>0339-0034943</span></a><a href="tel:03226100017"><span>M. Adeel</span><span>0322-6100017</span></a></section>${divider}<section class="family reveal"><h3>Looking Forward</h3><p>Mr. &amp; Mrs. Javed Dar<br>Maqsood Dar &amp; Family<br>Haris ul Islam &amp; Family<br>Umer Khalid Butt &amp; Family<br>Azeem Butt &amp; Family<br>Afzal Butt &amp; Family<br>Shahbaz Dar &amp; Family<br>Mudassir Butt &amp; Family</p></section></div>`;
 const contents=[intro,programme,...(d.key==='walima'?[family]:[])];


const labels=['Invitation','Programme','Family & RSVP'];
contents.forEach((html,i)=>{const section=document.createElement('section');section.className='page';section.innerHTML='<div class="page-content">'+html+'</div>';section.setAttribute('aria-label',labels[i]);pages.append(section);});
pages.tabIndex=0;pages.setAttribute('aria-label','Invitation details. Scroll to read previous or next details.');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let opened=false,touching=false,pointerHeld=false,resumeAt=0,lastTime=0,position=0,expected=0;
const delay=1100; // Resume after the last gesture or momentum movement settles.
function pause(){resumeAt=performance.now()+delay;position=pages.scrollTop;expected=position;}
pages.addEventListener('touchstart',()=>{touching=true;pause();},{passive:true});
pages.addEventListener('touchend',e=>{touching=e.touches.length>0;pause();},{passive:true});
pages.addEventListener('touchcancel',()=>{touching=false;pause();},{passive:true});
pages.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')pointerHeld=true;pause();},{passive:true});
window.addEventListener('pointerup',()=>{pointerHeld=false;pause();},{passive:true});
window.addEventListener('pointercancel',()=>{pointerHeld=false;pause();},{passive:true});
pages.addEventListener('wheel',pause,{passive:true});
pages.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key))pause();});
pages.addEventListener('scroll',()=>{if(Math.abs(pages.scrollTop-expected)>.75)pause();},{passive:true});
document.addEventListener('visibilitychange',()=>{lastTime=0;pause();});
window.addEventListener('resize',pause);
function frame(now){const elapsed=lastTime?Math.min(now-lastTime,50):0;lastTime=now;
 if(opened&&!reduced.matches&&!document.hidden&&!touching&&!pointerHeld&&now>=resumeAt){
 const max=Math.max(0,pages.scrollHeight-pages.clientHeight);
 // Preserve fractional movement for equally smooth motion at different refresh rates.
 position=Math.min(max,position+elapsed*.036);pages.scrollTop=position;expected=pages.scrollTop;
 }
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target);}},{root:pages,threshold:.15});pages.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
else pages.querySelectorAll('.reveal').forEach(el=>el.classList.add('seen'));
openButton.onclick=()=>{if(stage.dataset.state!=='closed')return;stage.dataset.state='opening';openButton.disabled=true;opened=true;position=pages.scrollTop;expected=position;resumeAt=0;lastTime=performance.now();letter.inert=false;letter.removeAttribute('aria-hidden');stage.classList.add('is-open');setTimeout(()=>{stage.dataset.state='open';cover.hidden=true;pages.focus({preventScroll:true});},reduced.matches?50:3000);};
})();

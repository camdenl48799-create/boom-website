const motionStyle = document.createElement('style')
motionStyle.textContent = `
  .nav { transition: background .25s ease, border-color .25s ease, backdrop-filter .25s ease; }
  .nav.scrolled { position: sticky; top: 0; z-index: 20; background: #07090de8; backdrop-filter: blur(16px); border-color: #2a3038; }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .cloud-file.reveal:nth-child(2) { transition-delay: .08s; }
  .cloud-file.reveal:nth-child(3) { transition-delay: .16s; }
  .feature.reveal:nth-child(2) { transition-delay: .08s; }
  .feature.reveal:nth-child(3) { transition-delay: .16s; }
  .terminal.flash { animation: boomFlash .45s ease; }
  @keyframes boomFlash { 50% { box-shadow: 0 0 55px #8dff6228, 0 30px 90px #0007; transform: translateY(-3px); } }
  .boom-activation { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; background: #040607; opacity: 0; pointer-events: none; overflow: hidden; }
  .boom-activation.launch { animation: activationFade .95s cubic-bezier(.2,.8,.2,1) forwards; pointer-events: auto; }
  .activation-grid { position: absolute; inset: -40%; background-image: linear-gradient(#8dff6210 1px,transparent 1px),linear-gradient(90deg,#8dff6210 1px,transparent 1px); background-size: 44px 44px; transform: perspective(500px) rotateX(62deg) translateY(20%); opacity: 0; }
  .launch .activation-grid { animation: gridRush .95s ease-out forwards; }
  .activation-burst { position: absolute; width: 30px; height: 30px; border: 1px solid #caffb8; border-radius: 50%; box-shadow: 0 0 70px 12px #8dff6266; opacity: 0; }
  .launch .activation-burst { animation: burst .8s cubic-bezier(.1,.7,.2,1) forwards; }
  .activation-core { width: 110px; height: 110px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle,#e3ffd6 0,#81e85f 43%,#111a10 72%); box-shadow: 0 0 100px #8dff6277,0 0 240px #8dff6226; transform: scale(.15); opacity: .2; }
  .launch .activation-core { animation: corePower .72s cubic-bezier(.16,.85,.24,1) .05s forwards; }
  .activation-core span { font-size: 58px; font-weight: 900; color: #091008; letter-spacing: -.1em; }
  .activation-title { position: absolute; margin-top: 190px; font-weight: 900; font-size: 14px; letter-spacing: .45em; opacity: 0; transform: translateY(12px); }
  .launch .activation-title { animation: titleIn .35s ease .32s forwards; }
  .activation-status { position: absolute; margin-top: 250px; font: 10px ui-monospace,monospace; color: #69736a; letter-spacing: .18em; opacity: 0; }
  .activation-status span { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #8dff62; margin-right: 8px; box-shadow: 0 0 12px #8dff62; }
  .launch .activation-status { animation: titleIn .35s ease .48s forwards; }
  @keyframes activationFade { 0% { opacity: 0; } 12% { opacity: 1; } 72% { opacity: 1; } 100% { opacity: 0; } }
  @keyframes gridRush { 0% { opacity: 0; transform: perspective(500px) rotateX(62deg) translateY(28%) scale(1.25); } 35% { opacity: .75; } 100% { opacity: 0; transform: perspective(500px) rotateX(62deg) translateY(-5%) scale(1); } }
  @keyframes burst { 0% { opacity: 0; transform: scale(.2); } 20% { opacity: 1; } 100% { opacity: 0; transform: scale(24); } }
  @keyframes corePower { 0% { opacity: .2; transform: scale(.15) rotate(-15deg); } 55% { opacity: 1; transform: scale(1.1) rotate(2deg); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes titleIn { to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
    .marquee div { animation: none; }
    .boom-activation.launch { animation: activationFade .4s ease forwards; }
    .launch .activation-grid,.launch .activation-burst,.launch .activation-core,.launch .activation-title,.launch .activation-status { animation-duration: .4s; }
  }
`
document.head.appendChild(motionStyle)

const nav = document.querySelector('.nav')
const setNavState = () => nav?.classList.toggle('scrolled', window.scrollY > 12)
setNavState()
window.addEventListener('scroll', setNavState, { passive: true })

const revealTargets = document.querySelectorAll('.feature, .terminal, .xr-card, .cloud-file, .safety-box, .access')
revealTargets.forEach((element) => element.classList.add('reveal'))
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.14 })
revealTargets.forEach((element) => observer.observe(element))

const core = document.querySelector('.core')
const visual = document.querySelector('.hero-visual')
visual?.addEventListener('pointermove', (event) => {
  if (!core) return
  const rect = visual.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  core.style.transform = `translate(${x * 14}px, ${y * 14}px)`
})
visual?.addEventListener('pointerleave', () => { if (core) core.style.transform = '' })

const terminal = document.querySelector('.terminal-body')
const cursor = document.querySelector('.terminal-cursor')
let cursorOn = true
setInterval(() => { cursorOn = !cursorOn; if (cursor) cursor.style.opacity = cursorOn ? '1' : '0.15' }, 600)
terminal?.addEventListener('click', () => {
  terminal.classList.remove('flash')
  void terminal.offsetWidth
  terminal.classList.add('flash')
})

const activation = document.createElement('div')
activation.className = 'boom-activation'
activation.innerHTML = `
  <div class="activation-grid"></div>
  <div class="activation-burst"></div>
  <div class="activation-core"><span>B</span></div>
  <div class="activation-title">B.O.O.M.</div>
  <div class="activation-status"><span></span>SYSTEM INITIALIZING</div>
`
document.body.appendChild(activation)

const launch = () => {
  activation.classList.remove('launch')
  void activation.offsetWidth
  activation.classList.add('launch')
}

document.querySelectorAll('.button.primary, .nav-cta').forEach((button) => {
  button.addEventListener('click', (event) => {
    const href = button.getAttribute('href') || ''
    if (href.startsWith('#')) return
    event.preventDefault()
    launch()
    window.setTimeout(() => { window.location.href = href }, 900)
  })
})
core?.addEventListener('click', launch)

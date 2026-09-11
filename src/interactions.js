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
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
    .marquee div { animation: none; }
  }
`
document.head.appendChild(motionStyle)

const nav = document.querySelector('.nav')

const setNavState = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 12)
}

setNavState()
window.addEventListener('scroll', setNavState, { passive: true })

const revealTargets = document.querySelectorAll(
  '.feature, .terminal, .xr-card, .cloud-file, .safety-box, .access'
)

revealTargets.forEach((element) => element.classList.add('reveal'))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.14 }
)

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

visual?.addEventListener('pointerleave', () => {
  if (core) core.style.transform = ''
})

const terminal = document.querySelector('.terminal-body')
const cursor = document.querySelector('.terminal-cursor')
let cursorOn = true

setInterval(() => {
  cursorOn = !cursorOn
  if (cursor) cursor.style.opacity = cursorOn ? '1' : '0.15'
}, 600)

terminal?.addEventListener('click', () => {
  terminal.classList.remove('flash')
  void terminal.offsetWidth
  terminal.classList.add('flash')
})

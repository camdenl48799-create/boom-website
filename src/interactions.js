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

import './setup.css'

const app = document.querySelector('#setup-app')
const steps = ['Welcome', 'Profile', 'Workspace', 'Preferences', 'Ready']
let current = 0

const state = { name: '', project: '', platform: 'PC + VR', theme: 'Dark', cloud: true }

function render() {
  const final = current === steps.length - 1
  app.innerHTML = `
    <div class="setup-shell">
      <header class="setup-nav"><a class="brand" href="/"><span class="brand-mark">B</span>B.O.O.M.</a><span>SETUP WIZARD</span></header>
      <div class="progress"><div class="progress-fill" style="width:${(current / (steps.length - 1)) * 100}%"></div></div>
      <main class="setup-main">
        <aside class="steps">${steps.map((step, i) => `<div class="step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}"><b>${i < current ? '✓' : String(i + 1).padStart(2, '0')}</b><span>${step}</span></div>`).join('')}</aside>
        <section class="panel">
          <div class="panel-kicker">STEP ${String(current + 1).padStart(2, '0')} / ${steps.length}</div>
          ${screen()}
          <div class="actions">
            ${current > 0 ? '<button class="secondary" id="back">Back</button>' : '<a class="secondary" href="/">Cancel</a>'}
            ${final ? '<a class="primary" href="/">Launch B.O.O.M. <span>→</span></a>' : `<button class="primary" id="next">Continue <span>→</span></button>`}
          </div>
        </section>
      </main>
    </div>`
  bind()
}

function screen() {
  if (current === 0) return `<div class="hero"><div class="core">B</div><h1>Welcome to<br><em>B.O.O.M.</em></h1><p>Let's configure your workspace. You can change these settings later.</p></div>`
  if (current === 1) return `<div class="form"><h2>Tell us about you.</h2><p>Set the name B.O.O.M. should use in your workspace.</p><label>Creator name<input id="name" value="${state.name}" placeholder="Your name"></label></div>`
  if (current === 2) return `<div class="form"><h2>Configure your workspace.</h2><p>Choose a starting project and your target platforms.</p><label>First project<input id="project" value="${state.project}" placeholder="My first B.O.O.M. game"></label><div class="choice-grid"><button class="choice ${state.platform === 'PC' ? 'selected' : ''}" data-platform="PC">🖥️ PC</button><button class="choice ${state.platform === 'VR' ? 'selected' : ''}" data-platform="VR">🥽 VR</button><button class="choice ${state.platform === 'PC + VR' ? 'selected' : ''}" data-platform="PC + VR">⚡ PC + VR</button></div></div>`
  if (current === 3) return `<div class="form"><h2>Make B.O.O.M. yours.</h2><p>Pick your starting preferences.</p><div class="choice-grid"><button class="choice ${state.theme === 'Dark' ? 'selected' : ''}" data-theme="Dark">🌑 Dark</button><button class="choice ${state.theme === 'Light' ? 'selected' : ''}" data-theme="Light">☀️ Light</button></div><button class="cloud-toggle ${state.cloud ? 'selected' : ''}" id="cloud"><span>☁</span><div><b>Cloud projects</b><small>Keep projects synced across supported devices.</small></div><strong>${state.cloud ? 'ON' : 'OFF'}</strong></button></div>`
  return `<div class="hero ready"><div class="success">✓</div><h1>You're ready<br><em>to build.</em></h1><p>${state.project ? state.project : 'Your first B.O.O.M. project'} is configured for ${state.platform}.</p><div class="summary"><span>CREATOR <b>${state.name || 'Creator'}</b></span><span>THEME <b>${state.theme}</b></span><span>CLOUD <b>${state.cloud ? 'ON' : 'OFF'}</b></span></div></div>`
}

function bind() {
  document.querySelector('#next')?.addEventListener('click', () => { save(); current++; render() })
  document.querySelector('#back')?.addEventListener('click', () => { save(); current--; render() })
  document.querySelector('#name')?.addEventListener('input', e => state.name = e.target.value)
  document.querySelector('#project')?.addEventListener('input', e => state.project = e.target.value)
  document.querySelectorAll('[data-platform]').forEach(b => b.addEventListener('click', () => { state.platform = b.dataset.platform; render() }))
  document.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => { state.theme = b.dataset.theme; render() }))
  document.querySelector('#cloud')?.addEventListener('click', () => { state.cloud = !state.cloud; render() })
}
function save() {
  const name = document.querySelector('#name'); const project = document.querySelector('#project')
  if (name) state.name = name.value
  if (project) state.project = project.value
  localStorage.setItem('boom-setup', JSON.stringify(state))
}
try { Object.assign(state, JSON.parse(localStorage.getItem('boom-setup') || '{}')) } catch {}
render()

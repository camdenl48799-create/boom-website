const PROJECT_KEY = 'boom-projects';

function loadProjects() {
  try { return JSON.parse(localStorage.getItem(PROJECT_KEY) || '[]'); }
  catch { return []; }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
}

export function createProject({ name = 'Untitled Project', platform = 'PC + VR', genre = '3D' } = {}) {
  const projects = loadProjects();
  const project = {
    id: crypto.randomUUID(),
    name,
    platform,
    genre,
    status: 'Ready to build',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projects.unshift(project);
  saveProjects(projects);
  return project;
}

export function getProjects() { return loadProjects(); }

export function updateProject(id, patch) {
  const projects = loadProjects().map(project =>
    project.id === id ? { ...project, ...patch, updatedAt: new Date().toISOString() } : project
  );
  saveProjects(projects);
  return projects.find(project => project.id === id) || null;
}

export function deleteProject(id) {
  saveProjects(loadProjects().filter(project => project.id !== id));
}

export function bootEngine(root = document) {
  root.querySelectorAll('[data-boom-create-project]').forEach(button => {
    button.addEventListener('click', () => {
      const name = prompt('B.O.O.M. project name:', 'My B.O.O.M. Game');
      if (!name?.trim()) return;
      const project = createProject({ name: name.trim() });
      window.dispatchEvent(new CustomEvent('boom:project-created', { detail: project }));
    });
  });
}

export default { createProject, getProjects, updateProject, deleteProject, bootEngine };

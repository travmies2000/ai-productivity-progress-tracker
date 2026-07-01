const curriculum = [
    { module: "Module 1: The AI Mindset Shift", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    { module: "Module 2: Advanced Prompting", lessons: ["The S.C.O.P.E. Framework", "Iterative Refinement"] },
    { module: "Module 3: Daily Workflow Automation", lessons: ["The Zero Inbox AI Assistant", "Meeting Mastery", "Content Repurposing"] },
    { module: "Module 4: The Toolbox", lessons: ["Data Analysis", "Visual Communication", "Research & Fact-Checking"] },
    { module: "Module 5: Building Systems", lessons: ["Custom Instructions", "The 15-Minute Weekly Audit"] }
];

let state = JSON.parse(localStorage.getItem('hubState')) || { completed: [], prompts: [], notes: {} };

function toggleLesson(l) {
    state.completed.includes(l) ? state.completed = state.completed.filter(i => i !== l) : state.completed.push(l);
    saveAndRender();
}

function saveNote(lesson, val) {
    state.notes[lesson] = val;
    localStorage.setItem('hubState', JSON.stringify(state));
}

function render(query = "") {
    const container = document.getElementById('course-list');
    container.innerHTML = curriculum.map(mod => {
        const filtered = mod.lessons.filter(l => l.toLowerCase().includes(query.toLowerCase()));
        if (filtered.length === 0) return "";
        return `
            <div class="ui-card">
                <h3>${mod.module}</h3>
                ${filtered.map(l => `
                    <div class="lesson-wrap">
                        <div class="lesson ${state.completed.includes(l) ? 'done' : ''}">
                            <span>${l}</span>
                            <button class="btn-secondary" onclick="toggleLesson('${l}')">${state.completed.includes(l) ? '✓' : 'Done'}</button>
                        </div>
                        <textarea class="ui-input note-box" placeholder="Take notes for ${l}..." onblur="saveNote('${l}', this.value)">${state.notes[l] || ''}</textarea>
                    </div>
                `).join('')}
            </div>`;
    }).join('');
    updateMetrics();
    renderPrompts();
}

function updateMetrics() {
    const total = curriculum.flatMap(m => m.lessons).length;
    const pct = total > 0 ? Math.round((state.completed.length / total) * 100) : 0;
    document.getElementById('progress-fill').style.width = pct + "%";
    document.getElementById('stats-text').innerText = pct + "% Optimization";
}

function saveAndRender() { localStorage.setItem('hubState', JSON.stringify(state)); render(document.getElementById('search').value); }

function savePrompt() {
    const n = document.getElementById('prompt-name'), b = document.getElementById('prompt-body');
    if(n.value && b.value) { state.prompts.push({n: n.value, b: b.value}); n.value = b.value = ''; saveAndRender(); }
}

function renderPrompts() {
    document.getElementById('saved-prompts').innerHTML = state.prompts.map((p, i) => `
        <div class="ui-card" style="margin-top:10px; border-left:4px solid var(--primary)">
            <strong>${p.n}</strong><p style="font-size:0.85rem">${p.b}</p>
            <button class="btn-secondary" style="font-size:0.7rem" onclick="state.prompts.splice(${i},1); saveAndRender();">Delete</button>
        </div>`).join('');
}

function exportData() {
    const a = document.createElement('a');
    a.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(state));
    a.download = 'hub-data.json'; a.click();
}

document.getElementById('search').oninput = (e) => render(e.target.value);
render();

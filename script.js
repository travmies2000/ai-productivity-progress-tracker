const curriculum = [
    { module: "Module 1: The AI Mindset Shift", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    { module: "Module 2: Advanced Prompting", lessons: ["The S.C.O.P.E. Framework", "Iterative Refinement"] },
    { module: "Module 3: Daily Workflow Automation", lessons: ["The Zero Inbox AI Assistant", "Meeting Mastery", "Content Repurposing"] },
    { module: "Module 4: The Toolbox", lessons: ["Data Analysis", "Visual Communication", "Research & Fact-Checking"] },
    { module: "Module 5: Building Systems", lessons: ["Custom Instructions", "The 15-Minute Weekly Audit"] }
];
let savedPrompts = JSON.parse(localStorage.getItem('myPrompts')) || [];

function render() {
    const container = document.getElementById('course-list');
    container.innerHTML = curriculum.map(mod => `
        <div class="ui-card">
            <h3>${mod.module}</h3>
            ${mod.lessons.map(l => `<div class="lesson"><span>${l}</span><button class="btn-secondary">View</button></div>`).join('')}
        </div>
    `).join('');
    renderPrompts();
}

function savePrompt() {
    const n = document.getElementById('prompt-name'), b = document.getElementById('prompt-body');
    if(n.value && b.value) {
        savedPrompts.push({n: n.value, b: b.value});
        localStorage.setItem('myPrompts', JSON.stringify(savedPrompts));
        n.value = b.value = '';
        render();
    }
}

function renderPrompts() {
    document.getElementById('saved-prompts').innerHTML = savedPrompts.map((p, i) => `
        <div class="ui-card" style="margin-top:1rem; border-left:5px solid var(--primary)">
            <strong>${p.n}</strong><p>${p.b}</p>
            <button class="btn-secondary" style="font-size:0.7rem; margin-top:10px" onclick="deletePrompt(${i})">Delete</button>
        </div>`).join('');
}

function deletePrompt(i) { savedPrompts.splice(i,1); localStorage.setItem('myPrompts', JSON.stringify(savedPrompts)); render(); }
function exportData() {
    const data = JSON.stringify(localStorage);
    const a = document.createElement('a');
    a.href = 'data:application/json,' + encodeURIComponent(data);
    a.download = 'hub-data.json'; a.click();
}
render();

const curriculum = [{module: "Strategic Foundation", lessons: ["Agentic AI Workflow", "Prompt Engineering Mastery"]}];
let savedPrompts = JSON.parse(localStorage.getItem('myPrompts')) || [];

function exportData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'hub-data.json'; a.click();
}

function render() {
    const container = document.getElementById('course-list');
    container.innerHTML = curriculum.map(mod => `
        <div class="ui-card">
            <h3>${mod.module}</h3>
            ${mod.lessons.map(l => `<div class="lesson"><span>${l}</span><button class="btn-secondary">View</button></div>`).join('')}
        </div>
    `).join('');
}
function savePrompt() {
    const n = document.getElementById('prompt-name'), b = document.getElementById('prompt-body');
    if(n.value && b.value) {
        savedPrompts.push({n: n.value, b: b.value});
        localStorage.setItem('myPrompts', JSON.stringify(savedPrompts));
        render();
    }
}
render();

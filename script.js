const curriculum = [{module: "Module 1: The AI Mindset", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy"]}];
let ratings = JSON.parse(localStorage.getItem('lessonRatings')) || {};
let timeSaved = JSON.parse(localStorage.getItem('timeSaved')) || {};
let savedPrompts = JSON.parse(localStorage.getItem('myPrompts')) || [];

function toggleFocusMode() { document.body.classList.toggle('focus-mode'); }
function render() {
    const container = document.getElementById('course-list');
    container.innerHTML = '';
    curriculum.forEach(mod => {
        container.innerHTML += `<h3>${mod.module}</h3>`;
        mod.lessons.forEach(l => {
            container.innerHTML += `<div class="lesson"><span>${l}</span><input type="number" class="ui-input" style="width:60px" value="${timeSaved[l]||0}" onchange="updateTime('${l}', this.value)"></div>`;
        });
    });
    renderPrompts();
}
function savePrompt() {
    const n = document.getElementById('prompt-name'), b = document.getElementById('prompt-body'), notes = document.getElementById('prompt-notes');
    if (n.value && b.value) { savedPrompts.push({n: n.value, b: b.value, notes: notes.value}); localStorage.setItem('myPrompts', JSON.stringify(savedPrompts)); n.value=b.value=notes.value=''; render(); }
}
function renderPrompts() { document.getElementById('saved-prompts').innerHTML = savedPrompts.map((p, i) => `<div class="ui-card" style="margin-top:1rem; border-left:5px solid var(--primary)"><strong>${p.n}</strong><p>${p.b}</p><small>${p.notes}</small><button class="btn-danger" style="margin-top:5px; padding:4px;" onclick="deletePrompt(${i})">Delete</button></div>`).join(''); }
function deletePrompt(i) { savedPrompts.splice(i,1); localStorage.setItem('myPrompts', JSON.stringify(savedPrompts)); render(); }
function updateTime(l,v) { timeSaved[l]=v; localStorage.setItem('timeSaved', JSON.stringify(timeSaved)); }
function resetWeeklyLog() { if(confirm("Reset all?")) { localStorage.clear(); location.reload(); } }
render();

const curriculum = [
    { module: "Module 1: The AI Mindset Shift", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    { module: "Module 2: Advanced Prompting for Non-Techies", lessons: ["The S.C.O.P.E. Framework", "Iterative Refinement"] },
    { module: "Module 3: Daily Workflow Automation", lessons: ["The Zero Inbox AI Assistant", "Meeting Mastery", "Content Repurposing"] },
    { module: "Module 4: The Professional’s AI Toolbox", lessons: ["Data Analysis for Non-Mathletes", "Visual Communication", "Research & Fact-Checking"] },
    { module: "Module 5: Building Your Personal AI System", lessons: ["Custom Instructions", "The 15-Minute Weekly Audit"] },
    { module: "Included Bonuses (The 'Value Stack')", lessons: ["The Professional AI Prompt Library", "The AI Tool Tracker", "The Human-Touch Checklist"] }
];
const resourceLinks = { "The Professional AI Prompt Library": "https://do-essential.net/b/prompt-library", "The AI Tool Tracker": "https://do-essential.net/b/tool-tracker", "The Human-Touch Checklist": "https://do-essential.net/b/human-touch" };

let ratings = JSON.parse(localStorage.getItem('lessonRatings')) || {};
let timeSaved = JSON.parse(localStorage.getItem('timeSaved')) || {};
let statusTags = JSON.parse(localStorage.getItem('statusTags')) || {};
let savedPrompts = JSON.parse(localStorage.getItem('myPrompts')) || [];

function toggleFocusMode() { document.body.classList.toggle('focus-mode'); }
function render() {
    const query = document.getElementById('search').value.toLowerCase();
    const container = document.getElementById('course-list');
    container.innerHTML = '';
    let totalLessons = 0, ratedLessons = 0, totalMins = 0;
    curriculum.forEach(mod => {
        let filtered = mod.lessons.filter(l => l.toLowerCase().includes(query));
        if (filtered.length === 0) return;
        container.innerHTML += `<h3>${mod.module}</h3>`;
        filtered.forEach(lesson => {
            totalLessons++;
            if ((ratings[lesson] || 0) > 0) ratedLessons++;
            totalMins += parseInt(timeSaved[lesson] || 0);
            const status = statusTags[lesson] || "Ready";
            const display = resourceLinks[lesson] ? `<a href="${resourceLinks[lesson]}" target="_blank" class="lesson-link">${lesson}</a>` : lesson;
            container.innerHTML += `
                <div class="lesson">
                    <div class="lesson-row"><span>${display}</span><button class="status-tag status-${status.toLowerCase().replace(' ', '-')}" onclick="toggleStatus('${lesson}')">${status}</button></div>
                    <div class="lesson-row"><input type="number" class="time-input" placeholder="Min" value="${timeSaved[lesson] || 0}" onchange="updateTime('${lesson}', this.value)">
                    <span class="stars">${[1,2,3,4,5].map(s => `<span class="${s <= (ratings[lesson] || 0) ? 'active' : ''}" onclick="rate('${lesson}', ${s})">★</span>`).join('')}</span></div>
                </div>`;
        });
    });
    document.getElementById('total-time').textContent = totalMins;
    document.getElementById('pct').textContent = totalLessons ? Math.round((ratedLessons / totalLessons) * 100) : 0;
    document.getElementById('progress-fill').style.width = (document.getElementById('pct').textContent) + '%';
    renderPrompts();
}
function savePrompt() {
    const n = document.getElementById('prompt-name'), b = document.getElementById('prompt-body'), notes = document.getElementById('prompt-notes');
    if (n.value && b.value) { savedPrompts.push({ n: n.value, b: b.value, notes: notes.value }); localStorage.setItem('myPrompts', JSON.stringify(savedPrompts)); n.value = b.value = notes.value = ''; render(); }
}
function renderPrompts() { document.getElementById('saved-prompts').innerHTML = savedPrompts.map((p, i) => `<div class="prompt-card"><strong>${p.n}</strong><p>${p.b}</p><small><em>Notes: ${p.notes}</em></small><button class="btn-danger" style="margin-top:8px; padding:4px;" onclick="deletePrompt(${i})">Delete</button></div>`).join(''); }
function deletePrompt(i) { savedPrompts.splice(i, 1); localStorage.setItem('myPrompts', JSON.stringify(savedPrompts)); render(); }
window.rate = (l, s) => { ratings[l] = s; localStorage.setItem('lessonRatings', JSON.stringify(ratings)); render(); };
window.updateTime = (l, v) => { timeSaved[l] = v; localStorage.setItem('timeSaved', JSON.stringify(timeSaved)); render(); };
window.toggleStatus = (l) => { const s = ["Ready", "In Progress", "Mastered"]; statusTags[l] = s[(s.indexOf(statusTags[l] || "Ready") + 1) % 3]; localStorage.setItem('statusTags', JSON.stringify(statusTags)); render(); };
function resetWeeklyLog() { if (confirm("Reset efficiency stats?")) { localStorage.clear(); location.reload(); } }
document.getElementById('export-btn').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify({ratings, timeSaved, savedPrompts}, null, 2)], {type: 'application/json'})); a.download = 'hub_log.json'; a.click(); };
document.getElementById('weekly-goals').onchange = (e) => localStorage.setItem('weeklyGoals', e.target.value);
document.getElementById('weekly-goals').value = localStorage.getItem('weeklyGoals') || "";
render();

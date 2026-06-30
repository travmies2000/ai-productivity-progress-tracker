const curriculum = [
    { module: "Module 1", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    { module: "Module 2", lessons: ["The S.C.O.P.E. Framework", "Iterative Refinement"] },
    { module: "Module 3", lessons: ["The Zero Inbox AI Assistant", "Meeting Mastery", "Content Repurposing"] },
    { module: "Module 4", lessons: ["Data Analysis for Non-Mathletes", "Visual Communication", "Research & Fact-Checking"] },
    { module: "Module 5", lessons: ["Custom Instructions", "The 15-Minute Weekly Audit"] },
    { module: "Bonus", lessons: ["The Professional AI Prompt Library", "The AI Tool Tracker", "The Human-Touch Checklist"] }
];

let ratings = JSON.parse(localStorage.getItem('lessonRatings')) || {};
let timeSaved = JSON.parse(localStorage.getItem('timeSaved')) || {};
let savedPrompts = JSON.parse(localStorage.getItem('myPrompts')) || [];

function render() {
    const container = document.getElementById('course-list');
    container.innerHTML = '';
    let totalLessons = 0, ratedLessons = 0, totalMins = 0;

    curriculum.forEach(mod => {
        container.innerHTML += `<h3>${mod.module}</h3>`;
        mod.lessons.forEach(lesson => {
            totalLessons++;
            const score = ratings[lesson] || 0;
            if (score > 0) ratedLessons++;
            const mins = timeSaved[lesson] || 0;
            totalMins += parseInt(mins);
            
            const div = document.createElement('div');
            div.className = 'lesson';
            div.innerHTML = `
                <div class="lesson-row">
                    <span>${lesson}</span>
                    <div>
                        <input type="number" class="time-input" placeholder="Min" value="${mins}" onchange="updateTime('${lesson}', this.value)">
                        <span class="stars">${[1,2,3,4,5].map(s => `<span class="${s <= score ? 'active' : ''}" onclick="rate('${lesson}', ${s})">★</span>`).join('')}</span>
                    </div>
                </div>`;
            container.appendChild(div);
        });
    });

    document.getElementById('total-time').textContent = totalMins;
    document.getElementById('progress-fill').style.width = Math.round((ratedLessons / totalLessons) * 100) + '%';
    document.getElementById('pct').textContent = Math.round((ratedLessons / totalLessons) * 100);
    renderPrompts();
}

window.rate = (lesson, score) => { ratings[lesson] = score; localStorage.setItem('lessonRatings', JSON.stringify(ratings)); render(); };
window.updateTime = (lesson, val) => { timeSaved[lesson] = val; localStorage.setItem('timeSaved', JSON.stringify(timeSaved)); render(); };

function savePrompt() {
    const name = document.getElementById('prompt-name').value;
    const body = document.getElementById('prompt-body').value;
    if(!name || !body) return alert("Enter name and prompt.");
    savedPrompts.push({name, body});
    localStorage.setItem('myPrompts', JSON.stringify(savedPrompts));
    render();
}

function renderPrompts() {
    document.getElementById('saved-prompts').innerHTML = savedPrompts.map(p => 
        `<div class="prompt-card"><strong>${p.name}</strong>: ${p.body}</div>`
    ).join('');
}

document.getElementById('export-btn').onclick = () => {
    const data = JSON.stringify({ratings, timeSaved, savedPrompts}, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'efficiency_hub_data.json'; a.click();
};

render();

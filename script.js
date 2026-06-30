const curriculum = [
    { module: "Module 1", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    { module: "Module 2", lessons: ["The S.C.O.P.E. Framework", "Iterative Refinement"] },
    { module: "Module 3", lessons: ["The Zero Inbox AI Assistant", "Meeting Mastery", "Content Repurposing"] },
    { module: "Module 4", lessons: ["Data Analysis for Non-Mathletes", "Visual Communication", "Research & Fact-Checking"] },
    { module: "Module 5", lessons: ["Custom Instructions", "The 15-Minute Weekly Audit"] },
    { module: "Bonus", lessons: ["The Professional AI Prompt Library", "The AI Tool Tracker", "The Human-Touch Checklist"] }
];

let ratings = JSON.parse(localStorage.getItem('lessonRatings')) || {};
const container = document.getElementById('course-list');

function render() {
    container.innerHTML = '';
    let totalLessons = 0;
    let ratedLessons = 0;

    curriculum.forEach(mod => {
        container.innerHTML += `<h3>${mod.module}</h3>`;
        mod.lessons.forEach(lesson => {
            totalLessons++;
            const score = ratings[lesson] || 0;
            if (score > 0) ratedLessons++;
            
            const div = document.createElement('div');
            div.className = 'lesson';
            div.innerHTML = `<span>${lesson}</span><div class="stars">${[1,2,3,4,5].map(s => 
                `<span class="${s <= score ? 'active' : ''}" onclick="rate('${lesson}', ${s})">★</span>`).join('')}</div>`;
            container.appendChild(div);
        });
    });

    const pct = Math.round((ratedLessons / totalLessons) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('pct').textContent = pct;
}

window.rate = (lesson, score) => {
    ratings[lesson] = score;
    localStorage.setItem('lessonRatings', JSON.stringify(ratings));
    render();
};

document.getElementById('export-btn').onclick = () => {
    const data = JSON.stringify(ratings, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'course_mastery.json'; a.click();
};

render();

const curriculum = [
    { module: "Module 1", lessons: ["The Augmented Professional Framework", "The Ethics of Accuracy", "Tool Selection"] },
    // ... (rest of curriculum)
];

// Mapping lessons/bonuses to their actual resource links
const resourceLinks = {
    "The Professional AI Prompt Library": "https://do-essential.net/b/prompt-library",
    "The AI Tool Tracker": "https://do-essential.net/b/tool-tracker",
    "The Human-Touch Checklist": "https://do-essential.net/b/human-touch"
};

function render() {
    const query = document.getElementById('search').value.toLowerCase();
    const container = document.getElementById('course-list');
    container.innerHTML = '';
    
    curriculum.forEach(mod => {
        let filtered = mod.lessons.filter(l => l.toLowerCase().includes(query));
        if (filtered.length === 0) return;
        
        container.innerHTML += `<h3>${mod.module}</h3>`;
        filtered.forEach(lesson => {
            const link = resourceLinks[lesson] ? resourceLinks[lesson] : "#";
            const display = resourceLinks[lesson] ? `<a href="${link}" target="_blank" class="lesson-link">${lesson}</a>` : lesson;
            
            // ... (rest of the lesson div construction using 'display')
            const div = document.createElement('div');
            div.className = 'lesson';
            div.innerHTML = `
                <div class="lesson-row">
                    <span>${display}</span>
                    <button class="status-tag status-${(statusTags[lesson] || "Ready").toLowerCase().replace(' ', '-')}" onclick="toggleStatus('${lesson}')">${statusTags[lesson] || "Ready"}</button>
                </div>
                <div class="lesson-row">
                    <input type="number" class="time-input" placeholder="Min" value="${timeSaved[lesson] || 0}" onchange="updateTime('${lesson}', this.value)">
                    <span class="stars">${[1,2,3,4,5].map(s => `<span class="${s <= (ratings[lesson] || 0) ? 'active' : ''}" onclick="rate('${lesson}', ${s})">★</span>`).join('')}</span>
                </div>`;
            container.appendChild(div);
        });
    });
}

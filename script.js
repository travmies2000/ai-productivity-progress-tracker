const courseData = [
    "Module 1: The AI Mindset Shift", "Module 2: Advanced Prompting", 
    "Module 3: Daily Workflow Automation", "Module 4: The Professional’s AI Toolbox", 
    "Module 5: Building Your Personal AI System", "Bonus: Value Stack"
];

let currentIndex = parseInt(localStorage.getItem('courseIdx')) || 0;
let assessments = JSON.parse(localStorage.getItem('assessments')) || {};

const title = document.getElementById('module-title');
const pct = document.getElementById('pct');
const fill = document.getElementById('progress-fill');
const area = document.getElementById('assessment');
const summary = document.getElementById('summary-container');

function updateUI() {
    if (currentIndex >= courseData.length) {
        title.textContent = "Course Complete!";
        area.style.display = 'none';
        summary.innerHTML = "<h3>Reflective Journal Summary:</h3>" + 
            Object.entries(assessments).map(([k, v]) => `<strong>${courseData[k]}</strong>: <p>${v}</p>`).join('<hr>');
        return;
    }
    title.textContent = courseData[currentIndex];
    area.value = assessments[currentIndex] || "";
    const p = Math.round((currentIndex / courseData.length) * 100);
    fill.style.width = p + '%';
    pct.textContent = p;
}

document.getElementById('next-btn').onclick = () => {
    if (area.value.length < 20) return alert("Please provide a meaningful entry (at least 20 characters).");
    assessments[currentIndex] = area.value;
    localStorage.setItem('assessments', JSON.stringify(assessments));
    currentIndex++;
    localStorage.setItem('courseIdx', currentIndex);
    updateUI();
};

document.getElementById('export-btn').onclick = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assessments, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_ai_productivity_log.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

updateUI();

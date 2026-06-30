const tasks = [
    "Module 1: The AI Mindset Shift",
    "Module 2: Advanced Prompting (S.C.O.P.E. Framework)",
    "Module 3: Daily Workflow Automation",
    "Module 4: The Professional’s AI Toolbox",
    "Module 5: Building Your Personal AI System",
    "Bonus: Professional AI Prompt Library",
    "Bonus: AI Tool Tracker",
    "Bonus: The Human-Touch Checklist"
];

const list = document.getElementById('task-list');
const fill = document.getElementById('progress-fill');
let completedTasks = JSON.parse(localStorage.getItem('aiProgress')) || [];

function updateUI() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        if (completedTasks.includes(index)) li.className = 'done';
        
        li.onclick = () => {
            if (completedTasks.includes(index)) {
                completedTasks = completedTasks.filter(i => i !== index);
            } else {
                completedTasks.push(index);
            }
            localStorage.setItem('aiProgress', JSON.stringify(completedTasks));
            updateUI();
        };
        list.appendChild(li);
    });
    
    const pct = Math.round((completedTasks.length / tasks.length) * 100);
    fill.style.width = pct + '%';
    fill.textContent = pct + '%';
}

updateUI();

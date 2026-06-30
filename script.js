const tasks = [
    "Introduction to AI Productivity",
    "Communication Management Tools",
    "Research and Analysis Automation",
    "Workflow Integration & APIs",
    "Scheduling & Focus Time Optimization"
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

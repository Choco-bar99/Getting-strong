document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task');
    const taskBody = document.getElementById('task-body');
    const overallBar = document.getElementById('overall-bar');
    const overallPercent = document.getElementById('overall-percent');
    const totalHabits = document.getElementById('total-habits');
    const completedCount = document.getElementById('completed-count');
    const leftCount = document.getElementById('left-count');
    const dailyBars = document.getElementById('daily-bars');
    const topHabits = document.getElementById('top-habits');
    const summaryCopy = document.getElementById('summary-copy');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        { name: '早起40分鐘', days: [false, false, false, false, false, false, false] },
        { name: '運動30分鐘', days: [false, false, false, false, false, false, false] },
        { name: '閱讀20頁', days: [false, false, false, false, false, false, false] }
    ];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTotals() {
        const totalCells = tasks.length * 7;
        const checkedCells = tasks.reduce((sum, task) => sum + task.days.filter(Boolean).length, 0);
        return { totalCells, checkedCells, percent: totalCells ? Math.round((checkedCells / totalCells) * 100) : 0 };
    }

    function getDailyPercentages() {
        const daily = Array(7).fill(0);
        tasks.forEach(task => {
            task.days.forEach((done, i) => {
                if (done) daily[i] += 1;
            });
        });
        return daily.map(value => tasks.length ? Math.round((value / tasks.length) * 100) : 0);
    }

    function getTopHabits() {
        return tasks
            .map(task => ({
                name: task.name,
                score: Math.round((task.days.filter(Boolean).length / 7) * 100)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }

    function updateSummary() {
        const totals = getTotals();
        overallBar.style.width = totals.percent + '%';
        overallPercent.textContent = totals.percent + '%';
        totalHabits.textContent = tasks.length;
        completedCount.textContent = totals.checkedCells;
        leftCount.textContent = totals.totalCells - totals.checkedCells;

        const daily = getDailyPercentages();
        dailyBars.innerHTML = daily.map((percent, index) => {
            const names = ['週一','週二','週三','週四','週五','週六','週日'];
            return `
                <div class="daily-row">
                    <span class="daily-label">${names[index]}</span>
                    <div class="daily-track"><div class="daily-track-fill" style="width:${percent}%"></div></div>
                    <span>${percent}%</span>
                </div>`;
        }).join('');

        const top = getTopHabits();
        topHabits.innerHTML = top.map(item => `
            <div class="habit-item">
                <span>${item.name}</span>
                <strong>${item.score}%</strong>
            </div>`).join('');

        if (!tasks.length) {
            summaryCopy.textContent = '目前尚無任務，請新增你的第一個自律項目。';
        } else if (totals.percent >= 85) {
            summaryCopy.textContent = '狀態良好！保持這個節奏，本週自律達成率很高。';
        } else if (totals.percent >= 50) {
            summaryCopy.textContent = '進展穩定，持續填滿每一天的勾選格。';
        } else {
            summaryCopy.textContent = '本週才剛起步，試著先鎖定 1~2 個習慣連續完成。';
        }
    }

    function createTaskRow(task, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        nameCell.className = 'task-name';
        row.appendChild(nameCell);

        for (let i = 0; i < 7; i += 1) {
            const cell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.days[i];
            checkbox.addEventListener('change', function() {
                tasks[index].days[i] = this.checked;
                saveTasks();
                render();
            });
            cell.appendChild(checkbox);
            row.appendChild(cell);
        }

        const removeCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.className = 'delete-btn';
        removeBtn.addEventListener('click', function() {
            tasks.splice(index, 1);
            saveTasks();
            render();
        });
        removeCell.appendChild(removeBtn);
        row.appendChild(removeCell);

        return row;
    }

    function render() {
        taskBody.innerHTML = '';
        tasks.forEach((task, index) => taskBody.appendChild(createTaskRow(task, index)));
        updateSummary();
    }

    addTaskBtn.addEventListener('click', function() {
        const taskName = prompt('輸入任務名稱：');
        if (taskName && taskName.trim()) {
            tasks.push({ name: taskName.trim(), days: [false, false, false, false, false, false, false] });
            saveTasks();
            render();
        }
    });

    render();
});
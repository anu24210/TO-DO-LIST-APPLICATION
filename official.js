let officialTasks = JSON.parse(localStorage.getItem("officialTasks")) || [];

function addTask(taskType) {
    const input = document.getElementById(taskType + "-task");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    officialTasks.push(task);
    localStorage.setItem("officialTasks", JSON.stringify(officialTasks));
    showTasks();
    input.value = "";
}

function deleteTask(id) {
    officialTasks = officialTasks.filter(task => task.id !== id);
    localStorage.setItem("officialTasks", JSON.stringify(officialTasks));
    showTasks();
}

function toggleTaskStatus(id) {
    officialTasks = officialTasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("officialTasks", JSON.stringify(officialTasks));
    showTasks();
}

function showTasks() {
    const list = document.getElementById("official-list");
    list.innerHTML = "";

    officialTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskStatus(task.id));

        const taskText = document.createElement("p");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => editTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        list.appendChild(taskItem);
    });
}

function editTask(id) {
    const taskTextElement = document.querySelector(`#official-list li.task[data-id="${id}"] p`);
    const newText = prompt("Edit Task", taskTextElement.textContent);
    if (newText !== null) {
        const taskIndex = officialTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            officialTasks[taskIndex].text = newText;
            localStorage.setItem("officialTasks", JSON.stringify(officialTasks));
            showTasks();
        }
    }
}

showTasks();

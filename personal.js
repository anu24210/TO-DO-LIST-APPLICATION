let personalTasks = JSON.parse(localStorage.getItem("personalTasks")) || [];

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

    personalTasks.push(task);
    localStorage.setItem("personalTasks", JSON.stringify(personalTasks));
    showTasks();
    input.value = "";
}

function deleteTask(id) {
    personalTasks = personalTasks.filter(task => task.id !== id);
    localStorage.setItem("personalTasks", JSON.stringify(personalTasks));
    showTasks();
}

function toggleTaskStatus(id) {
    personalTasks = personalTasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("personalTasks", JSON.stringify(personalTasks));
    showTasks();
}

function showTasks() {
    const list = document.getElementById("personal-list");
    list.innerHTML = "";

    personalTasks.forEach(task => {
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
    const taskTextElement = document.querySelector(`#personal-list li.task[data-id="${id}"] p`);
    const newText = prompt("Edit Task", taskTextElement.textContent);
    if (newText !== null) {
        const taskIndex = personalTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            personalTasks[taskIndex].text = newText;
            localStorage.setItem("personalTasks", JSON.stringify(personalTasks));
            showTasks();
        }
    }
}

showTasks();

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const saveButton = document.getElementById("save-name");
    const userNameInput = document.getElementById("modal-user-name");
    // Get the user's name from localStorage or prompt if not found
    let user = localStorage.getItem("user");



    saveButton.addEventListener("click", () => {
        user = userNameInput.value.trim() || "User";
        localStorage.setItem("user", user); // Store the user name in localStorage
        document.getElementById('User').innerText = `Welcome Back, ${user}!`;
        document.getElementById("user-modal").style.display = "none"; // Close the modal
    });

    if (user == 'null' || user == null || user == "" || user == 'User') {
        document.getElementById("user-modal").style.display = "flex"; // Show modal if no user
    } else {
        document.getElementById('User').innerText = `Welcome Back, ${user}!`;
    }

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = ""; // Clear the current task list
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task";

            // Task details
            const taskDetails = document.createElement("div");
            taskDetails.className = "task-details";
            taskDetails.innerHTML = `
                <strong>${task.name}</strong>
                <small>${task.dueDate} - ${task.category}</small>
            `;

            // Task actions
            const taskActions = document.createElement("div");
            taskActions.className = "task-actions";

            // Edit button
            const editButton = document.createElement("button");
            editButton.className = "edit";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(index));

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(index));

            // Append buttons to task actions
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            // Append details and actions to task item
            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskActions);

            // Append task item to the task list
            taskList.appendChild(taskItem);
        });
    };

    const addTask = (task) => {
        tasks.push(task);
        saveTasks();
        renderTasks();
    };

    const editTask = (index) => {
        const task = tasks[index];
        document.getElementById("task-name").value = task.name;
        document.getElementById("task-date").value = task.dueDate;
        document.getElementById("task-category").value = task.category;
        deleteTask(index); // Remove task to allow re-adding
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("task-name").value.trim();
        const dueDate =
            document.getElementById("task-date").value || getCurrentDate();
        const category = document.getElementById("task-category").value;

        if (name && category) {
            addTask({ name, dueDate, category });
            taskForm.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });

    renderTasks(); // Initial rendering of tasks
});

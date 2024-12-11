
const menu = document.getElementById("project-list");
let isCreating = false;

export default class InterfaceManager {
    constructor() {

    }

    init(projectManager) {
        const buttonCreate = document.getElementById("btn-add-project");
        buttonCreate.addEventListener("click", (e) => {
            if (!isCreating) {
                this.createProject(projectManager);
            }
        });
    }

    buildInterface(projectManager) {
        const listOfProjects = projectManager.getListOfProjects();
        for (const project of listOfProjects) {
            this.buildProjectButton(project);
        }
    }

    buildProjectButton(project) {
        const buttonProject = document.createElement("button");
        buttonProject.classList.add("button-project");
        buttonProject.textContent = project.name;

        buttonProject.addEventListener("click", (e) => {
            document.getElementById("toolbar").textContent = '';
            document.getElementById("task-list").textContent = '';
            this.buildTaskInterface(project);
            this.buildTasks(project);

            const allButons = document.getElementsByClassName("active-project");
            for (let button of allButons) {
                button.classList.remove("active-project");
                button.classList.add("button-project");
            }

            buttonProject.classList.add("active-project");
            buttonProject.classList.remove("button-project");
        });

        menu.appendChild(buttonProject);
    }

    buildTaskInterface(project) {
        const header = document.getElementById("task-list-title");
        header.textContent = `List of tasks - ${project.name}`;

        const toolbar = document.getElementById("toolbar");

        const removeProject = document.createElement("button");
        removeProject.classList.add("remove-project");
        removeProject.textContent = "Remove this project";
        removeProject.addEventListener("click", (e) => {
            console.log("delete");
        });

        const addTask = document.createElement("button");
        addTask.classList.add("add-task");
        addTask.textContent = "Add a task to this project";

        toolbar.appendChild(removeProject);
        toolbar.appendChild(addTask);
    }

    buildTasks(project) {
        const content = document.getElementById("task-list");

        const listOfTasks = project.getListOfTasks();

        if (listOfTasks.length === 0) {
            const taskArea = document.createElement("div");
            taskArea.classList.add("task-area");
            taskArea.style.textAlign = "center";
            taskArea.textContent = "This project doesn't have any task yet.";
            content.appendChild(taskArea);
            return;
        }
        for (const task of listOfTasks) {
            const taskArea = document.createElement("div");
            taskArea.classList.add("task-area");

            const title = document.createElement("p");
            title.classList.add("task-name");
            title.textContent = task.name;

            const description = document.createElement("p");
            description.classList.add("task-description");
            description.textContent = task.description;

            taskArea.appendChild(title);
            taskArea.appendChild(description);
            content.appendChild(taskArea);
        }
    }

    createProject(projectManager) {
        isCreating = true;
        const inputField = document.createElement("input");
        inputField.classList.add("button-project");
        menu.appendChild(inputField);
        inputField.focus();
        inputField.placeholder = "Press Enter to validate or click anywhere to cancel";

        inputField.addEventListener("keydown", (e) => {
            if(e.code === "Enter") {
                if (inputField.value != "") {
                    const newProject = projectManager.createProject(inputField.value);
                    inputField.hidden = true;
                    this.buildProjectButton(newProject);
                    isCreating = false;
                }
            }
        });
        
        inputField.addEventListener("focusout", (e) => {
            menu.removeChild(inputField);
            isCreating = false;
        });
    }
}
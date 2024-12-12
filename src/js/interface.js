
const menu = document.getElementById("project-list");
const header = document.getElementById("task-list-title");
let isCreating = false;

export default class InterfaceManager {
    constructor(projectManager) {
        this.projectManager = projectManager;
    }

    init() {
        const buttonCreate = document.getElementById("btn-add-project");
        buttonCreate.addEventListener("click", (e) => {
            if (!isCreating) {
                this.createProject();
            }
        });
    }

    buildInterface() {
        const listOfProjects = this.projectManager.getListOfProjects();
        for (const project of listOfProjects) {
            this.buildProjectButton(project);
        }
    }

    buildProjectButton(project) {
        const buttonProject = document.createElement("button");
        buttonProject.classList.add("button-project");
        buttonProject.textContent = project.name;

        buttonProject.addEventListener("click", (e) => {
            this.resetInterface(project);

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
        header.textContent = `List of tasks - ${project.name}`;

        const toolbar = document.getElementById("toolbar");

        const removeProject = document.createElement("button");
        removeProject.classList.add("remove-project");
        removeProject.textContent = "Remove this project";
        removeProject.addEventListener("click", (e) => {
            if (project.getListOfTasks().length != 0) {
                if (confirm("This project contains tasks.\nAre you sure you want to delete it?")) {
                    this.deleteProject(project);
                }
            } else {
                this.deleteProject(project);
            }
        });

        const addTask = document.createElement("button");
        addTask.classList.add("add-task");
        addTask.textContent = "Add a task to this project";
        addTask.addEventListener("click", (e) => {
            project.createTask("a", "b", 0, true);
            this.resetInterface(project);
        });

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

    createProject() {
        isCreating = true;
        const inputField = document.createElement("input");
        inputField.classList.add("button-project");
        menu.appendChild(inputField);
        inputField.focus();
        inputField.placeholder = "Press Enter to validate or click anywhere to cancel";

        inputField.addEventListener("keydown", (e) => {
            if(e.code === "Enter") {
                if (inputField.value != "") {
                    const newProject = this.projectManager.createProject(inputField.value);
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

    resetInterface(project) {
        document.getElementById("project-list").textContent = '';
        header.textContent = `List of tasks`;
        document.getElementById("toolbar").textContent = '';
        document.getElementById("task-list").textContent = '';

        this.buildInterface();
        if (project !== null) {
            this.buildTaskInterface(project);
            this.buildTasks(project);
        }
    }

    deleteProject(project) {
        this.projectManager.deleteProject(project);
        this.resetInterface(null);
    }
}

import ProjectManager from "./project";

export default class InterfaceManager {
    constructor() {

    }

    buildInterface(projectManager) {
        const menu = document.getElementById("project-list");

        const listOfProjects = projectManager.getListOfProjects();
        for (const project of listOfProjects) {
            const buttonProject = document.createElement("button");
            buttonProject.classList.add("button-project");
            buttonProject.textContent = project.name;

            buttonProject.addEventListener("click", (e) => {
                document.getElementById("task-list").textContent = '';
                this.buildTasks(project);
            });

            menu.appendChild(buttonProject);
        }
    }

    buildTasks(project) {
        const content = document.getElementById("task-list");

        const listOfTasks = project.getListOfTasks();
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
}
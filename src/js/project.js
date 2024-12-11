
import TaskManager from "./task";

export default class ProjectManager {
    constructor() {
        this.listOfProjects = [];
    }

    createProject(name) {
        const project = new Project(name);
        this.listOfProjects.push(project);
        
        return project;
    }

    getListOfProjects() {
        return this.listOfProjects;
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.taskManager = new TaskManager;
    }

    // This is just a shortcut, I don't know how to make that more elegant...
    createTask(name, description, dueDate, isUrgent) {
        this.taskManager.createTask(name, description, dueDate, isUrgent);
    }

    getListOfTasks() {
        return this.taskManager.getListOfTasks();
    }
}
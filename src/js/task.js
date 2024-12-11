
export default class TaskManager {
    constructor() {
        this.listOfTasks = [];
    }

    createTask(name, description, dueDate, isUrgent) {
        const task = new Task(name, description, dueDate, isUrgent);
        this.listOfTasks.push(task);
        return task;
    }

    getListOfTasks() {
        return this.listOfTasks;
    }
}

export class Task {
    constructor(name, description, dueDate, isUrgent) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent;
        this.isDone = false;
    }
}
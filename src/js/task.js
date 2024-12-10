function createNewTask (title, description, dueDate, isImportant) {
    let isDone = false;
    return { title, description, dueDate, isImportant, isDone};
}

export { createNewTask };
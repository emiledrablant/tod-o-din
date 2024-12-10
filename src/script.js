
import "./style.css";
import { createNewProject } from "./js/project";
import { createNewTask } from "./js/task";

let project1 = createNewProject();

project1.listOfTasks.push(createNewTask("Testo", "descriptionado", 11, false));

console.log(project1.listOfTasks[0]);

import "./style.css";
import InterfaceManager from "./js/interface";
import ProjectManager from "./js/project";

const interfaceManager = new InterfaceManager;
const projectManager = new ProjectManager;
const testo = projectManager.createProject("Testo");
const bongo = projectManager.createProject("Bongo");

testo.createTask("Faire les courses", "Aller au supermarché", 55, true);
testo.createTask("Lessive", "Bien séparer les blancs de la couleur", 11, false);
bongo.createTask("ca", "fsd", 55, false);

interfaceManager.buildInterface(projectManager);
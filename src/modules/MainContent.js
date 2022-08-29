import Task from "./Task.js"
import {format, parseISO, getDayOfYear, getWeekOfMonth} from "date-fns"
import Project from "./Project.js";

let list = [];
let projectList = [];
export default class MainContent {

    static loadHomepage() {
        const header = document.createElement("h1");
        const addButton = document.createElement("button");
        const titleArea = document.querySelector(".titleArea");
        const todayButton = document.querySelector("#todayButton");
        const inboxButton = document.querySelector("#inboxButton");
        const weekButton = document.querySelector("#weekButton");
        const projectButton = document.querySelector("#projectButton");

        header.textContent = "pro";
        addButton.textContent = "Add proj";
        addButton.classList.add("addButton");
        
        addButton.addEventListener("click", () => {
            MainContent.handleButtonClick();
        });
        titleArea.appendChild(header);
        titleArea.appendChild(addButton);

        todayButton.addEventListener("click",(MainContent.displayToday));
        inboxButton.addEventListener("click", (MainContent.displayAllDay));
        weekButton.addEventListener("click", (MainContent.displayWeek));
        projectButton.addEventListener("click", (MainContent.handleProjectClick));
    }

    static handleProjectClick() {
        projectList.push(MainContent.createProject(MainContent.getInput("project")));
        console.log(projectList);
        MainContent.updateProjectList();
    }

    static updateProjectList() {
        MainContent.clearProjectButtons();
        for (const selectedProject of projectList) {
            MainContent.createProjectButton(selectedProject);
        }
    }

    static createProjectButton(selectedProject) {
        const listArea = document.querySelector(".projectListArea");
        const projectButton = document.createElement("button");
        
        projectButton.textContent = selectedProject.getName();

        listArea.appendChild(projectButton);
    }

    static createProject(input) {
        return new Project(input)
    }

    static handleButtonClick() {
        list.push(MainContent.createTask(MainContent.getInput("task")));//create task and push to list and get input
        MainContent.displayAllDay();//refresh and update
    }

    static clearProjectButtons() {
        const listArea = document.querySelector(".projectListArea");
        listArea.innerHTML = "";
    }

    static createTask(input) {
        return new Task(input, MainContent.fetchCurrentDate())
    }

    static getInput(typeOfInput) {
        let taskName = prompt("enter "+ typeOfInput);
        return taskName
    }

    static displayAllDay() {
        MainContent.clearListArea();
        for (const selectedTask of list) {
            MainContent.displayToPage(selectedTask);
        }
    }

    static displayWeek() {
        MainContent.clearListArea();
        for (const selectedTask of list) {
            let d = parseISO(selectedTask.getDate());
            let now = parseISO(MainContent.fetchCurrentDate());
            if(getWeekOfMonth(d) === getWeekOfMonth(now)) {
                MainContent.displayToPage(selectedTask);
            }
        }
    }
    static displayToday() {
        MainContent.clearListArea();
        for (const selectedTask of list) {
            let d = parseISO(selectedTask.getDate());
            let now = parseISO(MainContent.fetchCurrentDate());
            if(getDayOfYear(d) === getDayOfYear(now)) {
                MainContent.displayToPage(selectedTask);
            }
        }
    }

    static displayToPage(task) {
        const listArea = document.querySelector(".listArea");
        const taskText = document.createElement("p");
        const taskItem = document.createElement("div");
        const nameArea = document.createElement("div");
        const editArea = document.createElement("div");
        const closeButton = document.createElement("button");
        const inputDate = document.createElement("input");

        taskItem.classList.add("taskItem");
        nameArea.classList.add("nameArea");
        editArea.classList.add("editArea");
        listArea.appendChild(taskItem);
        taskItem.appendChild(nameArea);
        taskItem.appendChild(editArea);
        taskText.textContent = task.getName();

        closeButton.addEventListener("click", () => {
            MainContent.deleteItem(task);
        });
        closeButton.textContent = "Delete";

        
        inputDate.type = "date";
        inputDate.value = task.getDate();
        inputDate.addEventListener("change", () => {
            task.setDate(inputDate.value);
        });

        nameArea.appendChild(taskText);
        editArea.appendChild(closeButton);
        editArea.appendChild(inputDate);
        //TODO:
        //by next projy
        //in a day style
        console.log(list);
    }

    static clearListArea() {
        const listArea = document.querySelector(".listArea");
        listArea.innerHTML = "";
    }

    static deleteItem(task) {
        let index = list.indexOf(task);
        list.splice(index, 1);
        MainContent.displayAllDay();
    }

    static fetchCurrentDate() {
        const d = new Date();
        const dateFormat = format(d, "yyyy-MM-d");
        return dateFormat
    }
}
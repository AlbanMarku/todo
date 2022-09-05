import Task from "./Task.js"
import Project from "./Project.js";
import Storage from "./Storage.js";
import {format, parseISO, getDayOfYear, getWeekOfMonth} from "date-fns"
import { ta } from "date-fns/locale";

let list = Storage.getTaskList();
let projectList = Storage.getProjectList();
//TODO: update changes to stor.
export default class MainContent {

    static loadHomepage(text) { // This loads the homepage.
        const header = document.createElement("h1");
        const addButton = document.createElement("button");
        const titleArea = document.querySelector(".titleArea");
        const todayButton = document.querySelector("#todayButton");
        const inboxButton = document.querySelector("#inboxButton");
        const weekButton = document.querySelector("#weekButton");
        const projectButton = document.querySelector("#projectButton");
    
        header.textContent = text;

        addButton.textContent = "Add task";
        addButton.classList.add("addButton");
        
        addButton.addEventListener("click", () => {
            list.push(MainContent.createTask(MainContent.getInput("task")));//create task and push to list and get input
            Storage.saveTaskList(list);
            MainContent.displayAllDay();//refresh and update
        });

        titleArea.appendChild(header);
        titleArea.appendChild(addButton);

        todayButton.addEventListener("click",(MainContent.displayToday));
        inboxButton.addEventListener("click", (MainContent.displayAllDay));
        weekButton.addEventListener("click", (MainContent.displayWeek));
        projectButton.addEventListener("click",(MainContent.handleProjectButton));

        MainContent.refreshNav();
    }

    static handleProjectButton() {
        projectList.push(MainContent.createProject("yo"));
        Storage.saveProjectList(projectList);
        MainContent.refreshNav();
    }

    static refreshNav() {
        MainContent.clearProjectButtons();
        for (const selectedProject of projectList) {
            MainContent.createProjectButton(selectedProject);
        }
    }

    static createProjectButton(selectedProject) {
        const listArea = document.querySelector(".projectListArea");
        const projectButton = document.createElement("button");
        
        projectButton.textContent = selectedProject.getName();
        projectButton.addEventListener("click",() => {
            MainContent.clearListArea();
            MainContent.clearTitleArea();
            MainContent.projectPage(selectedProject);
        });

        listArea.appendChild(projectButton);
    }

    static createProject(input) {
        return new Project(input)
    }

    static projectPage(selectedProject) {
        const titleArea = document.querySelector(".titleArea");
        const projectTitle = document.createElement("h1");
        const buttonArea = document.createElement("div");
        const newProjectTaskButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        projectTitle.textContent = "Project: "+ selectedProject.getName();
        newProjectTaskButton.textContent = "new proj task";
        deleteButton.textContent = "Delete";

        MainContent.updateTaskProjects(selectedProject);
        newProjectTaskButton.addEventListener("click",() => {
            selectedProject.addTask(MainContent.createTask(MainContent.getInput("project task")));
            Storage.saveProjectList(projectList);
            MainContent.updateTaskProjects(selectedProject);
        });

        deleteButton.addEventListener("click",()=>{
            MainContent.deleteProject(selectedProject);
        });

        titleArea.appendChild(projectTitle);
        titleArea.appendChild(buttonArea);
        buttonArea.appendChild(newProjectTaskButton);
        buttonArea.appendChild(deleteButton);
    }

    static updateTaskProjects(selectedProject) { // Probs don't need a sperate method just for proj tasks.
        MainContent.clearListArea();
        for (const selectedTask of Storage.getProjTasks(selectedProject)) {
            MainContent.displayToPage(selectedTask);
        }
    }

    static clearProjectButtons() {
        const listArea = document.querySelector(".projectListArea");
        listArea.innerHTML = "";
    }

    static clearTitleArea() {
        const titleArea = document.querySelector(".titleArea");
        titleArea.innerHTML = "";
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
        MainContent.clearTitleArea();
        MainContent.loadHomepage("Inbox");
        for (const selectedTask of list) {
            MainContent.displayToPage(selectedTask);
        }

        for (const selectedProject of projectList) {
            for (const task of Storage.getProjTasks(selectedProject)) {
                MainContent.displayToPage(task, selectedProject.getName());
            }
            
        }
    }

    static displayWeek() {
        MainContent.clearListArea();
        MainContent.clearTitleArea();
        MainContent.loadHomepage("This week");        
        for (const selectedTask of list) {
            let d = parseISO(selectedTask.getDate());
            let now = parseISO(MainContent.fetchCurrentDate());
            if(getWeekOfMonth(d) === getWeekOfMonth(now)) {
                MainContent.displayToPage(selectedTask);
            }
        }

        for (const selectedProject of projectList) {
            for (const task of Storage.getProjTasks(selectedProject)) {
                let d = parseISO(task.getDate());
                let now = parseISO(MainContent.fetchCurrentDate());
                if(getWeekOfMonth(d) === getWeekOfMonth(now)) {
                    MainContent.displayToPage(task, selectedProject.getName());
                }
            }
        }
    }
    static displayToday() {
        MainContent.clearListArea();
        MainContent.clearTitleArea();
        MainContent.loadHomepage("Today");        
        for (const selectedTask of list) {
            let d = parseISO(selectedTask.getDate());
            let now = parseISO(MainContent.fetchCurrentDate());
            if(getDayOfYear(d) === getDayOfYear(now)) {
                MainContent.displayToPage(selectedTask);
            }
        }

        for (const selectedProject of projectList) {
            for (const task of Storage.getProjTasks(selectedProject)) {
                let d = parseISO(task.getDate());
                let now = parseISO(MainContent.fetchCurrentDate());
                if(getDayOfYear(d) === getDayOfYear(now)) {
                    MainContent.displayToPage(task, selectedProject.getName());
                }
            }
        }
    }

    static displayToPage(task, projectName) {
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
            Storage.saveTaskList(list);
        });
        if (projectName != undefined) {
            const projectNameText = document.createElement("p");
            projectNameText.textContent = "Project: " + projectName;
            nameArea.appendChild(projectNameText);
        }

        nameArea.appendChild(taskText);
        editArea.appendChild(closeButton);
        editArea.appendChild(inputDate);
    }

    static clearListArea() {
        const listArea = document.querySelector(".listArea");
        listArea.innerHTML = "";
    }

    static deleteItem(task) {
        let index = list.indexOf(task);
        console.log(index);
        if (index === -1) {
            for (const project of projectList) {
                let pIndex = project.getTasks().indexOf(task);
                project.getTasks().splice(pIndex, 1);
                project.deleteTask(task.getName());
            }
        } else {
            list.splice(index, 1);
            Storage.saveTaskList(list);
        }

        MainContent.displayAllDay();
    }

    static deleteProject(selectedProject) {
        let index = projectList.indexOf(selectedProject);
        projectList.splice(index ,1);
        MainContent.displayAllDay();
        MainContent.refreshNav();
    }

    static fetchCurrentDate() {
        const d = new Date();
        const dateFormat = format(d, "yyyy-MM-dd");
        return dateFormat
    }
}
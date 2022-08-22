import Task from "./Task.js"

let list = [];
export default class MainContent {

    static loadHomepage() {
        const header = document.createElement("h1");
        const addButton = document.createElement("button");
        const titleArea = document.querySelector(".titleArea");

        header.textContent = "pro";
        addButton.textContent = "Add proj";
        addButton.classList.add("addButton");
        
        addButton.addEventListener("click", () => {
            MainContent.handleButtonClick();
        });
        titleArea.appendChild(header);
        titleArea.appendChild(addButton);
    }

    static handleButtonClick() {
        list.push(MainContent.createTask(MainContent.getInput()));//create task and push to list and get input
        console.log(list);
        MainContent.refreshPage();//refresh and update
    }

    static createTask(input) {
        return new Task(input)
    }

    static getInput() {
        let taskName = prompt("enter task");
        return taskName
    }

    static refreshPage() {
        MainContent.clearListArea();
        for (const selectedTask of list) {
            MainContent.displayToPage(selectedTask)
        }
    }

    static displayToPage(task) {
        const listArea = document.querySelector(".listArea");
        const p = document.createElement("p");
        const div = document.createElement("div");
        const closeButton = document.createElement("button");

        listArea.appendChild(div);
        p.textContent = task.name;

        closeButton.addEventListener("click", () => {
            MainContent.deleteItemm(task);
        });
        closeButton.textContent = "Delete";

        div.appendChild(p);
        div.appendChild(closeButton);
    }

    static clearListArea() {
        const listArea = document.querySelector(".listArea");
        listArea.innerHTML = "";
    }

    static deleteItemm(task) {
        let index = list.indexOf(task);
        list.splice(index, 1);
        this.refreshPage();
    }
}
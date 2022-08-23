import Task from "./Task.js"
import {format} from "date-fns"

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
        MainContent.refreshPage();//refresh and update
    }

    static createTask(input) {
        return new Task(input, MainContent.fetchCurrentDate())
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
            MainContent.deleteItemm(task);
        });
        closeButton.textContent = "Delete";

        task.setDate(MainContent.fetchCurrentDate());
        console.log(task);
        inputDate.type = "date";
        inputDate.value = task.getDate();//def displayed value.
        inputDate.addEventListener("change", () => {
            task.setDate(inputDate.value);
            console.log(list);
        });

        nameArea.appendChild(taskText);
        editArea.appendChild(closeButton);
        editArea.appendChild(inputDate);
        //TODO: Filter by date.
    }

    static clearListArea() {
        const listArea = document.querySelector(".listArea");
        listArea.innerHTML = "";
    }

    static deleteItemm(task) {
        let index = list.indexOf(task);
        list.splice(index, 1);
        MainContent.refreshPage();
    }

    static fetchCurrentDate() {
        const d = new Date();
        const dateFormat = format(d, "yyyy-MM-d");
        console.log(dateFormat);
        return dateFormat
    }
}
import Task from "./Task.js"

let list = [];
export default class MainContent {

    static loadHomepage() {
        const header = document.createElement("h1");
        const addButton = document.createElement("button");
        const titleArea = document.querySelector(".titleArea");

        header.textContent = "pro";
        addButton.textContent = "Add proj";
        
        addButton.addEventListener("click", () => {
            list.push(MainContent.createTask());
            console.log(list);
            MainContent.refreshPage();
        });
        titleArea.appendChild(header);
        titleArea.appendChild(addButton);
    }

    static createTask() {
        console.log("created");
        return new Task("biblio")
    }

    static refreshPage() {
        const listArea = document.querySelector(".listArea");
        listArea.innerHTML = "";
        for (const selectedTask of list) {
            MainContent.displayToPage(selectedTask)
        }
    }

    static displayToPage(task) {
        const listArea = document.querySelector(".listArea");
        const p = document.createElement("p");
        const div = document.createElement("div");

        listArea.appendChild(div);
        p.textContent = task.name;

        div.appendChild(p);
    }
}
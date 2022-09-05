import Project from "./Project";
import Task from "./Task";

export default class Storage {
    static saveProjectList(list) {
        localStorage.setItem("projectList", JSON.stringify(list));       
    }

    static getProjectList() {
        const stringArray = JSON.parse(localStorage.getItem("projectList"));
        let list = [];
        for (const item of stringArray) {
            const tt = Object.assign(new Project(), item);
            list.push(tt);
        }
        return list
    }

    static getProjTasks(selectedProject) {
        const list = selectedProject.getTasks();
        let objList = [];
        list.forEach(element => {
            const obj = Object.assign(new Task(), element);
            objList.push(obj);
        });
        console.log(objList);
        return objList
    }

    static saveTaskList(list) {
        localStorage.setItem("taskList", JSON.stringify(list));
    }

    static getTaskList() {
        const stringArray = JSON.parse(localStorage.getItem("taskList"));
        let list = [];
        for (const item of stringArray) {
            const tt = Object.assign(new Task(), item);
            list.push(tt);
        }
        return list
    }
}
import Project from "./Project";
import Task from "./Task";

export default class Storage {
    static saveProjectList(list) {
        localStorage.setItem("projectList", JSON.stringify(list));       
    }

    static getProjectList() {
        const list = Object.assign(new Project(),JSON.parse(localStorage.getItem("projectList")));
        return list
    }

    static saveTaskList(list) {
        localStorage.setItem("taskList", JSON.stringify(list));
    }

    static getTaskList() {
        const list = JSON.parse(localStorage.getItem("taskList"));
        let fister = [];
        for (const item of list) {
            const tt = Object.assign(new Task(), item);
            fister.push(tt);
        }
        // console.log(list);
        return fister
    }
}
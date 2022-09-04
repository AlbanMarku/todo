export default class Storage {
    static saveProjectList(list) {
        localStorage.setItem("projectList", JSON.stringify(list));       
    }

    static getProjectList() {
        return JSON.parse(localStorage.getItem("projectList"))
    }
}
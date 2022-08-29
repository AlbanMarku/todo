export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getTasks() {
        return this.tasks
    }

    getName() {
        return this.name;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
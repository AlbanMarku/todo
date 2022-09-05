export default class Task {
    constructor(name, date) {
        this.name = name;
        this.date = date;
    }

    getName() {
        return this.name
    }

    setDate(date) {
        this.date = date;
    }

    getDate() {
        return this.date
    }
}
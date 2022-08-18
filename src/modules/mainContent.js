export default class mainContent {

    static loadHomepage() {
        const header = document.createElement("h1");
        const addButton = document.createElement("button");
        const mainArea = document.querySelector("main");

        header.textContent = "pro";
        addButton.textContent = "Add proj";
        addButton.addEventListener("click", () => {
            console.log("clicked");
        });
        mainArea.appendChild(header);
        mainArea.appendChild(addButton);
    }
}
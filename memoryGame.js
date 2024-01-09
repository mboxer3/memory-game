const tilesContainer = document.querySelector(".tiles")
const colors = [
    "aqua",
    "aquamarine",
    "crimson",
    "dodgerblue",
    "gold",
    "greenyellow",
    "teal"
];
const colorsPickList = [...colors, ...colors];
const tilesCount = colorsPickList.length

    //game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
    const element = document.createElement("div")

    element.classList.add("tile")
    element.setAttribute("data-color", color)
    element.setAttribute("data-revealed", "false")

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");


        if (awaitingEndOfMove ||
            revealed === "true" ||
            element === activeTile
        ) {
            return;
        }

        element.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = element

            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color")

        if (colorToMatch === color) {
            activeTile.setAttribute("data-revealed", true)
            element.setAttribute("data-revealed", true)
            awaitingEndOfMove = false;
            activeTile = null
            revealedCount += 2

            if (revealedCount === tilesCount) {
                alert("congrats! you win!")
            }
            return
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null
            activeTile.style.backgroundColor = null

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000)
    });


    return element
}

// build up tiles
for (let i = 0; i < tilesCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex]
    const tile = buildTile(color)
    
    colorsPickList.splice(randomIndex, 1)
    tilesContainer.appendChild(tile);
}


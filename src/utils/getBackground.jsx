const getBackground = type => {
    switch (type) {
        case "normal":
            return "rgb(115, 81, 89)"
        case "fighting":
            return "rgb(151, 63, 38)"
        case "flying":
            return "rgb(72, 103, 123)"
        case "poison":
            return "rgb(91, 45, 134)"
        case "ground":
            return "rgb(255, 235, 59)"
        case "rock":
            return "rgb(70, 24, 11)"
        case "bug":
            return "rgb(139, 195, 74)"
        case "ghost":
            return "rgb(49, 51, 106)"
        case "steel":
            return "rgb(93, 115, 108)"
        case "fire":
            return "rgb(251, 108, 108)"
        case "water":
            return "rgb(112, 183, 250)"
        case "grass":
            return "rgb(72, 208, 176)"
        case "electric":
            return "rgb(226, 224, 45)"
        case "psychic":
            return "rgba(243, 223, 52, 0.841)"
        case "ice":
            return "rgb(134, 210, 244)"
        case "dragon":
            return "rgb(68, 138, 148)"
        case "dark":
            return "rgb(3, 7, 6)"
        case "fairy":
            return "rgb(152, 24, 68)"
        default:
            return "rgba(209, 18, 18, 0.745)"
    }
}
  
export default getBackground
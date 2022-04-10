const amount = 0.1;


const darkColorCallback = (color: string) => {
    const rawColor = color.replace("rgb(", "").replace(")", "");
    const listEachColor = rawColor.split(", ");
    const darkenListEachColor = listEachColor.map(el => {
        if(el === "0") return 0;
        return parseInt(el)/(1 + amount);
    });
    const darkColor = `rgb(${darkenListEachColor.join(", ")})`;
    return darkColor;
}

const darkestColorCallback = (color: string) => {
    const rawColor = color.replace("rgb(", "").replace(")", "");
    const listEachColor = rawColor.split(", ");
    const darkenListEachColor = listEachColor.map(el => {
        if(el === "0") return 0;
        return parseInt(el)/(1 + amount * 2);
    });
    const darkColor = `rgb(${darkenListEachColor.join(", ")})`;
    return darkColor;
}



export const pattern1 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: "#e5e5f7",
        backgroundImage:  `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(315deg, ${color} 25%, ${darkColor} 25%)`,
        backgroundPosition:  "10px 0, 10px 0, 0 0, 0 0",
        backgroundSize: "10px 10px",
        backgroundRepeat: "repeat"
    })
}



export const pattern2 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: "#e5e5f7",
        backgroundImage:  `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(315deg, ${color} 25%, ${darkColor} 25%)`,
        backgroundPosition:  "10px 0, 10px 0, 0 0, 0 0",
        backgroundSize: "20px 20px",
        backgroundRepeat: "repeat"
    })
}



export const pattern3 = (color: string) => {
    const darkColor = darkColorCallback(color);
    const darkestColor = darkestColorCallback(color);

    return({
        backgroundColor: darkColor,
        background: `linear-gradient(135deg, ${color} 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, ${darkestColor} 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, ${color} 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, ${darkestColor} 25%, ${darkColor} 25%) 0px 0/ 20px 20px`
    })
}




export const pattern4 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: darkColor,
        backgroundImage: `radial-gradient( ellipse farthest-corner at 10px 10px , ${color}, ${color} 50%, ${darkColor} 50%)`,
        backgroundSize: "10px 10px"
    })
}





export const pattern5 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: darkColor,
        background: `repeating-linear-gradient( 45deg, ${color}, ${color} 5px, ${darkColor} 5px, ${darkColor} 25px )`
    })
}




export const pattern6 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: darkColor,
        backgroundImage:  `linear-gradient(${color} 2px, transparent 2px), linear-gradient(90deg, ${color} 2px, transparent 2px), linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, ${darkColor} 1px)`,
        backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
        backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px"
    })
}

/*
export const pattern7 = (color: string) => {
    const darkColor = darkColorCallback(color);
    const darkestColor = darkestColorCallback(color);

    return({
        backgroundColor: darkColor,
        opacity: "0.8",
        backgroundSize: "20px 35px",
        backgroundImage: `linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(60deg, ${darkestColor} 25%, transparent 25.5%, transparent 75%, ${darkestColor} 75%, ${darkestColor}), linear-gradient(60deg, ${darkestColor} 25%, transparent 25.5%, transparent 75%, ${darkestColor} 75%, ${darkestColor})`,
        backgroundPosition: "0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px"
    })
}*/

export const pattern8 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: darkColor,
        backgroundSize: "10px 100%",
        backgroundImage: `linear-gradient(to right, ${color}, ${color} 5px, ${darkColor} 5px, ${darkColor} )`
    })
}

export const pattern9 = (color: string) => {
    const darkColor = darkColorCallback(color);

    return({
        backgroundColor: darkColor,
        backgroundSize: "10px 10px",
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, ${darkColor} 0, ${darkColor} 50%)`
    })
}


export const pattern10 = (color: string) => {

    const darkColor = darkColorCallback(color);

    return ({
        backgroundColor: darkColor,
        backgroundImage:  `repeating-linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color}), repeating-linear-gradient(45deg, ${color} 25%, ${darkColor} 25%, ${darkColor} 75%, ${color} 75%, ${color})`,
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px"
    })
};
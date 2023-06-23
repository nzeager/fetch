import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
async function retrieve(options) {
    let data = await getData(options);
    console.log(data);
    for (let colorObj of data) {
        colorObj.isPrimary = isPrimary(colorObj.color);
    }
    return data;
};

async function getData(options) {
    // We'll want to use page and colors to let user input determine these values
    console.log(options)
    if (options) {
        const response = await fetch(URI(window.path).search({ limit: 10, offset: options.page - 1, colors: options.colors }));
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    } else {
        const response = await fetch(URI(window.path).search({ limit: 10 }));
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
}

const isPrimary = (color) => {
    return (color === "red" || color === "blue" || color === "yellow");
}

export default retrieve;
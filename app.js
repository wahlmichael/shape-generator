// Circle Constructor
class Circle{
    constructor(radius){
        this.radius = radius;
        this.diameter = this.radius * 2;
    }
    
    getArea(){
        return Math.PI * Math.pow(this.radius, 2);
    }

    toString(){
        return `Circle: Radius = ${this.radius}, Area = ${this.getArea()}`
    }
}

// Square Constructor
class Square{
    constructor(length){
        this.length = length;
    }

    getArea(){
        return Math.pow(this.length, 2);
    }

    toString(){
        return `Square: Length = ${this.length}, Area = ${this.getArea()}`
    }
}

// Shape Generator Class
class Generator{
    static sortShapes(shapeArray){
        return shapeArray.sort((a, b) => b.getArea() - a.getArea());
    }

    static generateShapes(){
        const shapeArray = [];
        for(let i = 0; i < 100; i++){
            if(shapeArray.length < 50){
                shapeArray.push(new Circle((this.randomizeBetween(1, 100)) / 2))
            } else {
                shapeArray.push(new Square(this.randomizeBetween(1, 100)))
            }
        }
        return shapeArray;
    }

    static randomizeBetween(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

// UI Class
class UI{
    static displayShapes(shapeArray){
        const shapeContainer = document.getElementById('shape-container');
        let item = '';
        shapeArray.forEach(shapeObj => {
            item = document.createElement('div'); 
            item.classList.add('shape', shapeObj.constructor.name.toLowerCase())
            item.style.width = shapeObj.constructor.name === 'Square' ? `${shapeObj.length}px` : `${shapeObj.diameter}px`;
            item.style.height = shapeObj.constructor.name === 'Square' ? `${shapeObj.length}px` : `${shapeObj.diameter}px`;
            shapeContainer.appendChild(item);
        })
    }

    static generateAndDisplayShapes(){
        UI.clearShapes();
        const sortedShapes = Generator.sortShapes(Generator.generateShapes());
        UI.displayShapes(sortedShapes);
        setTimeout(UI.generateAndDisplayShapes, 500);

    }

    static clearShapes(){
        document.getElementById('shape-container').innerHTML = '';
    }
}

// Event Listeners 
window.addEventListener("load", function(){
    UI.generateAndDisplayShapes();
})




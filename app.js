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
        

    }

    static clearShapes(){
        document.getElementById('shape-container').innerHTML = '';
    }

    static refreshShapes(){
        setTimeout(function(){
            UI.generateAndDisplayShapes();
            UI.refreshShapes();
        }, 500);
    }

    static rotateSquares(){
        const squares = document.getElementsByClassName('square');
        let rotationAmount = 0;
        const rotateInterval = setInterval(getRotation, 500)
        function getRotation(){
            rotationAmount += 10;
            if(rotationAmount === 360) rotationAmount = 0;
            for(let i = 0; i < squares.length; i++){
                squares[i].style.transform = `rotate(${rotationAmount}deg)`;
            }
        }
    }
}

// Event Listeners 
window.addEventListener("load", function(){
    UI.generateAndDisplayShapes();
})

document.getElementById('rotate').addEventListener('click', function(){
    UI.rotateSquares();
})

document.getElementById('refresh').addEventListener('click', function(){
    UI.refreshShapes();
})

// document.getElementsByClassName('shape').addEventListener('mouseover', function(e){
//     console.log('mousedover')
// })







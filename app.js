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
        return `Circle: Radius = ${this.radius}, Area = ${this.getArea().toFixed(2)}`
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
        return `Square: Length = ${this.length}, Area = ${this.getArea().toFixed(2)}`
    }
}

// Shape Generator Class
class Generator{
    // Sorts shapes in order of decending area
    static sortShapes(shapeArray){
        return shapeArray.sort((a, b) => b.getArea() - a.getArea());
    }

    // Creates an array of 50 random circles and squares
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

    // Returns random number between 2 arguments
    static randomizeBetween(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

// UI Class
class UI{
    // Takes in an array of shapes and puts into the shape container
    static displayShapes(shapeArray){
        const shapeContainer = document.getElementById('shape-container');
        let item = '';
        shapeArray.forEach(shapeObj => {
            item = document.createElement('div'); 
            item.classList.add('shape', shapeObj.constructor.name.toLowerCase())
            item.style.width = shapeObj.constructor.name === 'Square' ? `${shapeObj.length}px` : `${shapeObj.diameter}px`;
            item.style.height = shapeObj.constructor.name === 'Square' ? `${shapeObj.length}px` : `${shapeObj.diameter}px`;
            item.setAttribute('data-toString', shapeObj.toString())
            shapeContainer.appendChild(item);
        })
    }

    // Clears the shapes the runs functions to generate, sort and display shapes
    static generateAndDisplayShapes(){
        UI.clearShapes();

        const sortedShapes = Generator.sortShapes(Generator.generateShapes());
        UI.displayShapes(sortedShapes);

        // Adds mouseover event listener to all shapes
        document.querySelectorAll('.shape').forEach(item => {
            item.addEventListener('mouseover', e => {
              UI.displayShapeInfo(e.target.dataset.tostring)
            })
            item.addEventListener('mouseout', e => {
              UI.clearShapeInfo()
              })
          })
    }

    // Displays string to sidebar
    static displayShapeInfo(shapeInfo){
        const outputText = document.getElementById('output-text');
        outputText.innerText = shapeInfo;
    }

    // Clears shape info area on mouseout
    static clearShapeInfo(){
        const outputText = document.getElementById('output-text');
        outputText.innerText = '';
    }

    // Resets container to be empty
    static clearShapes(){
        document.getElementById('shape-container').innerHTML = '';
    }

    // Regenerates the shapes twice per seconds
    static refreshShapes(){
        setTimeout(function(){
            UI.generateAndDisplayShapes();
            UI.refreshShapes();
        }, 500);
    }

    // Rotates shapes by 10 degrees twice per second
    static rotateSquares(){
        const squares = document.getElementsByClassName('square');
        let rotationAmount = 0;
        setInterval(getRotation, 500)
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

document.getElementById('refresh-page').addEventListener('click', function(){
    location.reload();
})










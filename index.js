let body = document.getElementsByTagName('body');
let canvas = document.querySelector(".canvas");
let eraserBtn = document.querySelector(".eraser");
let gridToggleBtn = document.querySelector(".grid-toggle");
let colorPicker = document.querySelector(".picker");
let sizeOptions = document.querySelector("#size-options");
let defaultSize = 64;
let currentColor = colorPicker.value;
let eraser = false;
let gridVisibility = true;
let mouseDown = false;
let clearBtn = document.querySelector(".clear");
let option = defaultSize;


function canvasGenerator(size){
    let column = Math.sqrt(size);
    canvas.style.gridTemplateColumns = "repeat("+column+",1fr)";
    canvas.style.gridTemplateRows = "repeat("+column+",1fr)";
    let boxSize = 450/column;

    for(var i=0;i<size;i++){
        let div = document.createElement("div");
        div.classList.add("boder");
        div.style.width = boxSize;
        div.style.height = boxSize;
        div.addEventListener("mousedown",(event) => {changeColor(event)});
        div.addEventListener("mouseover", (event) => {changeColor(event)})
        canvas.appendChild(div);
    }
}


function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) {
        return
    }else if (eraser == true){
        e.target.style.backgroundColor = "white";
    }else{
        e.target.style.backgroundColor = currentColor;
    }
    
}

function toggleEraser(){
    if(eraser){
        eraser = false;
        eraserBtn.classList.remove("eraser-active");
    }else{
        eraser = true;
        eraserBtn.classList.add("eraser-active");
    }

}

function toggleGrid(){
    if(gridVisibility){
        canvas.childNodes.forEach((node)=> node.style.border = "none");
        gridVisibility = false
        canvas.style.border = "1px solid black";
    }
    else{
        canvas.childNodes.forEach((node) => node.style.border ="1px solid black");
        gridVisibility= true;
        canvas.style.border = "none";
        canvas.style.borderWidth = "none";
    }
}

function sizeChoosing(e){
    option = parseInt(e.target.value);
    canvas.replaceChildren();
    canvasGenerator(option);
}

eraserBtn.addEventListener("click", toggleEraser)
colorPicker.addEventListener("input",(e) =>(currentColor=e.target.value));
gridToggleBtn.addEventListener("click", toggleGrid);
sizeOptions.addEventListener("input", (e) =>{sizeChoosing(e)});
document.body.addEventListener("mousedown",()=>(mouseDown= true));
document.body.addEventListener("mouseup",()=>(mouseDown=false));
clearBtn.addEventListener("click",()=>{canvas.replaceChildren();canvasGenerator(option)} )




window.onload=()=>{
    canvasGenerator(defaultSize);
    sizeOptions.value = "64";
}
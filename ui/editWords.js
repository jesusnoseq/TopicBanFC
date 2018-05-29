function checkStoredData(){
    if(saveData){
        storeGet.then(results => {
            if (!results.bannedWords) {
                results.bannedWords=[];
            }
            generateForm(results.bannedWords);
        });
    }else{
        generateForm(["hola"]);
    }
}

function generateForm(words){
    while (wordListContainer.firstChild) {
        wordListContainer.removeChild(wordListContainer.firstChild);
    }
    words.forEach(w => {
        wordListContainer.appendChild(generateField(w));
    });
}

function generateField(word){
    var node = document.createElement("div");
    node.classList.add("panel-list-item");
    var textConainer=document.createElement("div");
    textConainer.classList.add("text");
    var textnode = document.createTextNode(word);
    textConainer.appendChild(textnode);
    node.appendChild(textConainer);
    var button=document.createElement("button");
    button.classList.add("deleteButton");
    button.setAttribute('type', 'button');
    var x = document.createTextNode("");
    button.appendChild(x);
    node.appendChild(button);
    return node;
}


function addForm(e){
    e.preventDefault();
    let input=document.querySelector("#newWord");
    if(input.value!==""){
        wordListContainer.appendChild(generateField(input.value));

        input.value="";
    
        save(e);
    }
}


function deleteForm(e){
    e.preventDefault();
    if (!e.target.classList.contains("deleteButton")){
        return;
    }
    e.target.parentNode.remove()

    save(e);
}


function save(){
    let nodes=parentNode=document.querySelectorAll("#wordList .text");
    let words=[];
    nodes.forEach(n => {
        words.push(n.textContent);
    });
    if(saveData){browser.storage.local.set({"bannedWords":words});}
}


function init(){
    console.log("ext init");
    container=document.querySelector("#extContent");
    wordListContainer=document.querySelector("#wordList");

    document.querySelector("#wordList").addEventListener("click", deleteForm);
    document.querySelector("#editWordsForm").addEventListener("submit", addForm);
    
    if(saveData){storeGet=browser.storage.local.get()};
    checkStoredData();
}

// Load extension
document.addEventListener("DOMContentLoaded", init);
var saveData=true;
var container;
var wordListContainer;
var storeGet;


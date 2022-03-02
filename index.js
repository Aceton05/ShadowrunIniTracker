function renderFrame(){
    let divFrameElement= document.createElement("div");
    divFrameElement.style="position: absolute; box-sizing: border-box; font-size: 12px; z-index: 999; bottom: 1%; right: 1%; width: auto; height: auto; display:inline-block; border: 2px solid; background-color: lightgrey;";
    
    let nameInputElement= document.createElement("input");
    nameInputElement.style="width: 80px;";
    nameInputElement.id="ini-input";        
    let nameInputBtnElement= document.createElement("button");
    nameInputBtnElement.innerHTML="Hizufügen";
    nameInputBtnElement.setAttribute("onclick","addUser()");        
    nameInputBtnElement.id="ini-input-btn";        
    let nameFrameElement= document.createElement("div");
    nameFrameElement.id="ini-names";        
    let btnFrameElement= document.createElement("div");
    btnFrameElement.style="width: 260px";
    btnFrameElement.id="btns";
    let reduceBtnElement= document.createElement("button");
    reduceBtnElement.innerHTML="Alle minus 10";
    reduceBtnElement.setAttribute("onclick","reduceAll()");
    
    divFrameElement.append(nameInputElement);
    divFrameElement.append(nameInputBtnElement);
    divFrameElement.append(nameFrameElement);
    divFrameElement.append(btnFrameElement);
    divFrameElement.append(reduceBtnElement);
    document.body.append(divFrameElement);
}
function addUser()
{
    let name= document.getElementById("ini-input").value;
    document.getElementById("ini-names").appendChild(createNewPlayer(name));
    document.getElementById("ini-input").value="";
}
function addToMe(btn)
{
    if(btn.title.length<1){
    let names= document.getElementsByName('playername');
    let selectet=[];
    for (let i = 0; i < names.length; i++) {
        if(names[i].children[0].checked){
        selectet.push(names[i].children[1].innerHTML);
        names[i].children[0].checked=false;
        }
    }
    btn.title=selectet.join("\n")
    btn.style="border-color: blue; width: 25px;"
    }
    else{           
        btn.style="border-color: red; width: 25px;"
    }        
}
function createNewPlayer(name){
    let elementToAdd= document.createElement("div");        
    elementToAdd.id=name;        
    elementToAdd.setAttribute("name", "playername");
    let checkboxElement= document.createElement("input");
    checkboxElement.setAttribute("type","checkbox");
    let lableElement= document.createElement("label");
    lableElement.innerHTML=name;   
    let inputElement= document.createElement("input");
    inputElement.style="width: 20px;";
    let plusElement= document.createElement("button");
    plusElement.setAttribute("onclick","changeValue(this)");
    plusElement.innerHTML="+"; 
    let minusElement= document.createElement("button");
    minusElement.setAttribute("onclick","changeValue(this)");
    minusElement.innerHTML="-";  
    elementToAdd.append(checkboxElement);
    elementToAdd.append(lableElement);
    elementToAdd.append(inputElement);
    elementToAdd.append(plusElement);
    elementToAdd.append(minusElement);
    return elementToAdd;
}  
function renderBtns(){
    for(i=1;i<=40;i++){
    let btnToAdd= document.createElement("button");
    btnToAdd.innerHTML=i;
    btnToAdd.setAttribute("onclick","addToMe(this)")
    btnToAdd.setAttribute("name", "ini-btn");  
    btnToAdd.style="width: 25px; box-sizing: border-box;"
    document.getElementById("btns").appendChild(btnToAdd);
    }
}  
function reduceAll(){
    let btns =Array.from(document.getElementsByName("ini-btn"));
    let usedBtns=[];
    for (let i = 0; i < btns.length; i++) {
        if(btns[i].title.length>0){
            usedBtns.push(btns[i]);
        }
    }
    for (let i = 0; i < usedBtns.length; i++) {
        let oldbtn= usedBtns[i];
        let newbtn=btns.find(element => element.innerHTML==oldbtn.innerHTML-10);
        if(newbtn!=undefined){
        newbtn.title=oldbtn.title;
        newbtn.style="border-color: blue; width: 25px; box-sizing: border-box;"
        }
        oldbtn.title="";
        oldbtn.style="width: 25px; box-sizing: border-box;"
    }
}
function changeValue(btn)
{
    let name=btn.parentElement.id;
    let btns =Array.from(document.getElementsByName("ini-btn"));
    let btnWithName= btns.find(element => element.title.includes(name));
    let input =parseInt(btn.parentElement.children[2].value);
    if(btn.innerText=="+"){
        let newbtn=btns.find(element => element.innerHTML==parseInt(btnWithName.innerHTML)+input);
        if(newbtn!=undefined){
            newbtn.title+="\n"+name;
        newbtn.style="border-color: blue; width: 25px; box-sizing: border-box;"
        }
        btnWithName.title=btnWithName.title.replace(name,"");
        if(btnWithName.title.trim().length<1){
        btnWithName.style="width: 25px; box-sizing: border-box;"
        btnWithName.title="";   
        }     
    }
    else{
        let newbtn=btns.find(element => element.innerHTML==parseInt(btnWithName.innerHTML)-input);
        if(newbtn==undefined){
            newbtn=btns.find(element => element.innerHTML=="40");
        }
        newbtn.title+="\n"+name;
        newbtn.style="border-color: blue; width: 25px; box-sizing: border-box;"
        btnWithName.title=btnWithName.title.replace(name,"");
        if(btnWithName.title.trim().length<1){
        btnWithName.style="width: 25px; box-sizing: border-box;"
        btnWithName.title="";   
        }                  
    }
}
renderFrame();
renderBtns();
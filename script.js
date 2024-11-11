const itemObj = class {
    constructor(sizeX,sizeY,durability,description, rarity,type,name,url) {
        this.name = name;
        this.sizeX = sizeX-1;
        this.sizeY = sizeY-1;
        this.type = type;
        this.durability = durability;
        this.description = description;
        this.rarity = rarity;
        this.url = url;
    }
    slotId = -1;
    width = -1;
    height = -1;
    equip = false;
    equipWidth
    equipHeight
}

load()
loadObject()

let ObjectList = []
const weapon = document.querySelector("#weaponGloves .weapon")
const gloves = document.querySelector("#weaponGloves #gloves")
const trinket = document.querySelector("#trinket")
const helmet = document.querySelector("#helmetArmourBelt #helmet")
const armour = document.querySelector("#helmetArmourBelt #armour")
const belt = document.querySelector("#helmetArmourBelt #belt")
const charm = document.querySelector("#charms2 #charm")
const ring = document.querySelector("#charms2 #ring")
const weapon2 = document.querySelector("#offhandBoots .weapon")
const boots = document.querySelector("#offhandBoots #boots")
const inventorySlotsContainer = document.getElementById("slotTable");
const inventorySlots = Array.from(inventorySlotsContainer.children);
const addButton = document.querySelector("#addButton")
const addValueP = document.querySelector("#valueP")
const Inventory = document.querySelector("#inventory")
const typeDropDown = document.querySelector("#typeDropDown")
const addItemFrame = document.querySelector("#addItemDialog")
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownButton = document.querySelector('.dropdown-btn');
const dropdownArray = Array.from(dropdownMenu.children);
const dropdownrarityMenu = document.querySelector(".dropdown-menu-r")
const dropdownRarityArray = Array.from(dropdownrarityMenu.children)
const createBtn = document.querySelector("#createBtn")
let draggableElem
let canSave = true
let isHovered = false;
let mouseOn

let activeRarityElement;

dropdownRarityArray.forEach(element =>{
    const button = document.querySelector("#drpdwnBtnRarity")
    element.addEventListener('click', (event) =>{
        activeRarityElement = null;
        const target = event.target
        button.textContent = target.textContent
        button.style.backgroundColor = target.style.backgroundColor
        if(activeRarityElement == null){
            activeRarityElement = target
            dropdownrarityMenu.style.display = 'none'
        }
        activeRarityElement = target
    });
});

let activeDropDownelement;

dropdownArray.forEach(element => {
    element.addEventListener("click",(event) => {
        const clickedElement = event.target
        activeDropDownelement = null;
        if(activeDropDownelement == null){
            activeDropDownelement = clickedElement
            console.log(activeDropDownelement)
            activeDropDownelement.classList.add(".active-dropdown")
        }else{
            activeDropDownelement.classList.remove(".active-dropdown")
            activeDropDownelement = clickedElement
            activeDropDownelement.classList.add(".active-dropdown")
        }
        console.log(activeDropDownelement)
        dropdownButton.textContent = activeDropDownelement.textContent
    })

});


const closeInfo = document.querySelector("#infoClose")

closeInfo.addEventListener('click', (event) =>{
    infoDialog.classList.add("disabled")
});

addButton.addEventListener("click", function(){
    if(addItemFrame.classList == ""){
        addItemFrame.classList.add("disabled")
        Inventory.classList.remove("opacityBackground")
    }else{
        addItemFrame.classList.remove("disabled")
        Inventory.classList.add("opacityBackground")
    }
    resetCreation()
});

const deleteObj = document.querySelector("#deleteObj")

deleteObj.addEventListener('click',(event) =>{
    let object = ObjectList.find(object => object.name == mouseOn.getAttribute("value"))
    for(let i = 0; i < ObjectList.length;i++){
        if(ObjectList[i].name == object.name){
            console.log("deleted")
            ObjectList[i] = ""
        }
    }
    document.querySelector(`[value="${object.name}"]`).remove()
    infoDialog.classList.add("disabled")

});

const addRangeInput = document.querySelector("#rangeInput")
const addDurability = document.querySelector("#durabilityValue")
addDurability.setAttribute("value",addRangeInput.value)


addRangeInput.addEventListener("input", (event) => {
    addDurability.value = addRangeInput.value;
})

addDurability.addEventListener("input", (event) => {
    addRangeInput.value = addDurability.value;
});

document.addEventListener("keydown", (event) => {
    const infoDialog = document.querySelector("#infoDialog")
    if (isHovered && event.key === "f") {
        if(infoDialog.classList == ""){
            infoDialog.classList.add("disabled")
        }else{
            infoDialog.classList.remove("disabled")
            let object = ObjectList.find(object => object.name == mouseOn.getAttribute("value"))
            console.log(mouseOn+ " "+mouseOn.getAttribute("value"))
            document.querySelector("#infoTitle").textContent = object.name
            document.querySelector("#infoImage").style.backgroundImage = `url("${object.url}")`
            
            document.querySelector("#typeValue").textContent = object.type
            document.querySelector("#durabilityValue").textContent = object.durability
            document.querySelector("#infoDescription").textContent = object.description
        }
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const dropzone = document.querySelectorAll('.slot');
    const slotArea = document.querySelector("#slotTable")


    dropzone.forEach(slot => {
        slot.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        slot.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            console.log(data)
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget; 
            const cellRect = droppedOnElement.getBoundingClientRect();
            let Xoffset;
            let Yoffset;

            if(checkAvaibility(droppedObject,inventorySlots,droppedOnElement.getAttribute("id"))){
                draggableElem.style.position = 'absolute';
                let id = droppedOnElement.getAttribute("id");
                let sum = parseInt(id)+parseInt(droppedObject.sizeX)

                draggableElem.classList.remove("streched")
                draggableElem.style.width = droppedObject.width + 'rem'
                draggableElem.style.height = droppedObject.height + 'rem'
                droppedObject.slotId = droppedOnElement.getAttribute("id")
                droppedObject.equip = false
                slotArea.appendChild(draggableElem)
                updateArray(droppedObject,ObjectList)
                
                

                if(id < 20 && id > 9 && sum < 20 && droppedObject.sizeY < 3){
                    id = id - 10;
                    draggableElem.style.gridRow = 2;
                }
                else if(id < 30 && id > 19 && sum < 30 && droppedObject.sizeY < 2){
                    id = id - 20;
                    draggableElem.style.gridRow = 3;
                }
                else if(id < 40 && id > 29 && sum < 40 && droppedObject.sizeY < 1){
                    id = id - 30;
                    draggableElem.style.gridRow = 4;
                }else{
                    draggableElem.style.gridRow = 1;
                }

                id = parseInt(id) + parseInt(1)

                draggableElem.style.gridColumn = id;
  
            }
        });


        
        const weapon = document.querySelector("#weapon")

        weapon.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        weapon.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;

            if(droppedObject.type == "Weapon"){

                weapon.appendChild(draggableElem)
                draggableElem.style.width = 12.5 + 'rem'
                draggableElem.style.height = 19 + 'rem'
                droppedObject.equipWidth = 12.5 + 'rem'
                droppedObject.equipHeight = 19 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 2
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 1
                console.log(droppedObject.slotId + " changed slotId")
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)

            }
            
        });

        const gloves = document.querySelector("#gloves")

        gloves.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        gloves.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Gloves"){

                gloves.appendChild(draggableElem)
                draggableElem.style.width = 12.5 + 'rem'
                draggableElem.style.height = 12.5 + 'rem'
                droppedObject.equipWidth = 12.5 + 'rem'
                droppedObject.equipHeight = 12.5 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 2
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 2
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const trinket = document.querySelector("#trinket")

        trinket.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        trinket.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Ring"){

                trinket.appendChild(draggableElem)
                draggableElem.style.width = 8 + 'rem'
                draggableElem.style.height = 8 + 'rem'
                droppedObject.equipWidth = 8 + 'rem'
                droppedObject.equipHeight = 8 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 1
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 3
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const helmet = document.querySelector("#helmet")

        helmet.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        helmet.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Helmet"){

                helmet.appendChild(draggableElem)
                draggableElem.style.width = 11.5 + 'rem'
                draggableElem.style.height = 11.5 + 'rem'
                droppedObject.equipWidth = 11.5 + 'rem'
                droppedObject.equipHeight = 11.5 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 1
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 4
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const armour = document.querySelector("#armour")

        armour.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        armour.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Armour"){

                armour.appendChild(draggableElem)
                draggableElem.style.width = 11.5 + 'rem'
                draggableElem.style.height = 15.2 + 'rem'
                droppedObject.equipWidth = 11.5 + 'rem'
                droppedObject.equipHeight = 15.2 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 1
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 5
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const belt = document.querySelector("#belt")

        belt.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        belt.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Belt"){

                belt.appendChild(draggableElem)
                draggableElem.style.width = 11.5 + 'rem'
                draggableElem.style.height = 8 + 'rem'
                droppedObject.equipWidth = 11.5 + 'rem'
                droppedObject.equipHeight = 8 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 1
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 6
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const neck = document.querySelector("#charm")

        neck.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        neck.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Neck"){

                neck.appendChild(draggableElem)
                draggableElem.style.width = 8 + 'rem'
                draggableElem.style.height = 8 + 'rem'
                droppedObject.equipWidth = 8 + 'rem'
                droppedObject.equipHeight = 8 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 1
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 7
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const ring2 = document.querySelector("#ring")

        ring2.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        ring2.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Ring"){

                ring2.appendChild(draggableElem)
                draggableElem.style.width = 8 + 'rem'
                draggableElem.style.height = 8 + 'rem'
                droppedObject.equipWidth = 8 + 'rem'
                droppedObject.equipHeight = 8 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 2
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 8
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const offhand = document.querySelector("#offhand")

        offhand.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        offhand.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Offhand"){

                offhand.appendChild(draggableElem)
                draggableElem.style.width = 12.5 + 'rem'
                draggableElem.style.height = 19 + 'rem'
                droppedObject.equipWidth = 12.5 + 'rem'
                droppedObject.equipHeight = 19 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 2
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 9
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

        const boots = document.querySelector("#boots")

        boots.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        boots.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedObject = JSON.parse(data);
            const droppedOnElement = event.currentTarget;



            if(droppedObject.type == "Boots"){

                boots.appendChild(draggableElem)
                draggableElem.style.width = 12.5 + 'rem'
                draggableElem.style.height = 12.5 + 'rem'
                droppedObject.equipWidth = 12.5 + 'rem'
                droppedObject.equipHeight = 12.5 + 'rem'
                draggableElem.classList.add("streched")
                draggableElem.style.gridRow = 2
                draggableElem.style.gridColumn = 1
                droppedObject.slotId = 10
                droppedObject.equip = true
                updateArray(droppedObject,ObjectList)
            }
            
        });

    });
});

const saveBtn = document.querySelector("#saveInventory")

saveBtn.addEventListener("click", (event) => {
    save()
});

function equipItem(draggableElem,droppedObject,droppedOnElement){
    const item = droppedOnElement
    console.log(droppedObject.type)
    switch(droppedObject.type){
        case "Weapon":
            item.appendChild(draggableElem)
            draggableElem.style.width = 12.5 + 'rem'
            draggableElem.style.height = 19 + 'rem'
            draggableElem.classList.add("streched")
            draggableElem.style.gridRow = 2
            draggableElem.style.gridColumn = 1
            break;
        case "Gloves":
            item.appendChild(draggableElem)
            draggableElem.style.width = 12.5 + 'rem'
            draggableElem.style.height = 12.5 + 'rem'
            draggableElem.classList.add("streched")
            draggableElem.style.gridRow = 3
            draggableElem.style.gridColumn = 1
            break;
        default:
            console.log("Nothing")
    }
}

function updateArray(droppedObject, ObjectList){
    for(let i = 0; i < ObjectList.length;i++){
        if(droppedObject.name == ObjectList[i].name){
            ObjectList[i] = droppedObject
            break;
        }
    }
}

function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}
function toggleRarityDropDown(){
    const dropdownMenu = document.querySelector('.dropdown-menu-r');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

typeDropDown.onclick = function(event) {
    const dropdownButton = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownButton.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
}


function createObject() {
    const nameI = document.querySelector("#nameInput").value
    const X = document.querySelector("#ObjX").value
    const Y = document.querySelector("#ObjY").value
    const durabilityI = document.querySelector("#durabilityValue").value
    const descriptionI = document.querySelector("#descriptionInput").value
    const rarity = activeRarityElement.textContent
    const type = activeDropDownelement.textContent
    const newElement = document.createElement('div');
    const parentElement = document.querySelector('#droppedElements')
    const imageUrl = document.querySelector("#imageInput").value
    const inventorySl = document.querySelector("#slotTable")
    let allOk = true

    for(let i = 0; i < ObjectList.length;i++){
        if(nameI == ObjectList[i].name){
            allOk = false
        }
    }

    if(nameI == "" || X <= 0 || Y <= 0){
        allOk = false
    }

    if(allOk){
        ObjectList.push(new itemObj(X,Y,durabilityI,descriptionI,rarity,type,nameI,imageUrl))

        console.log(ObjectList.at(-1))
        ObjectList.at(-1).width = X*5.8
        ObjectList.at(-1).height = Y*5.8

        if(X-1 > 0 || Y-1 > 0){
            newElement.setAttribute("class","object"+X+"x"+Y)
        }else{
            newElement.setAttribute("class","object")
        }
        newElement.style.backgroundImage = `url("${imageUrl}")`
        newElement.setAttribute("draggable",true)
        newElement.setAttribute("value", nameI)
        newElement.style.borderColor = setBorderColor(ObjectList.at(-1))
        newElement.style.borderWidth = 0.2 + 'rem'
        newElement.style.boxSizing = 'border-box'
        makeDraggable(newElement)
        inventorySl.appendChild(newElement)



        if(addItemFrame.classList == ""){
            addItemFrame.classList.add("disabled")
        }else{
            addItemFrame.classList.remove("disabled")
        }

        resetCreation()

    }else{
        document.querySelector("#name").style.color = "#8c0000"
    }
};

function setBorderColor(object){
    switch(object.rarity){
        case "Common":
            return '#9a9a9a'
            break;
        case "Uncommon":
            return '#dff917'
            break;
        case "Rare":
            return '#178afd'
            break;
        case "Epic":
            return '#911bd0'
            break;
        case "Master":
            return '#ffa81b'
            break;
        case "Legendary":
            return '#23ff0b'
            break;
        case "Unique":
            return '#ff2828'
            break;
    }
}

function resetCreation(){
    document.querySelector("#nameInput").value = null
    document.querySelector("#ObjX").value = 1
    document.querySelector("#ObjY").value = 1
    document.querySelector("#durabilityValue").value = 100
    document.querySelector("#descriptionInput").value = null
    document.querySelector("#imageInput").value = null
    document.querySelector('.dropdown-btn').textContent = "Click!"
    document.querySelector("#name").style.color = "#fff"
    document.querySelector("#rangeInput").value = 100
    document.querySelector("#drpdwnBtnRarity").style.backgroundColor = '#'+'5C4033'
    document.querySelector("#drpdwnBtnRarity").textContent = "Click!"
    activeRarityElement = null
    activeDropDownelement = null
    console.log(document.querySelector("#durabilityValue"))
}

function makeDraggable(elem){
    const element = elem;

    element.addEventListener("mouseenter", (event) => {
        isHovered = true;
        mouseOn = event.target
    });

    element.addEventListener("mouseleave", () => {
        isHovered = false;
    });

    element.addEventListener('dragstart', (event) => {
        const value = element.getAttribute("value");
        const foundedObj = ObjectList.find(object => object.name == value);
        event.dataTransfer.setData('text/plain', JSON.stringify(foundedObj));
        draggableElem = element;
})
}

function save(){
    let money = [document.querySelector("#bronzeInput").value,document.querySelector("#silverInput").value,document.querySelector("#goldInput").value]
    let saveData = [ObjectList,money]
    let jsonObjects = JSON.stringify(saveData)
    const blob = new Blob([jsonObjects], { type: "application/json" });
    const saveInventory = document.querySelector("#saveInventory")
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "InventoryData.json"

    saveInventory.appendChild(link)
    link.click()
    saveInventory.removeChild(link)
}
function checkRow(slotId, sum, objectY){
    if(slotId < 10 && sum < 10 && objectY < 4){
        console.log("stage 1")
        return true;
    }
    else if(slotId < 20 && slotId > 9 && sum < 20 && objectY < 3){
        console.log("stage 3")
        return true;
    }
    else if(slotId < 30 && slotId > 19 && sum < 30 && objectY < 2){
        console.log("stage 5")
        return true;
    }
    else if(slotId < 40 && slotId > 29 && sum < 40 && objectY < 1){
        console.log("stage 7")
        return true;
    }else{
        return false;
    }
}
function checkAvaibility(object,slots,slotId){
    const objectX = object.sizeX
    const objectY = object.sizeY
    const slot = slots[slotId]
    let sum = parseInt(slotId)+parseInt(objectX)

    const checkArr = Array.from({ length: objectY+1 }, () => new Array(objectX+1).fill(true));;
    
    return checkRow(slotId, sum, objectY)
}

function load(){
    document.getElementById("jsonInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    const objectData = jsonData[0]
                    const moneyData = jsonData[1]

                    document.querySelector("#bronzeInput").value = moneyData[0]
                    document.querySelector("#silverInput").value = moneyData[1]
                    document.querySelector("#goldInput").value = moneyData[2]

                    objectData.forEach(object => {
                        const newElement = document.createElement('div');
                        newElement.style.backgroundImage = `url("${object.url}")`
                        newElement.setAttribute("draggable",true)
                        newElement.setAttribute("value", object.name)
                        newElement.style.borderColor = setBorderColor(object)
                        newElement.style.borderWidth = 0.2 + 'rem'
                        newElement.style.boxSizing = 'border-box'
                        makeDraggable(newElement)
                        ObjectList.push(object)
                        if(object.sizeX > 0 || object.sizeY > 0){
                            newElement.setAttribute("class","object"+(object.sizeX+1)+"x"+(object.sizeY+1))
                        }else{
                            newElement.setAttribute("class","object")
                        }
                        let id = object.slotId
                        if(object.equip == true){
                            newElement.style.width = object.equipWidth
                            newElement.style.height = object.equipHeight
                            switch(object.type){
                                case "Weapon":
                                    document.querySelector("#weapon").appendChild(newElement)
                                    break;
                                case "Gloves":
                                    document.querySelector("#gloves").appendChild(newElement)
                                    break;
                                case "Ring":
                                    document.querySelector("#trinket").appendChild(newElement)
                                    break;
                                case "Helmet":
                                    document.querySelector("#helmet").appendChild(newElement)
                                    break;
                                case "Armour":
                                    document.querySelector("#armour").appendChild(newElement)
                                    break;
                                case "Belt":
                                    document.querySelector("#belt").appendChild(newElement)
                                    break;
                                case "Neck":
                                    document.querySelector("#charm").appendChild(newElement)
                                    break;
                                case "Ring":
                                    document.querySelector("#ring").appendChild(newElement)
                                    break;
                                case "Offhand":
                                    document.querySelector("#offhand").appendChild(newElement)
                                    break;
                                case "Boots":
                                    document.querySelector("#boots").appendChild(newElement)
                                    break;
                            }
                        }else{
                            if(id < 20 && id > 9 && sum < 20 && droppedObject.sizeY < 3){
                                id = id - 10;
                                newElement.style.gridRow = 2;
                            }
                            else if(id < 30 && id > 19 && sum < 30 && droppedObject.sizeY < 2){
                                id = id - 20;
                                newElement.style.gridRow = 3;
                            }
                            else if(id < 40 && id > 29 && sum < 40 && droppedObject.sizeY < 1){
                                id = id - 30;
                                newElement.style.gridRow = 4;
                            }else{
                                newElement.style.gridRow = 1;
                            }
                            id = parseInt(id) + parseInt(1)
                            newElement.style.gridColumn = id;

                            document.querySelector("#slotTable").appendChild(newElement)
                        }
                    });

                } catch (error) {
                    console.error("JSON parsing error", error);
                }
            };
            reader.readAsText(file);
        }
    });
}

function loadObject(){
    document.getElementById("jsonInputOne").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if(jsonData.length > 1){
                        alert("Save file contains multiple objects")
                    }else{
                        for(let i = 0; i< ObjectList.length;i++){
                            if(jsonData.name == ObjectList[i].name){
                                alert("Object contais same name as you have already")
                                return 0;
                            }
                        }
                        const newElement = document.createElement('div');
                        newElement.style.backgroundImage = `url("${object.url}")`
                        newElement.setAttribute("draggable",true)
                        newElement.setAttribute("value", object.name)
                        makeDraggable(newElement)

                        ObjectList.push(object)
                        if(object.sizeX > 0 || object.sizeY > 0){
                            newElement.setAttribute("class","object"+(object.sizeX+1)+"x"+(object.sizeY+1))
                        }else{
                            newElement.setAttribute("class","object")
                        }
                        document.querySelector("#slotTable").appendChild(newElement)
                    }
                }catch (error) {
                    console.error("JSON parsing error", error);
                }
            };
            reader.readAsText(file);
        }
    });
}


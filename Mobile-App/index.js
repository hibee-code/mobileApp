import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://praxis-cab-389808-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListItem = ref(database, "shoppingList")


const addBtn = document.querySelector("#add-btn")
const addItemInput = document.querySelector("#MA-inp")
const shoppingList = document.querySelector("#shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = addItemInput.value;
    push(shoppingListItem, inputValue)

    resetInputItem()                              
})

onValue(shoppingListItem, function(snapshot){
    let itemList = Object.entries(snapshot.val())

     clearShoppingItem() 

    for (let i = 0; i < itemList.length; i++){

        let currentItem = itemList[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
    
            appendItems(currentItem)
         
    } 
})

function clearShoppingItem () {
    shoppingList.innerHTML = ""
}

function resetInputItem(){
    addItemInput.value = " ";
}

function appendItems(item){
    let itemID = item[0]
    let itemValue = item[1]
    

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingList.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationInDB)
    })
}




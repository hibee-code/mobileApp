import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let itemList = Object.values(snapshot.val())

     clearShoppingItem() 

    for (let i = 0; i < itemList.length; i++){
        
         appendItems(itemList[i]);

        // console.log(currentItem)
        // let currentItemID = currentItem[0]
        // let currentItemValues = currentItem[1];

        // appendItems(currentItemValues)
    }
    
})

function clearShoppingItem () {
    shoppingList.innerHTML = ""
}

function resetInputItem(){
    addItemInput.value = " ";
}

function appendItems(itemValue){
    shoppingList.innerHTML += `<li> ${itemValue} </li>`
}


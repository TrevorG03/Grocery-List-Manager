let groceryList = [];
//This will hold all items on the grocery list, whether it is crossed out or not
let unpurchasedList = [];
//This will hold every item that is currently not crossed out
let purchasedList = [];
//This will hold every item that is currently crossed out

let mainList = document.getElementById("mainList");
//Links this variable to the <ul> that will hold all items
let listViewer = document.getElementById("listViewer")
//Links this variable to the <ul> for the purchased and unpurchased lists
let groceryIndex = 0
//An index counter

function addItem() {
//This function creates an <li> with the needed attributes and places it in the mainList <ul>, groceryList[], and unpurchasedList[]
    let input = window.prompt("What item would you like to add?")
    //Takes input from user
    let entry = document.createElement("li");
    entry.innerHTML = input;
    //Creates an <li> entry for the mainList <ul>, and makes the innerHTML(text) the user input
    entry.setAttribute("value", groceryIndex)
    groceryIndex++
    //Sets the value attribute of the newly created <li> to be equal to the current value of groceryIndex, then increments groceryIndex by one, so that the <li> entry made will have the appropriate index value. The goal is to ensure the value attribute is going to be equal to it's index in groceryList[]
    entry.setAttribute('onclick','strikeOut(this.value)')
    //Sets an onclick attribute for the <li> that invokes strikeOut() using the <li>'s value/index
    groceryList.push(entry);
    //Adds the <li> to the groceryList array
    unpurchasedList.push(entry);
    //Adds the <li> to the unpurchasedList array
    mainList.appendChild(entry);
    //Adds the <li> to the mainList <ul> for displaying all items
}

function strikeOut(groceryItemIndex) {
//This function uses the value/index of the <li> clicked as an argument. It will check if the entry is crossed out or not, then make the required changes based on that information
    let match = false
    //Sets a variable called match and sets it's value to false
    for(let i=0; i<purchasedList.length; i++){
    //Loops through the purchasedList array
        if("<s>" + purchasedList[i].innerHTML + "</s>" === groceryList[groceryItemIndex].innerHTML) {
        //Checks to see if there is a purchased version of the clicked item, which would mean the clicked item is crossed out
            groceryList[groceryItemIndex].innerHTML = purchasedList[i].innerHTML
            //If there is a match, it sets the clicked item text to be equal to the purchased item text, which is what it was before it had the strikethrough, therefore "uncrossing" the clicked item
            purchasedList.splice(i, 1)
            //Removes the purchased version of the clicked item from the purchased array
            let unpurchasedEntry =  groceryList[groceryItemIndex];
            //Creates a copy of the clicked item for the unpurchasedList array
            unpurchasedList.push(unpurchasedEntry);
            //Adds a copy of the clicked item to the unpurchasedList array
            match = true
            //Sets the value of match to be true, stopping the second group of code from running
            break
            //Stops this loop from running after a successful un-cross, and all the accompanying changes, are completed
        }
    }

    if(match === false) {
    //Allows or stops this loop from running
        for(let i=0; i<unpurchasedList.length; i++) {
        //Loops through the unpurchasedList array
            if(unpurchasedList[i].innerHTML === groceryList[groceryItemIndex].innerHTML) {
            //Finds the "unpurchased" version of the clicked item
                unpurchasedList.splice(i, 1)
                //Removes the unpurchased version of item from the unpurchased array
                let purchasedEntry = document.createElement("li");
                //Creates an <li> for the purchased version of the clicked item
                purchasedEntry.innerHTML = groceryList[groceryItemIndex].innerHTML;
                //Sets the text for the purchased version of the clicked item
                groceryList[groceryItemIndex].innerHTML = "<s>" + groceryList[groceryItemIndex].innerHTML + "</s>";
                //Crosses the main list version of the clicked item
                purchasedList.push(purchasedEntry);
                //Adds the purchased version of the item to the purchasedList array
                break
                //Stops this loop from running after a successful cross, and all the accompanying changes, are completed 
            }
        }
        
    }
} 

function viewPurchased() {
    let list = document.getElementById("listViewer");
    //Creates a variable to reference the <ul> for displaying the purchased/unpurchased items
    list.remove();
    //Removes the <ul> for displaying the purchased/unpurchased items
    let newList = document.createElement("ul");
    newList.setAttribute('id', "listViewer");
    let div = document.getElementById("listviewerDiv");
    div.appendChild(newList);
    //Creates a new <ul> with the same ID in the same spot, effectively "resetting" the list, in a way.
    purchasedList.forEach((item)=>{
    let entry = document.createElement("li");
    entry.innerHTML = item.innerHTML;
    newList.appendChild(entry);
      })
      //The few lines above execute a function that populates the <ul> with <li>'s created from the items in the purchasedList array
}

function viewUnpurchased() {
    let list = document.getElementById("listViewer");
    list.remove();

    let newList = document.createElement("ul");
    newList.setAttribute('id', "listViewer");

    let div = document.getElementById("listviewerDiv");
    div.appendChild(newList);
    //The six lines above do the same thing in this function as they do in the last
    unpurchasedList.forEach((item)=>{
        let entry = document.createElement("li");
        entry.innerHTML = item.innerHTML;
        newList.appendChild(entry);
      })
      //The few lines above execute a function that populates the <ul> with <li>'s created from the items in the unpurchasedList array
}

function clearlistViewer() {
    let list = document.getElementById("listViewer");
    list.remove();

    let newList = document.createElement("ul");
    newList.setAttribute('id', "listViewer");

    let div = document.getElementById("listviewerDiv");
    div.appendChild(newList);
    //These six lines do the same thing here, as well
}
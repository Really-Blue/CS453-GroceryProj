class ServerView{
    constructor(){
        this.buttons = document.querySelectorAll('button');
        this.searchButton = this.buttons[0];
        this.searchInput = document.querySelector('#search-input');
        this.searchButton.addEventListener('click', this._onClick);
        this.searchform = document.querySelector('#search');
        this.searchform.addEventListener('submit', this._onSearch);
        this.searchResults = document.querySelector('#results');
        //this.searchResults.textContent = '';
        this.addToList = document.querySelector('#submitItem');
        this.addToList.addEventListener('click', this._addItem);
    }
    _onTextReady(text){
        console.log(text);
    }
    
    _onResponse(response){
        return response.text();
    }

    async _onClick(){
        console.log('Reset Filter');
        location.href = window.location.href.toString();
    }
    
    async _onSearch(event){ //running into problems trying to use constructor variables, probably due to binding issues need to review
        event.preventDefault();
        
        const input = document.querySelector('#search-input');
        const word = input.value.trim();
        const result = await fetch('/searchItems?searched=' + word);//changing this so that it searches for an item
        const text = await result.text();

        const results = document.querySelector('#results');
        results.textContent = text;
        //results.textContent = "No results";
        
        //this.searchResults.textContent = text;
    }

    async _addItem(event){
        event.preventDefault();
        /*
        first check that the this.searchResults is non-empty
        then check that it doesnt have the 0 items response consider switching to "No results"
        then and only then can we attempt to add to the currently signed in users list the item +1 
        first need to scan the object list using list.hasOwnProperty(itemSearchedWithNon-ZeroResult)
        if its true then an item is in thier list so we increase the value of it by 1
        otherwise it is not in the list so we add to the object using list[itemSearchedWithNon-ZeroResult] = 1;
        this should basically be it?
        */
        const sResults = document.querySelector('#results');
        if(sResults.textContent.toString.length() !== 0 && sResults.textContent.toString !== "No results"){
            let url = new URL(window.location.href.toString());
            let currentUser = url.searchParams.get('username');
            console.log(currentUser);
            const paramet = {
                username: currentUser,
                item: currentItem
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( paramet )
            };
            let addResult = await fetch('/addToUserList', options);
        }
    }
}

/*
const results = 
[
    {
        item: "Whole Wheat Bread",
        type: "grain",
        inventory: 10
    }, 
    {
        item: "Milk",
        type: "dairy",
        inventory: 10
    },
    {
        item: "Eggs",
        type: "chicken",
        inventory: 10
    },
    {
        item: "Apple",
        type: "fruit",
        inventory: 10
    },
    {
        item: "Orange",
        type: "fruit",
        inventory: 10
    },
    {
        item: "Peas",
        type: "frozen",
        inventory: 10
    },
    {
        item: "Ice Cream",
        type: "dessert",
        inventory: 10
    },
    {
        item: "Top Sirloin",
        type: "beef",
        inventory: 10
    },
    {
        item: "Pork Ribs",
        type: "pork",
        inventory: 10
    },
    {
        item: "Root Beer",
        type: "drinks",
        inventory: 10
    },
    {
        item: "Corn",
        type: "canned",
        inventory: 10
    },
    {
        item: "Salmon",
        type: "seafood",
        inventory: 10
    }
]

function resultsTemplate(result) {
    return `
    <div class="templateBox">
        <p class="span2">${result.item}</p>
        <p class="span1">Qty: ${result.inventory}<p>
        <button class="AddRemoveButton">+</button>
    </div> 
    `
}

document.getElementById("results").innerHTML = 
`
${userSResult.map(resultsTemplate).join('')}
`
*/
const serving = new ServerView();
class ServerView{
    constructor(){
        this.body = document.querySelector('#results')
        this.body.addEventListener('click', this._addItem);
        this.buttons = document.querySelectorAll('button');
        this.searchInput = document.querySelector('#search-input');
        this.searchform = document.querySelector('#search');
        this.searchform.addEventListener('submit', this._onSearch);
        this.searchResults = document.querySelector('#results');
        this.addToList = document.querySelector('#submitItem');
    }
    /* Search for items in database and dynamically provide results */
    async _onSearch(event){
        event.preventDefault();
        
        const input = document.querySelector('#search-input');
        const word = input.value.trim();
        const result = await fetch('/searchItems?searched=' + word);
        const text = await result.text();
        let jsonArrayResults = JSON.parse(text);
        document.getElementById("results").innerHTML = 
        `
        ${jsonArrayResults.map(resultsTemplate).join('')}
        `

        let newButtons = document.getElementsByClassName('AddRemoveButton');
        for(let i = 0; i < newButtons.length; i++){
            newButtons[i].addEventListener('click', this._addItem);
        }
    }

    /* Add to list functionality */
    async _addItem(event){
        event.preventDefault();
        let value = 0;
        let currentItem = "";
        if(event.target.className == 'AddRemoveButton'){ //start of update on item inventory and user list
            let x = event.target.parentNode;
            let y = x.previousSibling.innerHTML;
            let middle = x.previousSibling;
            let z = middle.previousSibling.previousSibling.innerHTML; //Strange need to use multiple previous siblings (Template issue)
            
            currentItem = z.toString();
            value = y.toString().substring(5); //remov "Qty: " from string

            let url = new URL(window.location.href.toString());
            let currentUser = url.searchParams.get('username');
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
            let addResult = await fetch('/addToUserList', options); //end of updating items inventory and user list
            
            const listFromMongo = await fetch('/getUserList?username=' + currentUser); //Update display of user list
            let listText = await listFromMongo.text();
            let display = JSON.parse(listText);
            let listString = "";
            for(let i = 1; i < display.length; i++){
                listString += JSON.stringify(display[i]) + '\n';
            }

            let displayBox = document.querySelector('#uList');
            displayBox.textContent = listString;
        }
    }
}
/*
function resultsTemplate must be set outside of class in order to properly function.
*/
function resultsTemplate(result){
    return `
    <div class="templateBox">
        <p class="span2">${result.item}</p>
        <p class="span1">Qty: ${result.inventory}<p>
        <button class="AddRemoveButton">+</button>
    </div> 
    `
}
const serving = new ServerView();
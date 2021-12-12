class ServerView{
    constructor(){
        this.body = document.querySelector('#results')
        this.body.addEventListener('click', this._addItem);
        this.buttons = document.querySelectorAll('button');
        //this.searchButton = document.querySelector('#subber');
        this.searchInput = document.querySelector('#search-input');
        //this.searchButton.addEventListener('click', this._onClick);
        this.searchform = document.querySelector('#search');
        this.searchform.addEventListener('submit', this._onSearch);
        this.searchResults = document.querySelector('#results');
        //this.searchResults.textContent = '';
        this.addToList = document.querySelector('#submitItem');
        //this.addToList.addEventListener('click', this._addItem);
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

    async _addItem(event){
        event.preventDefault();
        let value = 0;
        let currentItem = "";
        if(event.target.className == 'AddRemoveButton'){
            let x = event.target.parentNode;
            let y = x.previousSibling.innerHTML;
            let middle = x.previousSibling;
            let z = middle.previousSibling.previousSibling.innerHTML;
            
            currentItem = z.toString();
            value = y.toString().substring(5); //remove "Qty: "
            console.log(value);
            console.log(currentItem);

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
            console.log(addResult.text());
            
            const listFromMongo = await fetch('/getUserList?username=' + currentUser);
            let listText = await listFromMongo.text();
            let display = JSON.parse(listText);
            let listString = "";
            for(let i = 1; i < display.length; i++){
                listString += JSON.stringify(display[i]);
            }

            let displayBox = document.querySelector('#uList');
            displayBox.textContent = listString;
        }
        /*
        const credential = {
                username: currentUser
            };
        const getOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( credential )
        };


        first check that the this.searchResults is non-empty
        then check that it doesnt have the 0 items response consider switching to "No results"
        then and only then can we attempt to add to the currently signed in users list the item +1 
        first need to scan the object list using list.hasOwnProperty(itemSearchedWithNon-ZeroResult)
        if its true then an item is in thier list so we increase the value of it by 1
        otherwise it is not in the list so we add to the object using list[itemSearchedWithNon-ZeroResult] = 1;
        this should basically be it?
        ///
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
        */
    }
}

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
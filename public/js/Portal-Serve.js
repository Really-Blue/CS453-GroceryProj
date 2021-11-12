class ServerView{
    constructor(){
        this.buttons = document.querySelectorAll('button');
        this.searchButton = this.buttons[0];
        this.searchInput = document.querySelector('#search-input');
        this.searchButton.addEventListener('click', this._onClick);
        this.searchform = document.querySelector('#search');
        this.searchform.addEventListener('submit', this._onSearch);
        this.searchResults = document.querySelector('#results');
        this.searchResults.textContent = ' ';
    }
    _onTextReady(text){
        console.log(text);
    }
    
    _onResponse(response){
        return response.text();
    }

    firstThing = fetch('/',
        {method: 'POST'})
        .then(this._onResponse)
        .then(this._onTextReady);
    
    async _onClick(){
        console.log('Reset Filter');
        location.href="http://localhost:3000/Portal-Serve.html";
    }
    
    async _onSearch(event){ //running into problems trying to use constructor variables
        event.preventDefault();
        
        const input = document.querySelector('#search-input');
        const word = input.value.trim();
        const result = await fetch('/fan?truth=No' + ' ' + word);
        const text = await result.text()

        const results = document.querySelector('#results');
        results.textContent = text;
        //this.searchResults.textContent = text;
    }
}

const serving = new ServerView();


/*
function onTextReady(text){
    console.log(text);
}

function onResponse(response){
    return response.text();
}

function onClick(){
    console.log('Reset Filter');
    location.href="http://localhost:3000/Portal-Serve.html";
}

const buttons = document.querySelectorAll('button');
const button = buttons[buttons.length-1];
button.addEventListener('click', onClick);

async function onSearch(event){
    event.preventDefault();
    const input = document.querySelector('#search-input');
    const word = input.value.trim();
    const result = await fetch('/fan?truth=No' + ' ' + word);
    const text = await result.text()

    const results = document.querySelector('#results');
    results.textContent = text;
}

const form = document.querySelector('#search');
form.addEventListener('submit', onSearch);

fetch('/',
    {method: 'POST'})
    .then(onResponse)
    .then(onTextReady);
*/
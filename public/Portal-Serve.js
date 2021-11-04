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
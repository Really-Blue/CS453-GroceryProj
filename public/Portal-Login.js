

function onTextReady(text){
    console.log(text);
}

function onResponse(response){
    return response.text();
}

async function onLogin(event){
    event.preventDefault();

    const uInput = document.querySelector('#username-input');
    const pInput = document.querySelector('#password-input');
    const uWord = uInput.value.trim();
    const pWord = pInput.value.trim();
    //paramet and options currently not registering through calls
    const paramet = {
        username: uWord,
        password: pWord
    };
    const options = {
        method: 'POST',
        body: JSON.stringify( paramet )
    };

    const result = await fetch('/attempt?username='+uWord+'&password='+pWord, options);
    const text = await result.text();
    if(text.toString() == 'Success'){location.href = 'Portal-Serve.html';}

    const loginInfo = document.querySelector('#loginInfo');
    loginInfo.textContent = text;
}

const loginButton = document.querySelector('#submitLogin');
loginButton.addEventListener('click', onLogin);

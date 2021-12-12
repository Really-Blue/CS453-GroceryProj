class LoginView{
    constructor(){
        this.loginButton = document.querySelector('#submitLogin');
        this.createButton = document.querySelector('#goCreate');
        this.uInput = document.querySelector('#username-input');
        this.pInput = document.querySelector('#password-input');
        this.loginInfo = document.querySelector('#loginInfo');
        this.loginButton.addEventListener('click', this._onLogin);
        this.createButton.addEventListener('click', this._onCreateU);
    }
    
    /* Perform login check */
    async _onLogin(event){
        event.preventDefault();
        
        const uInput = document.querySelector('#username-input');
        const pInput = document.querySelector('#password-input');
        const uWord = uInput.value.trim();
        const pWord = pInput.value.trim();
    
        const paramet = {
            username: uWord,
            password: pWord
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( paramet )
        };
    
        const result = await fetch('/attempt', options);
        const text = await result.text();
        if(text.toString() == 'Success'){ 
            location.href = `Portal-Serve.html?username=${uWord}`;
        }
        else{
            const loginInfo = document.querySelector('#loginInfo');
            loginInfo.textContent = text;
        }
    }

    async _onCreateU(event){
        event.preventDefault();
        location.href = 'Portal-Create.html';
    }
}
const logerview = new LoginView();
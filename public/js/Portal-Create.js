class createView{
    constructor(){
        this.creationForm = document.querySelector('#creationForm');
        this.uInput = document.querySelector('#cUser');
        this.pInput = document.querySelector('#cPass');
        this.eInput = document.querySelector('#cEmail');
        this.submissionButton = document.querySelector('#subButton');
        this.submissionButton.addEventListener('click', this._onSubmitting);
        this.returnButton = document.querySelector('#returnButton');
        this.returnButton.addEventListener('click', this._onReturn);
    }

    async _onSubmitting(event){
        event.preventDefault();

        const uInput = document.querySelector('#cUser');
        const pInput = document.querySelector('#cPass');
        const eInput = document.querySelector('#cEmail');
        const uWord = uInput.value.trim();
        const pWord = pInput.value.trim();
        const eWord = eInput.value.trim();
    
        const paramet = {
            username: uWord,
            password: pWord,
            email: eWord
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
        if(text.toString() !== 'User exists'){
            alert("Added a user to database");
        }
        else{
            alert(text);
        }
    }

    async _onReturn(event){
        event.preventDefault();
        location.href = 'Portal-Login.html';
    }
}
const createdView = new createView();
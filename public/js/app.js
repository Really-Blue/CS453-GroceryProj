class App{ //Like main.js unused but formatted to follow HW5 style
  constructor(){
      const urlPathString = window.location.pathname;
      const parts = urlPathString.split('/');
      //if parts == 0 then go to login?
      this._loginView();
      this._serveView();
    }
    
    _loginView(){
        const loginView = new LoginView();
    }

    _serveView(){
        const serverView = new ServerView();
    }
}
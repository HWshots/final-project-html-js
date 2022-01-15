export class User {
    name;
    email;
    expire;
    loggedIn = false;

    setUser(name, email, expire, loggedIn) {
        this.name = name;
        this.email = email;
        this.expire = expire;
        this.loggedIn = loggedIn;
        this.storeUser();
    }

    printUser() {
        if (this.loggedIn){
            return `Nome: ${this.name} <br>Email:${this.email} <br>Expira:${this.expire}`;
        } else {
            return "No session";
        }
        
    }

    storeUser() {
        localStorage.setItem('userName', this.name);
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('userExpire', this.expire);
        localStorage.setItem('userLoggedIn', this.loggedIn);
        console.log(this.printUser());
    }

    getUser() {
        this.name = localStorage.getItem('userName');
        this.email = localStorage.getItem('userEmail');
        this.expire = localStorage.getItem('userExpire');
        this.loggedIn = (localStorage.getItem('userLoggedIn') == "true");
        if (this.loggedIn) {
            console.log(this.printUser());
        }
    }

    isLoggedIn(){
        this.getUser()
        if (this.loggedIn) {
            return true
        }
        return false
    }

}

export default function (dom) {

const emailInput = dom.querySelector('#email');
const submit = dom.querySelector('#submit');

const text = dom.querySelector('p');

let user = new User;
submit.addEventListener('click', validate);

function validate(){
    if (!user.loggedIn){
    fetch("app/data/clients.json")
    .then(res => res.json())
    .then(jsondata => {
    jsondata.forEach(emailCheck);});
    if (!user.loggedIn) {
        updateLogin(false, "Inválido");
    }
    } else {
        updateLogin(false, "");
    }
}

function emailCheck(data){
    if (emailInput.value == data.email) {
        user.setUser(data.name, data.email, data.expire, true)
        expireCheck(data.expire);    
    }
}

function expireCheck(data){
    const date = new Date();
    let day = date.getDate();
    let mon = date.getMonth();
    let year = date.getFullYear();

    const expArray = data.split("/");
    let expDay = expArray[0];
    let expMon = expArray[1];
    let expYear = expArray[2];

    if (expDay > day && expMon >= mon && expYear >= year){
        updateLogin(true, user.printUser());
    } else {
    updateLogin(false, "Expirou: " + data);
    }
}

function updateLogin(bool, info){
    text.innerHTML = "";
    if (bool){
        submit.textContent = "Logout";
        submit.classList.add("logout");
    } else {
        submit.textContent = "Validar";
        submit.classList.remove("logout");
        user.setUser("", "", "", false)
    }
    text.innerHTML = info;
}

function init(){
    if (user.isLoggedIn()){
        updateLogin(true, user.printUser());
        expireCheck(user.expire);
    }
}

init();

}
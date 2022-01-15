import { User } from "./login.js";


export default function (dom) {

    const text = dom.querySelector('p');
    const buttons = dom.querySelectorAll('.button');

    let user = new User;

    if (user.isLoggedIn()){
        text.textContent = "Bemvindo " + user.name;
    } else {
        text.textContent = "Por favor faça login";
        buttons.forEach(element => {
            element.style.pointerEvents = "none";
        });
    }

}
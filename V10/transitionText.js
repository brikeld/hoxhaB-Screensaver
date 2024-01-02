import { textTransition } from './transition.js';

const divs = document.querySelectorAll('.train');

divs.forEach((div) => {

    div.textContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.";

    div.onclick = () => {
        textTransition(div, "veliat dolore ratione et quaerat, officia sint anim34i, ad.");
    }
    div.onclick = () => {
        textTransition(div, "veliat dolore ratione et quaerat, officia sint anim34i, ad.");
    }
})
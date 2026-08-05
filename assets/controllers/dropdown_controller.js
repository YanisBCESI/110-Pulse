import { Controller } from "@hotwired/stimulus";

export default class extends Controller{

    static targets = ["menu"];

    connect(){
        this.close = this.close.bind(this);
        document.addEventListener("click", this.close);
    }

    disconnect(){
        document.removeEventListener("click", this.close);
    }

    toggle(event){
        event.stopPropagation();
        this.menuTarget.classList.toggle("show");
    }

    close(){
        this.menuTarget.classList.remove("show");
    }
}

import { Controller } from "@hotwired/stimulus";

export default class extends Controller{

    static targets = ["menu", "imageInput"];

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

    selectImage(event){
        event.stopPropagation();
        this.imageInputTarget.click();
    }

    imageSelected(event){
        const file = event.target.files[0];
        if(!file){
            return;
        }
        this.dispatch("imageSelected", {
            detail:{
                file: file
            }
        });
        this.menuTarget.classList.remove("show");
    }
}

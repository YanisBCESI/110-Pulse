import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

    static targets = [
        "imageCanvas",
        "gridCanvas",
        "rows",
        "seats",
        "blackWhite"
    ];

    connect() {
        this.image = null;
    }

    imageSelected(event) {
        const file = event.detail.file;

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {

            const image = new Image();

            image.onload = () => {
                this.image = image;
                this.update();
            };

            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    update() {

        if (!this.image) {
            return;
        }

        this.drawImage();
        this.updateGrid();
    }

    drawImage() {

        const canvas = this.imageCanvasTarget;
        const ctx = canvas.getContext("2d");

        canvas.width = this.image.width;
        canvas.height = this.image.height;

        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height
        );

        if (this.blackWhiteTarget.checked) {
            this.convertToBlackWhite(ctx, canvas);
        }
    }

    convertToBlackWhite(ctx, canvas) {

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {

            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            const luminosity =
                0.299 * r +
                0.587 * g +
                0.114 * b;

            pixels[i] = luminosity;
            pixels[i + 1] = luminosity;
            pixels[i + 2] = luminosity;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    updateGrid() {

        if (!this.image) {
            return;
        }

        const rows = parseInt(this.rowsTarget.value);
        const seats = parseInt(this.seatsTarget.value);

        const canvas = this.gridCanvasTarget;
        const ctx = canvas.getContext("2d");

        canvas.width = seats;
        canvas.height = rows;

        ctx.drawImage(
            this.imageCanvasTarget,
            0,
            0,
            seats,
            rows
        );
    }
}
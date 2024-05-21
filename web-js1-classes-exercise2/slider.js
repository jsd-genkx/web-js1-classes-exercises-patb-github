export class ImageSlider {
  constructor(images) {
    this.images = images;
    this.currentIndex = 0;
    this.imageElement = document.getElementById("sliderImage");
    this.updateImage();
  }

  updateImage() {
    this.imageElement.src = this.images[this.currentIndex];
  }

  previousImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  // goes to random image that is not the current one
  randomImage() {
    const numberOfImages = this.images.length;
    this.currentIndex = (this.currentIndex + 1 + Math.floor(Math.random() * (numberOfImages - 1))) % numberOfImages;
    this.updateImage();
  }
}

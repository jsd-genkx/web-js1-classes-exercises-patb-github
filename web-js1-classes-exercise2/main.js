import { ImageSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
  const imageSlider = new ImageSlider([
    "images/image1.svg",
    "images/image2.svg",
    "images/image3.svg",
  ]);

  document
    .getElementById("previousButton")
    .addEventListener("click", () => imageSlider.previousImage());
  document
    .getElementById("nextButton")
    .addEventListener("click", () => imageSlider.nextImage());
  document
    .getElementById("randomButton")
    .addEventListener("click", () => imageSlider.randomImage());
});

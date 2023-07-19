// 이미지 슬라이드
let slideIndex = 0;
let previewIndex = 0;
const numVisiblePreviews = 3;
const numSlides = document.getElementsByClassName("slideshow").length;
const previewSlides = document.querySelector(".preview_slides");
const previewSlideHeight = document.querySelector(".preview_slide").offsetHeight;

showSlide(slideIndex);
updatePreviewVisibility();

function showSlide(index) {
  const slides = document.getElementsByClassName("slideshow");
  const previews = document.getElementsByClassName("preview_slide");

  Array.from(slides).forEach((slide) => {
    slide.style.display = "none";
  });

  Array.from(previews).forEach((preview) => {
    preview.classList.remove("active");
  });

  slides[index].style.display = "block";
  slideIndex = index;

  previews[index].classList.add("active");
}
function updatePreviewVisibility() {
  const slides = document.getElementsByClassName("slideshow");
  const previews = document.getElementsByClassName("preview_slide");

  Array.from(previews).forEach((preview) => {
    preview.style.display = "block";
    preview.classList.remove("active");
  });

  const activeAlt = slides[slideIndex].querySelector("img").alt;

  Array.from(previews).forEach((preview) => {
    if (preview.querySelector("img").alt === activeAlt) {
      preview.classList.add("active");
    }
  });

  showSlide(previewIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + numSlides) % numSlides;
  showSlide(slideIndex);
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % numSlides;
  showSlide(slideIndex);
}
function prevPreview() {
  previewIndex = (previewIndex - 1 + numSlides) % numSlides;
  updatePreviewVisibility();
  if (previewIndex === 0) {
    previewSlides.style.transform = `translateY(0)`;
  } else {
    previewSlides.style.transform = `translateY(-${(previewIndex - 2) * previewSlideHeight}px)`;
  }
}
function nextPreview() {
  previewIndex = (previewIndex + 1) % numSlides;
  updatePreviewVisibility();
  if (previewIndex === 0) {
    previewSlides.style.transform = `translateY(0)`;
  } else if (previewIndex > numSlides - numVisiblePreviews) {
    previewSlides.style.transform = `translateY(-${(numSlides - numVisiblePreviews) * previewSlideHeight}px)`;
  } else {
    previewSlides.style.transform = `translateY(-${previewIndex * previewSlideHeight}px)`;
  }
}
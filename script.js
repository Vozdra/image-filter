const grayscale = document.querySelector('#grayscale'),
      contrast = document.querySelector('#contrast'),
      brightness = document.querySelector('#brightness'),
      sepia = document.querySelector('#sepia'),
      saturate = document.querySelector('#saturate'),
      image = document.querySelector('#image'),
      reset = document.querySelector('#reset'),
      imgUrl = document.querySelector('#img-url'),
      saveBtn = document.querySelector('#save'),
      saveLink = document.querySelector('#save-link'),

      defaults = {
        grayscale: 0,
        contrast: 100,
        brightness: 100,
        sepia: 0,
        saturate: 100
      }

image.setAttribute('src', imgUrl.value);

grayscale.addEventListener('input', updateFilterValue);
contrast.addEventListener('input', updateFilterValue);
brightness.addEventListener('input', updateFilterValue);
sepia.addEventListener('input', updateFilterValue);
saturate.addEventListener('input', updateFilterValue);
reset.addEventListener('click', resetFilterValue);
imgUrl.addEventListener('input', changeFilteredImage);
saveBtn.addEventListener('click', saveImage);

function updateFilterValue() {

  reset.disabled = false;
  saveBtn.disabled = false;

  image.style.filter = `
    grayscale(${grayscale.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    saturate(${saturate.value}%)
  `
}

function resetFilterValue(){

  reset.disabled = true;
  saveBtn.disabled = true;
  image.style.filter = '';

  grayscale.value = defaults.grayscale,
  contrast.value = defaults.contrast,
  brightness.value = defaults.brightness,
  sepia.value = defaults.sepia,
  saturate.value = defaults.saturate

}

function changeFilteredImage() {
  image.setAttribute('src', imgUrl.value);
}

function saveImage() {

  alert("Сохранение временно не доступно... По причине того, что я - собака-как-это-сделать-еще-не-знака. Хи :)")

  // saveLink.setAttribute("href", imgUrl.value);
  // saveLink.setAttribute("download", 'image.png');
  // saveLink.click();
  
}
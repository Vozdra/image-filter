const grayscale = document.querySelector('#grayscale'),
      contrast = document.querySelector('#contrast'),
      brightness = document.querySelector('#brightness'),
      sepia = document.querySelector('#sepia'),
      saturate = document.querySelector('#saturate'),
      image = document.querySelector('#image'),
      reset = document.querySelector('#reset'),
      imgUrl = document.querySelector('#img-url'),
      saveBtn = document.querySelector('#save-btn'),
      downloadFile = document.querySelector('#download-image'),
      canvas = document.querySelector('#can-image'),
      ctx = canvas.getContext('2d')

      defaults = {
        grayscale: 0,
        contrast: 100,
        brightness: 100,
        sepia: 0,
        saturate: 100
      }

let proportion,
    canvasHeight

image.onload = function() {
  
  proportion = Math.round( (image.width / canvas.width) * 10) / 10;
  canvasHeight = Math.round( (image.height / proportion) * 10) / 10;
  canvas.height = canvasHeight;

  ctx.drawImage(image, 0, 0, canvas.width, canvasHeight);
}


grayscale.addEventListener('input', updateFilterValue);
contrast.addEventListener('input', updateFilterValue);
brightness.addEventListener('input', updateFilterValue);
sepia.addEventListener('input', updateFilterValue);
saturate.addEventListener('input', updateFilterValue);
reset.addEventListener('click', resetFilterValue);
imgUrl.addEventListener('input', changeFilteredImage);
imgUrl.addEventListener('change', uploadImage);
saveBtn.addEventListener('click', savedFile);

function updateFilterValue() {

  reset.disabled = false;
  saveBtn.disabled = false;

  ctx.filter = `
    grayscale(${grayscale.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    saturate(${saturate.value}%)
  `

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function resetFilterValue(){

  reset.disabled = true;
  saveBtn.disabled = true;
  ctx.filter = 'none';
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  grayscale.value = defaults.grayscale;
  contrast.value = defaults.contrast;
  brightness.value = defaults.brightness;
  sepia.value = defaults.sepia;
  saturate.value = defaults.saturate;

}

function changeFilteredImage() {
  image.setAttribute('src', imgUrl.value);
}

function savedFile() {
  alert("wait");
};

// upload file

let file;

function uploadImage(){
	file = this.files;
};



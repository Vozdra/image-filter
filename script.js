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
    canvasHeight,
    newImageSrc

grayscale.addEventListener('input', updateFilterValue)
contrast.addEventListener('input', updateFilterValue)
brightness.addEventListener('input', updateFilterValue)
sepia.addEventListener('input', updateFilterValue)
saturate.addEventListener('input', updateFilterValue)
reset.addEventListener('click', resetFilterValue)
imgUrl.addEventListener('change', uploadImage)
saveBtn.addEventListener('click', saveImage)
image.addEventListener('load', drawingCanvas)

let chachedSrc = localStorage.getItem('imgSrc');
image.setAttribute('src', chachedSrc ? chachedSrc : 'my-libr.jpg');

function drawingCanvas() {

  proportion = Math.round( (image.width / canvas.width) * 10) / 10;
  canvasHeight = Math.round( (image.height / proportion) * 10) / 10;
  canvas.height = canvasHeight;

  ctx.drawImage(image, 0, 0, canvas.width, canvasHeight)

}

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

function saveImage(){

  const dataUrl = canvas.toDataURL('image/jpeg')

  downloadFile.setAttribute('download','your-image.jpeg')
  downloadFile.setAttribute('href', dataUrl)
  downloadFile.click();

  clearingUpload();

  localStorage.removeItem('imgSrc');
  
}

function uploadImage(e) {

  const file = e.target.files[0];

  let formData = new FormData();
  formData.append('img', file);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php');
  xhr.send(formData);

  xhr.addEventListener('load', function() {
    newImageSrc = "img-uploads/" + file.name;
    image.setAttribute('src', newImageSrc);

    localStorage.setItem('imgSrc', newImageSrc);
    
    if (xhr.status == 200 && xhr.readyState == 4) {
      const responseBody = xhr.responseText;
      const parsedData = JSON.parse(responseBody);
  
      if(parsedData.error || parsedData.warning) {
        const errorText = parsedData.error ? parsedData.error : parsedData.warning;
        const errorElem = document.createElement('p');

        errorElem.innerHTML = errorText;
        document.querySelector('.input').append(errorElem);
      }
  
    }
    
  })
  
}

function clearingUpload() {

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'clear.php');
  xhr.send();

}



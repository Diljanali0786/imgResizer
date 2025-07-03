let cropper;
const upload = document.getElementById("upload");
const image = document.getElementById("image");
const sizeSelect = document.getElementById("size");
const qualitySelect = document.getElementById("quality");
const formatSelect = document.getElementById("format");
const download = document.getElementById("download");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    image.src = URL.createObjectURL(file);
    image.style.display = "block";

    if (cropper) cropper.destroy();

    image.onload = () => {
      cropper = new Cropper(image, {
        viewMode: 1,
        aspectRatio: getAspectRatio(),
        autoCropArea: 1,
        movable: true,
        zoomable: true,
        scalable: false,
        rotatable: false,
        cropBoxResizable: false
      });
    };
  }
});

sizeSelect.addEventListener("change", () => {
  if (cropper) {
    cropper.setAspectRatio(getAspectRatio());
  }
});

download.addEventListener("click", () => {
  if (!cropper) return;
  const canvas = cropper.getCroppedCanvas(getOutputSize());
  const quality = parseFloat(qualitySelect.value);
  const format = formatSelect.value;
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resized-photo." + format.split("/")[1];
    link.click();
  }, format, quality);
});

function getAspectRatio() {
  const [w, h] = sizeSelect.value.split("x").map(Number);
  return w / h;
}

function getOutputSize() {
  const [w, h] = sizeSelect.value.split("x").map(Number);
  return { width: w, height: h };
}

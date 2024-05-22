const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: 300 };
let currentIndex = null;
let currentCamera = null;

async function changeCamera() {
  const cameras = await Html5Qrcode.getCameras();
  if (cameras && cameras.length > 1) {
    currentIndex = currentIndex ? 0 : 1;
  } else {
    currentIndex = 0;
  }
  return cameras[currentIndex].id;
}

changeCamera().then((newCameraId) => {
  currentCamera = newCameraId;
});

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  document.querySelector("#info span").innerText = decodedText;
  document.getElementById("info").style.display = "block";
};

document.getElementById("startButton").addEventListener("click", function () {
  var scanState = html5QrCode.getState();
  if (scanState == 2) {
    html5QrCode.stop();
    this.textContent = "Start scanning";
    this.style.background = "#34bb6f";
    document.getElementById("changeCamera").style.display = "none";
  } else {
    html5QrCode.start(currentCamera, config, qrCodeSuccessCallback);
    this.textContent = "Stop scan";
    this.style.background = "#e34242";
    document.getElementById("info").style.display = "none";
    document.getElementById("changeCamera").style.display = "inline-block";
  }
});

document.getElementById("changeCamera").addEventListener("click", function () {
  html5QrCode.stop();
  changeCamera().then((newCameraId) => {
    currentCamera = newCameraId;
    html5QrCode.start(currentCamera, config, qrCodeSuccessCallback);
  });
});


// -------------------------------------------- //

const screenshotBtn = document.querySelector("#scr-btn");

screenshotPreview = document.querySelector(".src-preview");
const closeBtn = screenshotPreview.querySelector("#btn-close");

const captureScreen = async () => {
  try{
    // Asking permission to use a media input to record current tab
    const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab: true});
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata",() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      video.play();

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getVideoTracks()[0].stop();

      // document.body.appendChild(canvas);
      screenshotPreview.querySelector("img").src = canvas.toDataURL();
      screenshotPreview.classList.add("show");
    });

    video.srcObject = stream;
  } catch (error) {
    alert("Fail to capture Screenshot");
  }
}

closeBtn.addEventListener("click", () => screenshotPreview.classList.toggle("show"));
screenshotBtn.addEventListener("click" , captureScreen);
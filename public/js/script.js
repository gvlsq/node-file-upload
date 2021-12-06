class UI {
  static init() {
    const uploadArea = document.querySelector("#uploadArea");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, (e) => {
        uploadArea.classList.add("highlight");
      }, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, (e) => {
        uploadArea.classList.remove("highlight");
      }, false);
    });
  }

  static addUploadedFile(fileData) {
    let fileName = fileData.originalName;
    if (fileName.length > 26)
      fileName = fileName.substr(0, 26 - 1) + "..." + fileName.substr(fileName.length - 4, fileName.length);

    let div = document.createElement("div");
    div.classList.add("uploaded-file");
    div.innerHTML = `<img src="img/image.svg" class="document-image">
                     <div class="file-description">
                       <h3>${fileName}</h3>
                       <h4>${Helper.formatByteCount(fileData.size)}</h4>
                     </div>
                     <img src="img/link.svg" class="link-image">`;
    
    const container = document.querySelector("#container");
    const uploadArea = document.querySelector("#uploadArea");
    
    container.insertBefore(div, uploadArea);
  }
}

class Uploader {
  static async uploadFile(file) {
    if (file.type.substr(0, 6) != "image/")
      alert("Only images are accepted for upload");

    let formData = new FormData();
    formData.append("file", file);

    const response = await fetch("upload", {
      method: "POST",
      body: formData
    });
    const responseJSON = await response.json();

    const fileData = responseJSON.file;

    return fileData;
  }
}

class Helper {
  static formatByteCount(byteCount) {
    let iterations = 0;
    while (byteCount > 1024) {
      byteCount /= 1024;

      iterations++;
      if (iterations === 3) break;
    }

    let result = `${Math.floor(byteCount*100) / 100} `;
    switch (iterations) {
      case 0:
        result += "B";
        break;

      case 1:
        result += "KB";
        break;

      case 2:
        result += "MB";
        break;

      default:
        result += "GB";
        break;
    }

    return result;
  }
}

document.addEventListener("DOMContentLoaded", UI.init);
document.querySelector("#uploadArea").addEventListener("drop", async (e) => {
  const dataTransfer = e.dataTransfer;
  const files = dataTransfer.files;
  if (files.count < 1) return;

  const fileData = await Uploader.uploadFile(files[0]);
  UI.addUploadedFile(fileData);
});
document.querySelector("#uploadFileInput").addEventListener("change", async (e) => {
  const files = e.target.files;
  if (files.length < 1) return;

  const file = files.item(0);
  
  const fileData = await Uploader.uploadFile(file);
  UI.addUploadedFile(fileData);
});

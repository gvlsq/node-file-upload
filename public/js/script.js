const container = document.getElementById("container");
const uploadArea = document.getElementById("uploadArea");
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
uploadArea.addEventListener("drop", (e) => {
  const dataTransfer = e.dataTransfer;
  const files = dataTransfer.files;

  const uploadURL = "upload";

  uploadFiles([...files]);
}, false);

const uploadedFiles = document.getElementById("uploadedFiles");

const formatByteCount = (byteCount) => {
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

const truncateFileName = (fileName) => {
  let result = fileName;
  
  const maxLength = 26;
  if (fileName.length > maxLength) {
    result = fileName.substr(0, maxLength - 1) + "..." + fileName.substr(fileName.length - 4, fileName.length);
  }

  return result;
}

const uploadFiles = async (files) => {
  if (!Array.isArray(files)) files = Array.from(files);

  for (const file of files) {
    if (file.type.substr(0, 6) != "image/") {
      alert("Uploads must be images");
      break;
    }

    let formData = new FormData();
    formData.append("file", file);

    const response = await fetch("upload", {
      method: "POST",
      body: formData
    });
    const responseJSON = await response.json();

    const fileData = responseJSON.file;
    
    let uploadedFileDiv = document.createElement("div");
    uploadedFileDiv.classList.add("uploaded-file");

    let documentImage = document.createElement("img");
    documentImage.src = "img/image.svg";
    documentImage.classList.add("document-image");
    uploadedFileDiv.appendChild(documentImage);

    let fileDescriptionDiv = document.createElement("div");
    fileDescriptionDiv.classList.add("file-description");
    {
      let filenameH3 = document.createElement("h3");
      filenameH3.appendChild(document.createTextNode(truncateFileName(fileData.originalName)));
      fileDescriptionDiv.appendChild(filenameH3);

      let fileSizeH4 = document.createElement("h4");
      fileSizeH4.appendChild(document.createTextNode(formatByteCount(fileData.size)));
      fileDescriptionDiv.appendChild(fileSizeH4);
    }
    uploadedFileDiv.appendChild(fileDescriptionDiv);

    let statusImage = document.createElement("img");
    statusImage.src = "img/link.svg";
    statusImage.classList.add("link-image");
    uploadedFileDiv.appendChild(statusImage);

    container.insertBefore(uploadedFileDiv, uploadArea);
  }
}

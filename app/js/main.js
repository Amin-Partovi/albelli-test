import "../css/main.scss";
import dragElement from "./dragElement";
import download from "./download";
import modifySize from "./modifySize";

let zoom = 1;

const AppView = () => {
  document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for="fileSelector">Select an Image file</label>
                <input type="file" id="fileSelector" />
                
            </fieldset>
        </form>
        <div id="container">
          <div id="canvasBox">
          <div id="zoomIn" class="zoom">+</div>
          <div id="zoomOut" class="zoom">-</div>
            <canvas id="editorCanvas" >
              <img id="image"/>
            </canvas>
          </div>
          <div id="sideBar">
            <button id="submit" ><a id="downloadAnchorElem" >submit</a></button>
            <label id="jsonLabel">
            import json 
              <input type="file" id="jsonInput" accept=".json"/>
            </label>
          <div>
        </div>
         
       `;

  // grab DOM elements inside index.html
  const fileSelector = document.getElementById("fileSelector");
  const editorCanvas = document.getElementById("editorCanvas");
  const canvasBox = document.getElementById("canvasBox");
  let img = document.getElementById("image");
  const submitButton = document.getElementById("submit");
  var dlAnchorElem = document.getElementById("downloadAnchorElem");
  const jsonInput = document.getElementById("jsonInput");
  const zoomIn = document.getElementById("zoomIn");
  const zoomOut = document.getElementById("zoomOut");

  dragElement(editorCanvas, canvasBox);

  let modifiedHeight, modifiedWidth;
  let boxWidth, boxHeight;
  let fileName;
  let scalable = true;

  fileSelector.onchange = function (e) {
    // get all selected Files
    const files = e.target.files;
    scalable = true;
    dragElement(editorCanvas, canvasBox, 0, 0);
    let file;
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      fileName = file.name;
      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          // read Image contents from file
          const reader = new FileReader();
          reader.onload = function (e) {
            // img = new Image();
            img.src = reader.result;

            img.onload = function (e) {
              // grab some data from the image

              const naturalWidth = img.naturalWidth;
              const naturalHeight = img.naturalHeight;

              boxWidth = canvasBox.offsetWidth;
              boxHeight = canvasBox.offsetHeight;

              const size = modifySize(
                modifiedWidth,
                modifiedHeight,
                naturalWidth,
                naturalHeight,
                boxWidth,
                boxHeight
              );

              modifiedWidth = size.modifiedWidth;
              modifiedHeight = size.modifiedHeight;

              editorCanvas.width = modifiedWidth;
              editorCanvas.height = modifiedHeight;

              drawCanvas(0, 0, modifiedWidth, modifiedHeight);
            };

            // do your magic here...
          };
          reader.readAsDataURL(file);

          // process just one file.
          return;
      }
    }
  };

  function clearCanvas() {
    const ctx = editorCanvas.getContext("2d");
    ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
  }

  function drawCanvas(x, y, width, heigth) {
    const ctx = editorCanvas.getContext("2d");
    ctx.drawImage(img, x, y, width, heigth);
  }

  jsonInput.onchange = function (e) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
    scalable = false;

    function onReaderLoad(e) {
      var obj = JSON.parse(e.target.result);
      dragElement(
        editorCanvas,
        canvasBox,
        obj.canvas.photo.x,
        obj.canvas.photo.y
      );
      clearCanvas();
      drawCanvas(
        obj.canvas.photo.x,
        obj.canvas.photo.y,
        obj.canvas.photo.width,
        obj.canvas.photo.height
      );
    }
  };

  function scale(zoom) {
    let zoomWidth = modifiedWidth * zoom;
    let zoomHeigth = modifiedHeight * zoom;

    editorCanvas.width = zoomWidth;
    editorCanvas.height = zoomHeigth;

    return { zoomWidth, zoomHeigth };
  }

  zoomIn.onclick = function (e) {
    if (scalable) {
      zoom = zoom + 0.1;
      let { zoomWidth, zoomHeigth } = scale(zoom);

      clearCanvas();
      drawCanvas(0, 0, zoomWidth, zoomHeigth);
    }
  };

  zoomOut.onclick = function (e) {
    if (scalable && zoom > 1) {
      zoom = zoom - 0.1;
      let { zoomWidth, zoomHeigth } = scale(zoom);

      clearCanvas();
      drawCanvas(0, 0, zoomWidth, zoomHeigth);
    }
  };

  submitButton.onclick = function () {
    const description = {
      canvas: {
        width: boxWidth,
        height: boxHeight,
        photo: {
          id: fileName,
          width: modifiedWidth,
          height: modifiedHeight,
          x: editorCanvas.offsetLeft,
          y: editorCanvas.offsetTop,
        },
      },
    };

    download(dlAnchorElem, description, "description.json");
  };
};

AppView();

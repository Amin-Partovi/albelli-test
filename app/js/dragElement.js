export default function dragElement(element, box, offsetX = 0, offsetY = 0) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  element.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";

    if (element.offsetTop - offsetY > 0) {
      element.style.top = 0;
    }
    if (element.offsetTop - offsetY < box.offsetHeight - element.offsetHeight) {
      element.style.top = box.offsetHeight - element.offsetHeight + "px";
    }
    if (element.offsetLeft - offsetX > 0) {
      element.style.left = 0;
    }
    if (element.offsetLeft - offsetX < box.offsetWidth - element.offsetWidth) {
      element.style.left = box.offsetWidth - element.offsetWidth + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default function download(element, file, name) {
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));
  element.setAttribute("href", dataStr);
  element.setAttribute("download", name);
}

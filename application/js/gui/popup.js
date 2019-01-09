
function showMessage(msg) {
  let text = document.getElementsByTagName("p")[0];
  text.innerHTML = msg;
  showPopup();
  setTimeout(hidePopup, 2000);
}

function showPopup() {
  let popup = document.getElementById("popup");
  popup.style.marginTop = "0";
}

function hidePopup() {
  let popup = document.getElementById("popup");
  popup.style.marginTop = "-" + popup.clientHeight + "px";
}

window.onload = () => {
  let popup = document.getElementById("popup");
  popup.style.transition = "margin-top 0.3s";
  popup.style.marginTop = "-" + popup.clientHeight + "px";
}

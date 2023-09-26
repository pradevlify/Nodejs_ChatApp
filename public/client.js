const socket = io();
let cname;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
do {
  cname = prompt("please enter your name");
} while (!cname);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(msge) {
  let msg = {
    user: cname,
    message: msge.trim(),
  };
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollBottom();
  //send to server
  socket.emit("message", msg);
}
//append
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
 <h4> ${msg.user} </h4>
 <p> ${msg.message} </p>
 `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//recieve message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollBottom();
});

function scrollBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

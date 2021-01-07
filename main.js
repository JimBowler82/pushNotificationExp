const socket = io("http://localhost:5000");

const raiseBtn = document.querySelector("#raise");
const status = document.querySelector("#status");
const nameInput = document.querySelector("#name");
const topicInput = document.querySelector("#topic");

raiseBtn.addEventListener("click", () => {
  const data = {
    name: nameInput.value || "participant",
    topic: topicInput.value || "life!",
  };

  socket.emit("handRaise", data);
});

socket.on("connected", ({ socketId }) => {
  status.innerText = `Connected to server with id: ${socketId}`;
  status.className = "connected";
});

socket.on("disconnected", () => {
  status.innerText = `Connected to server with id: ${id}`;
  status.className = "connected";
});

socket.on("notify", ({ name, topic }) => {
  // In Browser Notification - mocking chakra toast
  let toast = VanillaToasts.create({
    title: `Hand Raised!`,
    text: `${name} has a question about: ${topic}`,
    type: "info",
    icon: "./images/raisehand_sm.png",
    timeout: 5000,
    positionClass: "topCenter",
    callback: function () {
      console.log("Browser notification cancelled");
    }, // executed when toast is clicked / optional parameter
  });

  // Desktop Notification
  Push.create(`${name} Has A Raised Hand!`, {
    body: `${name} has a question about: ${topic}`,
    icon: "./images/raisehand_sm.png",
    timeout: 4000,
    onClick: function () {
      window.focus();
      this.close();
    },
  });
});

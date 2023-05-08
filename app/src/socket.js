import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  events: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

// create a communication channel by sending a token which is required for validating the user
export const socket = io(URL, {
  auth: {
    token: "json-web-token",
  },
});

socket.on("connect", () => {
  state.connected = true;
  console.log("Made socket connection", socket.id);
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("Socket disconnect");
});

// reading messages from the server on event
socket.on("message_from_server", (...args) => {
  state.events.push(args);
  console.log("message_from_server data: ", args);
});

socket.on("connect_error", (err) => {
  console.log("connection error", err);
});

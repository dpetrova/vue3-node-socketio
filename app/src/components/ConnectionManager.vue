<template>
  <button @click="connect()">Connect</button>
  <button @click="disconnect()">Disconnect</button>
</template>

<script>
import { socket, state } from "../socket";

export default {
  name: "ConnectionManager",
  methods: {
    connect() {
      if (state.connected) return;
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },
  },
};
</script>

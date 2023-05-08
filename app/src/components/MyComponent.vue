<script>
import { socket } from "../socket";

export default {
  name: "MyComponent",
  data() {
    return {
      fooEvents: [],
    };
  },
  mounted() {
    // BAD:
    //strongly advise against registering event listeners in child components,
    //because it ties the state of the UI with the time of reception of the events:
    //if the component is not mounted, then some messages might be missed.
    socket.on("foo", (...args) => {
      this.fooEvents.push(args);
    });
  },
};
</script>

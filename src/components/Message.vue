<template>
  <div>
    <div
      key="{id}"
      :class="
        message.sender === this.$store.state.auth.username
          ? 'msg sent'
          : 'msg received'
      "
    >
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style scoped>
@media (max-width: 775px) {
  .msg {
    display: flex;
    padding: 20px 10px 0 20px;
    margin: 20px;
    box-shadow: 0 0 10px rgb(164, 164, 164);
    align-items: center;
  }
}

.sent {
  background-color: #395dff;
  color: white;
  /* border-top-right-radius: 1000px; */
  flex-direction: row-reverse;
  padding: 20px 20px 0 10px;
  text-align: end;
  float: right;
}

.received {
  border: 1px solid lightgray;
  background-color: #fafafa;
  float: left;
}
</style>
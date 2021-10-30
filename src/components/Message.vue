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
      <p class="msg">{{ message.message }}</p>
      <p class="time">{{ getFormattedDate(message.dttime) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    getFormattedDate(s){
      const date = `${s.substr(8,2)}/${s.substr(5,2)}/${s.substr(0,4)}`;
      const time = s.substr(11,5);
      return `${date} ${time}`;
    }
  }
};
</script>

<style scoped>
.msg {
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 2px;
}

p{
  margin: 0;
}

.received .time{
  text-align: right;
}

.sent {
  background-color: #395dff;
  color: white;
  /* border-top-right-radius: 1000px; */
  /* flex-direction: row-reverse; */
  /* padding: 20px 20px 0 10px; */
  text-align: end;
  margin-right: 10px;
  border-top-right-radius: 0px;
  float: right;
}

.received {
  border: 1px solid lightgray;
  background-color: #fafafa;
  margin-left: 10px;
  border-top-left-radius: 0px;
  float: left;
}

.time {
  font-size: 10px;
}

</style>
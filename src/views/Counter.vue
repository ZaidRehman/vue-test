<template>
  <div class="counter">
    <h1>Counter</h1>
    <div class="counter-main">
      <button id="increment" @click="increment">+</button>
      <span>{{ count }}</span>
      <button id="decrement" @click="decrement">-</button>
    </div>
  </div>
</template>

<style scoped>
button {
  color: #42b983;
  background: white;
  border: 1px solid #42b983;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  font-size: 30px;
  margin: 20px;
  cursor: pointer;
}
span {
  font-size: 30px;
  font-weight: bold;
}
</style>

<script>
export default {
  name: "counter",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count && this.count--;
    },
  },
};
</script>

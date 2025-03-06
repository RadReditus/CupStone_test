<template>
  <div id="app">
    <ChatComponent />
  </div>
</template>

<script>
import ChatComponent from './components/ChatComponent.vue';

export default {
  components: {
    ChatComponent
  }
};
</script>

<style>
/* Глобальные стили */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
</style>

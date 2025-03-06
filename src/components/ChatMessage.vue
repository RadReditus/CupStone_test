<template>
    <div :class="['message', message.role]">
      <strong v-if="message.role === 'assistant'">ИИ:</strong>
      <strong v-else>Вы:</strong>
      {{ message.content }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: Object
    }
  };
  </script>
  
  <style scoped>
  .message {
    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;
  }
  .user {
    background: #d1e7fd;
    text-align: right;
  }
  .assistant {
    background: #f1f1f1;
    text-align: left;
  }
  </style>
  
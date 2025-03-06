<template>
  <v-app>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title>
          <v-text-field
            v-model="apiToken"
            label="API Token"
            type="password"
            outlined
            dense
            @input="saveToken"
          ></v-text-field>
        </v-card-title>
        
        <v-card-subtitle class="text-h6 font-weight-bold text-center">
          Чат с ИИ-Автоконсультантом
        </v-card-subtitle>
        
        <v-card-text class="chat-box">
          <v-container>
            <v-row v-for="(message, index) in messages" :key="index" dense>
              <v-col cols="12">
                <v-sheet class="pa-3 rounded" :color="message.role === 'Вы' ? 'blue lighten-4' : 'grey lighten-3'">
                  <strong>{{ message.role }}:</strong> {{ message.content }}
                </v-sheet>
              </v-col>
            </v-row>
            <v-row v-if="isTyping" dense>
              <v-col cols="12">
                <v-sheet class="pa-3 rounded grey lighten-3">
                  <strong>ИИ:</strong> Печатает...
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        
        <v-card-actions>
          <v-text-field
            v-model="userMessage"
            label="Задайте вопрос про авто..."
            outlined
            dense
            class="flex-grow-1"
            @keyup.enter="sendMessage"
          ></v-text-field>
          
          <v-btn color="primary" @click="sendMessage">Отправить</v-btn>
          <v-btn color="error" @click="clearChat">Очистить</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  data() {
    return {
      apiToken: localStorage.getItem("apiToken") || "",
      userMessage: "",
      messages: [],
      isTyping: false,
    };
  },
  mounted() {
    // Загружаем сообщения из sessionStorage при загрузке страницы
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  },
  methods: {
    saveToken() {
      localStorage.setItem("apiToken", this.apiToken);
    },
    saveMessages() {
      // Сохраняем текущие сообщения в sessionStorage
      sessionStorage.setItem("chatMessages", JSON.stringify(this.messages));
    },
    async sendMessage() {
      if (!this.apiToken) {
        alert("Введите API токен!");
        return;
      }
      if (!this.userMessage.trim()) return;
      
      this.messages.push({ role: "Вы", content: this.userMessage });
      this.saveMessages(); // Сохраняем в sessionStorage
      this.isTyping = true;

      try {
        const response = await apiService.sendMessage(this.userMessage, this.apiToken);
        this.messages.push({ role: "ИИ", content: response });
        this.saveMessages(); // Сохраняем в sessionStorage
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        this.messages.push({ role: "ИИ", content: "Ошибка при запросе к API" });
        this.saveMessages(); // Сохраняем в sessionStorage
      }

      this.isTyping = false;
      this.userMessage = "";
    },
    clearChat() {
      this.messages = [];
      this.isTyping = false;
      sessionStorage.removeItem("chatMessages"); // Удаляем из sessionStorage
    },
  },
};
</script>

<style scoped>
.chat-box {
  max-height: 400px;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>

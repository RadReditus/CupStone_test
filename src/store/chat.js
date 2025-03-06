import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '../services/apiService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    },
    clearMessages(state) {
      state.messages = [];
    }
  },
  actions: {
    async sendMessage({ commit, state }, userInput) {
      if (!userInput.trim()) return;

      commit('addMessage', { role: 'user', content: userInput });

      try {
        const response = await apiService.sendMessage(state.messages);
        commit('addMessage', { role: 'assistant', content: response });
      } catch (error) {
        commit('addMessage', { role: 'assistant', content: 'Ошибка при получении ответа от ИИ.' });
      }
    }
  }
});

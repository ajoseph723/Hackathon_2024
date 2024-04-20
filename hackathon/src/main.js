import { createApp } from 'vue';
import App from './App.vue';
import OpenAI from "openai";
const app = createApp(App);


const openai = new OpenAI({apiKey: "sk-proj-VGt6T0UjgTiskZhAShK4T3BlbkFJaCnGP3mQN3UL0a5QuLUE", dangerouslyAllowBrowser: true});
// Define your methods
const methods = {
  // Example method
  async get_solution(query) {
    return await openai.chat.completions.create({
      messages: [{ role: "system", content: query}],
      model: "gpt-3.5-turbo",
    });}
};

// Add methods to the app instance
app.config.globalProperties.$methods = methods;

// Mount the app to a DOM element
app.mount('#app');


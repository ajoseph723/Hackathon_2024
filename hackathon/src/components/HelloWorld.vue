<template>
  <iframe id="myWidget"
        src="https://human.biodigital.com/widget/?be=2PcB&amp;background.colors=0,0,0,1,0,0,0,1&amp;initial.hand-hint=true&amp;ui-fullscreen=true&amp;ui-center=false&amp;ui-dissect=true&amp;ui-zoom=true&amp;ui-help=true&amp;ui-tools-display=primary&amp;ui-info=true&amp;uaid=3YfOR"
        width="100%"
        height="100%">
    </iframe>
    <input type="text" v-model="query">
    <button v-on:click="get_solution(query)">Send to Super intelligent definitely a doctor for analasyze</button>
    <p>{{answer}}</p>
</template>
<script>
import OpenAI from "openai";
const openai = new OpenAI({apiKey: "sk-proj-VGt6T0UjgTiskZhAShK4T3BlbkFJaCnGP3mQN3UL0a5QuLUE", dangerouslyAllowBrowser: true});
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      query: "",
      answer: ""
    };
  },
  methods: {
  // Example method
  async get_solution(query) {
    let result = await openai.chat.completions.create({
      messages: [{ role: "system", content: query}],
      model: "gpt-3.5-turbo",
    });
    this.answer = result.choices[0].message.content
  }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

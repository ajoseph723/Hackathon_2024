<template>
  <iframe id="myWidget"
        src="https://human.biodigital.com/widget/?be=2PcB&amp;background.colors=0,0,0,1,0,0,0,1&amp;initial.hand-hint=true&amp;ui-fullscreen=true&amp;ui-center=false&amp;ui-dissect=true&amp;ui-zoom=true&amp;ui-help=true&amp;ui-tools-display=primary&amp;ui-info=true&amp;uaid=3YfOR"
        width="100%"
        height="70%">
    </iframe>
    <div>
      <input v-on:click="delete_text(query)" type="text" v-model="query" v-bind:id="inputId">
    </div>
    <button v-on:click="get_solution(query)">Get Therapy</button>
    <p>{{answer}}</p>
</template>
<script>
import router from '../routes'
var bodyPart = "";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY, dangerouslyAllowBrowser: true});
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  data() {
    return {
      query: "Describe your issue that you have with the selected area",
      answer: "",
      part_of_body: "",
    };
  },
  methods: {
    // Example method
    async get_solution(query) {
      console.log(this.part_of_body);
      let result = await openai.chat.completions.create({
        messages: [{ role: "system", content: "answer this question under the pretense that you are a doctor of physical therapy and are giving adivce: my " + bodyPart + query + "please give a physical therapy routine for this." }],
        model: "gpt-3.5-turbo",
      });
      this.answer = result.choices[0].message.content
      console.log("we're schmoovin")
      router.push({
        path: '/response',
          query: {
          message: this.answer
        }})
    },

    delete_text() {
      this.query = "";
    },

  }
};
setTimeout(() => {
  if(document.getElementById("myWidget") == null){
    return;
  }
  else{
    // eslint-disable-next-line
  var human = new HumanAPI("myWidget");
  human.on("scene.objectsSelected", function (event) {
    let body_part = "";
    var selected = [];
    var deselected = [];

    // Event contains a map of objects that were selected
    // or deselected by this update.
    Object.keys(event).forEach(function (objectId) {
      if (event[objectId]) {
        selected.push(objectId);
      } else {
        deselected.push(objectId);
      }
    })
    if (selected.length == 0) {
      return;
    }
    let split_list = selected[0].split("_");
    body_part += split_list[4].split("-")[1]
    for (let i = 5; i < split_list.length - 1; i++) {
      body_part += " " + split_list[i]
    }
    bodyPart = body_part;
  });
}}, 1000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input {
  border: 1px solid #ccc;
  padding: 5px;
  width: 50%
}

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

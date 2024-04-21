<template>
      <div v-on:mouseover="get_solution($route.query.passedBodyPart)" class="responsePageText">
        <h1 class="responseHeader" >Here's your personalized therapy:</h1>
          <p class="responseText" v-html="$route.query.message.replace(/\d\./g, '<br>$&')"></p>
        </div>
</template>
  <script>
  import OpenAI from "openai";
  const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY, dangerouslyAllowBrowser: true});
  export default {
    name: 'ResponsePage',
    data() {
    return {
      answer: "",
    };
  },
    props: {

    },
    methods:{

      async get_solution(bodyPart) {
        console.log("Hello");
        let str = await openai.chat.completions.create({
          messages: [{ role: "system", content: "answer this question under the pretense that you are a doctor of physical therapy and are giving adivce:  Give me a list of 2 exercises and 2 stretches for " + bodyPart + "That contain only the names of the exercises, without numbering or formatting of any kind"}],
          model: "gpt-3.5-turbo",
        });
        console.log(str.choices[0].message.content)
        str = str.choices[0].message.content;
        console.log(str);
        var lines = str.split('\n');
    
           var result = [];

          // Iterate over each line
          lines.forEach(function(line) {
            // Remove leading and trailing whitespace
              line = line.trim();
        
              // Skip empty lines
             if (line === '') {
                return;
                }

                // Check if the line starts with "- "
                if (line.startsWith('- ')) {
            // Extract the exercise or stretch name (remove the "- " prefix)
               var name = line.substring(2);
            
                // Add the name to the result array
                result.push(name);
        }
    });
      // Result returns what you need.
    console.log(result);
}
  },
}
  </script>
  
  <style>

.responseHeader {
  font-size: 34px;
  font-weight: 700;
  color: #afafaf;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
  .responsePageText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
.responseText {
  font-size: 20px;
  color: #afafaf;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-top: 20px;
  width: 60%;
  overflow-x: auto;
}

</style>
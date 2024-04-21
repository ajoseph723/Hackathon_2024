<template>
  <div v-on:mouseover="get_solution($route.query.passedBodyPart)" class="responsePageText">
    <h1 class="responseHeader">Here's your personalized therapy:</h1>
    <p class="responseText" v-html="$route.query.message.replace(/\d\./g, '<br>$&')"></p>
  </div>
  <vue-plyr>
    <div class="plyr__video-embed">
      <iframe :src="embedUrl[0]" allowfullscreen allowtransparency allow="autoplay"></iframe>
      <iframe :src="embedUrl[1]" allowfullscreen allowtransparency allow="autoplay"></iframe>
      <iframe :src="embedUrl[2]" allowfullscreen allowtransparency allow="autoplay"></iframe>
      <iframe :src="embedUrl[3]" allowfullscreen allowtransparency allow="autoplay"></iframe>

    </div>
  </vue-plyr>
</template>
<script>
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY, dangerouslyAllowBrowser: true });
export default {
  name: 'ResponsePage',
  data() {
    return {
      answer: "",
      embedUrl: []
    };
  },
  props: {

  },
  methods: {
      getUrl(number){
        setTimeout(()=> {
          console.log(this.embedUrl[number])
          return this.embedUrl[number]
        }, 10000)
      }
    ,async get_solution(bodyPart) {
      console.log("Hello");
      let str = await openai.chat.completions.create({
        messages: [{ role: "system", content: "answer this question under the pretense that you are a doctor of physical therapy and are giving adivce:  Give me a list of 2 exercises and 2 stretches for " + bodyPart + "That contain only the names of the exercises, without numbering or formatting of any kind" }],
        model: "gpt-3.5-turbo",
      });
      str = str.choices[0].message.content;
      console.log(str);
      var lines = str.split('\n');

      var result = [];

      // Iterate over each line
      lines.forEach(function (line) {
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

      // Define your search query
      const searchTerms = result;
      searchTerms.forEach((searchTerm) => {
        searchTerm += " tutorial"
        console.log('This is the search term' + searchTerm);
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${encodeURIComponent(searchTerm)}&key=AIzaSyDC7Tjb3BX_8FVbc9xlH8IC4ECxISKUA_E`;

        
        // Construct the API request URL with the search query
        
        // Fetch data from the YouTube API
        fetch(apiUrl)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log(data);
          
          if (data.items && data.items.length > 0) {
            // Filter videos that contain the search term in their description
            const filteredVideos = data.items.filter((video) => {
              const description = video.snippet.description.toLowerCase();
              return description.includes(searchTerm.toLowerCase());
            });
            
            if (filteredVideos.length > 0) {
              // Retrieve video ID and title from the first filtered video
              const videoId = filteredVideos[0].id.videoId;
              const videoTitle = filteredVideos[0].snippet.title;
              console.log("Video Title:", videoTitle);
              
              // Construct the embed URL using the retrieved video ID
              console.log("kill me i'm tired")
              this.embedUrl.push(`https://www.youtube.com/embed/${videoId}`);
              console.log("Embed URL:", this.embedUrl);
              
              // Now you can process or display the filtered video as needed
            } else {
              console.error("No videos found matching the search term.");
            }
          } else {
            console.error("No items found in the API response.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data from YouTube API:", error);
        });
      })
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
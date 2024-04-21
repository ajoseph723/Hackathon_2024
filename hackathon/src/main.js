import { createApp } from 'vue';
import router from './routes.js';
import App from './App.vue';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

console.log("hello")

// Define your search query
const searchTerm = "Lat stretch";

// Construct the API request URL with the search query
const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${encodeURIComponent(searchTerm)}&key=AIzaSyDC7Tjb3BX_8FVbc9xlH8IC4ECxISKUA_E`;

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
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        console.log("Embed URL:", embedUrl);

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

createApp(App)
    .use(VuePlyr, {
        plyr: {}
    })
    .use(router)
    .mount('#app');

<template>
        <h1>Here's a respone from a real licesnesed pracTITionar</h1>
        <p>{{ $route.query.message }}</p>
        <vue-plyr>
          <div class="plyr__video-embed">
            <iframe
              src="https://www.youtube.com/embed/lf8cleyFDYM"
              allowfullscreen
              allowtransparency
              allow="autoplay"
            ></iframe>
          </div>
        </vue-plyr>
</template>
  <script>
  export default {
    name: 'ResponsePage',
    props: {
    }
  };
  </script>
  
  
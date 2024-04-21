<template>
        <h1>Here's a respone from a real licesnesed pracTITionar</h1>
        <p :style="{color: 'red'}">{{ $route.query.message }}</p>
</template>
  <script>
  export default {
    name: 'ResponsePage',
    props: {
    }
  };
  </script>
  
  
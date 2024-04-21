<template>
        <h1>Here's your personalized therapy!!!!</h1>
        <p :style="{color: 'red'}">{{ $route.query.message }}</p>
</template>
  <script>
  export default {
    name: 'ResponsePage',
    props: {
    }
  };
  </script>
  
  
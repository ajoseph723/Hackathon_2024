<template>
        <h1>Here's your personalized therapy!!!!</h1>
        <p :style="{backgroundColor: 'white', color: 'black', lineHeight: 1.75, fontSize: 'calc(0.5em + 1vw)', border: '2px solid black', borderRadius: '50px', padding: '30px', textAlign: 'justify', height: '40%'}">
        {{ $route.query.message }}
        </p>
</template>
  <script>
  export default {
    name: 'ResponsePage',
    props: {
    }
  };
  </script>
  
  
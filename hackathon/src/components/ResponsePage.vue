<template>
      <div class="responsePageText">
        <h1 class="responseHeader">Here's your personalized therapy:</h1>
          <p class="responseText" v-html="$route.query.message.replace(/\d\./g, '<br>$&')"></p>
        </div>
</template>
  <script>
  export default {
    name: 'ResponsePage',
    props: {
    }
  };
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
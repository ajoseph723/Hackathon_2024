<template>
  <iframe id="myWidget"
        src="https://human.biodigital.com/widget/?be=2PcB&amp;background.colors=0,0,0,1,0,0,0,1&amp;initial.hand-hint=true&amp;ui-fullscreen=true&amp;ui-center=false&amp;ui-dissect=true&amp;ui-zoom=true&amp;ui-help=true&amp;ui-tools-display=primary&amp;ui-info=true&amp;uaid=3YfOR"
        width="100%"
        height="100%">
    </iframe>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
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

<template>
  <div class="left">
    <ul>
      <li class="active"><router-link to="/foundmusic">发现音乐</router-link></li>
    </ul>
  </div>
</template>

<script>
</script>

<style scoped>
  .left {
    vertical-align: top;
    font-size: 22px;
    margin-top: 70px;
    display: inline-block;
    width: 15%;
    height: calc(100vh - 140px);
    background-color: rgb(240, 240, 240);
    border-right: 1px solid rgb(220, 220, 220);
  }
  .left ul li {
    padding: 10px;
    text-align: center;
    list-style-type: none;
  }
  .left ul li:hover {
    background-color: rgb(220, 220, 220);
  }
  .left ul li a {
    color: rgb(32, 32, 32);
  }
  .left ul li a:visited {
    text-decoration: none;
  }
  .active {
    background-color: rgb(220, 220, 220);
  }
</style>
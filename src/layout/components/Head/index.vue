<template>
  <div class="header">
    <ul>
      <li><a href="javascript:void(0)" class="active">LMusic</a></li>
      <div style="clear: both;"></div>
    </ul>
    <span class="gopre glyphicon glyphicon-chevron-left" @click="gopre"></span>
    <span class="gonex glyphicon glyphicon-chevron-right" @click="gonex"></span>
    <SearchBar></SearchBar>
  </div>
</template>

<script setup>
import SearchBar from "@/components/SearchBar/index.vue"
import {useRouter} from "vue-router"

const router = useRouter()
function gopre() {
  router.go(-1);
}
function gonex() {
  router.go(1);
}
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 85.4%;
  width: 100%;
  height: 70px;
  background-color: rgb(240, 240, 240);
  border-bottom: 1px solid rgb(220, 220, 220);
}
.header>ul {
  width: 25%;
  display: inline-block;
  height: 70px;
}
.header > ul > li {
  line-height: 70px;
  list-style-type: none;
  float: left;
  margin-left: 30px;
}
.header > ul > li a {
  text-decoration: none;
  color: gray;
  font-size: 30px;
  font-family: "楷体";
}
.header ul li a:hover {
  text-decoration: none;
}
.gopre {
  margin-right: 10px;
}
.gopre, .gonex {
  margin-top: 20px;
  border: 1px solid rgb(220, 220, 220) !important;
  vertical-align: top;
}
.glyphicon-chevron-left,
.glyphicon-chevron-right {
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  color: gray;
  background-color: rgb(240, 240, 240);
  border: 1px solid white;
  border-radius: 30px;
}
.glyphicon-chevron-left:hover,
.glyphicon-chevron-right:hover {
  background-color: rgb(220, 220, 220);
  cursor: pointer;
}
</style>
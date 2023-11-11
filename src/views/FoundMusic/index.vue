<template>
  <div class="right">
    <ul ref="head">
      <li><a href="#/foundmusic/gedan" :class="{ 'active': path_id == 0 }">歌单</a></li>
      <li><a href="#/foundmusic/paihangbang" :class="{ 'active': path_id == 1 }">排行榜</a></li>
      <li><a href="#/foundmusic/newmusic" :class="{ 'active': path_id == 2 }">最新音乐</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
let route = useRoute()
let path_id = ref(0)

let head = ref(null)
function change_active(path) {
  if (path === "/foundmusic/gedan") {
    path_id.value = 0
  } else if (path === "/foundmusic/paihangbang") {
    path_id.value = 1
  } else if (path === "/foundmusic/newmusic") {
    path_id.value = 2
  }
}
change_active(route.fullPath)
watch(() => route.fullPath, (newValue) => {
  change_active(newValue)
})
</script>

<style scoped>
.right {
  vertical-align: top;
  margin-top: 70px;
  margin-bottom: 70px;
  display: inline-block;
  width: 85%;
  height: calc(100vh - 140px);
  overflow: auto;
  background-color: rgb(240, 240, 240);
}

.right ul {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 52px;
  background-color: rgb(240, 240, 240);
  padding: 10px;
}

.right ul li {
  list-style-type: none;
  display: inline-block;
  font-size: 22px;
  margin: 0 20px;
}

.right ul li a {
  color: gray;
}

.active {
  color: black !important;
  font-weight: bold;
}
</style>
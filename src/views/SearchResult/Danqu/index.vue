<template>
  <div class="danqu">
    <MusicList :songs="search_songs"></MusicList>
    <div v-if="total_pages > 1" class="page">
      <ul class="pagination">
        <li><a href="javascript:void(0);" @click="pre_page">&laquo;</a></li>
        <li v-for="i in total_pages" :key="i">
          <a @click="to_page" :data-index="i" href="javascript:void(0);" :class="i == page ? 'active_page' : ''">{{ i
          }}</a>
        </li>
        <li><a href="javascript:void(0);" @click="next_page">&raquo;</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import MusicList from "@/components/MusicList/index.vue"
import { search_api } from "@/api/search/index.js"

const emit = defineEmits(['send_msg'])
const route = useRoute()
let search_songs = ref([])
let songcount = ref(0)
let page = ref(1)
let total_pages = ref(0)
let search_key = ref(route.query.keywords)

function callback(res) {
  search_songs.value = res.data.result.songs;
  songcount.value = res.data.result.songCount;
  total_pages.value = Math.ceil(res.data.result.songCount / 100);
  emit("send_msg", `找到${res.data.result.songCount}首单曲`);
}

function pre_page() {
  if (page.value > 1) page.value -= 1;
}
function next_page() {
  if (page.value < total_pages.value) page.value += 1;
}
function to_page(e) {
  page.value = parseInt(e.target.dataset.index);
}

search_api.search_songs(search_key.value).then(callback)

watch(page, () => {
  search_songs.value = []
  search_api.search_songs(search_key.value, (page.value - 1) * 100).then(callback)
})

watch(() => route.query, (to, from) => {
  if (to.keywords !== from.keywords) {
    search_key.value = to.keywords
    search_api.search_songs(search_key.value).then(callback)
  }
})

</script>

<style scoped>
.danqu {
  width: 100%;
  background-color: rgb(240, 240, 240);
}

.music {
  position: relative;
  z-index: 0;
}

.music_head {
  height: 46px;
  line-height: 46px;
}

.music_head ul {
  list-style-type: none;
  position: relative;
}

.music_head ul li {
  float: left;
}

.btns {
  width: 13%;
  height: 46px;
  text-align: center;
}

.btns span {
  margin-right: 10px;
}

.btns:hover span {
  cursor: pointer;
}

.song_name {
  width: 37%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.song_artist {
  width: 18%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.zhuanji {
  width: 22%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.song_time {
  width: 10%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.music_lists>ul {
  position: relative;
  list-style-type: none;
}

.music_lists>ul>li {
  height: 46px;
  line-height: 46px;
  background-color: rgb(240, 240, 240);
  border-bottom: 1px solid white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.music_lists>ul>li:hover {
  background-color: rgb(220, 220, 220);
}

.music_lists>ul>li>div {
  float: left;
}

.page {
  width: 40%;
  text-align: center;
  margin: 0 auto;
}

.pagination li a {
  background-color: rgb(230, 230, 230);
  color: black;
}

.mv_box {
  display: none;
  position: absolute;
  top: 20%;
  left: 30%;
  z-index: 9999999;
  width: 500px;
}

.mv_box video {
  width: 500px;
}

.active_page {
  background-color: rgb(210, 210, 210) !important;
}

.active_text {
  color: brown;
}

.active {
  background-color: rgb(210, 210, 210) !important;
}
</style>
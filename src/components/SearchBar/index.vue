<template>
  <div class="search">
    <span class="glyphicon glyphicon-search" @click="search"></span>
    <input ref="search_text_ref" type="text" placeholder="搜索音乐" @keyup="input_enter" @focus="show = true" />
    <div class="search_info" :class="{ show: show }" ref="search_info_ref">
      <div class="search_hot" v-if="search_text === ''">
        <h3>热搜榜</h3>
        <ul>
          <li v-for="(item, i) in search_hot" :key="i" @click="set_input">
            <span :style="{ color: i < 3 ? 'red' : '' }">{{ i + 1 }}</span>
            <span class="hot_word" :style="{ fontWeight: i < 3 ? 'bold' : '' }">{{ item.searchWord }}</span>
            <span class="score">{{ item.score }}</span>
          </li>
        </ul>
      </div>
      <div class="search_result" v-else>
        <ul>
          <li class="title" style="background-color: rgb(200, 200, 200)">单曲</li>
          <li v-for="i in search_songs" :key="i.id" @click="set_input">
            <span></span>
            <span>{{ i.name }}</span>
          </li>
          <li class="title" style="background-color: rgb(200, 200, 200)">歌单</li>
          <li v-for="j in search_gedan" :key="j.id" @click="set_input">
            <span></span>
            <span>{{ j.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { search_api } from "@/api/search/index"

const router = useRouter()

let search_hot = ref([])
let search_result = ref("")
let search_songs = ref("")
let search_gedan = ref("")
let search_text = ref("")
let show = ref(false)
// 定时器
let timer = ref(null)
// 元素dom
let search_info_ref = ref(null)
let search_text_ref = ref(null)

watch(show, (value) => {
  if (value) {
    addEventClick();
  }
});
function addEventClick() {
  window.addEventListener("click", closeSidebar, { passive: true });
}
function closeSidebar(evt) {
  // 在搜索结果面板里点击不收起面板，点击外面收起面板
  let parent = evt.target.closest(".search_info");
  let input = evt.target.closest("input")
  if (!parent && show.value && !input) {
    show.value = false;
    window.removeEventListener("click", closeSidebar);
  }
}
addEventClick()

function search() {
  let search = search_text_ref.value;
  let value = search.value.trim();
  if (value == "") return;
  // let id = Math.floor(Math.random() * 3000)
  // router.push(`/search/${id}/?keywords=${value}`);
  router.push(`/search/?keywords=${value}`)
  // console.log(`/search/${id}/?keywords=${value}`)
}
// 获取搜索框内容
function get_input() {
  let search = search_text_ref.value;
  let text = search.value.trim();
  return text;
}
// 输入检测处理函数
function input_enter(e) {
  if (e.keyCode === 13) {
    search(); // 回车搜索
  } else {
    search_text.value = get_input();
    if (timer.value == null) {
      if (search_text.value !== "") {
        search_api.search_suggest(search_text.value).then(callback2)
      }
      timer.value = setTimeout(() => {
        timer.value = null;
      }, 100);
    }
  }
}
function set_input(e) {
  // console.log(e.currentTarget)
  search_text_ref.value.value = e.currentTarget.children[1].innerText
  show.value = false
}

// 获取搜索建议
function callback2(res) {
  search_result.value = res.data;
  search_songs.value = res.data.result.songs;
  search_gedan.value = res.data.result.playlists;
}
// 获取热搜建议
search_api.search_hot().then((res) => {
  search_hot.value = res.data.data;
})
</script>

<style scoped>
ul {
  list-style: none;
}

.show {
  display: block;
}

.search {
  vertical-align: top;
  margin: 15px 0;
  margin-left: 30px;
  width: 260px;
  background-color: rgb(240, 240, 240);
  display: inline-block;
  height: 40px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 40px;
}

.search>span {
  margin: 12px;
}

.search>span:hover {
  font-weight: bold;
  cursor: pointer;
}

.search input {
  vertical-align: top;
  background-color: rgb(240, 240, 240);
  font-size: 15px;
  height: 20px;
  line-height: 20px;
  width: 70%;
  border: 0;
  outline: none;
  color: gray;
  cursor: text;
  position: relative;
  top: 10px;
}

.search_info {
  display: none;
  width: 350px;
  height: 430px;
  overflow: auto;
  scrollbar-width: none;
  position: relative;
  right: 30px;
  background-color: rgb(220, 220, 220);
  border-radius: 10px;
}

.search_info::-webkit-scrollbar {
  display: none;
}

.search_hot ul li {
  height: 60px;
  line-height: 60px;
  width: 100%;
  padding-left: 20px;
}

.search_hot h3 {
  margin-left: 20px;
}

.search_hot ul li:hover,
.search_result ul li:hover {
  background-color: rgb(200, 200, 200);
  cursor: pointer;
}

.search_result li {
  padding-left: 20px;
}

.hot_word {
  margin: 0 20px;
}

.score {
  font-size: 10px;
  position: relative;
  top: -3px;
}

.search_result ul li {
  height: 30px;
  line-height: 30px;
  width: 100%;
}

.active {
  color: black !important;
  font-weight: bold;
}
</style>

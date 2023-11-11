<template>
  <div class="gedan">
    <ul class="gedan-list">
      <li v-for="i in datas" :key="i.id">
        <img :data-src="i.coverImgUrl" v-lazy="i.coverImgUrl" alt="加载中..." @click="show_info" :gedan_id="i.id || ''"
          draggable="false" />
        <!-- <img :src="" alt="" @click="show_info"> -->
        <span>{{ i.name }}</span>
      </li>
      <div style="clear: both"></div>
    </ul>
    <div class="page">
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
import { useRouter } from "vue-router"
import { gedan_api } from "@/api/gedan/index"

const router = useRouter()
let datas = ref("")
let first_part = ref("")
let second_part = ref("")
let page = ref(1)
let total_pages = ref(0)

function first(result) {
  if (result.status !== 200) return;
  first_part.value = result.data.playlists;
  datas.value = [...first_part.value, ...datas.value];
  total_pages.value = Math.ceil(result.data.total / 100);
}
function second(result) {
  if (result.status !== 200) return;
  second_part.value = result.data.playlists;
  datas.value = [...datas.value, ...second_part.value];
}

function show_info(e) {
  // 跳转到歌单详情页
  router.push(`/gedaninfo?id=${e.target.attributes.gedan_id.value}`);
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


gedan_api.gedan_data((page.value - 1) * 50).then(first)
gedan_api.gedan_data(page.value * 50).then(second)

watch(page, () => {
  datas.value = [];
  gedan_api.gedan_data((page.value * 2 - 2) * 50).then(first)
  // if (page.value < total_pages.value) {
  //   gedan_api.gedan_data((page.value * 2 - 1) * 50).then(second)
  // } else if (total_pages.value % 100 > 50) {
    gedan_api.gedan_data((page.value * 2 - 1) * 50).then(second)
  // }
})

</script>

<style scoped>
.gedan {
  margin-top: 51px;

}

.head {
  width: 800px;
  height: 200px;
  margin: 0px auto;
  margin-top: 70px;
  border-radius: 10px;
}

.head img {
  border-radius: 10px;
  width: 200px;
  height: 200px;
}

.gedan-list {
  padding-top: 30px;
  margin-left: 90px;
}

.gedan-list li {
  list-style-type: none;
  float: left;
  width: 23%;
  height: 230px;
  line-height: 1.4;
}

.gedan-list li span {
  display: block;
  text-align: left;
  margin-top: 10px;
  width: 160px;
  height: 70px;
  overflow: hidden;
  word-wrap: normal;
  white-space: normal;
  text-overflow: ellipsis;
}

.gedan-list img {
  width: 160px;
  border-radius: 10px;
}

.gedan img:hover {
  cursor: pointer;
}

.page {
  width: 40%;
  margin: 0 auto;
}

.pagination li a {
  background-color: rgb(230, 230, 230);
  color: black;
}

.active_page {
  background-color: rgb(210, 210, 210) !important;
}
</style>
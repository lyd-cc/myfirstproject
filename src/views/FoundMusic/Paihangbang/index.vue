<template>
  <div class="paihangbang">
    <ul class="gedan-list">
      <li v-for="i in datas" :key="i.id">
        <img :src="i.coverImgUrl" alt="无法显示" @click="show_info" :gedan_id="i.id || ''" draggable="false" />
        <span>{{ i.name }}</span>
      </li>
      <div style="clear: both"></div>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { gedan_api } from "@/api/gedan/index.js"

const router = useRouter()
let datas = ref('')

function callback(result) {
  if (result.status !== 200) return;
  datas.value = result.data.list;
}
function show_info(e) {
  // 跳转到歌单详情页
  router.push(`/gedaninfo?id=${e.target.attributes.gedan_id.value}`);
}

gedan_api.gedan_paihangbang().then(callback)

</script>

<style scope>
.paihangbang {
  margin-top: 51px;
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

.gedan-list img:hover {
  cursor: pointer;
}
</style>
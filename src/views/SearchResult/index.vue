<template>
  <div class="search_contain">
    <h2>{{ search_msg }}</h2>
    <ul class="head">
      <li><a :href="'#/search/danqu?keywords=' + search_key" class="active">单曲</a></li>
      <li><a href="javascript:void(0);">歌手</a></li>
      <li><a href="javascript:void(0);">专辑</a></li>
      <li><a href="javascript:void(0);">视频</a></li>
      <li><a href="javascript:void(0);">歌单</a></li>
      <div style="clear: both;"></div>
    </ul>
    <router-view @send_msg="get_msg"></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const emit = defineEmits(['send_msg'])
const route = useRoute()

let search_msg = ref("")
let search_key = ref(route.query.keywords)

function get_msg(res) {
  search_msg.value = res
}

watch(() => route.query, (Newvalue, Oldvalue) => {
  if(Newvalue.keywords !== Oldvalue.keywords)
  search_key.value = Newvalue.keywords
})
// 以下监听新值和旧值输出一样
// watch(route, (to, from) => {
//   console.log(to.query.keywords)
//   console.log(from.query.keywords)
//   search_key.value = route.query.keywords
// })

</script>

<style scoped>
.search_contain {
  vertical-align: top;
  margin-top: 70px;
  margin-bottom: 70px;
  display: inline-block;
  width: 85%;
  height: calc(100vh - 140px);
  background-color: rgb(240, 240, 240);
  overflow: auto;
  padding-left: 30px;
}

.head {
  background-color: rgb(240, 240, 240);
  height: 30px;
  line-height: 30px;
}

.head li {
  list-style-type: none;
  float: left;
  margin-right: 20px;
  font-size: 16px;
}

.head li a {
  color: black;
}

.head li a:hover {
  text-decoration: none;
}

.active {
  font-weight: bold;
  border-bottom: 3px solid red;
  border-radius: 2px;
}
</style>
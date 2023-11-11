<template>
  <div class="gedaninfo">
    <div class="head">
      <div class="contain">
        <div class="image">
          <img :src="gedan.coverImgUrl" alt="" />
        </div>
        <div class="info">
          <h1 class="title">{{ gedan.name }}</h1>
          <div class="bottom_show">
            <span>标签:
              <a href="" v-for="i in gedan.tags" :key="i">{{ i }} /</a></span><br />
            <span style="margin-right: 10px">歌曲: {{ gedan.trackCount }}</span><span>播放: {{ gedan.playCount / 10000
            }}万</span><br />
            <span :title="gedan.description" id="descript">简介: {{ gedan.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <MusicList @sendsong="send_song" :songs="songs"></MusicList> -->
    <MusicList :songs="songs"></MusicList>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { gedaninfo_api } from "@/api/gedaninfo/index"
import MusicList from "@/components/MusicList/index.vue"
import { useMusicStore } from "@/store/modules/musicstore.js"

const musicStore = useMusicStore()
const route = useRoute()
// const emit = defineEmits(['sendsong', 'sendsongs'])
let id = ref("")
let gedan = ref("")
let songs = ref([])

// function send_song(e) {
//   emit('sendsong', e)
// }

// checkmusic(song) {
//   this.get_songs_data(`/check/music?id=${song.id}`, (res) => {
//     song.can_play = res.data.success;
//     song.message = res.data.message;
//     // this.songs.push(song)
//     // console.log(song.id + " : " + song.can_play + " : " + song.message)
//   });
// },

// 获取歌曲(回调函数)
function callback(res) {
  songs.value = res.data.songs;
}
// 获取歌单信息(回调函数)
function get_gedan(res) {
  gedan.value = res.data.playlist;
}
// 歌单id为路由携带的id参数
id.value = route.query.id;
// 获取歌单的所有歌曲
gedaninfo_api.gedan_songs(id.value).then(callback)
.then(() => {
  musicStore.setsongs(songs.value)
  musicStore.addsongList(songs.value)
})
// 获取歌单详情
gedaninfo_api.gedan_detail(id.value).then(get_gedan)

// onUpdated(() => {
//   // 将获取到的歌单的所有歌曲发给App.vue
//   // emit("sendsongs", songs.value);
  
// })
</script>

<style scoped>
.gedaninfo {
  vertical-align: top;
  margin-top: 70px;
  margin-bottom: 70px;
  display: inline-block;
  width: 85%;
  height: calc(100vh - 140px);
  background-color: rgb(240, 240, 240);
  overflow: auto;
}

.head {
  height: 230px;
  overflow: hidden;
  /*background-color: brown;*/
}

.contain {
  vertical-align: top;
  height: 200px;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  /*background-color: aquamarine;*/
}

.image {
  vertical-align: top;
  /*background-color: antiquewhite;*/
  width: 200px;
  height: 200px;
  display: inline-block;
  margin-right: 20px;
  border-radius: 10px;
}

.image img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.info {
  vertical-align: top;
  display: inline-block;
  width: 400px;
  height: 200px;
  /*background-color: antiquewhite;*/
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
}

.bottom_show {
  position: relative;
  top: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#descript {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<template>
  <div>
    <div class="music">
      <div class="music_head">
        <ul>
          <li class="btns"></li>
          <li class="song_name">音乐标题</li>
          <li class="song_artist">歌手</li>
          <li class="zhuanji">专辑</li>
          <li class="song_time">时长</li>
          <div style="clear: both"></div>
        </ul>
      </div>
      <div class="music_lists">
        <ul ref="musics">
          <li v-for="(i, index) in songs" :key="i.id" :class="{'active': i.id==playing_id}">
            <div class="btns">
              <span :class="{'active_text': i.id==playing_id}" class="glyphicon glyphicon-play" :index="index" @click="music_play" :song_id="i.id"></span>
              <span v-if="checkmv(i) !== 0" class="glyphicon glyphicon-facetime-video" @click="video_play" :mv_id="checkmv(i)"></span>
            </div>
            <div :class="{'active_text': i.id==playing_id}" class="song_name" :title="i.name">{{ i.name }}</div>
            <div class="song_artist" :title="ar_name(checkar(i))">
              {{ ar_name(checkar(i)) }}
            </div>
            <div class="zhuanji" :title="checkal(i).name">{{ checkal(i).name }}</div>
            <div class="song_time">{{ changeTime(checkdt(i)) }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mv_box" ref="mv">
      <button @click="close_mv" style="float: right">关闭</button>
      <video :src="mv_url" controls autoplay></video>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { changeTime, ar_name, checkar, checkal, checkdt, checkmv } from "@/uitls/tools.js"
import { gedaninfo_api } from "@/api/gedaninfo/index.js"
import { useMusicStore } from "@/store/modules/musicstore.js"

const musicStore = useMusicStore()
const props = defineProps(["songs"])
let songList = ref(musicStore.songs)
let mv_url = ref("")
let playing_id = ref(musicStore.playing_id)

// 获取dom
let musics = ref(null)
let mv = ref(null)
// 播放音乐
function music_play(e) {
  let song_id = e.target.attributes.song_id.value
  let index = e.target.attributes.index.value
  let f = true
  // console.log(songList.value)
  // console.log(musicStore.songs)
  // 需要查看播放列表有没有这首歌, 没有就添加进播放列表
  for(let i=0; i<songList.value.length; i++) {
    if(songList.value[i].id == props.songs[index].id) {
      f = false
      break
    }
  }
  if(f) {
    musicStore.addsong(props.songs[index])
  }
  musicStore.changPlay(song_id)
}
// 监听状态管理的songs值, 因为修改songs时是赋值修改, 响应式获取不到更新的值
// 需要通过watch监听(playing_id一样)
watch(() => musicStore.songs, (newValue) => {
  songList.value = newValue
})
watch(() => musicStore.playing_id, (newValue) => {
  playing_id.value = newValue
})

// 播放mv
function video_play(e) {
  gedaninfo_api.mv_info(e.target.attributes.mv_id.value).then(callback2)
  mv.value.style.display = "block";
}
// 关闭mv
function close_mv() {
  mv.value.style.display = "none";
  mv_url.value = "";
}
// 获取mv的url(回调函数)
function callback2(res) {
  mv_url.value = res.data.data.url;
}

</script>

<style scoped>
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

.active_text {
  color: brown;
}

.active {
  background-color: rgb(210, 210, 210) !important;
}
</style>


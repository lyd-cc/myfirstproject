<template>
  <div class="newmusic">
    <div class="music">
      <div class="music_lists">
        <ul ref="musics">
          <li v-for="(i, index) in datas" :key="i.id" :class="{'active': i.id==playing_id}">
            <div class="image">
              <img v-lazy="i.album.picUrl" alt="" width="60" height="60" @click="music_play" :song_id="i.id">
            </div>
            <div class="btns">
              <span :class="{'active_text': i.id==playing_id}" class="glyphicon glyphicon-play play_btn" :index="index" @click="music_play" :song_id="i.id"></span>
              <span v-if="i.mvid !== 0" class="	glyphicon glyphicon-facetime-video" @click="video_play"
                :mv_id="i.mvid"></span>
            </div>
            <div :class="{'active_text': i.id==playing_id}" class="song_name" :title="i.name">{{ i.name }}</div>
            <div class="song_artist" :title="ar_name(i.artists)">
              {{ ar_name(i.artists) }}
            </div>
            <div class="zhuanji" :title="i.album.name">{{ i.album.name }}</div>
            <div class="song_time">{{ changeTime(i.duration) }}</div>
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
import { changeTime, ar_name } from "@/uitls/tools.js"
import { newmusic_api } from "@/api/newmusic/index.js"
import { gedaninfo_api } from "@/api/gedaninfo/index.js"
import { useMusicStore } from "@/store/modules/musicstore.js"

const musicStore = useMusicStore()
// let emit = defineEmits(['newmusicplay'])
let datas = ref("")
let mv_url = ref("")
let songList = ref(musicStore.songs)
let playing_id = ref(musicStore.playing_id)

// 获取dom
let musics = ref(null)
let mv = ref(null)

function callback(res) {
  datas.value = res.data.data;
}
function callback2(res) {
  mv_url.value = res.data.data.url
}
function music_play(e) {
  let song_id = e.target.attributes.song_id.value
  let index = e.target.attributes.index.value
  let f = true
  for(let i=0; i<songList.value.length; i++) {
    if(songList.value[i].id == datas.value[index].id) {
      f = false
      break
    }
  }
  if(f) {
    musicStore.addsong(datas.value[index])
  }
  musicStore.changPlay(song_id)
}
function video_play(e) {
  // 根据mv_id获取mv信息(url)
  gedaninfo_api.mv_info(e.target.attributes.mv_id.value).then(callback2)
  mv.value.style.display = 'block'
}
function close_mv() {
  mv.value.style.display = 'none'
  mv_url.value = ''
}
// 获取最新音乐列表
newmusic_api.new_music().then(callback)

watch(() => musicStore.playing_id, (newValue) => {
  playing_id.value = newValue
})
</script>

<style scoped>
.newmusic {
  margin-top: 51px;
}

.music {
  margin-top: 70px;
  border-top: 1px solid white;
}

.image img {
  text-align: center;
  border-radius: 10px;
  margin-left: 20px;
  
}

.image img:hover {
  cursor: pointer;
}

.btns {
  width: 10%;
  text-align: center;
}

.btns span {
  position: unset;
  margin-left: 10px;
}

.btns:hover span {
  cursor: pointer;
}

.song_name {
  width: 30%;
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
  list-style-type: none;
}

.music_lists>ul>li {
  height: 80px;
  line-height: 80px;
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
}</style>
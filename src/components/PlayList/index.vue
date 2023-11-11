<template>
  <div class="play_list" ref="play_list" :class="{'show': list_show}">
    <h3>当前播放</h3>
    <p class="total">总{{ songs.length }}首</p>
    <ul class="lists">
      <li :song_id="i.id" v-for="(i, index) in songs" :key="i.id" @dblclick="play(i.id)"
        :class="{ 'bgc': index % 2 == 0, 'now_play': i.id == playing_id }">
        <span class="song-name" :title="i.name">{{ i.name }}</span>
        <span class="song-er" :title="ar_name(checkar(i))">
          {{ ar_name(checkar(i)) }}
        </span>
        <div class="song-time">{{ changeTime(checkdt(i)) }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useMusicStore } from "@/store/modules/musicstore.js"
import { ar_name, checkar, checkdt, changeTime } from "@/uitls/tools"
const musicStore = useMusicStore()
const props = defineProps(['list_show', 'playing_id'])

let songs = ref(musicStore.songs) // 当前播放列表
let nowList = ref(musicStore.nowList)

function play(id) {
  musicStore.changPlay(id)
}
watch(() => musicStore.songs, (newValue) => {
  songs.value = newValue
  nowList.value = musicStore.nowList
})
</script>

<style scoped>
.show {
  transform: translate(0) !important;
}
.play_list {
  position: absolute;
  z-index: 999;
  bottom: 70px;
  width: 360px;
  height: 500px;
  overflow: auto;
  right: 0;
  background-color: rgb(230, 230, 230);
  box-shadow: 2px 5px 5px 3px rgb(200, 200, 200);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
}

.play_list h3 {
  margin-left: 15px;
}

.play_list .total {
  margin-left: 15px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgb(200, 200, 200);
}

.play_list .lists {
  list-style-type: none;
}

.play_list .lists li {
  font-size: 12px;
  height: 33px;
  line-height: 33px;
  padding-left: 15px;
}

.play_list .lists li:hover {
  background-color: rgb(220, 220, 220);
  cursor: pointer;
}

.bgc {
  background-color: rgb(250, 250, 250);
}

.play_list .lists li .song-name {
  display: inline-block;
  width: 50%;
  height: 100%;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play_list .lists li .song-er {
  display: inline-block;
  width: 30%;
  height: 100%;
  padding-right: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play_list .lists li .song-time {
  display: inline-block;
  width: 20%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.now_play {
  color: brown;
}
</style>
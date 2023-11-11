<template>
  <div class="playing">
    <div class="imgs">
      <img v-if="!showing" @click="showinfo" :src="img_src" alt="" title="展开音乐详情页" />
      <img v-else :src="img_src" alt="" @click="showinfo" title="隐藏音乐详情" />
      <span v-if="!showing" @click="showinfo" class="glyphicon glyphicon-chevron-up up" title="展开音乐详情页"></span>
      <span v-else @click="showinfo" class="glyphicon glyphicon-chevron-down up" title="隐藏音乐详情"></span>
    </div>
    <div class="song_title">
      <span class="name" :title="song_name">{{ song_name }}</span>
      <span class="singer" :title="singer">{{ singer }}</span>
    </div>

    <div class="play" ref="play">
      <audio :src="song_src" ref="player"></audio>
      <span class="start">{{ start }}</span>
      <div class="playbar" @mousedown="mclick" ref="totalbar">
        <div class="currentbar" ref="musicbar">
          <div class="playpoint" @mousedown="mdown" @mouseup="mup" ref="playpoint"></div>
        </div>
      </div>
      <span class="end">{{ end }}</span>
    </div>

    <span class="glyphicon glyphicon-step-backward prebtn" @click="pre"></span>
    <span v-if="!isplay" class="glyphicon glyphicon-play playbtn" @click="playbtn()"></span>
    <span v-if="isplay" class="glyphicon glyphicon-pause pausebtn" @click="pausebtn()"></span>
    <span class="glyphicon glyphicon-step-forward nexbtn" @click="nex"></span>

    <span class="glyphicon glyphicon-list play_listbtn" @click="show_list()"></span>

    <PlayList :list_show="list_show" :playing_id="playing_id"></PlayList>

    <!-- 歌曲详情页，歌词 -->
    <div class="song_info" :class="{'show': showing}">
      <div class="song_img">
        <img ref="img_rotate" :src="img_src" alt="无法显示" draggable="false" />
      </div>
      <div class="geci">
        <h2>{{ song_name }}</h2>
        <p>{{ singer }} - {{ song_alia }}</p>
        <div class="content" ref="content">
          <span v-for="i in geci" :data-index="i.index" :style="now_lyric(i.index)" :key="i.index" ref="lyric">
            {{ i.ci }}
            <br />
          </span>
        </div>
      </div>
      <div class="comment"></div>
    </div>
  </div>
</template>

<script setup>
import { changeTime, changeGeci } from "@/uitls/tools.js"
import { useMusicStore } from "@/store/modules/musicstore.js"
import { ref, watch, onMounted } from "vue"
import PlayList from "@/components/PlayList/index.vue"
import { song_api } from "@/api/song/index.js"

const musicStore = useMusicStore()
let playing_id = ref(musicStore.playing_id)

let img_src = ref("") //http://127.0.0.1:8010/public/But U.jpg
let song_url_info = ref("")
let song_info = ref("") // 歌曲详情
let song_src = ref("") // http://127.0.0.1:8010/public/But U.mp3
let song_name = ref("") //But U
let song_alia = ref("") // 歌曲别名
let singer = ref("") //NINEONE#
let geci = ref("")
let start = ref("00:00")
let end = ref("")
let realtime = ref(0)
let isplay = ref(false) // 播放状态, 动态改变播放/暂停图标
let can_play = ref(false) // 音频是否可播放

let player = ref(null) // this.$refs.player
let musicbar = ref(null) // this.$refs.musicbar
let totalbar = ref(null) // this.$refs.totalbar
let img_rotate = ref(null) // this.$refs.img_rotate
let content = ref(null)

let move_point = ref(false) // 小圆点是否是移动状态
let showing = ref(false) // 显示详情
let lyricpos = ref(0)
let list_show = ref(false) // 显示当前播放列表

function playbtn() {
  if (song_src.value == "" && playing_id.value == "") return
  else if(song_src.value == "" && playing_id.value !== "") {
    song_api.song_url(playing_id.value).then(callback)
    song_api.song_detail(playing_id.value).then(callback2)
    song_api.song_lyric(playing_id.value).then(callback3)
    lyricpos.value = 0;
  }
  if (can_play.value) {
    player.value.play()
  } else {
    let doing = function () {
      can_play.value = true
      player.value.play();
      player.value.removeEventListener('canplaythrough', doing)
    }
    player.value.addEventListener('canplaythrough', doing)
  }
  isplay.value = true;
  if (showing.value) {
    img_rotate.value.classList.add("img-rotate");
  }
}
function pausebtn() {
  isplay.value = false;
  player.value.pause();
  img_rotate.value.classList.remove("img-rotate");
}
function pre() {
  musicStore.pre()
}
function nex() {
  musicStore.nex()
}
function show_list() {
  list_show.value = !list_show.value;
}

// 拖到进度条圆点改变播放进度
function mdown() {
  move_point.value = true;
  if(!can_play.value) {
    return
  }
  let moveMin = totalbar.value.getBoundingClientRect().left;
  let moveMax = totalbar.value.getBoundingClientRect().right;
  let move = (e) => {
    let X = e.pageX;
    if (e.pageX >= moveMax) {
      X = moveMax;
    } else if (e.pageX <= moveMin) {
      X = moveMin;
    }
    // this.musicBardom.style.width = `${((this.getMousePos().x-moveMin) / this.totalBardom.clientWidth) * 100}%`;
    musicbar.value.style.width = `${((X - moveMin) / totalbar.value.clientWidth) * 100
      }%`;
    realtime.value =
      ((X - moveMin) / totalbar.value.clientWidth) *
      player.value.duration;
    let now_time = changeTime(realtime.value * 1000);
    start.value = now_time;
  };
  //获取当前鼠标的位置 X
  document.addEventListener("mousemove", move);
  //鼠标弹起来
  let mouseUp = () => {
    document.removeEventListener("mousemove", move);
    if (realtime.value !== 0) {
      player.value.currentTime = realtime.value;
      realtime.value = 0;
    }
    setTimeout(() => {
      move_point.value = false;
      document.removeEventListener("mouseup", mouseUp);
    }, 200);
  };
  document.addEventListener("mouseup", mouseUp);
}
function mup() {
  move_point.value = false;
}
// 点击进度条改变播放进度
function mclick(e) {
  if(move_point.value) return
  if(!can_play.value) {
    return
  }
  let clickMin = totalbar.value.getBoundingClientRect().left;
  let clickMax = totalbar.value.getBoundingClientRect().right;
  let X = e.pageX;
  if (e.pageX >= clickMax) {
    X = clickMax;
  } else if (e.pageX <= clickMin) {
    X = clickMin;
  }
  updataprogress(X - clickMin);
}
// 更新进度条
function updataprogress(moveX) {
  let movepos = moveX / totalbar.value.clientWidth;
  player.value.currentTime = player.value.duration * movepos;
}

function showinfo() {
  if (song_src.value == "") return
  if (!showing.value) {
    showing.value = true;
    if (!player.value.paused) {
      img_rotate.value.classList.add("img-rotate");
    }
  } else {
    showing.value = false;
    img_rotate.value.classList.remove("img-rotate");
  }
}
// 歌曲url
function callback(res) {
  song_url_info.value = res.data.data;
  song_src.value = song_url_info.value[0].url;
}
// 歌曲详情
function callback2(res) {
  let info = res.data.songs[0]
  song_info.value = info;
  song_name.value = info.name;
  img_src.value = info.al.picUrl;
  song_alia.value = info.name;
  if (info.alia.length > 0) {
    song_alia.value = info.alia[0];
  }
  singer.value = "";
  for (let i = 0; i < info.ar.length; i++) {
    singer.value += info.ar[i].name;
    if (i < info.ar.length - 1) singer.value += " / ";
  }
}
// 歌词
function callback3(res) {
  let datas = res.data.lrc.lyric;
  let result = changeGeci(datas)
  geci.value = result;
}

let isMouseScroll = ref(false)
let timer = ref(null)
// 歌词滚动
function lscroll() {
  for (let i = 0; i < geci.value.length; i++) {
    if (
      player.value.currentTime > geci.value[i].time &&
      geci.value[i].ci !== ""
    ) {
      lyricpos.value = i;
      if (!isMouseScroll.value)
        content.value.scrollTop = 30 * (i - 5);
    }
  }
}
function now_lyric(i) {
  if (lyricpos.value == i) {
    let ss = "color: red; font-size: 20px";
    return ss;
  }
}

watch(() => musicStore.playing_id, (newValue) => {
  can_play.value = false
  playing_id.value = newValue
  song_api.song_url(newValue).then(callback).then(playbtn)
  song_api.song_detail(newValue).then(callback2)
  song_api.song_lyric(newValue).then(callback3)
  lyricpos.value = 0;
})

onMounted(() => {
  content.value.addEventListener('wheel', () => {
    isMouseScroll.value = true
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isMouseScroll.value = false
    }, 3000)
  })

  player.value.addEventListener("canplay", () => {
    const musicTime = player.value.duration; // 获得音频时长
    end.value = changeTime(musicTime * 1000)
  });

  player.value.addEventListener("timeupdate", () => {
    const musicTime = player.value.duration; // 获得音频时长
    const currentTime = player.value.currentTime; // 获得已播放的音频时长
    if (!move_point.value) {
      musicbar.value.style.width = `${(currentTime / musicTime) * 100}%`; // 计算进度条所在比例宽度
      start.value = changeTime(currentTime * 1000);
    }
    lscroll();
  });

  player.value.addEventListener("playing", () => {
    isplay.value = true;
  });

  player.value.addEventListener("ended", () => {
    nex();
  });
})

</script>

<style scoped>
.playing {
  position: fixed;
  z-index: 999999;
  width: 100%;
  /*width: 85.4%;*/
  height: 70px;
  bottom: 0;
  border-top: 1px solid rgb(220, 220, 220);
  background-color: rgb(240, 240, 240);
}

.imgs {
  vertical-align: top;
  display: inline-block;
  width: 50px;
  margin: 10px;
  margin-left: 100px;
  line-height: 50px;
}

.imgs img {
  width: 50px;
  height: 50px;
  border-radius: 3px;
}

.imgs img:hover {
  background: rgba(23, 33, 0, 0.5);
  cursor: pointer;
}

.imgs:hover .up {
  display: inline-block;
  cursor: pointer;
}

.up {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: none;
  opacity: 0.8;
  position: relative;
  margin: 0 auto;
  background-color: rgb(64, 53, 53);
  border-radius: 3px;
  color: whitesmoke;
  top: -50px;
}

.song_title {
  width: 15%;
  height: 70px;
  display: inline-block;
}

.name {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  top: 15px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.singer {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  top: 18px;
  width: 100%;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.play {
  vertical-align: top;
  position: relative;
  top: 45px;
  right: 20px;
  width: 40%;
  margin: 0 125px;
  display: inline-block;
}

.playbar {
  width: 100%;
  height: 3px;
  background-color: rgb(210, 210, 210);
  display: inline-block;
}

.currentbar {
  width: 0%;
  height: 3px;
  background-color: red;
}

.playbar:hover,
.currentbar:hover,
.playpoint:hover {
  cursor: pointer;
}

.playpoint {
  display: none;
  position: relative;
  border-radius: 10px;
  width: 10px;
  height: 10px;
  background-color: red;
  bottom: 3px;
  right: -5px;
  float: right;
}

.playbar:hover {
  height: 5px;
}

.playbar:hover .currentbar {
  height: 5px;
}

.playbar:hover .playpoint {
  display: block;
}

.start {
  font-size: 10px;
  position: absolute;
  left: -45px;
  bottom: 0px;
  user-select: none;
}

.end {
  font-size: 10px;
  position: absolute;
  right: -45px;
  bottom: 0px;
  user-select: none;
}

.playbtn,
.pausebtn,
.prebtn,
.nexbtn {
  vertical-align: top;
  left: -490px;
  top: 20px;
  margin-right: 15px;
}

.playbtn:hover,
.pausebtn:hover,
.prebtn,
.nexbtn,
.play_listbtn {
  cursor: pointer;
}

.play_listbtn {
  vertical-align: top;
  left: -160px;
  top: 46px;
}

.song_info {
  width: 100%;
  height: calc(100vh - 70px);
  overflow: auto;
  bottom: 0;
  border: 1px solid transparent;
  position: absolute;
  background-color: rgb(240, 240, 240);
  z-index: 99;
  transition: all 0.5s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(0, 100%);
}
.song_info::-webkit-scrollbar {
  display: none;
}
.show {
  transform: translate(0);
  bottom: 70px;
}
.song_info .song_img {
  display: inline-block;
  margin: 50px;
  vertical-align: top;
  width: 300px;
  height: 580px;
  /*background-color: aqua;*/
}

.song_img img {
  width: 230px;
  height: 230px;
  border-radius: 100%;
  margin-top: 120px;
  margin-left: 30px;
}

.song_info .geci {
  color: black;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  transition: color 2s linear;
  margin-top: 50px;
  width: 500px;
  height: 580px;
  /*background-color: cadetblue;*/
}

.content {
  height: 400px;
  margin-top: 40px;
  overflow: auto;
  line-height: 30px;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
    /*从0度开始*/
  }

  100% {
    transform: rotateZ(360deg);
    /*360度结束*/
  }
}

.img-rotate {
  animation: rotate 15s linear infinite;
}
</style>
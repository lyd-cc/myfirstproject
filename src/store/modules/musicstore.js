import { defineStore } from "pinia"

export const useMusicStore = defineStore({
  id: 'music',
  state: () => {
    return {
      playing_id: "", // 当前正在播放的音乐id
      songs: [], // 当前歌曲播放列表
      songsList: [], // 播放列表(最多三个)
      nowList: -1, // 当前播放列表下标
      nowPlay: 0, // 当前播放下标
    }
  },
  actions: {
    // 更换播放
    changPlay(id) {
      this.playing_id = id
      for(let i=0; i<this.songs.length; i++) {
        if(id == this.songs[i].id) {
          this.nowPlay = i
          break
        }
      }
    },
    // 上一首
    pre() {
      if (this.nowPlay <= 0) {
        return;
      }
      this.nowPlay -= 1;
      this.playing_id = this.songs[this.nowPlay].id
    },
    // 下一首
    nex() {
      this.nowPlay = (this.nowPlay + 1) % this.songs.length;
      this.playing_id = this.songs[this.nowPlay].id
    },
    // 
    setsongs(songs) {
      this.songs = songs
    },
    // 添加播放列表
    addsongList(songList) {
      if (this.songsList.length < 3) {
        this.songsList.push(songList)
        this.nowList += 1
      } else {
        this.songsList.shift()
        this.songsList.push(songList)
      }
      this.nowPlay = 0
    },
    // 向播放列表添加歌曲
    addsong(song) {
      this.songs.push(song)
    }
  }
})
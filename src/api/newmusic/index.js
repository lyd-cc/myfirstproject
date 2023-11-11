import request from "@/uitls/request.js"

// 获取最新音乐
function new_music() {
  return request({
    url: `/top/song?type=0`,
    method: "get"
  })
}

const newmusic_api = {
  new_music: new_music
}

export {
  newmusic_api
}
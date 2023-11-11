import request from "@/uitls/request"

// 热搜
function search_hot() {
  return request({
    url: "/search/hot/detail",
    method: "get"
  })
}
// 关键词搜索建议
function search_suggest(search_text) {
  return request({
    url: `/search/suggest?keywords=${search_text}`,
    method: "get"
  })
}

// 根据关键词搜索歌曲
function search_songs(keywords, offset) {
  offset = offset || 0
  return request({
    url: `/search?keywords=${keywords}&limit=100&offset=${offset}`,
    method: "get"
  })
}
const search_api = {
  search_hot: search_hot,
  search_suggest: search_suggest,
  search_songs: search_songs
}

export {
  search_api
}

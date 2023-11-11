import axois from "axios"
import baseUrl from "@/myconfig/urlconfig"

const service = axois.create({
  baseURL: baseUrl.baseurl,
  timeout: 50000
})

export default service
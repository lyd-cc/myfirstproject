import { createRouter, createWebHashHistory } from "vue-router"

export const Layout = () => import("@/layout/index.vue")
export const constantRoutes = [
  {
    path: "/", redirect: "/foundmusic",
    component: Layout,
    children: [
      {
        path: "/foundmusic", redirect: "/foundmusic/gedan",
        component: () => import("@/views/FoundMusic/index.vue"),
        children: [
          {
            path: "gedan",
            component: () => import("@/views/FoundMusic/Gedan/index.vue")
          },
          {
            path: "paihangbang",
            component: () => import("@/views/FoundMusic/Paihangbang/index.vue")
          },
          {
            path: "newmusic",
            component: () => import("@/views/FoundMusic/NewMusic/index.vue")
          }
        ]
      },
      {
        path: "/gedaninfo",
        component: () => import("@/views/Gedaninfo/index.vue")
      },
      {
        path: "/search", redirect: "/search/danqu",
        component: () => import("@/views/SearchResult/index.vue"),
        children: [
          {
            path: "danqu",
            component: () => import("@/views/SearchResult/Danqu/index.vue")
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
import { createRouter, createWebHashHistory } from "vue-router"

import feedBack from "../views/feedBack.vue"
import plan from "../views/plan.vue"
import planType from "../views/planType.vue"
import update from "../views/update.vue"
import main from "../views/main.vue"
const routes = [
  {
    path: "/",
    name: "main",
    component: main
  },
  {
    path: "/feedBack",
    name: "feedBack",
    component: feedBack
  },
  {
    path: "/plan",
    name: "plan",
    component: plan
  },
  {
    path: "/planType",
    name: "planType",
    component: planType
  },
  {
    path: "/update",
    name: "update",
    component: update
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
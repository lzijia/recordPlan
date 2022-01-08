import { createRouter, createWebHashHistory } from "vue-router"

import feedBack from "../views/feedBack.vue"
import newPlan from "../views/newPlan.vue"
import planType from "../views/planType.vue"
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
    path: "/newPlan",
    name: "newPlan",
    component: newPlan
  },
  {
    path: "/planType",
    name: "planType",
    component: planType
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
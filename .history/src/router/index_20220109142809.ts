import { createRouter, createWebHashHistory } from "vue-router"

import feedBack from "../views/feedBack.vue"
import newPlan from "../views/plan.vue"
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
    path: "/plan",
    name: "plan",
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
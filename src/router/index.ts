import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import { useAuthStore } from '@/stores/auth'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Events from '@/views/Events/Events.vue'
import ProfileView from '@/views/ProfileView.vue'
import UsersView from '@/views/Users/UsersView.vue'
import AboutUs from '@/views/AboutUs/AboutUs.vue'
import ContactUs from '@/views/ContactUs/ContactUs.vue'



const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/Authentication/Error.vue'),
    meta: {
      title: 'Page Not Found'
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth:true,
    },
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      title: 'Events',
      requiresAuth:true,
    }
  },
  {
    path: '/about',
    name: 'About Us',
    component: AboutUs,
    meta: {
      title: 'Events',
      requiresAuth:true,
    }
  },
  {
    path: '/contact',
    name: 'Contact Us',
    component: ContactUs,
    meta: {
      title: 'ContactUs',
      requiresAuth:true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      title: 'Profile',
      requiresAuth:true,
    }
  },
  {
    path: '/officers',
    name: 'Officers',
    component: UsersView,
    meta: {
      title: 'Officers',
      requiresAuth:true,
    }
  },

  {
    path: '/auth/signin',
    name: 'SignIn',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  // {
  //   path: '/auth/signup',
  //   name: 'SignUp',
  //   component: SignupView,
  //   meta: {
  //     title: 'Signup'
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to:any, from:any, savedPosition:any) {
    return savedPosition || { left: 0, top: 0 }
  }
})

// Global Navigation Guard
router.beforeEach((to:any, from:any, next:any) => {
  const authStore = useAuthStore()
  console.log(authStore.isAuthenticated)
  if (to.matched.some((record: { meta: { requiresAuth: any } }) => record.meta.requiresAuth)) {
    
    if (!authStore.isAuthenticated) {
      next({ name: 'SignIn' })
    } else {
      next()
    }
  } else if (to.name === 'SignIn' && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
  document.title = `Hand In Hand | ${to.meta.title}`
})


export default router

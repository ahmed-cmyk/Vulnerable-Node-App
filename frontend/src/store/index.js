import { createStore } from 'vuex'
import bannerModule from '@/modules/banner'
import blogModule from '@/modules/blogs'
import userModule from '@/modules/user'

export default createStore({  
  modules: {
    'banner': bannerModule,
    'blog': blogModule,
    'user': userModule
  }
})

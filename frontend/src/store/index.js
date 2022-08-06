import { createStore } from 'vuex'
import bannerModule from '@/modules/banner'
import blogModule from '@/modules/blogs'
import userModule from '@/modules/user'
import recoveryModule from '@/modules/recovery'

export default createStore({  
  modules: {
    'banner': bannerModule,
    'blog': blogModule,
    'recovery': recoveryModule,
    'user': userModule
  }
})

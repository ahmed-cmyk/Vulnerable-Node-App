import user from "@/logic/user"

export default {
    namespace: true,
    state() {
        return {
            user: null,
            token: null
        }
    },
    mutations: {
        addToken(state, data) { 
            state.token = data 
        },
        setUser(state, data) { 
            state.user = data 
        }
    },
    actions: {
        async login(context, creds) {
            const res = await user.login(creds)
            console.log('userModule', res)
            if(!res) return false

            if((res.status === 200) && (res.data.token)) {
                context.commit('addToken', res.data.token)
                context.commit('setUser', {
                    'username': res.data.username,
                    'name': res.data.name,
                    'email': res.data.email
                })

                window.localStorage.setItem('authToken', `bearer ${context.state.token}`)
                return true
            }

            return false
        },
        checkLocalStorage(context) {
            var token = window.localStorage.getItem('authToken')
            
            if(token) {
                context.commit('addToken', token)
                return true
            }

            return false
        }
    }
}
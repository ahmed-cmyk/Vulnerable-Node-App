import recovery from "@/logic/recovery"

export default {
    namespace: true,
    state: () => {
        return {
            recovery: {},
            change: {}
        }
    },
    mutations: {
        addToken(state, { email, token }) {
            state.recovery[email] = token
        },
        deleteToken(state, email) {
            delete state.recovery[email]
        },
        addChangeId(state, { changeId, email }) {
            state.change[changeId] = email
        }
    },
    actions: {
        async makeForgetRequest({ commit }, email) {
            const res = await recovery.forgotPasswordRequest(email)

            if(res && res.status === 200) {
                commit('addToken', {
                    email: res.data.email,
                    token: res.data.resetToken
                })
            }

            return res.status
        },
        storeChangeId({ commit, state }, { changeId, email }) {
            if(email in state.change) {
                return false
            }

            commit('addChangeId', { 
                changeId: changeId, 
                email: email
            })
            
            return true
        },
        async changePassword({ commit }, { email, password }) {
            const res = await recovery.changePasswordRequest({ email, password })

            if(res && res.status === 200) {
                commit('deleteToken', email)
                return true
            }

            return false
        }
    },
    getters: {
        getTokenByEmail: (state) => (email) => {
            return state.recovery[email]
        },
        getEmailByChangeId: (state) => (changeId) => {
            return state.change[changeId]
        }
    }
}
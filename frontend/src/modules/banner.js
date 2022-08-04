export default {
    namespace: true,
    state() {
        return {
            message: '',
            errorState: false
        }
    },
    mutations: {
        addMessage(state, data) {
            state.message = data
        },
        removeMessage(state) {
            state.message = ''
        },
        enableErrorState(state) {
            state.errorState = true
        },
        disableErrorState(state) {
            state.errorState = false
        }
    },
    actions: {
        setMessage(context, data) {
            context.commit('disableErrorState')
            context.commit('addMessage', data)
        },
        setErrorMessage(context, data) {
            context.commit('enableErrorState')
            context.commit('addMessage', data)
        },
        setBlank(context) {
            context.commit('removeMessage')
        }
    }
}
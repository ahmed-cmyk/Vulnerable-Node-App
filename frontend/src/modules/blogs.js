import blogs from "@/logic/blog"

export default {
    namespace: true,
    state: () => ({ blogs: [] }),
    mutations: {
        setBlogs(state, data) { 
            state.blogs = data 
        },
        createBlog(state, data) { 
            state.blogs.push(data) 
        },
        updateBlog(state, updatedBlog) {
            const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id)
            state.blogs[index] = updatedBlog
        },
        deleteBlog(state, id) { 
            const index = state.blogs.findIndex(blog => blog._id === id)
            state.blogs.splice(index, 1)
        }
    },
    actions: {
        async getBlogs(context, token) {
            const res = await blogs.get(token)

            if(res && res.status === 200) {
                const blogs = res.data
                context.commit('setBlogs', blogs)
            }
        },
        async createBlog(context, data) {
            const { body, token } = data
            const res = await blogs.create(body, token)

            if(res.status === 201) {
                context.commit('createBlog', res.data)
            }

            return res
        },
        async updateBlog(context, data) {
            const { body, token } = data
            const res = await blogs.update(body.id, body, token)

            if(res.status === 200) {
                context.commit('updateBlog', res.data)
            }

            return res.status
        },
        async deleteBlog(context, data) {
            console.log(data)
            const { id, token } = data
            const res = await blogs.delete(id, token)

            if(res.status === 200) {
                context.commit('deleteBlog', id)
            }

            return res.status
        }
    },
    getters: {
        getBlogById: (state) => (id) => {
            const blog = state.blogs.filter(blog => blog._id === id)
            return blog
        },
        getBlogs: (state) => {
            return state.blogs
        }
    }
}
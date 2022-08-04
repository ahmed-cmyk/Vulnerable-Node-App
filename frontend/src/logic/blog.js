import axios from "axios"
import store from "@/store/index"

const blogsAPI = 'http://localhost:4000/posts'

export default {
    get: (token) =>
        axios({
            method: 'POST',
            url: blogsAPI,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.data)
            store.dispatch('setErrorMessage', error.response.data['error'])
        })
    ,
    create: (data, token) =>
        axios({
            method: 'POST',
            url: blogsAPI,
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.data)
            store.dispatch('setErrorMessage', error.response.data['error'])
        })
    ,
    update: (id, data, token) =>
        axios({
            method: 'PATCH',
            url: blogsAPI + `/${id}`,
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.data)
            store.dispatch('setErrorMessage', error.response.data['error'])
        })
    ,
    delete: (id, data, token) =>
        axios({
            method: 'DELETE',
            url: blogsAPI + `/${id}`,
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            console.log(error.response.status)
            console.log(error.response.data)
            store.dispatch('setErrorMessage', error.response.data['error'])
        })
}
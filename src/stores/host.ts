import {defineStore} from "pinia";

export const useHostStore = defineStore('host', {
    state: () => {
        return {
            base_url: localStorage.getItem('BASE_URL') || '',
        }
    },
    getters: {
        isInit: state => {
            return state.base_url != ''
        }
    },
    actions: {
        init() {

        },
        setHost(host?: string) {
            localStorage.setItem('BASE_URL', host||'http://47.98.123.20:3000')
            location.reload()
        }
    }
})

import {defineStore} from "pinia";
import {useLogin, useLoginStatus, userPlaylist, userlikelist} from "@/utils/api";
import type {UserProfile} from "@/models/user";
import type {Account} from "@/models/user";
import type {PlayListDetail} from '@/models/playlist';

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: '',
            cookie: '',
            uid: -1,
            showLogin: false,
            profile: {} as UserProfile,
            account: {} as Account,
            playlist: [] as PlayListDetail[],
            loveIdList:[] as number[]
        }
    },
    getters: {
        isLogin: state => {
            return state.profile?.userId > 0
        },
        lovelist: state => {
            return state.playlist.length > 0 ? state.playlist[0] : []
        },
        myplaylists:state => {
            return state.playlist.filter(list => list.userId === state.uid)
        },
    },
    actions: {
        async login(phone: string, password: string) {
            const res = await useLogin(phone, password)
            if (res.code == 200) {
                this.token = res.token
                this.cookie = res.cookie
                this.uid = res.account.id
                document.cookie = res.cookie
                localStorage.setItem("USER-TOKEN", this.token)
                localStorage.setItem("USER-COOKIE", this.cookie)
                localStorage.setItem("UID", this.uid.toString())
                await this.checkLogin()
            }
        },
        async checkLogin() {
            const {data} = await useLoginStatus()
            if (data.code === 200) {
                this.profile = data.profile
                this.showLogin = false
                this.account = data.account
                this.uid = data.account.id
                this.playlist = await userPlaylist(this.uid)
                this.loveIdList = await userlikelist(this.uid)
            }

        }
    }
})

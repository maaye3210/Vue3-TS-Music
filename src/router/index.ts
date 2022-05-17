import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import {Pages} from "@/router/pages";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: Pages.home,
            component: () => import('@/views/Root.vue'),
            redirect: {name: Pages.discover},
            children: [
                // 推荐页
                {
                    path: 'discover',
                    name: 'discover',
                    component: () => import("@/views/discover/Discover.vue"),
                    meta: {
                        menu: 'discover',
                        keepAlive: true,
                    }
                },
                // 音乐馆
                {
                    path: 'music',
                    name: 'music',
                    component: () => import('@/views/music/Music.vue'),
                    redirect: {name: 'picked'},
                    meta: {
                        menu: 'music'
                    },
                    children: [
                        {
                            path: 'picked',
                            name: 'picked',
                            component: () => import("@/views/music/picked/Picked.vue"),
                            meta: {
                                menu: 'music',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'toplist',
                            name: 'toplist',
                            component: () => import("@/views/music/toplist/TopList.vue"),
                            meta: {
                                menu: 'music',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'artist',
                            name: 'artist',
                            component: () => import('@/views/music/artist/Artist.vue'),
                            meta: {
                                menu: 'music',
                                title: '歌手',
                                keepAlive: true,
                            }
                        },
                        {
                            path: Pages.category,
                            name: Pages.category,
                            component: () => import('@/views/music/category/Category.vue'),
                            meta: {
                                menu: 'music',
                                title: '分类歌单',
                                keepAlive: true,
                            }
                        }
                    ]
                },
                // 歌单
                {
                    path: 'playlist',
                    name: 'playlist',
                    component: () => import('@/views/playlist/PlayList.vue'),
                },
                // 歌手信息
                {
                    path: 'artistDetail',
                    name: 'artistDetail',
                    component: () => import('@/views/artist/ArtistDetail.vue'),
                },
                // 数字专辑
                {
                    path: 'album',
                    name: 'album',
                    component: () => import('@/views/album/Album.vue'),
                },
                // 视频
                {
                    path: 'video',
                    name: 'video',
                    component: () => import('@/views/video/Video.vue'),
                    meta: {
                        menu: 'video',
                        title: '视频',
                        keepAlive: true,
                    }
                },
                // 电台
                {
                    path: 'dj',
                    name: 'dj',
                    component: () => import('@/views/dj/DJ.vue'),
                    meta: {
                        menu: 'dj',
                        title: '电台',
                        keepAlive: true,
                    },
                },
                // 电台分类
                {
                    path: 'alldj',
                    name: 'alldj',
                    component: () => import("@/views/dj/DjLists.vue"),
                    meta: {
                        menu: 'dj',
                        title: '分类电台',
                        keepAlive: true,
                    }
                },
                // mv
                {
                    path: Pages.mvDetail,
                    name: Pages.mvDetail,
                    component: () => import('@/views/mv/mvDetail.vue'),
                },
            ],
        },
    ]
})

export default router

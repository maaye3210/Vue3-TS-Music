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
                                title: '精选',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'toplist',
                            name: 'toplist',
                            component: () => import("@/views/music/toplist/TopList.vue"),
                            meta: {
                                menu: 'music',
                                title: '排行',
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
                            path: 'dj',
                            name: 'musicDj',
                            component: () => import('@/views/music/dj/Dj.vue'),
                            meta: {
                                menu: 'music',
                                title: '有声电台',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'album',
                            name: 'musicAlbum',
                            component: () => import('@/views/music/album/album.vue'),
                            meta: {
                                menu: 'music',
                                title: '数字专辑',
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
                // 电台详情
                {
                    path: 'djDetail',
                    name: 'djDetail',
                    component: () => import("@/views/dj/djDetail/djDtail.vue"),
                    meta: {
                        menu: 'dj',
                        title: '电台详情',
                        keepAlive: true,
                    }
                },
                // mv
                {
                    path: Pages.mvDetail,
                    name: Pages.mvDetail,
                    component: () => import('@/views/mv/mvDetail.vue'),
                },
                // 我喜欢
                {
                    path: 'love',
                    name: 'love',
                    component: () => import('@/views/love/love.vue'),
                    meta: {
                        menu: 'love',
                        keepAlive: true,
                    }
                },
                // 本地歌曲
                {
                    path: 'local',
                    name: 'local',
                    component: () => import('@/views/local/local.vue'),
                    meta: {
                        menu: 'local',
                        keepAlive: true,
                    }
                },
                // 下载歌曲
                {
                    path: 'download',
                    name: 'download',
                    component: () => import('@/views/download/download.vue'),
                    meta: {
                        menu: 'download',
                        keepAlive: true,
                    }
                },
                // 最近播放
                {
                    path: 'recently',
                    name: 'recently',
                    component: () => import('@/views/recently/recently.vue'),
                    meta: {
                        menu: 'recently',
                        keepAlive: true,
                    }
                },
            ],
        },
    ]
})

export default router

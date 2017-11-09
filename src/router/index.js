import Vue from 'vue';
import Router from 'vue-router';
import { routerMode } from '@/utils/evn'
// import store from '@/store/store'
// import * as types from '@/store/types'

Vue.use(Router);

// 页面刷新时，重新赋值token
// if (Vue.ls.get('authorization')) {
//     store.commit(types.LOGIN, { authorization: Vue.ls.get('authorization'), loginId: Vue.ls.get('loginId') })
// }
const router = new Router({
        mode: routerMode,
        base: '/zy/',
        routes: [{
                path: '/',
                component: resolve => require(['@/views/main.vue'], resolve)
            },
            {
                path: '/test',
                component: resolve => require(['@/views/test.vue'], resolve)
            },
            {
                path: '*',
                name: 'notFound',
                component: resolve => require(['@/views/main.vue'], resolve)
            }
        ],
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = document.body.scrollTop;
                }
                return { x: 0, y: to.meta.savedPosition || 0 }
            }
        }
    })
    // router.beforeEach((to, from, next) => {
    //     if (to.meta.requireAuth) {
    //         next();
    //     } else {
    //         if (store.state.authorization) {
    //             next();
    //         } else {
    //             Modal.confirm({
    //                 content: '您还没有登录，请登录',
    //                 onOk() {
    //                     next({
    //                         path: '/login',
    //                         query: { redirect: to.fullPath }
    //                     })
    //                 },
    //                 onCancel() {
    //                     router.replace({
    //                         path: '/'
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // })

export default router;
import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// View-Pages
import Dashboard from '@/views/dashboard/index'
import Test from '@/views/testView/Test'
import Login from '@/views/login/index'
import Auth from '@/views/auth/index'
import NotFound from '@/views/notFound/index'

// Task
import MyTask from '@/views/myTask/index'
//Template
import TemplateList from '@/views/template/list'
import FlowChart from '@/views/template/flowchart'
import TemplateTask from '@/views/task/index'
// Notice
import PostNotice from '@/views/notice/PostNotice'

//Participant 
import MyParticipant from '@/views/participant/myparticipant/index'
import ParticipantTask from '@/views/participant/par_user_task/index'
import ParticipantUser from '@/views/participant/par_user/index'
import ParticipantCom from '@/views/participant/par_organize/index'

//Workspoint
import WorkspointView from '@/views/workspointView/index'
// User
import UserInfo from '../views/userSetting/userInfo'

// Service Center
import SysInfo from '../views/serviceCenter/SysInfo'
import FAQ from '../views/serviceCenter/FAQ'
import FeedBack from '../views/serviceCenter/FeedBack'

Vue.use(Router)

export default new Router({
    mode: 'history', // Demo is living in GitHub.io, so required!
    // linkActiveClass: 'active',
    // linkExactActiveClass: 'active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [{
            path: '*',
            component: NotFound
        },
        {
            path: '',
            name: '51交付',
            redirect: '/Dashboard',
            meta: {
                requireAuth: true
            },
            icon: 'fa-dashboard',
            component: Full,
            children: [{
                    path: 'Dashboard',
                    icon: 'fa-child',
                    name: '欢迎使用51交付',
                    meta: {
                        requireAuth: true
                    },
                    component: Dashboard
                },
                {
                    path: 'MyTask',
                    icon: 'fa-child',
                    name: '我的任务',
                    meta: {
                        requireAuth: true
                    },
                    component: MyTask
                },
                {
                    path: '/Notice/Post',
                    name: '发送通知',
                    meta: {
                        requireAuth: true
                    },
                    component: PostNotice
                },
                {
                    path: '/Participant/My',
                    name: '我分配的',
                    meta: {
                        requireAuth: true
                    },
                    component: MyParticipant
                },
                {
                    path: '/Participant/User',
                    name: '人员分配',
                    meta: {
                        requireAuth: true
                    },
                    component: ParticipantUser
                },
                {
                    path: '/Participant/Org',
                    name: '单位分配',
                    meta: {
                        requireAuth: true
                    },
                    component: ParticipantCom
                },
                {
                    path: '/Participant/Task',
                    name: '任务分配',
                    meta: {
                        requireAuth: true
                    },
                    component: ParticipantTask
                },
                {
                    path: '/Workspoint/View/:Id',
                    name: '站点详情',
                    meta: {
                        requireAuth: true
                    },
                    component: WorkspointView
                },
                {
                    path: '/Template/List',
                    name: '模板列表',
                    meta: {
                        requireAuth: false
                    },
                    component: TemplateList
                },
                {
                    path: '/Template/FlowChart',
                    name: '流程图',
                    meta: {
                        requireAuth: false
                    },
                    component: FlowChart
                },
                {
                    path: '/Template/Task',
                    name: '任务编辑',
                    meta: {
                        requireAuth: false
                    },
                    component: TemplateTask
                },
                {
                    path: 'Test',
                    name: 'Test',
                    meta: {
                        requireAuth: true
                    },
                    component: Test
                },
                {
                    path: '/ServiceCenter/SysInfo',
                    name: '系统使用指南',
                    meta: {
                        requireAuth: true
                    },
                    component: SysInfo
                },
                {
                    path: '/ServiceCenter/FAQ',
                    name: '常见问题(FAQ)',
                    meta: {
                        requireAuth: true
                    },
                    component: FAQ
                },
                {
                    path: '/ServiceCenter/FeedBack',
                    name: '意见反馈',
                    meta: {
                        requireAuth: true
                    },
                    component: FeedBack
                },
                {
                    path: '/UserSetting/userInfo',
                    name: '个人中心',
                    meta: {
                        requireAuth: true
                    },
                    component: UserInfo
                        // ,
                        // props: true
                }

            ]
        },
        {
            path: '/Auth',
            name: '认证',
            component: Auth
        },
        {
            path: '/login',
            name: '登陆',
            component: Login
        },
        {
            path: '/404',
            name: 'NotFound',
            component: NotFound
        }
    ]
})
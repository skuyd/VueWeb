export default {


    getNavList: () => {
        return [


            { navUrl: "/MyTask", navName: "我的待办", icon: "fa-thumb-tack", children: [] },
            {
                navUrl: "",
                navName: "我的通知",
                icon: "fa-bell-o",
                children: [
                    { navUrl: "/Notice/Post", navName: "发送通知", icon: "fa-paper-plane", children: [] },
                    {
                        navUrl: "",
                        navName: "交付动态",
                        icon: "fa-tasks",
                        children: [
                            { navUrl: "/Test", navName: "动态1", icon: "", children: [] },
                            { navUrl: "/Test", navName: "动态2", icon: "", children: [] },
                        ]
                    },
                    { navUrl: "/Test", navName: "评论/@/赞", icon: "", children: [] },
                    { navUrl: "/Test", navName: "分配通知", icon: "", children: [] },
                    { navUrl: "/Test", navName: "我的通知", icon: "", children: [] }
                ]
            },
            {
                navUrl: "",
                navName: "立项管理",
                icon: "",
                children: [
                    { navUrl: "/111", navName: "立项交付", icon: "", children: [] },
                    { navUrl: "/Test", navName: "已取消交付", icon: "", children: [] }
                ]
            },
            {
                navUrl: "",
                navName: "交付管理",
                icon: "",
                children: [
                    { navUrl: "/Test", navName: "交付列表", icon: "", children: [] },
                    { navUrl: "/Test", navName: "已归档交付", icon: "", children: [] }
                ]
            },
            {
                navUrl: "",
                navName: "分配管理",
                icon: "fa-bell-o",
                children: [
                    { navUrl: "/Participant/My", navName: "我分配的", icon: "fa-paper-plane", children: [] },
                    { navUrl: "/Participant/User", navName: "人员分配", icon: "fa-paper-plane", children: [] },
                    { navUrl: "/Participant/Org", navName: "单位分配", icon: "fa-paper-plane", children: [] },
                    { navUrl: "/Participant/Task", navName: "任务分配", icon: "fa-paper-plane", children: [] },
                ]
            },
            {
                navUrl: "",
                navName: "模板管理",
                icon: "fa-bell-o",
                children: [
                        { navUrl: "/Template/List", navName: "模板列表", icon: "fa-paper-plane", children: [] }
                    ]
                    //     { navUrl: "/Participant/User", navName: "人员分配", icon: "fa-paper-plane", children: [] },
                    //     { navUrl: "/Participant/Org", navName: "单位分配", icon: "fa-paper-plane", children: [] },
                    //     { navUrl: "/Participant/Task", navName: "任务分配", icon: "fa-paper-plane", children: [] },
                    // ]
            },
            { navUrl: "/Test", navName: "测试", icon: "", children: [] },
        ]

    }



}
export default {
    getUserInfo: () => {
        return {
            Id: "12345678901234567890123456789012",
            TokenId: "21098765432109876543210987654321",
            TrueName: "张三",
            UserName: "18822824552",
            ServerUnitName: "当前服务单位-深圳",
            CompanyName: "深圳市都信建设监理有限公司",
            DepartmentName: "第五事业部-IT室"
        }
    },
    getnewNotice: () => {
        return {
            newNum: 3,
            noticeList: [{
                    Id: '123123123',
                    Title: '51交付将于今晚(17/11/09) 23:00开始更新...',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                },
                {
                    Id: '23232323',
                    Title: '根据气象局通报，近期将出现台风等恶劣天气，户外施工人员请勿外出施工，留在室内',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                },
                {
                    Id: '41231231231123',
                    Title: '为保障您账号的安全，请尽快完善个人资料',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                }
            ]
        }
    },
    getnewwpDynamic: () => {
        return {
            newNum: 3,
            noticeList: [{
                    Id: '123123123',
                    Title: '都信监理-张三给你单位分配了37个交付',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                },
                {
                    Id: '23232323',
                    Title: '胡汉三给你分配了5个交付',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                },
                {
                    Id: '41231231231123',
                    Title: '李四给你分配了5个交付的-谈点任务',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                },
                {
                    Id: '41231231231123',
                    Title: '你关注的交付[深圳市南山区实验站点]已完工',
                    CreateTime: '2017/11/09 20:11:56',
                    CreatorName: '系统管理员'
                }
            ]
        }
    },
    getnotifications: () => {
        return [
            // {
            //     Id: '1',
            //     Content: "51交付将于今晚 23:00 更新,届时将停止服务,请提前将工作内容保存，造成不便,敬请谅解。",
            //     Type: "warning"
            // },
            // {
            //     Id: '2',
            //     Content: "为保证账号安全,我们将于 2017/11/20 开始对未改动过密码或密码过于简单的用户采取临时冻结措施,请提前到个人中心修改密码",
            //     Type: "error"
            // }
        ];
    }

}
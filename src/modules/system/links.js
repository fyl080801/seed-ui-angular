/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.links', [
    'require'
], function (require) {
    'use strict';

    return [{
        "text": "系统管理",
        "icon": "glyphicon glyphicon-cog",
        "links": [{
            "text": "用户管理",
            "href": "#/main/user",
            "authorize": "/User/List"
        }, {
            "text": "角色管理",
            "href": "#/main/role",
            "authorize": "/Role/Roles"
        }, {
            "text": "分组管理",
            "href": "#/main/groups",
            "authorize": "/ProgramPublish/Group/Save"
        }, {
            "text": "操作日志",
            "href": "#/main/log",
            "authorize": "/Logging/List"
        }]
    }, {
        "text": "信息发布",
        "icon": "glyphicon glyphicon-film",
        "links": [{
            "text": "素材管理",
            "href": "#/main/resource",
            "authorize": "/ProgramPublish/Resource/List"
        }, {
            "text": "节目管理",
            "href": "#/main/program",
            "authorize": "/ProgramPublish/Program/Programs"
        }, {
            "text": "待审核节目",
            "href": "#/main/examines",
            "authorize": "/ProgramPublish/Program/Examines"
        }, {
            "text": "通知管理",
            "href": "#/main/notify",
            "authorize": "/ProgramPublish/Notification/PublishGroups"
        }]
    }, {
        "text": "终端机管理",
        "icon": "glyphicon glyphicon-facetime-video",
        "links": [{
            "text": "设备列表",
            "href": "#/main/terminal",
            "authorize": "/ProgramPublish/Terminal/Save"
        }, {
            "text": "监控",
            "href": "#/main/monitor/ ",
            "authorize": "/ProgramPublish/Terminal/Control"
        }]
    }];
});
//获取应用实例
var app = getApp();
Page({
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender,
                province: userInfo.province,
                city: userInfo.city,
                country: userInfo.country
            })
        })
    }
});
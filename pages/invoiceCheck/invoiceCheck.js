var util = require('../../utils/util.js');
var validate = require('../../utils/validate.js');
var request = require('../../utils/request.js');
Page({
    data: {

    },
    onLoad: function () {
        this.setData({
            nowDate: util.formatDate(new Date())
        })
    },
    scan: function () {
        wx.scanCode({
            success: (res) => {
                var strs = new Array(); //定义一数组 
                strs = res.result.trim().split(",");
                //01,01,1100154130,18860438,571.43,20170306,,5CFB,
                var kjje = "";
                if (strs[1] == "01") {
                    kjje = strs[4];
                } else {
                    kjje = strs[6].slice(-6);
                }
                var fprq = strs[5];
                if (strs[5].length > 8) {
                    fprq = strs[5].slice(0, 10).replace(/\-/g, '');
                }
                this.setData({
                    fpdm: strs[2],
                    fphm: strs[3],
                    fprq: fprq,
                    kjje: kjje
                });
                var swjginfo = validate.getSwjg(strs[2], 0);
                var ip = swjginfo[1];
                var url = ip.replace('https://','') + "/yzmQuery";
                request.getyzm(this,url,strs[2]);
            }
        })
    },
    dmChange: function (e) {
        var swjginfo = validate.getSwjg(e.detail.value, 0);
        var ip = swjginfo[1];
        var url = ip.replace('https://','') + "/yzmQuery";
        request.getyzm(this,url,e.detail.value);
    },
    dataTap: function (e) {
        this.setData({
            fprq: e.detail.value
        })
    },
    bindButtonTap: function () {
        this.setData({
            focus: true
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    bindReplaceInput: function (e) {
        var value = e.detail.value
        var pos = e.detail.cursor
        if (pos != -1) {
            //光标在中间
            var left = e.detail.value.slice(0, pos)
            //计算光标的位置
            pos = left.replace(/11/g, '2').length
        }

        //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
        return {
            value: value.replace(/11/g, '2'),
            cursor: pos
        }

        //或者直接返回字符串,光标在最后边
        //return value.replace(/11/g,'2'),
    },
    bindHideKeyboard: function (e) {
        if (e.detail.value === '123') {
            //收起键盘
            wx.hideKeyboard()
        }
    }
})
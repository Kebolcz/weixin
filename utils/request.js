function getyzm(obj, url, fpdm) {
    var that = obj;
    var postData = {
        "fpdm": fpdm,
        "r": Math.random(),
        "turl": url,
        "action": "getCheckYZM"
    };
    wx.request({
        url: "https://emmprd.casco.com.cn:9443/tax/tax",
        method: 'GET',
        data: postData,
        // dataType: 'jsonp',
        // jsonp: "callback",
        // jsonpCallback:"TaxCheckYZM",
        success: function (res) {
            var resJSON = JSON.parse(res.data.slice(12, res.data.length - 1));
            that.setData({
                yzmurl: "data:image/png;base64," + resJSON.key1
            });
            if (resJSON.key4 == '00') {
                that.setData({
                    tips: "请输入验证码文字"
                });
            } else if (resJSON.key4 == '01') {
                that.setData({
                    tips: "请输入验证码图片中红色文字"
                });
            } else if (resJSON.key4 == '02') {
                that.setData({
                    tips: "请输入验证码图片中黄色文字"
                });
            } else if (resJSON.key4 == '03') {
                that.setData({
                    tips: "请输入验证码图片中蓝色文字"
                });
            }
        },
        fail: function (msg) {
            console.log(msg);
        }
    })
}

function TaxCheckYZM(data) {
    console.log(JSON.stringify(data));
}

module.exports = {
    getyzm: getyzm
}
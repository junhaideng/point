import {
  addSecret,
  existSecret,
  getSecret
} from "../../db/index"

// pages/secret/secret.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    secret: "",
    key: "",
    show: false,
    content: ""
  },

  onHandleAddSecret: function () {
    const secret = this.data.secret.trim();
    const password = this.data.password.trim();
    if (password.length == 0 || secret.length == 0) {
      wx.showToast({
        title: '输入不能为空哦',
        icon: 'none'
      });
      return
    }

    if (password.length < 4) {
      wx.showToast({
        title: '密码长度应该 >= 4',
        icon: 'none'
      })
      return;
    }

     existSecret(password).then(res => {
      if (res) {
        wx.showToast({
          title: '该密码已经存在了哦',
          icon: "none"
        })
        return;
      } else {
        addSecret(secret, password).then(res => {
          console.log(res)
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          });
          this.setData({
            password: "",
            secret: ""
          })
          return
        }).catch(err => {
          console.log(err)
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          });
        })
      }
    });
  },
  onHandleGetSecret: function () {
    const key = this.data.key.trim();
    if (key.length == 0) {
      wx.showToast({
        title: '密码不能为空哦',
        icon: 'none'
      });
      return;
    }

    getSecret(key).then(res => {
      const data = res.data;
      if (data.length == 0) {
        wx.showToast({
          title: '没有对应秘密哦',
          icon: 'none'
        });
        return;
      }
      console.log(res)
      this.setData({
        show: true,
        content: data[0].secret
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '获取数据失败',
        icon: "none"
      });
    })

  },
  onClose: function () {
    this.setData({
      show: false,
      content: "",
    })
  }
})
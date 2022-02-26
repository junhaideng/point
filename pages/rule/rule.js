// pages/rule/rule.js
import {
  addReward
} from "../../db/index"
Page({
  data: {
    content: "",
    point: null,
    choice: "add"
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      active: 2
    })
  },

  onClick: function (event) {
    const choice = event.target.dataset.name;
    this.setData({
      choice: choice
    })
  },

  submit() {
    const {
      content,
      point,
      choice
    } = this.data;
    if (content.length == 0) {
      wx.showToast({
        title: '请输入积分机制',
        icon: 'error'
      })
      return
    }

    if (choice == "add") {} else if (choice == "reduce") {
      point = -point
    } else {
      wx.showToast({
        title: '积分机制类型错误',
        icon: 'error'
      })
      return
    }
    addReward(content, point).then(res => {
      wx.showToast({
        title: '添加成功',
      })
      this.setData({
        content: "",
        point: null,
        choice: "add"
      })
    }).catch(err => {
      wx.showToast({
        title: '添加失败:' + err,
        icon: "none"
      })
    })

  }
})
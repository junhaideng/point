// pages/rule/rule.js
import {
  addReward
} from "../../db/index";


Page({
  data: {
    content: "",
    point: null,
    choice: "add"
  },

  submit() {
    const {
      content,
      point: p,
      choice
    } = this.data;
    if (p && p.length == 0) {
      wx.showToast({
        title: '请输入积分',
        icon: 'error'
      })
      return
    }
    let point = Number.parseInt(p)
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
    if (content.length > 16){
      wx.showToast({
        title: '规则名称不能超过16个字',
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
// pages/notice/notice.js
import {
  MessageTemplateid
} from "../../utils/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  subscribeMessage: function () {
    wx.requestSubscribeMessage({
      tmplIds: [MessageTemplateid],
      success(res) {
        console.log(res)
        if (res[MessageTemplateid] == "accept") {
          wx.showToast({
            title: '订阅成功',
          })
        } else {
          wx.showToast({
            title: '取消订阅',
            icon: 'none'
          })
        }

      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '订阅失败',
          icon: 'error'
        })
      }
    })
  },
  handleGetSettings: function () {
    wx.getSetting({
      withSubscriptions: true,
    }).then(res => {
      console.log(res.subscriptionsSetting)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
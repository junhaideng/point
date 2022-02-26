// pages/log.js
import {
  getLog
} from "../../db/index";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    log: []
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLog()
  },

  getLog() {
    getLog().then(res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '暂无日志信息',
          icon: "none"
        })
        return
      }
      this.setData({
        log: res.data
      })
    }).catch(err => {
      wx.showToast({
        title: '获取日志失败: ' + err,
      })
    })
   
  },
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
    wx.showNavigationBarLoading();
    this.getLog();
    wx.showToast({
      title: '加载数据完成',
      icon: 'none'
    })
    wx.hideNavigationBarLoading(); //完成停止加载图标
    wx.stopPullDownRefresh();
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
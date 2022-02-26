// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts: [{
      "_id": "fdas",
      "content": "apple",
      "point": 5, 
      "count": 0 // 兑换次数
    }]
  },

  exchange: function(event){
    const {
      _id, point 
    } = event.target.dataset;
    console.log(_id, point)
    // 进行数据库操作
    
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
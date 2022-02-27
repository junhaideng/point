// pages/gift/gift.js
import {
  getGifts,
  exchangeGift,
  removeGifts
} from "../../db/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts: [],
    index: [],
    cached: false,
    hasMore: true,
    page: 0
  },

  onChange: function (event) {
    const {
      index
    } = event.target.dataset;
    console.log(event, index)
    this.data.index[index] = event.detail;
    this.setData({
      index: this.data.index
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      active: 1
    })
    if (!this.data.cached) {
      this.init()
      this.setData({
        cached: true
      })
    } else {
      console.log("使用缓存数据")
    }
  },
  init: function () {

    getGifts().then(res => {
      this.setData({
        gifts: res.data,
        index: Array.from({
          length: res.data.length
        }, (v, k) => 1),
        page: 1
      })
    }).catch(err => {
      wx.showToast({
        title: '获取礼物清单失败: ' + err,
        icon: 'none'
      })
    })
  },
  exchange(event) {
    const {
      index
    } = event.target.dataset;
    const number = this.data.index[index];
    const gift = this.data.gifts[index];
    wx.showModal({
      content: `将兑换 ${number} 个 ${gift.title}, 需要 ${gift.point * number} 积分`,
      success(res) {
        if (res.confirm) {
          exchangeGift(gift._id, gift.point, number, gift.title).then(res => {
            const {
              flag,
              total
            } = res
            if (!flag) {
              wx.showToast({
                title: '积分不足',
                icon: 'error'
              })
              return
            }
            wx.showToast({
              title: '兑换成功',
              icon: 'none'
            })
            wx.cloud.callFunction({
              name: "sendMessage",
              data: {
                title: gift.title,
                point: gift.point * number,
                remain: total,
                note: "使用该卡片可进行兑换礼物哦"
              }
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            wx.showToast({
              title: '兑换失败: ' + err,
              icon: 'none'
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onClick: function (event) {
    const that = this;
    const position = event.detail;
    const {
      id,
      index,
      fileid 
    } = event.target.dataset;
    if (position == "right"){
        wx.showModal({
          content: '确定删除该礼物?',
          success(res) {
            if (res.confirm) {
              removeGifts(id, fileid).then(res => {
                let gift = that.data.gifts;
                gift.splice(index, 1)
                that.setData({
                  gifts: gift
                })
                wx.showToast({
                  title: '删除成功',
                })
              }).catch(err => {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.init();
    wx.showToast({
      title: '加载数据完成',
      icon: 'none'
    })
    wx.hideNavigationBarLoading(); //完成停止加载图标
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    console.log("到底")
    const {
      hasMore,
      page
    } = this.data;

    if (hasMore) {
      wx.showLoading({
        "title": "获取数据中"
      })
      getGifts(page).then(res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无更多数据',
            icon: 'none'
          })
          this.setData({
            hasMore: false
          })
          return
        }
        this.setData({
          gifts: this.data.gifts.concat(res.data),
          page: page + 1
        })
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取数据失败: ' + err,
          icon: "none"
        })
      })
    }
  }
})
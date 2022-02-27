// custom-tab-bar/index.js
Component({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [{
        url: "/pages/index/index",
        text: "首页",
      },
      {
        url: "/pages/gift/gift",
        text: "兑换",
      },
      {
        url: "/pages/log/log",
        text: "日志",
      }, {
        url: "/pages/settings/settings",
        text: "规则",
      }
    ]
  },

  methods: {
    onChange(event) {
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    }
  },
})
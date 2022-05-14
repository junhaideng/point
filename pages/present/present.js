const {
  addGifts
} = require("../../db/index");

Page({
  data: {
    fileList: [],
    title: "",
    desc: "",
    point: null,
  },
  afterRead: function (event) {
    console.log(event)
    const file = event.detail.file;
    this.data.fileList.push({
      url: file.url
    })
    this.setData({
      fileList: this.data.fileList
    })
  },
  deleteFile: function (event) {
    this.data.fileList.splice(event.detail.index, 1)
    this.setData({
      fileList: this.data.fileList
    })
  },
  // 上传图片
  uploadToCloud: function () {
    const {
      fileList,
      title,
      point: p,
      desc
    } = this.data;
    let point = Number.parseInt(p)

    if(title.length == 0){
      wx.showToast({
        title: '请输入名称',
        icon: 'none'
      });
      return 
    }
    if (desc.length == 0){
      wx.showToast({
        title: '描述不能为空',
        icon: 'none'
      });
      return 
    }
    
    if (!point) {
      wx.showToast({
        title: '积分不能为空',
        icon: 'none'
      });
      return 
    }
    if (point < 0){
      wx.showToast({
        title: '积分不能为空',
        icon: 'none'
      });
      return 
    }

    if (!fileList.length) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      this.uploadFilePromise(fileList[0])
        .then(data => {
          addGifts(title, desc, data.fileID, point).then(res => {
            wx.showToast({
              title: '添加成功',
              icon: 'none'
            });
            this.setData({
              fileList: [],
              title: "",
              desc: "",
              point: null,
            })
            console.log(data)
          })
        })
        .catch(e => {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          });
          console.log(e);
        });
    }
  },

  uploadFilePromise: function (chooseResult) {
    const {
      url
    } = chooseResult;
    let tmp = url.split("/")
    return wx.cloud.uploadFile({
      cloudPath: "point/" + tmp[tmp.length - 1],
      filePath: chooseResult.url
    });
  },
  submit: function () {
    this.uploadToCloud()
  }
})
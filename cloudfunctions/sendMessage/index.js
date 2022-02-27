// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    title, point, remain, note
  } = event; 
  console.log(context)
  
  const wxContext = cloud.getWXContext()

  try {
    const result = await cloud.openapi.subscribeMessage.send({
      "touser": wxContext.OPENID,
      "page": '/pages/index/index',
      "lang": 'zh_CN',
      "data": {
        "thing1": {
          "value": title
        },
        "number2": {
          "value": point
        },
        "number3": {
          "value": remain
        },
        "thing5": {
          "value": note
        }
      },
      "templateId": 'dseD7bfr8zA344SHJDrEqBrXGr0A25cZY1ZscPZMr0E',
      "miniprogramState": 'developer'
    })
    return result
  } catch (err) {
    return err
  }
}
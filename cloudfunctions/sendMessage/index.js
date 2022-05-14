// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const MessageTemplateid = "dseD7bfr8zA344SHJDrEqBrXGr0A25cZY1ZscPZMr0E"; 

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, context)
  
  const {
    title, point, remain, note, page
  } = event; 
  const wxContext = cloud.getWXContext()

  try {
    const result = await cloud.openapi.subscribeMessage.send({
      "touser": wxContext.OPENID,
      "page": page,
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
      "templateId": MessageTemplateid,
    })
    return result
  } catch (err) {
    return err
  }
}
const db = wx.cloud.database();

// ----------------------------------------
// reward 相关操作
export function getReward() {
  return db.collection("reward").where({
    valid: true
  }).get()
}


// ----------------------------------------
// summary 相关操作
// 获取总分数
export function getTotal() {
  return db.collection("summary").doc("total").get()
}

// 更新总分数
export function updateTotal(total) {
  return db.collection("summary").doc("total").update({
    data: {
      total: total
    }
  })
}
// ----------------------------------------
// log 相关操作
// 添加日志
export function addLog(type, point, log) {
  return db.collection("log").add({
    data: {
      created_time: new Date(),
      content: log,
      type: type,
      point: point
    }
  })
}

// 获取日志
export function getLog() {
  return db.collection("log").orderBy("created_time", "desc").get()
}

// ----------------------------------------
// gift 相关操作
export function exchangeGift(id, point) {

}
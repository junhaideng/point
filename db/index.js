const db = wx.cloud.database();

// ----------------------------------------
// reward 相关操作
export function getReward() {
  return db.collection("reward").where({
    valid: true
  }).get()
}

// 添加新机制
export function addReward(content, point) {
  return db.collection("reward").add({
    data: {
      content: content,
      point: point,
      valid: true,
      created_time: new Date()
    }
  })
}


// ----------------------------------------
// summary 相关操作
// 获取总分数
export function getTotal() {
  return db.collection("summary").doc("total").get()
}

// 更新总分数
export function updateTotal(total) {
  console.log(total)
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
// 获取所有的可兑换礼物
export function getGifts() {
  return db.collection("gift").where({
    valid: true
  }).get()
}

export async function exchangeGift(id, point, number) {
  console.log(point, number, id)
  // 首先查询总积分
  const total = await getTotal();
  const sum = point * number;
  if (total < sum) {
    return false
  } else {
    console.log(total, sum, "进行兑换")
    await updateTotal(total - sum);
    // 否则进行兑换
    return false
  }

}
const db = wx.cloud.database();
const NumberPerPage = 20; // 每一次请求最多请求到 20 个
const cmd = db.command;

// ----------------------------------------
// reward 相关操作
export function getReward(page = 0) {
  return db.collection("reward").where({
      valid: true
    })
    .orderBy("created_time", "desc")
    .skip(page * NumberPerPage)
    .limit(NumberPerPage)
    .get()
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

// 删除
export function removeReward(id) {
  return db.collection("reward").doc(id).remove()
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
export function getLog(page = 0) {
  return db.collection("log")
    .orderBy("created_time", "desc")
    .skip(page * NumberPerPage)
    .limit(NumberPerPage)
    .get()
}

// ----------------------------------------
// gift 相关操作
// 获取所有的可兑换礼物
export function getGifts(page = 0) {
  return db.collection("gift")
    .where({
      valid: true
    })
    .skip(page * NumberPerPage)
    .limit(NumberPerPage)
    .get()
}

// 添加兑换礼物
export function addGifts(title, desc, imageURL, point) {
  return db.collection("gift")
    .add({
      data: {
        title,
        desc,
        imageURL,
        point,
        valid: true,
        count: 0,
      }
    })
}

// 删除兑换礼物
export async function removeGifts(id, fileid) {
  try {
    await wx.cloud.deleteFile({fileList: [fileid]})
    await db.collection("gift").doc(id).remove()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export function increaseGiftCount(id, count = 1) {
  return db.collection("gift").doc(id).update({
    data: {
      count: cmd.inc(count)
    }
  })
}

export async function exchangeGift(id, point, number, title) {
  // 首先查询总积分
  const total = (await getTotal()).data.total;
  const sum = point * number;
  const res = {
    flag: false,
    total: total
  }
  if (total >= sum) {
    await updateTotal(total - sum);
    await increaseGiftCount(id, number)
    addLog("reduce", sum, "兑换: " + title)
    res.flag = true
    res.total = total - sum
    // 否则进行兑换
  }
  return res
}
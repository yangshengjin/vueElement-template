// 工具函数
/**
 * 判断某一值是否存在某个数组里
 * @params: { Array } array
 * @params: { String/Number } value
 * @return: { Boolean } true/false
 */
function inArray (array, value) {
  for (var i in array) {
    if (array[i] === value) return true
  }
  return false
}
/** 比较两个时间大小
 *  compareDate() returns a flag -> TODO: 选择的时间大于当前时间 reutrn true, 否则返回flase
 *  @behavior: compare Date
 *  @params: {dateObject} currentDate, {dateString} myDate
 *  @return: {Boolean} flag
 * */
function compareDate (myDate) {
  var flag = false
  var currentDate = new Date()
  if (currentDate !== null && myDate !== null) {
    currentDate = currentDate.toLocaleDateString()
    myDate = new Date(myDate).toLocaleDateString()
    var arys1 = currentDate.split('/').length > 1 ? currentDate.split('/') : currentDate.split('-')
    var arys2 = myDate.split('/').length > 1 ? myDate.split('/') : myDate.split('-')
    var n = 0
    flag = false
    while (n < 3) {
      if (Number(arys1[n]) < arys2[n]) {
        flag = true
        break
      }
      n++
    }
  }
  return flag
}

/** 计算前后天日期 -> TODO: 参数myDate为日期；type为前后天类型；前天为last，后天为next
 *  calculation() returns a new dateValue
 *  @behavior: calculation next day and last day
 *  @params: {dateString} myDate, {String} type -> TODO: type is 'last' or 'next'
 *  @return: {dateString} dateValue
 * */
function calculation (myDate, type) {
  myDate = new Date(myDate)
  var day30 = [4, 6, 9, 11]
  var day31 = [1, 3, 5, 7, 8, 10, 12]
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  // 前一天;
  if (type === 'last') {
    day = day - 1
    if (day === 0) {
      month = month - 1
      if (month === 0) {
        month = 12
        year = year - 1
      }
      if (inArray(day31, parseInt(month))) {
        day = 31
      } else if (inArray(day30, parseInt(month))) {
        day = 30
      } else {
        if ((parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || parseInt(year) % 400 === 0) {
          day = 29 // 闰年
        } else {
          day = 28 // 平年
        }
      }
    }
  }
  // 后一天;
  if (type === 'next') {
    day = day + 1
    if (inArray(day31, parseInt(month))) {
      if (day === 32) {
        day = 1
        month = month + 1
        if (month === 13) {
          month = 1
          year = year + 1
        }
      }
    } else if (inArray(day30, parseInt(month))) {
      if (day === 31) {
        day = 1
        month = month + 1
      }
    } else {
      if ((parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || parseInt(year) % 400 === 0) {
        if (day === 30) {
          day = 1
          month = month + 1
        }
      } else {
        if (day === 29) {
          day = 1
          month = month + 1
        }
      }
    }
  }
  day = day < 10 ? '0' + day : day
  month = month < 10 ? '0' + month : month
  var dateValue = year + '-' + month + '-' + day
  return dateValue
}

// 获取一周的星期几
function getWeekDay (day) {
  var weekDay = ''
  var toDate = new Date()
  if (day != null) {
    if (typeof day.valueOf() !== Number) {
      day = new Date(day)
    }
    if (day.getDate() === toDate.getDate() && day.getMonth() === toDate.getMonth() && day.getFullYear() === toDate.getFullYear()) {
      weekDay = '今天'
    } else {
      switch (day.getUTCDay()) {
        case 0: weekDay = '周日'
          break
        case 1: weekDay = '周一'
          break
        case 2: weekDay = '周二'
          break
        case 3: weekDay = '周三'
          break
        case 4: weekDay = '周四'
          break
        case 5: weekDay = '周五'
          break
        case 6: weekDay = '周六'
          break
      }
    }
  }
  return weekDay
}

// 获取日期
function getDays () {
  var newDate = new Date()
  var year = newDate.getFullYear()
  var month = newDate.getMonth() + 1
  var firstDay = '01'

  var currentDay = newDate.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (currentDay < 10) {
    currentDay = '0' + currentDay
  }
  var initFromDate = year + '-' + month + '-' + firstDay
  var initToDate = year + '-' + month + '-' + currentDay
  var tomorrow = calculation(initToDate, 'next')
  return {
    first: initFromDate,   // 返回该月的1号日期
    current: initToDate,  // 返回今天
    year: year, // 返回今年
    month: month, // 返回今月
    day: currentDay, // 返回今天日期
    week: getWeekDay(initToDate), // 返回今天的星期几
    tomorrow: tomorrow// 返回明天
  }
}

// 将日期对象转换为字符串
function getDayToString (dateObj, format) {
  if (typeof format === 'string') {
    format = format.toLocaleLowerCase()
  } else {
    format = 'yyyy-mm-dd hh:ii'
  }
  var year = dateObj.getFullYear()
  var month = (dateObj.getMonth() + 1) >= 10 ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)
  var day = dateObj.getDate() >= 10 ? dateObj.getDate() : '0' + dateObj.getDate()
  var hh = dateObj.getHours() >= 10 ? dateObj.getHours() : '0' + dateObj.getHours()
  var ii = dateObj.getMinutes() >= 10 ? dateObj.getMinutes() : '0' + dateObj.getMinutes()
  var ss = dateObj.getSeconds() >= 10 ? dateObj.getSeconds() : '0' + dateObj.getSeconds()
  var returnDay = ''
  switch (format) {
    case 'yyyy-mm-dd':
      returnDay = year + '-' + month + '-' + day
      break
    case 'yyyy-mm-dd hh:ii':
      returnDay = year + '-' + month + '-' + day + ' ' + hh + ':' + ii
      break
    case 'yyyy-mm-dd hh:ii:ss':
      returnDay = year + '-' + month + '-' + day + ' ' + hh + ':' + ii + ':' + ss
      break
    default:
      returnDay = year + '-' + month + '-' + day + ' ' + hh + ':' + ii
      break
  }
  return returnDay
}

export default {
  compareDate,
  calculation,
  getDays,
  getWeekDay,
  getDayToString
}

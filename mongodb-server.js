// ------------------------------
// 게시판 App의 Web server
// ------------------------------

// ENV
require('dotenv').config()
const mongoose = require('mongoose')
// const dbPort = process.env.PORT
// connect to MongoDB / the name of DB is set to 'myDB'
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://localhost/admin", function(err,db){
//     var adminDB = db.admin()
//     adminDB.listDatabases(function(err, databases){
//         console.log("Before Add Database List: ");
//         console.log(databases);
//     });
// });

mongoose.connect(process.env.MONGO_URI, option, (err, db) => {
  if (err) {
    console.error('error occured while connecting db')
    return
  }
  console.log('connected db successfully : ' + process.env.MONGO_URI)
})

// creates DB schema
var MsgSchema = mongoose.Schema({
  name: String,
  // pwd: 'string',
  body: String,
  stime: Date
})

var Msg = mongoose.model('Msg', MsgSchema)

// 서버실행
const express = require('express')
const app = express()
const webPortNo = 80
app.listen(webPortNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${webPortNo}`)
})

// public 디렉터리의 내용을 자동으로 응답
app.use('/public', express.static('./public'))
// 최상위 페이지 접속시 /public으로 리다이렉트
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// API 정의
// 로그 추출 API
app.get('/api/getItems', (req, res) => {
  // DB에 저장돼있는 데이터를 시간 순서로 정렬해서 응답
  Msg.find({}).sort({ stime: 1 }).exec((err, data) => {
    if (err) {
      sendJSON(res, false, { logs: [], msg: err })
      return
    }
    console.log(data)
    sendJSON(res, true, { logs: data })
  })
})

// 로그 작성 API
app.get('/api/write', (req, res) => {
  // URL 매개변수로 받은 값을 DB에 저장
  var newMsg = new Msg({
    name: req.query.name,
    body: req.query.body,
    stime: (new Date()).getTime()
  })
  newMsg.save(function (err, newMsg) {
    if (err) {
      console.error(err)
      sendJSON(res, false, { msg: err })
      return
    }
    sendJSON(res, true, { id: newMsg._id })
  })
})

function sendJSON (res, result, obj) {
  obj.result = result
  res.json(obj)
}

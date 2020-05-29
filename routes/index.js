var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path');
var fs = require('fs');
var pg = require('./pgconn');
var epics = require('epics');
var io=require('../socketio');
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function readFile(path, filesList) {
  files = fs.readdirSync(path);//需要用到同步读取
  files.forEach(walk);
  function walk(file,index) {
    states = fs.statSync(path + '/' + file);
    if (states.isFile() && file.slice(0, 2) != "回复")
    // {
    //     readFile(path+'/'+file,filesList);
    // }
    // else
    {
      //创建一个对象保存信息
      var obj = new Object();
      obj.size = (states.size / 1024 / 1024).toFixed(1);//文件大小，以字节为单位
      // obj.name = file.slice(10, -4);//文件名
      obj.name = file;
      obj.path = (path + '/' + file).slice(8); //文件绝对路径
      obj.mtime = states.mtime;
      obj.time = file.slice(1, 9);
      obj.index = index;

      filesList.push(obj);
    }
  }
}

function getFileList(path)
{
   var filesList = [];
   readFile(path,filesList);
   return filesList;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});

module.exports = router;
router.get('/sf0List.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_variable order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0Ip', function(req, res, next) {
  res.render('sf0Ip', { title: 'Express' });
});

router.get('/pano_image', function(req, res, next) {
  res.render('pano_image', { title: 'Express' });
});
router.get('/sf0IpConfig.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_ip order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0Terminal', function(req, res, next) {
  res.render('sf0Terminal', { title: 'Express' });
});
router.get('/sf0TerminalConfig.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_terminal order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0Device', function(req, res, next) {
  res.render('sf0Device', { title: 'Express' });
});
router.get('/deviceList.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_device order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0File', function(req, res, next) {
  res.render('sf0File', { title: 'Express' });
});
router.get('/lf1Camera', function(req, res, next) {
  res.render('lf1Camera', { title: 'Express' });
});
router.get('/:system_name', function(req, res, next) {
  res.render('fileList', { title:req.params.system_name });
});

router.get('/fileList/:table_url', function(req, res, next) {
  // fs.readdir("./public/files/TMSR-LF1工程/初步设计/01.设计输入参数",function(err,files){
    // console.log(files);
      filelist=getFileList(`./public/files/${req.params.table_url}`);
      res.jsonp(filelist);
    
  });
function ca_connect(pvname,pv){
    pv.on('value', function(data) {
      //console.log('Current:', data);
      io.pvSend(pvname,data);
    });
    pv.connect(function() {
      pv.monitor();
    }); 
}
router.get('/SF0_index/sf01', function(req, res, next) {
    console.log('current','133');
    //东侧余排
    res.render('SF0_index', { title: 'Express' });
});
router.get('/SF0_index/sf02', function(req, res, next) {
  var ajaxText={
    tips:"走通了"
  };
  res.send(ajaxText);
  //东侧余排
  var pwm_PrhEPW_R = new epics.Channel('pwm:PrhEPW_R');
  var BY02AX101 = new epics.Channel('BY06AX031');
  var BY03AX054 = new epics.Channel('BY03AX054');
  var BY03AX084 = new epics.Channel('BY03AX084');
  //西侧余排
  var pwm_PrhWPW_R = new epics.Channel('pwm:PrhWPW_R');
  var BY02AX102 = new epics.Channel('BY02AX102');
  var BY03AX059 = new epics.Channel('BY03AX059');
  var BY03AX085 = new epics.Channel('BY03AX085');
  //堆本体
  var pwm_power = new epics.Channel('pwm_power');
  var BY10AX055 = new epics.Channel('BY10AX055');
  var HP01_temp1 = new epics.Channel('HP01:temp1');
  var HP01_temp3 = new epics.Channel('HP01:temp3');
  //一回路侧
  var BY06AX031 = new epics.Channel('BY06AX031');
  var HP02_temp1 = new epics.Channel('HP02:temp1');
  var HP01_temp2 = new epics.Channel('HP01:temp2');
  var BY06AX085 = new epics.Channel('BY06AX085');
  var BY06AX082 = new epics.Channel('BY06AX082');
  //二回路侧
  var BY06AX028 = new epics.Channel('BY06AX028');
  var HP02_temp4 = new epics.Channel('HP02:temp4');
  var HP02_temp3 = new epics.Channel('HP02:temp3');
  var BY06AX083 = new epics.Channel('BY06AX083');
  var BY05AX026 = new epics.Channel('BY05AX026');
  //空冷
  var BY06AX064 = new epics.Channel('BY06AX064');
  var BY06AX068 = new epics.Channel('BY06AX068');
  var BY05AX032 = new epics.Channel('BY05AX032');
  var BY05AX045 = new epics.Channel('BY05AX045');
  var BY05AX031 = new epics.Channel('BY05AX031');

  //********* */
  ca_connect('pwm_PrhEPW_R',pwm_PrhEPW_R);
  ca_connect('BY02AX101',BY02AX101);
  ca_connect('BY03AX054',BY03AX054);
  ca_connect('BY03AX084',BY03AX084);

  ca_connect('pwm_PrhWPW_R',pwm_PrhWPW_R);
  ca_connect('BY02AX102',BY02AX102);
  ca_connect('BY03AX059',BY03AX059);
  ca_connect('BY03AX085',BY03AX085);

  ca_connect('pwm_power',pwm_power);
  ca_connect('BY10AX055',BY10AX055);
  ca_connect('HP01_temp1',HP01_temp1);
  ca_connect('HP01_temp3',HP01_temp3);

  ca_connect('BY06AX031',BY06AX031);
  ca_connect('HP02_temp1',HP02_temp1);
  ca_connect('HP01_temp2',HP01_temp2);
  ca_connect('BY06AX085',BY06AX085);
  ca_connect('BY06AX082',BY06AX082);

  ca_connect('BY06AX028',BY06AX028);
  ca_connect('HP02_temp4',HP02_temp4);
  ca_connect('HP02_temp3',HP02_temp3);
  ca_connect('BY06AX083',BY06AX083);
  ca_connect('BY05AX026',BY05AX026);

  ca_connect('BY06AX064',BY06AX064);
  ca_connect('BY06AX068',BY06AX068);
  ca_connect('BY05AX032',BY05AX032);
  ca_connect('BY05AX045',BY05AX045);
  ca_connect('BY05AX031',BY05AX031);
});
var socketio={};
var socket_io=require('socket.io');
socketio.getSocketio=function(server){
    var io=socket_io.listen(server);
    this.pvSend=function(pvname,pvdata){
      //console.log("555");
      io.sockets.emit(pvname,pvdata);
  }
}
module.exports=socketio;
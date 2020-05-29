var connect=null;
function Connect(serverIP, serverPort) {
	this.socket = null;
	this.serverIP = serverIP;
	this.serverPort = serverPort;
}
$(document).ready(function(){
        $("p").append(" <b>追加文本</b>");
        connect=new Connect('127.0.0.1',3000);
        connect.initSocket();
         $.ajax({
            url:'/SF0_index/sf02',
            type:'get',
            dataType:'json',
            success:function(data){
                alert(data);
                var stringdata=JSON.stringify(data);
                //alert(stringdata);
            },
            error:function(err){
                alert('error');
            },
        });
});
Connect.prototype.initSocket=function(){
    this.socket=io('127.0.0.1:3000');
    this.socket.on('connect',function(){
        //console.log("socket connected to http://"+connect.serverIP+":"+connect.serverPort);
    });
    this.socket.on('pwm_PrhEPW_R',function(data){
        try{
           $("#para1").text(data);
        }
        catch(e){}
    });
    this.socket.on('disconnect',function(exception){
        console.log("socket disconnect");
    });
}
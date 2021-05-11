var VBalance=VBalance||{};

function shokika(){
  VBalance.theta=10;//Arg Balancer
  VBalance.alpha=10;//Arg gyro
  VBalance.omega=0;//Arg velocity
  VBalance.A=0.01;//Const $\frac{2mgy}{I}$
  VBalance.Loss=0.999;//Enegy loss const
}

function calc(){
  VBalance.omega-=VBalance.A*Math.sin((VBalance.alpha+VBalance.theta)/180*Math.PI);
  VBalance.omega*=VBalance.Loss;
  VBalance.theta+=VBalance.omega;
  
  var log="<br>omega="+VBalance.omega+"<br>alpha="+VBalance.alpha+"<br>theta="+VBalance.theta;
  //console.log(log);
  document.getElementById("Status").innerHTML=log;
  
  picrotation(VBalance.alpha+VBalance.theta);
}

function Start(){
	console.log("Start");
	
	if(window.DeviceOrientationEvent){
		console.log("Event");
		
		if(DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function'){
			VBalance.bannar= '<a href="javascript:ClickRequestDeviceSensor();">Click to use gyro</a>';
			//'<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
			console.log(VBalance.bannar);
			
			document.getElementById("Permission").innerHTML=VBalance.bannar;
  		}else{
			window.addEventListener("deviceorientation",deviceOrientation);
		}
	}
	VBalance.interval=setInterval(calc,50);
}

function picrotation(arg){
	
}

function deviceOrientation(event){
	event.preventDeafult();
	VBalance.alpha=-1*event.alpha;
}


function ClickRequestDeviceSensor(){
  console.log("Allow");
  //. ユーザーに「許可」を求めるダイアログを表示
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      //. 許可された場合のみイベントハンドラを追加できる
      window.addEventListener( "deviceorientation", deviceOrientation );
      //. 画面上部のボタンを消す
      $('#sensorrequest').css( 'display', 'none' );
    }
  }).catch( function( e ){
    console.log( e );
  });
}

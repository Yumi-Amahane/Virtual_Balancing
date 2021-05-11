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
  
  var log="<br>omega="+VBalance.omega+"<br>Arg="+VBalance.alpha+"<br>theta="+VBalance.theta;
  console.log(log);
  document.getElementById("Status").innerHTML=log;
  
  picrotation(arg);
}

function Start(){
	if(window.DeviceOrientationEvent){
		if(DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission==='fuction'){
			VBalance.bannar= '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">�Z���T�[�̗L����</p></div>';
    $('body').prepend( banner );
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
  //. ���[�U�[�Ɂu���v�����߂�_�C�A���O��\��
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      //. �����ꂽ�ꍇ�̂݃C�x���g�n���h����ǉ��ł���
      window.addEventListener( "deviceorientation", deviceOrientation );
      //. ��ʏ㕔�̃{�^��������
      $('#sensorrequest').css( 'display', 'none' );
    }
  }).catch( function( e ){
    console.log( e );
  });
}

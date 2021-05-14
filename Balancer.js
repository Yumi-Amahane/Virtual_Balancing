var VBalance=VBalance||{};

function shokika(){
  VBalance.arg=0;
  VBalance.theta=0;//Arg Balancer
  VBalance.alpha=0;//Arg gyro
  VBalance.beta=0;//gyro
  VBalance.gamma=0;//gyro
  
  VBalance.omega=0;//Arg velocity
  VBalance.A=0.01;//Const $\frac{2mgy}{I}$
  VBalance.Loss=0.999;//Enegy loss const
}

function calc(){
  if (VBalance.beta>90)VBalance.arg=VBalance.theta-VBalance.gamma;
  else VBalance.arg=VBalance.theta+VBalance.gamma;
  VBalance.omega*=VBalance.Loss;
  VBalance.omega-=VBalance.A*Math.sin(VBalance.arg/180*Math.PI);
  VBalance.theta+=VBalance.omega;
  
  var log="<br>omega="+VBalance.omega+"<br>alpha="+VBalance.alpha+"<br>beta="+VBalance.beta+"<br>gamma="+VBalance.gamma+"<br>theta="+VBalance.theta;
  //console.log(log);
  document.getElementById("Status").innerHTML=log;
  
  picrotation(VBalance.theta);
}

function Start(){
	console.log("Start");
	
	if(window.DeviceOrientationEvent){
		console.log("Event");
		
		if(DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function'){
			VBalance.bannar= '<a href="javascript:ClickRequestDeviceSensor();">Click to use gyro</a>';
			//'<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">ƒZƒ“ƒT[‚Ì—LŒø‰»</p></div>';
			console.log(VBalance.bannar);
			
			document.getElementById("Permission").innerHTML=VBalance.bannar;
  		}else{
  		
  		
			window.addEventListener("deviceorientation", function(event) {
		        VBalance.alpha = event.alpha;
		        VBalance.beta = event.beta;
		        VBalance.gamma = event.gamma;

		        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
		    }, true);
		    	
		}
	}
	VBalance.interval=setInterval(calc,5);
}

function picrotation(arg){
	VBalance.image=document.getElementById("BalancerImg");
	VBalance.canvas=document.getElementById("Balancer");
	VBalance.context=VBalance.canvas.getContext("2d");

	VBalance.context.clearRect(0,0,VBalance.canvas.width,VBalance.canvas.height);
	VBalance.context.translate(VBalance.canvas.width/2,VBalance.canvas.height/2);
	VBalance.context.rotate(arg/100);
	VBalance.context.drawImage(VBalance.image,-VBalance.canvas.width/2,-VBalance.canvas.height/2,VBalance.canvas.width,VBalance.canvas.height);
	VBalance.context.rotate(-arg/100);
	VBalance.context.translate(-VBalance.canvas.width/2,-VBalance.canvas.height/2);
}

function deviceOrientation(e){
	
	e.preventDeafult();
	VBalance.alpha=-1*e.alpha;
}


function ClickRequestDeviceSensor(){
  console.log("Allow");
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      //window.addEventListener( "deviceorientation",deviceOrientation);
      		window.addEventListener("deviceorientation", function(event) {
		        VBalance.alpha = event.alpha;
		        VBalance.beta= event.beta;
		        VBalance.gamma = event.gamma;

		        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
		    }, true);
		    
      
      document.getElementById("Permission").innerHTML="";
    }
  }).catch( function( e ){
    console.log( e );
  });
}

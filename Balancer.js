
var VBalance==VBalance||{};
function shokika(){
  VBalance.theta=10;//Arg Balancer
  VBalance.alpha=0;//Arg gyro
  VBalance.omega=0;//Arg velocity
  VBalance.A=0.01;//Const $\frac{2mgy}{I}$
  VBalance.Loss=0.999;//Enegy loss const
}

function calc(){
  VBalance.omega-=A*sin(alpha+theta);
  VBalance.omega*=VBalance.Loss;
  VBalance.theta+=VBalance.omega;
  
  document.getElementById("Status")=Status+"<br>omega="+omega+"<br>Arg="+VBalance. VBalance.alpha+VBalance.theta;
}

VBalance.interval=setinterval(calc,5);


window.ondeviceorientation=function(event){
	VBalance.alpha=event.alpha;
	var beta=event.beta;
	var gamma=event.gamma;
	var Status="alpha="+alpha+"<br>beta"+beta+"<br>gamma="+gamma;
	document.getElementById("Status")=Status;
}

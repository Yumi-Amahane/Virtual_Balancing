
var VBalance==VBalance||{};
function shokika(){
  VBalance.theta=10;//バランサー角度
  VBalance.alpha=0;//ジャイロ角度
  VBalance.omega=0;//バランサー速度
  VBalance.A=0.01;//比例定数 $\frac{2mgy}{I}$
  VBalance.Loss=0.999;//エネルギーのロス
}

function calc(){
  VBalance.omega-=A*sin(alpha+theta);
  VBalance.omega*=VBalance.Loss;
  VBalance.theta+=VBalance.omega;
  
  document.getElementById("Status")=Status+"<br>omega="+omega+"<br>Arg="+VBalance. VBalance.alpha+VBalance.theta;
}


window.ondeviceorientation=function(event){
	VBalance.alpha=event.alpha;
	var beta=event.beta;
	var gamma=event.gamma;
	var Status="alpha="+alpha+"<br>beta"+beta+"<br>gamma="+gamma;
	document.getElementById("Status")=Status;
}

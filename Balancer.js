window.ondeviceorientation=function(event){
	var alpha=event.alpha;
	var beta=event.beta;
	var gamma=event.gamma;
	var Status="alpha="+alpha+"<br>beta"+beta+"<br>gamma="+gamma;
	document.getElementById("Status")=Status;
}
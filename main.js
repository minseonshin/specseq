var c = document.getElementById('c');
var n = 2; // page number
var ctx = c.getContext('2d');
var GS = 80; // group separation
var gps = new Map();
var MAXP = parseInt(maxp.value);
var MAXQ = parseInt(maxq.value);
var pad = 15;

function createGroups(p,q){
	let gp = {};
	gp.p = p;
	gp.q = q;
	gp.x = GS*p;
	gp.y = GS*(MAXQ-q);
	gps.set(`${p}_${q}`,gp);
	//console.log(p,q);
}
function drawGroups(){
	for (const key of gps.keys()) {
		let p = parseInt(key.split('_')[0]);
		let q = parseInt(key.split('_')[1]);
		let gp = gps.get(`${p}_${q}`);
		//console.log(gp);
		ctx.font = "20px Georgia";
		if(p-n < 0 && q+(1-n) < 0){ctx.fillStyle = "#000000";}
		else{ctx.fillStyle = "#808080";}
		ctx.fillText("E",gp.x+5,gp.y-10);
		ctx.font = "10px Georgia";
		ctx.fillText(p+","+q,gp.x+19,gp.y-20);
		ctx.fillText(n,gp.x+20,gp.y-8);
	}
}
function drawArrows(){
	for (const key of gps.keys()) {
		let p = parseInt(key.split('_')[0]);
		let q = parseInt(key.split('_')[1]);
		let p2 = p+n, q2 = q+1-n;
		let gp1 = gps.get(`${p}_${q}`);
		let gp2 = gps.get(`${p2}_${q2}`);
		if(q2 < 0 || p2+q2 >= MAXP+MAXQ){continue;}
		//console.log(`${p}_${q} --> ${p2}_${q2}`);
		let angle = Math.atan2(1-n,n);
		ctx.beginPath();
		ctx.moveTo(gp1.x+15+pad*Math.cos(angle),gp1.y-15-pad*Math.sin(angle));
		ctx.lineTo(gp2.x+15-pad*Math.cos(angle),gp2.y-15+pad*Math.sin(angle));
		ctx.save();
		ctx.translate(gp2.x+15-pad*Math.cos(angle),gp2.y-15+pad*Math.sin(angle));
		ctx.rotate(-angle);
		ctx.moveTo(-5, 4); ctx.lineTo(0,0);
		ctx.moveTo(-5,-4); ctx.lineTo(0,0);
		ctx.restore();
		ctx.stroke();

	}
}
var redraw = function(){
	c.width  = maxp.value*GS;
	c.height = maxq.value*GS;
	ctx.clearRect(0,0,c.width,c.height);
	document.getElementById("nval").innerHTML = "page # = "+n;
	drawGroups();
	drawArrows();
    //if (document.getElementById("differentials").checked) {labelArrows();}
}
for( let p = 0; p < MAXP+MAXQ; p++){
	for( let q = 0; p+q < MAXP+MAXQ; q++){
		createGroups(p,q);
	}
}
redraw();
maxp.onchange   = redraw;
maxq.onchange   = redraw;
//differentials.onchange = redraw;
document.onkeydown = function(e) {
    switch (e.keyCode) {
    case 37: str = 'Left';  if(n>0){n--;} redraw(); break;
    case 39: str = 'Right'; if(n<6){n++;} redraw(); break;
    }
}

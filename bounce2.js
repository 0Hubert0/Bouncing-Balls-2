var y_velocity = new Array(100);
var y = new Array(100);
var x = new Array(100);
var x_velocity = new Array(100);
var line = new Array(100);
var noc=0, fraction=0.95, ifclick=false, yi, yf, dy, xi, xf, dx, theta, r;
var cursorY1, cursorX1, cursorY2, cursorX2;

addEventListener("mousedown", check1, true);
addEventListener("mouseup", check2, true);
addEventListener("mousemove", stretch, true);
setInterval(loop, 10);
setInterval(loop2, 10);

function check1(e)
{
	r = 0;
	ifclick=true;
	cursorX1 = e.pageX;
	cursorY1 = e.pageY;
	yi = cursorY1-=56;
	xi = cursorX1-=257;
}

function stretch(e)
{
	if(ifclick==true)
	{
		cursorX2 = e.pageX;
		cursorY2 = e.pageY;
		yf = cursorY2-=56;
		xf = cursorX2-=257;
		
		dy = yi - yf;
		if (dy<0) {dy*=-1;}
		dx = xi - xf;	
		if (dx<0) {dx*=-1;}
		theta = Math.atan(dy/dx);
		theta *= 180/Math.PI;
		r=Math.sqrt(dy*dy+dx*dx);
		
		var newDiv1 = document.createElement("div");
		document.getElementById("bounce").appendChild(newDiv1);
		newDiv1.setAttribute("class", "line");
		var id1="l"+noc;
		newDiv1.setAttribute("id", id1);
		var line = document.getElementById(id1);
		var height = r + "px";
		line.style.setProperty("height", height);
		var i=xi+6+"px";
		var o=yi+4+"px";
		line.style.setProperty("margin-left", i);
		line.style.setProperty("margin-top", o);
		if (xi>xf && yi<yf)
		{
			var ang = 360-theta+90;
			var angle = "rotate("+ang+"deg)";
			line.style.setProperty("transform", angle);
		}
		else if (xi<xf && yi<yf)
		{
			var ang = theta-90;
			var angle = "rotate("+ang+"deg)";
			line.style.setProperty("transform", angle);
		}
		else if (xi>xf && yi>yf)
		{
			var ang = theta+90;
			var angle = "rotate("+ang+"deg)";
			line.style.setProperty("transform", angle);
		}
		else if (xi<xf && yi>yf)
		{
			var ang = 360-theta-90;
			var angle = "rotate("+ang+"deg)";
			line.style.setProperty("transform", angle);
		}
	}
}

function check2()
{
	ifclick=false;
	
	var newDiv = document.createElement("div");
	document.getElementById("bounce").appendChild(newDiv);
	newDiv.setAttribute("class", "circle");
	y[noc] =yi;
	var t =y[noc]+"px";
	newDiv.style.setProperty("top", t);
	x[noc] =xi;
	var tt =x[noc]+"px";
	newDiv.style.setProperty("left", tt);
	var u="c"+noc;
	newDiv.setAttribute("id",u);
	if(r>0)
	{
		if (xi<xf){x_velocity[noc]=dx/10*-1;}
		else if (xi>xf){x_velocity[noc]=dx/10;}
		if (yi<yf){y_velocity[noc]=dy/10*-1;}
		else if (yi>yf){y_velocity[noc]=dy/10;}
	}
	else {y_velocity[noc]=0;}
	
	var id1="l"+noc;
	var line = document.getElementById(id1);
	if(r>0){line.style.setProperty("display","none");}
	
	
	noc++;
}



function loop()
{
		for (var n=0; n<noc; n++)
		{
			var tt ="c"+n;
			var d = document.getElementById(tt);
			if (y[n]>=440) 
			{
				y_velocity[n]*=-0.7;
				y[n]=440;
			}
			if (y[n]<=0) 
			{
				y_velocity[n]*=-0.9;
				y[n]=0;
			}
			y[n]+=y_velocity[n];
			y_velocity[n]+=0.1;
			var ddd = y[n]+"px";
			d.style.setProperty("top", ddd);
		}
}

function loop2()
{
		for (var n=0; n<noc; n++)
		{
			var tt ="c"+n;
			var d = document.getElementById(tt);
			x[n]+=x_velocity[n];
			if(x[n]>695 || x[n]<0){x_velocity[n]*=-1;}
			x_velocity[n]*=0.999;
			var pp = x[n]+"px";
			d.style.setProperty("left", pp);
		}
}





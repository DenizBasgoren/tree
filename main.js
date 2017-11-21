// Made by Deniz Bashgoren on Nov 2017

const canvas = document.createElement('canvas');
document.body.append(canvas);
let w = window.innerWidth-5;
let h = window.innerHeight-5;
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext('2d');

function Square (topLeftX, topLeftY, oneSideLength, angle) {
	
	// WARNING :
	// Any attempt to read the code below this line will deal you +10 headache.

	this.x = topLeftX;
	this.y = topLeftY;
	this.r = oneSideLength;
	this.a = angle;

	this.render = function (ctx, color) {
		let tempX=this.x, tempY=this.y, tempA=this.a;
		ctx.beginPath();
		ctx.moveTo(tempX, tempY);

		tempX = tempX + this.r*Math.cos(tempA);
		tempY = tempY + this.r*Math.sin(tempA);
		tempA += Math.PI/2;
		if (tempA<0) tempA += 2*Math.PI;
		else if (tempA>360) tempA -= 2*Math.PI;
		ctx.lineTo(tempX, tempY);

		tempX = tempX + this.r*Math.cos(tempA);
		tempY = tempY + this.r*Math.sin(tempA);
		tempA += Math.PI/2;
		if (tempA<0) tempA += 2*Math.PI;
		else if (tempA>360) tempA -= 2*Math.PI;
		ctx.lineTo(tempX, tempY);

		tempX = tempX + this.r*Math.cos(tempA);
		tempY = tempY + this.r*Math.sin(tempA);
		tempA += Math.PI/2;
		if (tempA<0) tempA += 2*Math.PI;
		else if (tempA>360) tempA -= 2*Math.PI;
		ctx.lineTo(tempX, tempY);	

		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}

	this.reproduce = function () {
		return [ new Triangle(this) ];
	}
	
}

function Triangle (squareObj) {
	this.s = squareObj;

	this.render = function (ctx, color) {
		let tempX=this.s.x, tempY=this.s.y, tempA=this.s.a, tempR=this.s.r;
		ctx.beginPath();
		ctx.moveTo(tempX, tempY);

		tempX = tempX + tempR*Math.cos(tempA);
		tempY = tempY + tempR*Math.sin(tempA);
		ctx.lineTo(tempX, tempY);

		tempA += (Math.PI + Math.PI/4);
		if (tempA<0) tempA += 2*Math.PI;
		else if (tempA>360) tempA -= 2*Math.PI;
		tempX = tempX + tempR/Math.SQRT2 * Math.cos(tempA);
		tempY = tempY + tempR/Math.SQRT2 * Math.sin(tempA);
		ctx.lineTo(tempX, tempY);

		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}

	this.reproduce = function() {
		let r1 = this.s.r/Math.SQRT2;
		let a1 = this.s.a+Math.PI*5/4;
		let r2 = r1;
		let a2 = this.s.a-Math.PI/4;
		let x = this.s.x;
		let y = this.s.y;

		return [	new Square(x+r1*Math.cos(a1), y+r1*Math.sin(a1),
						r1, this.s.a-Math.PI/4 ),
					new Square(x+r2*2*Math.cos(a2), y+r2*2*Math.sin(a2),
						r2, this.s.a+Math.PI/4 )	];
	}
}

let data = [ new Square(w/2,h-200,100,0) ];
let i = 0, color = 0xa50;
(new Square(w/2, h-100, 100, 0)).render(ctx, "#a50");

setInterval(function() {
		data[i].render(ctx,`#${color.toString(16)}`);
		data[i].render(ctx,`#${color.toString(16)}`);		
		let newGeneration = data[i].reproduce();
		for (let j = 0; j<newGeneration.length; j++) {
			data[data.length] = newGeneration[j];
		}
	i++;
	if (Math.log2(i) % 1 ==0 ) color -= 0x110;
}, 1);
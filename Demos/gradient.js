var art = new ART(1000, 600);

var group = art; //new ART.Group().inject(art);
var pill = new ART.Pill(200, 20).stroke('#ccc').fill('rgba(255, 0, 0, .2)').inject(group);
var text = new ART.Font('Moderna', 'normal', 'Some Text!', 10).translate(20, 5).fill('#000').inject(group);

pill = new ART.Pill(200, 20).fill('rgba(0, 0, 0, .2)').translate(0, 180).inject(group);
text = new ART.Font('Moderna', 'normal', 'Some Text!', 10).translate(20, 185).fill('#000').rotate(-45).inject(group);

new ART.Ellipse(100, 100).translate(50, 50).fill('#0f0').inject(group);
var size = new ART.Shape().draw(new ART.Path().move(0, 0).counterArc(100, 70, 100, 200, false)).translate(50, 50).stroke('#000').fill('#00f').inject(group).measure();
new ART.Rectangle(size.width, size.height).translate(size.left + 49.5, size.top + 49.5).stroke('#c00').inject(group);

var blu = new ART.Wedge(0, 100, 370, 50).fill('#00f').translate(400.5, 0.5).scale(2, 1).rotate(90, 100, 0).inject(group);

var wedge = new ART.Wedge().fillRadial(['#00f', '#f00', 'rgba(255, 0, 0, 0)']).translate(200.5, 0.5).stroke('rgba(0, 0, 0, .2)', 20).inject(group);
var bb = new ART.Rectangle().stroke('rgba(0, 0, 0, .5)').inject(group);

//group.scale(1, 1).rotate(0, 0, 200).translate(0, 0).scale(1);

new ART.Ellipse(200, 100).fillRadial(['#000', '#F00', '#FFF'], .15, .5, .5, .5, .5).translate(500, 200).inject(group);
var gt = new ART.Rectangle(100, 200).translate(450, 310).stroke('#000').inject(group);

var rt = new ART.Rectangle(100, 200).translate(600, 310).stroke('#000').inject(group);

var p = new ART.Path().move(20, 20).line(200, 0).line(-100, 100).line(-10, 0).close().move(10, 10).arc(100, 100).arc(-100, -100).close();
size = new ART.Shape(p).fillRadial(['rgba(255, 0, 0, .2)', '#00f', '#f00', '#0f0']).translate(150, 310).stroke('#000').inject(group).measure();
new ART.Rectangle(size.width, size.height).translate(size.left + 150, size.top + 310).stroke('#ddd').inject(group);


new ART.Rectangle(100, 100).translate(0, 300).stroke('#ddd').inject(group);
var tang = new ART.Shape().translate(0, 300).stroke('#000').inject(group);

/*var tb = document.createElement('av:textbox');
rt.element.appendChild(tb);
var span = new Element('span', { text: 'My text .sdfgsd fgsdf gsdfg.sd f.gsdfgd.sf sd.fg.sdf g.sdf.g.sdfg. s.dg.sdfg.sd fgsd.fg.sd g.sdfg.' });
span.inject(tb);*/

//gt.fillLinear({ '0.00': 'rgba(0, 0, 0, 0.2)', '0.02': '#000', '0.50': '#F00', '0.98': 'rgba(255, 255, 255, 1)', '1.00': '#0F0' });

gt.fill('rgb(0, 0, 0, .1)', 'rgb(255, 0, 0, .2)');

art.inject(document.body);
//console.log('injected');

gt.fill();

gt.fill('#f00', '#0f0');

//gt.fill();

//gt.fill('rgb(0, 0, 0)', 'rgb(255, 0, 0)');

//gt.fill('#f00');




setInterval(function(){

//gt.fill('rgb(0, 0, 0)', '#f00');

	var angle = (new Date() % 30000) / 30000 * 360;
	gt.fillLinear({ '0.00': '#0F0', '0.02': '#000', '0.50': '#F00', '0.98': 'rgba(255, 255, 255, 1)', '1.00': '#0F0' }, angle);
	//rt.eject();
	rt.fillRadial({ 0.0: '#000', '0.9': '#F00', '1.0': '#FFF' }, .5, .5 + Math.abs(Math.cos(angle * Math.PI / 90)) / 2, .25, .5, .75);
	//rt.inject(group);

	//div.setStyle('background-image', '-moz-linear-gradient(' + angle + 'deg, #000, #F00, #FFF)');

	angle *= Math.PI / 180;

	var x1 = .5, y1 = .5;

	var x2 = Math.cos(angle), y2 = Math.sin(angle),
		l = (Math.abs(x2) + Math.abs(y2)) / 2;
	
	x2 *= l; y2 *= l;

	var x3 = -Math.sin(angle) * 40, y3 = Math.cos(angle) * 40;

	tang.draw(new ART.Path().move(x1 * 100, y1 * 100).line((x2) * 100, (y2) * 100).move(x3, y3).line(-x3 * 2, -y3 * 2));


	// Wedget

	var angle = (new Date() % 30000) / 30000 * 360;
	wedge.draw(33, 100, 0, Math.round(angle));
	size = wedge.measure();
	bb.translate(size.left + 200, size.top).draw(size.width, size.height);

}, 50);

/*
var second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24,
	month = day * 30.41,
	year = month * 12;

var timescales = [year, month, day, hour, minute];

var wedges = timescales.map(function(s, i){ return new ART.Wedge().fill('#0f0').translate(640 - i * 10, 40 - i * 10).inject(group); });

setInterval(function(){

	var time = +new Date();

	timescales.each(function(s, i){
		wedges[i].draw(40 + i * 10, 48 + i * 10, 0, (time % s) / s * 360);
	});

}, 50);
*/

var div = new Element('div', { styles: { width: 100, height: 100 }});

div.inject(document.body);


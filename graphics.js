var origin = [480, 300], j = 10, scale = 2, lines = [], yLine = [], xGrid = [], yGrid = [], zGrid = [], beta = 0, alpha = 0, key = function(d){ return d.id; };
var svg = d3.select('svg').call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g').attr('transform', 'translate(0, 100)');
var color  = d3.scaleOrdinal(d3.schemeCategory20);
var mx, my, mouseX, mouseY;
var mxX = 200, mxY = 200, mxZ = 200;
var PIXELS_BY_CELL = 20;
var N = parseInt(mxX / PIXELS_BY_CELL);
var M = parseInt(mxY / PIXELS_BY_CELL);
var K = parseInt(mxZ / PIXELS_BY_CELL);
var startAngleY = 0.7 * Math.PI;
var startAngleX = 0.1 * Math.PI;
//startAngleY = 0;
//startAngleX = 0;
var last_beta = 0;
var last_alpha = 0;

var grid3d = d3._3d()
	.shape('GRID', 11)
	.origin(origin)
	.rotateY( startAngleY)
	.rotateX(-startAngleX)
	.scale(scale);

var plane3d = d3._3d()
	.shape('PLANE')
	.x(function(d){ return d.x; })
	.y(function(d){ return d.y; })
	.z(function(d){ return d.z; })
	.origin(origin)
	.rotateY( startAngleY)
	.rotateX(-startAngleX)
	.scale(scale);
	
var point3d = d3._3d()
	.x(function(d){ return d.x; })
	.y(function(d){ return d.y; })
	.z(function(d){ return d.z; })
	.origin(origin)
	.rotateY( startAngleY)
	.rotateX(-startAngleX)
	.scale(scale);

var line3d = d3._3d()
	.shape('LINE')
	.x(function(d){ return d.x; })
	.y(function(d){ return d.y; })
	.z(function(d){ return d.z; })
	.origin(origin)
	.rotateY( startAngleY)
	.rotateX(-startAngleX)
	.scale(scale);
	
function drawGrid(data) {
	var xGrid = svg.selectAll('path.gridX').data(data[0]);
	xGrid
		.enter()
		.append('path')
		.attr('class', '_3d gridX')
		.merge(xGrid)
		.attr('stroke', 'black')
		.attr('stroke-width', 0.3)
		.attr('fill', function(d){ return !d.ccw ? 'lightgrey' : '#717171'; })
		.attr('fill-opacity', 0.9)
		.attr('d', grid3d.draw);

	xGrid.exit().remove();
	
	var yGrid = svg.selectAll('path.gridY').data(data[1]);
	yGrid
		.enter()
		.append('path')
		.attr('class', '_3d gridY')
		.merge(yGrid)
		.attr('stroke', 'black')
		.attr('stroke-width', 0.3)
		.attr('fill', function(d){ return !d.ccw ? 'lightgrey' : '#919191'; })
		.attr('fill-opacity', 0.9)
		.attr('d', grid3d.draw);
	
	yGrid.exit().remove();
	
	var zGrid = svg.selectAll('path.gridZ').data(data[2]);
	zGrid
		.enter()
		.append('path')
		.attr('class', '_3d gridZ')
		.merge(zGrid)
		.attr('stroke', 'black')
		.attr('stroke-width', 0.3)
		.attr('fill', function(d){ return !d.ccw ? 'lightgrey' : '#717171'; })
		.attr('fill-opacity', 0.9)
		.attr('d', grid3d.draw);

	zGrid.exit().remove();
}

function posPointX(d){
	return d.projected.x;
}

function posPointY(d){
	return d.projected.y;
}

function getFillPoint(d) {
	if (!visualization) {
		return 'blue';
	}
	if (d.z < current_state.l) {
		return 'black';
	} else if (d.z <= current_state.X) {
		return 'blue';
	} else if (d.z <= current_state.r) {
		return 'yellow';
	} else {
		return 'black';
	}
}

function drawPoints(points_data) {
	var points = svg.selectAll('circle').data(points_data);

	points
		.enter()
		.append('circle')
		.attr('class', '_3d')
		.attr('opacity', 0)
		.attr('cx', posPointX)
		.attr('cy', posPointY)
		.merge(points)
		.attr('r', 3)
		.attr('stroke', function(d){ return 'gray' })
		.attr('fill', getFillPoint)
		.attr('opacity', 1)
		.attr('cx', posPointX)
		.attr('cy', posPointY);

	points.exit().remove();
}

function drawLines(data, class_name, color) {
	var lines = svg.selectAll('line.' + class_name).data(data);

	lines
		.enter()
		.append('line')
		.attr('class', '_3d ' + class_name)
		.merge(lines)
		.attr('fill', d3.color(color))
		.attr('stroke', d3.color(color))
		.attr('stroke-width', 2)
		.attr('x1', function(d){ return d[0].projected.x; })
		.attr('y1', function(d){ return d[0].projected.y; })
		.attr('x2', function(d){ return d[1].projected.x; })
		.attr('y2', function(d){ return d[1].projected.y; });

	lines.exit().remove();
}

function drawPlanes(data){
	var planes = svg.selectAll('path.Plane').data(data);
	planes
		.enter()
		.append('path')
		.attr('class', '_3d Plane')
		.merge(planes)
		.attr('opacity', '0.2')
		.attr('fill', 'transparent')
		.attr('stroke', d3.color('black'))
		.attr('stroke-width', 5)
		.attr('d', grid3d.draw)

	planes.exit().remove();
}

function posPointX(d) {
	return d.projected.x;
}

function posPointY(d) {
	return d.projected.y;
}

function initGrid() {
	xGrid = [];
	yGrid = [];
	zGrid = [];
	for (var x = 0; x <= N; ++x) {
		for (var z = 0; z <= K; ++z) {
			xGrid.push([-x * PIXELS_BY_CELL, 0, -z * PIXELS_BY_CELL]);
		}
	}	
	for (var x = 0; x <= N; ++x) {
		for (var y = 0; y <= M; ++y) {
			yGrid.push([-x * PIXELS_BY_CELL, -y * PIXELS_BY_CELL, 0]);
		}
	}
	for (var y = 0; y <= M; ++y) {
		for (var z = 0; z <= K; ++z) {
			zGrid.push([0, -y * PIXELS_BY_CELL, -z * PIXELS_BY_CELL]);
		}
	}
	var data = [
		grid3d(xGrid),
		grid3d(yGrid),
		grid3d(zGrid),
	];
	drawGrid(data);
}

function initPoints() {
	drawPoints(point3d(points));
}

function initLines() {
	lines = [];
	lines.push([{'x':-10,'y':-10,'z':-10},{'x':-111,'y':-111,'z':-111}]);
	drawLines(line3d(lines));
}

function dragStart(){
	mx = d3.event.x;
	my = d3.event.y;
}

function redraw(beta, alpha) {
	last_beta = beta;
	last_alpha = alpha;
	var data = [
		grid3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(xGrid),
		grid3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(yGrid),
		grid3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(zGrid),
	];
	drawGrid(data);
	drawPoints(point3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(points));
	//drawLines(line3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(lines));
	if (visualization) {
		var planes = [];
		if (current_state.l != INF) {
			planes.push([{'x': -1, 'y': -1, 'z': current_state.l},
						 {'x': -1, 'y': -mxY, 'z': current_state.l},
						 {'x': -mxX, 'y': -mxY, 'z': current_state.l},
						 {'x': -mxX, 'y': -1, 'z': current_state.l}]);
			planes.push([{'x': -1, 'y': -1, 'z': current_state.r},
						 {'x': -1, 'y': -mxY, 'z': current_state.r},
						 {'x': -mxX, 'y': -mxY, 'z': current_state.r},
						 {'x': -mxX, 'y': -1, 'z': current_state.r}]);
			planes.push([{'x': -1, 'y': -1, 'z': current_state.X},
						 {'x': -1, 'y': -mxY, 'z': current_state.X},
						 {'x': -mxX, 'y': -mxY, 'z': current_state.X},
						 {'x': -mxX, 'y': -1, 'z': current_state.X}]);
		}
		drawPlanes(plane3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)(planes));
		if (current_state.current_min.length == 2) {
			drawLines(line3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)([current_state.current_min]), 'curMin', 'black');
		}
		if (current_state.new_min.length == 2) {
			drawLines(line3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)([current_state.new_min]), 'newMin', current_state.new_min_color);
		} else {
			drawLines(line3d.rotateY(beta + startAngleY).rotateX(alpha - startAngleX)([]), 'newMin', '');
		}
		//d3.selectAll('._3d').sort(cmpByZ2);
	}
	//d3.selectAll('._3d').sort(d3._3d().rotateY(beta + startAngleY).rotateX(alpha - startAngleX).sort);
	//d3.selectAll('._3d').sort(d3._3d().sort);
}

function dragged(){
	mouseX = mouseX || 0;
	mouseY = mouseY || 0;
	beta = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
	alpha = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);
	redraw(beta, alpha);
}

function dragEnd(){
	mouseX = d3.event.x - mx + mouseX;
	mouseY = d3.event.y - my + mouseY;
}

function init() {
	initGrid();
	initPoints();
	//initLines();
	//d3.selectAll('._3d').sort(d3._3d().rotateY(last_beta + startAngleY).rotateX(last_alpha - startAngleX).sort);
	//d3.selectAll('._3d').sort(d3._3d().sort);
}
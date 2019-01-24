var INF = 1000111222;
var points = [];
var states = [];
var current_min = [];
var current_state_id = 0;
var current_state_id;
var current_state;
var timeout_id  = 0;
var visualization = false;

for (var p = 0; p < 21; ++p) {
	points.push({
		x: randInt(-1, -MAX_X),
		y: randInt(-1, -MAX_Y),
		z: randInt(-1, -MAX_Z),
		id: p
	});
}

function deepCopy(o) {
	return JSON.parse(JSON.stringify(o));
}

function getDistance(c) {
	if (c.length == 0) {
		return INF;
	}
	var x = c[0].x - c[1].x;
	var y = c[0].y - c[1].y;
	var z = c[0].z - c[1].z;
	return Math.sqrt(x * x + y * y + z * z);
}

function State(l, r, mid, lX, rX, X, d, current_min, new_min, cube, current_point_id, description) {
	this.l = l;
	this.r = r;
	this.mid = mid;
	this.lX = lX;
	this.rX = rX;
	this.X = X;
	this.d = d;
	this.current_min = deepCopy(current_min);
	this.new_min = deepCopy(new_min);
	if (new_min.length == 2) {
		if (getDistance(current_min) > getDistance(new_min)) {
			this.new_min_color = 'green';
		} else {
			this.new_min_color = 'red';
		}
	}
	this.cube = cube;
	this.current_point_id = current_point_id;
	this.description = description;
}

function cmpByZ(a, b) {
	return a.z - b.z;
}

function mergeSubarrays(l, mid, r) {
	var pos1 = l, pos2 = mid + 1;
	var tmp = [];
	while (pos1 <= mid || pos2 <= r) {
		if (pos1 > mid) {
			tmp.push(deepCopy(points[pos2++]));
		} else if (pos2 > r) {
			tmp.push(deepCopy(points[pos1++]));
		} else if (points[pos1].y < points[pos2].y) {
			tmp.push(deepCopy(points[pos1++]));
		} else {
			tmp.push(deepCopy(points[pos2++]));
		}
	}
	for (var i = l; i <= r; ++i) {
		points[i] = tmp[i - l];
	}
}

function getCube(lx, ly, lz, rx, ry, rz) {
	lx = Math.min(lx, -1);
	ly = Math.min(ly, -1);
	lz = Math.min(lz, -1);
	
	rx = Math.max(rx, -MAX_X + 1);
	ry = Math.max(ry, -MAX_Y + 1);
	rz = Math.max(rz, -MAX_Z + 1);
	
	var planes = [];
	planes.push([{'x': lx, 'y': ly, 'z': lz},
				 {'x': lx, 'y': ry, 'z': lz},
				 {'x': rx, 'y': ry, 'z': lz},
				 {'x': rx, 'y': ly, 'z': lz}]);
	planes.push([{'x': lx, 'y': ly, 'z': rz},
				 {'x': lx, 'y': ry, 'z': rz},
				 {'x': rx, 'y': ry, 'z': rz},
				 {'x': rx, 'y': ly, 'z': rz}]);
				 
	planes.push([{'x': lx, 'y': ly, 'z': lz},
				 {'x': lx, 'y': ly, 'z': rz},
				 {'x': rx, 'y': ly, 'z': rz},
				 {'x': rx, 'y': ly, 'z': lz}]);
	planes.push([{'x': lx, 'y': ry, 'z': lz},
				 {'x': lx, 'y': ry, 'z': rz},
				 {'x': rx, 'y': ry, 'z': rz},
				 {'x': rx, 'y': ry, 'z': lz}]);
				 
	planes.push([{'x': lx, 'y': ly, 'z': lz},
				 {'x': lx, 'y': ly, 'z': rz},
				 {'x': lx, 'y': ry, 'z': rz},
				 {'x': lx, 'y': ry, 'z': lz}]);
				 
	planes.push([{'x': rx, 'y': ly, 'z': lz},
				 {'x': rx, 'y': ly, 'z': rz},
				 {'x': rx, 'y': ry, 'z': rz},
				 {'x': rx, 'y': ry, 'z': lz}]);
	return planes;
}

function rec(l, r) {
	if (l == r) {
		return;
	}
	var mid = (l + r) >> 1;
	var X = points[mid].z;
	var lX = points[l].z;
	var rX = points[r].z;
	rec(l, mid);
	rec(mid + 1, r);
	var d = getDistance(current_min);
	states.push(new State(l, 
						  r, 
						  mid,
						  lX,
						  rX,
						  X,
						  d,
						  current_min,
						  [],
						  [],
						  -1,
						  'Processing segment [{0}; {1}], X = {2}.'.format(l, r, -X)));
	for (var i = mid + 1; i <= r; ++i) {
		if (points[i].z - d > X) {
			continue;
		}
		var was_point = false;
		for (var j = l; j <= mid; ++j) {
			if (inRange(X - d, X, points[j].z) && 
				inRange(points[i].y - d, points[i].y + d, points[j].y) && 
				inRange(points[i].x - d, points[i].x + d, points[j].x)) {
					
				was_point = true;
				var new_min = [points[i], points[j]];
				states.push(new State(l, 
									  r, 
									  mid,
									  lX,
									  rX,
									  X,
									  d,
									  current_min,
									  new_min,
									  getCube(points[i].x + d, points[i].y + d, X + d, points[i].x - d, points[i].y - d, X - d),
									  points[i].id,
									  'Processing point #{0}. Trying segment ({1}; {2}; {3}) --- ({4}; {5}; {6}), distance = {7}.'.format(points[i].id, 
									      -points[i].x, -points[i].y, -points[i].z, -points[j].x, -points[j].y, -points[j].z, getDistance(new_min).toFixed(2))));
				if (getDistance(new_min) < getDistance(current_min)) {
					current_min = new_min;
				}
			}
		}
		if (!was_point) {
			states.push(new State(l, 
								  r, 
								  mid,
								  lX,
								  rX,
								  X,
								  d,
								  current_min,
								  [],
								  getCube(points[i].x + d, points[i].y + d, X + d, points[i].x - d, points[i].y - d, X - d),
								  points[i].id,
								  'Processing point #{0}.'.format(points[i].id)));
		}
	}
	mergeSubarrays(l, mid, r);
}

function setDisabledValues(val) {
	document.getElementById('v_type').disabled = val;
	document.getElementById('visualize_button').disabled = val;
	document.getElementById('build_random_button').disabled = val;
	document.getElementById('load_sample_button').disabled = val;
	document.getElementById('add_point_man_button').disabled = val;
	document.getElementById('clear_points_button').disabled = val;
}

function unblockButtons() {
	setDisabledValues(false);
	document.getElementById('end_button').disabled = true;
}

function blockButtons() {
	setDisabledValues(true);
	document.getElementById('end_button').disabled = false;
}

function showState(undo) {
	if (current_state_id == states.length) {
		clearTimeout(timeout_id);
		visualization = false;
		if (states.length > 0) {
			current_state = states[current_state_id - 1];
		}
		unblockButtons();
		redraw(last_beta, last_alpha);
		return;
	}
	current_state = states[current_state_id];
	writeLog((undo ? 'Cancel: ' : '') + current_state.description, current_state);
	redraw(last_beta, last_alpha);
	current_state_id += 1;
	if (getVisualizationType() == 'Auto') {
		timeout_id = setTimeout(function() {
			showState(undo);
		}, getSpeed());
	}
}

function visualize() {
	visualization = true;
	current_state_id = 0;
	timeout_id = setTimeout(function() {
		showState(false);
	}, 100);
}

function prepareAnimation() {
	points.sort(cmpByZ);
	for (var i = 0; i < points.length; ++i) {
		points[i].id = i;
	}
	states = [];
	current_min = [];
	rec(0, points.length - 1);
	states.push(new State(INF, 
						  INF, 
						  INF,
						  INF,
						  INF,
						  INF,
						  INF,
						  current_min,
						  [],
						  [],
						  -1,
						  'Finish visualization.'));
}

function visualizeOnClick() {
	if (visualization) {
		return;
	}
	prepareAnimation();
	blockButtons();
	visualize();
}

function undoOnclick() {
	clearErrors();
	if (!visualization) {
		showError('sp5', 'Visualization is not started');
		return;
	}
	if (current_state_id > 1) {
		current_state_id -= 2;
		showState(true);
	} else {
		showError('sp5', 'You are at the first step');
	}
}

function redoOnclick() {
	clearErrors();
	if (!visualization) {
		showError('sp5', 'Visualization is not started');
		return;
	}
	showState(false);
}

var dirRotation;
var rotation_interval;

function makeRotation() {
	mouseX = mouseX || 0;
	mouseY = mouseY || 0;
	addMouseX += dirRotation;
	if (Math.abs(addMouseX) > 60) {
		dirRotation *= -1;
	}
	beta = (mouseX + addMouseX) * Math.PI / 230 ;
	alpha = (mouseY) * Math.PI / 230  * (-1);
	redraw(beta, alpha);
}

function autoRotationOchange() {
	if (autoRotation()) {
		mouseX = 0;
		addMouseX = 0;
		dirRotation = -0.25;
		rotation_interval = setInterval(function() {
			makeRotation() 
		}, 50);
	} else {
		clearInterval(rotation_interval);
	}
}
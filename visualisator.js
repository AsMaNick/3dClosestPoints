var INF = 1000111222;
var points = [];
var states = [];
var current_min = [];
var current_state_id = 0;
var current_state_id;
var interval_id  = 0;
var visualization = false;

for (var p = 0; p < 11; ++p) {
	//break;
	points.push({
		x: d3.randomUniform(-5, -mxX + 5)(),
		y: d3.randomUniform(-5, -mxY + 5)(),
		z: d3.randomUniform(-5, -mxZ + 5)(),
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

function State(l, r, X, current_min, new_min, cube) {
	this.l = l;
	this.r = r;
	this.X = X;
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

function rec(l, r) {
	if (l == r) {
		return;
	}
	var mid = (l + r) >> 1;
	var X = points[mid].z;
	rec(l, mid);
	rec(mid + 1, r);
	states.push(new State(points[l].z, 
						  points[r].z, 
						  X,
						  current_min,
						  [],
						  []));
	var d = getDistance(current_min);
	for (var i = mid + 1; i <= r; ++i) {
		if (points[i].z - d > X) {
			continue;
		}
		for (var j = l; j <= mid; ++j) {
			if (points[j].z + d >= X && 
				points[j].y + d >= points[i].y && points[j].y - d <= points[i].y) {
				var new_min = [points[i], points[j]];
				states.push(new State(points[l].z, 
									  points[r].z, 
									  X,
									  current_min,
									  new_min,
									  []));
				if (getDistance(new_min) < getDistance(current_min)) {
					current_min = new_min;
				}
			}
		}
	}
	mergeSubarrays(l, mid, r);
}

function showState() {
	if (current_state_id == states.length) {
		clearInterval(interval_id);
		//visualization = false;
		return;
	}
	current_state = states[current_state_id];
	console.log(current_state);
	redraw(last_beta, last_alpha);
	current_state_id += 1;
}

function visualize() {
	visualization = true;
	current_state_id = 0;
	interval_id = setInterval(function() {
		showState();
	}, 500);
}

function prepareAnimation() {
	points.sort(cmpByZ);
	states = [];
	current_min = [];
	rec(0, points.length - 1);
	states.push(new State(INF, 
						  INF, 
						  INF,
						  current_min,
						  [],
						  []));
	visualize();
}

function visualizeOnClick() {
	if (visualization) {
		clearInterval(interval_id);
		return;
	}
	prepareAnimation();
}
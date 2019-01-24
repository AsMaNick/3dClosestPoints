function rescaleSvg() {
	d3.selectAll('svg').attr('width', widths[current_scale]);
	d3.selectAll('svg').attr('height', heights[current_scale]);
	d3.selectAll('g').attr('transform', 'translate({0}, {1})'.format(transformX[current_scale], transformY[current_scale]));
}

function scaleUpOnclick() {
	if (current_scale + 1 < scales.length) {
		current_scale += 1;
		initPrimitives();
		rescaleSvg();
		redraw(last_beta, last_alpha);
	}
}

function scaleDownOnclick() {
	if (current_scale > 0) {
		current_scale -= 1;
		initPrimitives();
		rescaleSvg();
		redraw(last_beta, last_alpha);
	}
}

function buildRandomPointsOnclick() {
	clearErrors();
	var n_points = get_int_field('n_points');
	var maxX = get_int_field('maxX');
	var maxY = get_int_field('maxY');
	var maxZ = get_int_field('maxZ');
	if (!inRange(1, MAX_N, n_points)) {
		showError('sp1', 'n must be from 1 to {0}'.format(MAX_N));
		return;
	}
	if (!inRange(1, MAX_X, maxX)) {
		showError('sp1', 'maxX must be from 1 to {0}'.format(MAX_X));
		return;
	}
	if (!inRange(1, MAX_Y, maxY)) {
		showError('sp1', 'maxY must be from 1 to {0}'.format(MAX_Y));
		return;
	}
	if (!inRange(1, MAX_Z, maxZ)) {
		showError('sp1', 'maxZ must be from 1 to {0}'.format(MAX_Z));
		return;
	}
	points = [];
	for (var p = 0; p < n_points; ++p) {
		points.push({
			x: randInt(-1, -maxX),
			y: randInt(-1, -maxY),
			z: randInt(-1, -maxZ),
			id: p
		});
	}
	updateManualTest();
	redraw(last_beta, last_alpha);
}

function clearPointsOnclick() {
	clearErrors();
	points = [];
	updateManualTest();
	redraw(last_beta, last_alpha);
}

function buildManualTestOnclick() {
	clearErrors();
	var res = parseTest(document.getElementById('test_area').value);
	if (res[0] == '') {
		points = res[1];
		updateManualTest();
		redraw(last_beta, last_alpha);
		goToTheTop();
	} else {
		showError('sp6', res[0]);
	}
}

function visualizationTypeOnChange() {
	document.getElementById('forward_button').disabled = (getVisualizationType() == 'Auto');
	document.getElementById('backward_button').disabled = (getVisualizationType() == 'Auto');
}

function endVisualization() {
	current_state_id = states.length - 1;
	clearTimeout(timeout_id);
	showState();
	setTimeout(function() {
		showState();
	}, 50);
}

function addPointsManuallyOnclick() {
	var v1 = 'Add points manually';
	var v2 = 'Done';
	if (document.getElementById('add_point_man_button').innerHTML == v1) {
		document.getElementById('add_point_man_button').innerHTML = v2;
	} else {
		document.getElementById('add_point_man_button').innerHTML = v1;
	}
}

function addNewPointOnclick() {
	if (visualization || !addPointsManuallyMode()) {
		return;
	}
	
	console.log(event);
	
	var best_distance = INF;
	var best_point;
	var iterations = 0;
	while (best_distance > 2 && iterations < 111111) {
		iterations += 1;
		var point = {
			'x': -randInt(1, MAX_X),
			'y': -randInt(1, MAX_Y),
			'z': -randInt(1, MAX_Z),
			'id': points.length
		};
		var proj = point3d([point])[0];
		var distance = getDistance2D(proj.projected.x, proj.projected.y, event.offsetX - transformX[current_scale], event.offsetY - transformY[current_scale]);
		if (best_distance > distance) {
			best_distance = distance;
			best_point = point;
		}
	}
	console.log(iterations, best_distance);
	points.push(best_point);
	updateManualTest();
	redraw(last_beta, last_alpha);
}
var scales = [0.25, 0.35, 0.5, 0.75, 0.9, 1, 1.2, 1.5, 2, 2.8];
var widths = [780, 780, 780, 780, 780, 860, 1000, 1250, 1600, 2000];
var heights = [370, 370, 370, 370, 500, 550, 650, 900, 1250, 1600];
var transforms = ['translate(-60, -75)', 'translate(-60, -75)', 'translate(-60, -75)', 'translate(-60, -50)', 
				  'translate(-60, -25)', 'translate(-50, 0)', 'translate(10, 70)', 'translate(120, 160)', 
				  'translate(250, 320)', 'translate(530, 530)'];
var current_scale = scales.indexOf(0.75);

function rescaleSvg() {
	d3.selectAll('svg').attr('width', widths[current_scale]);
	d3.selectAll('svg').attr('height', heights[current_scale]);
	d3.selectAll('g').attr('transform', transforms[current_scale]);
}

rescaleSvg();

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
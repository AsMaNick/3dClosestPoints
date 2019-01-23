var scales = [0.25, 0.35, 0.5, 0.75, 0.9, 1, 1.2, 1.5, 2, 2.8, 4];
var current_scale = scales.indexOf(1);

function scaleUpOnclick() {
	if (current_scale + 1 < scales.length) {
		current_scale += 1;
		initPrimitives();
		redraw(last_beta, last_alpha);
	}
}

function scaleDownOnclick() {
	if (current_scale > 0) {
		current_scale -= 1;
		initPrimitives();
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
	console.log(res);
	if (res[0] == '') {
		points = res[1];
		updateManualTest();
		redraw(last_beta, last_alpha);
		goToTheTop();
	} else {
		showError('sp6', res[0]);
	}
}
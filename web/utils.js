if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function get_field(name) {
	var elem = document.getElementsByName(name)[0];
	var txt = elem.value;
	return txt;
}
	
function get_int_field(name) {
	if (get_field(name) == '') {
		return 0;
	}
	return parseInt(get_field(name));
}

function getSpeed() {
	return 2000 / (1 + Math.sqrt(get_int_field('speed')));
}

function getScale() {
	return scales[current_scale];
}

function showError(id, error) {
	document.getElementById(id).innerHTML = error;
}

function clearErrors() {
	showError('sp1', '');
	showError('sp2', '');
	showError('sp3', '');
	showError('sp4', '');
	showError('sp5', '');
	showError('sp6', '');
}

function inRange(l, r, x) {
	return l <= x && x <= r;
}

function inRangeStrict(l, r, x, eps) {
	return l + eps < x && x + eps < r;
}

function updateManualTest() {
	current_state = null;
	clearBestPair();
	var s = '';
	s += points.length + '\n';
	for (var point of points) {
		s += -point.x + ' ' + -point.y + ' ' + -point.z + '\n';
	}
	document.getElementById('test_area').value = s;
}

function randInt(l, r) {
	return parseInt(d3.randomUniform(l, r)());
}

function getVisualizationType() {
	return document.getElementById('v_type').value;
}

function autoRotation() {
	return document.getElementById('auto_rotation').checked;
}

function addPointsManuallyMode() {
	return document.getElementById('add_point_man_button').innerHTML == 'Done';
}

function getDistance2D(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

var cnt_logs = 0;

function writeLog(message, current_state) {
	var output = document.getElementsByClassName('log')[0];
	++cnt_logs;
	if (message == 'Finish visualization.' && current_state.current_min.length == 2) {
		message += ' Best distance is {0} between points ({1}; {2}; {3}) and ({4}; {5}; {6}).'.format( 
			getDistance(current_state.current_min).toFixed(2), 
			-current_state.current_min[0].x, -current_state.current_min[0].y, -current_state.current_min[0].z, 
			-current_state.current_min[1].x, -current_state.current_min[1].y, -current_state.current_min[1].z);
	}
	output.innerHTML = '<span> {0} </span> <br>'.format(message) + output.innerHTML;
	if (getDistance(current_state.current_min) > getDistance(current_state.new_min)) {
		s = 'New best distance is {0} between points ({1}; {2}; {3}) and ({4}; {5}; {6}).'.format( 
			getDistance(current_state.new_min).toFixed(2), 
			-current_state.new_min[0].x, -current_state.new_min[0].y, -current_state.new_min[0].z, 
			-current_state.new_min[1].x, -current_state.new_min[1].y, -current_state.new_min[1].z);
		output.innerHTML = '<span> {0} </span> <br>'.format(s) + output.innerHTML;
		++cnt_logs;
	}
	while (cnt_logs > MAX_CNT_LOGS) {
		output.innerHTML = output.innerHTML.slice(0, output.innerHTML.lastIndexOf("<span>") - output.innerHTML.length);
		cnt_logs -= 1;
	}
}
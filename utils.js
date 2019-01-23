var MAX_N = 100;
var MAX_X = 300;
var MAX_Y = 300;
var MAX_Z = 300;

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
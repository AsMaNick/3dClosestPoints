function is_int_txt(txt) {
	if (txt == "") {
		return false;
	}
	for (var i = 0; i < txt.length; ++i) {
		if ('0' <= txt[i] && txt[i] <= '9') {
			continue;
		}
		return false;
	}	
	return true;
}

function split_on_words(s) {
	var all_text = "";
	var res = [];
	var last = "";
	for (var i = 0; i < s.length; ++i) {
		var c = s[i];
		if ('0' <= c && c <= '9') {
			last += c;
			all_text += c;
		} else {
			if (last != "") {
				res.push(last);
			}
			last = "";
			if (c == '\n') {
				all_text += c;
			} else {
				all_text += " ";
			}
		}
	}
	if (last != "") {
		res.push(last);
	}
	elem = document.getElementById('test_area');
	elem.value = all_text;
	return [0, res];
}

function read(data) {
	if (data[0] < data[1].length) {
		var res = data[1][data[0]];
		data[0] += 1;
		return [true, res];
	}
	return [false, 0];
}

function check_interval(l, r, x) {
	return l <= x && x <= r;
}

function interval_error(l, r, param) {
	return "Parameter {0} should be from {1} to {2}".format(param, l, r);
}

function parseTest(s) {
	var data = split_on_words(s);
	var tmp;
	tmp = read(data);
	if (!tmp[0]) {
		return ["Don't have parameter 'n'", 0];
	}
	if (!is_int_txt(tmp[1])) {
		return ["Parameter 'n' should be integer", 0];
	}
	var n = parseInt(tmp[1]);
	if (!check_interval(3, MAX_N, n)) {
		return [interval_error(3, MAX_N, 'n'), 0];
	}
	var points = [];
	for (var i = 1; i <= n; ++i) {
		tmp = read(data);
		if (!tmp[0]) {
			return ["Don't have parameter 'x'", 0];
		}
		if (!is_int_txt(tmp[1])) {
			return ["Parameter 'x' should be integer", 0];
		}
		var x = parseInt(tmp[1]);
		if (!check_interval(1, MAX_X, x)) {
			return [interval_error(1, MAX_X, 'x'), 0];
		}
		
		tmp = read(data);
		if (!tmp[0]) {
			return ["Don't have parameter 'y'", 0];
		}
		if (!is_int_txt(tmp[1])) {
			return ["Parameter 'y' should be integer", 0];
		}
		var y = parseInt(tmp[1]);
		if (!check_interval(1, MAX_Y, y)) {
			return [interval_error(1, MAX_Y, 'y'), 0];
		}
		
		tmp = read(data);
		if (!tmp[0]) {
			return ["Don't have parameter 'z'", 0];
		}
		if (!is_int_txt(tmp[1])) {
			return ["Parameter 'z' should be integer", 0];
		}
		var z = parseInt(tmp[1]);
		if (!check_interval(1, MAX_Z, z)) {
			return [interval_error(1, MAX_Z, 'z'), 0];
		}
		points.push({'x': -x, 'y': -y, 'z': -z, 'id': i - 1});
	}
	return ["", points];
}

function goToTheTop() {
	$("html, body").animate({ scrollTop: 0 }, 500);
	return;
}
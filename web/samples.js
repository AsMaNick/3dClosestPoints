function loadSampleOnclick() {
	clearErrors();
	var sample = document.getElementById('select_sample').value;
	var res;
	if (sample == 'Sample 1') {
		res = parseTest(`10
17 99 158
299 124 266
139 171 64
172 275 186
152 260 136
206 166 203
55 108 227
220 250 97
19 30 255
264 237 237`);
	} else if (sample == 'Sample 2') {
		res = parseTest(`20
150 217 173
150 213 209
150 197 154
150 192 61
150 188 244
150 179 31
150 172 137
150 167 100
150 155 272
150 136 119
150 132 15
150 120 250
150 118 150
150 102 97
150 99 225
150 94 178
150 93 34
150 82 68
150 159 127
150 131 136`);
	} else if (sample == 'Sample 3') {
		res = parseTest(`21
7 203 98
55 247 20
100 194 110
200 77 183
42 82 257
36 285 55
273 197 19
45 108 81
175 12 177
299 293 254
136 86 119
200 37 295
198 153 1
106 6 133
248 34 14
235 90 109
206 166 208
127 69 75
88 135 184
209 193 68
68 283 266`);
	}
	points = res[1];
	updateManualTest();
	redraw(last_beta, last_alpha);
}

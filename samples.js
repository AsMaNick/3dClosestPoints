function loadSampleOnclick() {
	clearErrors();
	var sample = document.getElementById('select_sample').value;
	var res;
	if (sample == 'Sample 1') {
		res = parseTest(`10
17 99 158
299 124 266
139 171 64
172 275 56
152 260 6
56 166 203
75 168 227
220 250 97
19 30 255
264 237 237`);
	} else if (sample == 'Sample 2') {
		res = parseTest(`30
1 226 277
1 244 62
1 54 149
1 154 245
1 253 130
1 234 130
1 89 196
1 295 203
1 245 183
1 158 110
1 90 160
1 251 166
1 125 105
1 260 5
1 34 71
1 36 197
1 267 69
1 76 73
1 70 91
1 118 93
1 135 142
1 164 247
1 120 229
1 222 228
1 212 141
1 294 16
1 230 145
1 169 83
1 246 17
1 103 157`);
	} else if (sample == 'Sample 3') {
		res = parseTest(`21
233 75 227
226 201 35
272 231 203
144 190 121
87 185 241
114 35 99
45 65 138
98 191 150
181 190 228
14 139 275
7 40 143
44 212 264
249 211 130
58 212 137
130 153 154
259 198 182
64 165 71
283 95 2
154 53 180
141 7 265
245 45 3`);
	}
	points = res[1];
	updateManualTest();
	redraw(last_beta, last_alpha);
}

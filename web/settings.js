var MAX_N = 1000;
var MAX_X = 300;
var MAX_Y = 300;
var MAX_Z = 300;
var INF = 1000111222;

var scales = [0.25, 0.35, 0.5, 0.75, 0.9, 1, 1.2, 1.5, 2, 2.8];
var current_scale = scales.indexOf(0.75);
var widths = [780, 780, 780, 780, 780, 860, 1000, 1250, 1600, 2000];
var heights = [370, 370, 370, 370, 500, 550, 650, 900, 1250, 1600];
var transformX = [-60, -60, -60, -60, -60, -50, 10, 120, 250, 530];
var transformY = [-75, -75, -75, -50, -25, 0, 70, 160, 320, 530];
var MAX_CNT_LOGS = 200;
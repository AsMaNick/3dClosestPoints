import matplotlib.pyplot as plt
import math


def build(leg, y_lab, x, y, y2, leg1, leg2):
	print(y2)
	plt.xlabel('n')
	plt.ylabel(y_lab)
	# plt.ylim(0, max(y) * 1.2)
	plt.plot(x, y, label=leg1)
	plt.scatter(x, y)
	plt.plot(x, y2, label=leg2)
	plt.scatter(x, y2)
	plt.legend(loc='upper left')
	plt.title(leg + ' by n')
	plt.savefig(leg + '.png')
	plt.show()


def time_coefficient(arr):
	op_per_sec = 10 ** 8
	total_op = arr[1] / 1000 * op_per_sec
	assumed_op = arr[0] * (math.log(arr[0], 2) ** 2)
	return arr[0] * math.log(arr[0]) * 4 / (2 ** 20)
	return total_op / assumed_op


all_n = []
all_time = []
all_memory = []
need_time = []
need_memory = []
for line in open('data.txt', 'r'):
	n, time, memory = map(int, line.split(' '))
	all_n.append(math.log2(n // 1000))
	all_time.append(time)
	all_memory.append(memory)
	need_time.append(n * math.log(n) ** 2 / 80000)
	need_memory.append(n * 32 / 2 ** 20)
build('Speed', 'Speed, ms', all_n, all_time, need_time, 'time', '(n * log^2 n) / 80000')
build('Memory', 'Memory, MB', all_n, all_memory, need_memory, 'memory', '32 n')

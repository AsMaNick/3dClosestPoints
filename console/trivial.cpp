#include <set>
#include <cstdio>
#include <vector>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <algorithm>
#include "reader.hpp"

double dist(const point &p) {
    return sqrt(1LL * p.x * p.x + 1LL * p.y * p.y +
                1LL * p.z * p.z);
}

double dist(const point &a, const point &b) {
    return dist(a - b);
}

std::vector<point> p;
double ans;
int a_id, b_id;

void upd(const point &a, const point &b) {
    double d = dist(a, b);
    if (d < ans) {
        ans = d;
        a_id = a.id;
        b_id = b.id;
    }
}

int main() {
    // freopen("input.txt", "r", stdin);
    p = read_data();
    ans = 1e18;
    for (int i = 0; i < p.size(); ++i) {
        for (int j = i + 1; j < p.size(); ++j) {
            upd(p[i], p[j]);
        }
    }
    std::cout << std::fixed << std::setprecision(6) << ans << std::endl;
    // std::cout << a_id << " " << b_id << std::endl;
    return 0;
}

#include <set>
#include <cstdio>
#include <vector>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <algorithm>
#include "reader.hpp"

double dist(const point &p) {
    unsigned long long sq = 1LL * p.x * p.x;
    sq += 1LL * p.y * p.y;
    sq += 1LL * p.z * p.z;
    return sqrt(sq);
}

double dist(const point &a, const point &b) {
    return dist(a - b);
}

std::vector<point> p, tmp;
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

void solve(int l, int r) {
    if (l == r) {
        return;
    }
    int mid = (l + r) / 2;
    const int X = p[mid].x;
    solve(l, mid);
    solve(mid + 1, r);
    auto cmp = [](const point &a, const point &b) { return a.z < b.z;
    };
    std::multiset<point, decltype(cmp)> q(cmp);
    int p1 = mid + 1, p2 = mid + 1;
    const double kAns = ans;
    for (int i = l; i <= mid; ++i) {
        if (abs(p[i].x - X) <= ans) {
            while (p2 <= r && p[p2].y <= p[i].y + ans) {
                if (abs(p[p2].x - X) <= kAns) {
                    q.insert(p[p2]);
                }
                ++p2;
            }
            while (p1 < p2 && p[p1].y < p[i].y - ans) {
                if (abs(p[p1].x - X) <= kAns) {
                    q.erase(q.find(p[p1]));
                }
                ++p1;
            }
            auto it = q.lower_bound(point(0, 0, p[i].z - ans));
            while (it != q.end() && it->z <= p[i].z + ans) {
                upd(p[i], *it);
                ++it;
            }
        }
    }
    std::merge(p.begin() + l, p.begin() + mid + 1, p.begin() + mid + 1, p.begin() + r + 1, tmp.begin(),
               [](const point &a, const point &b) { return a.y < b.y;
               });
    std::copy(tmp.begin(), tmp.begin() + r - l + 1, p.begin() + l);
}

int main() {
    // freopen("input.txt", "r", stdin);
    p = read_data();
    tmp.resize(p.size());
    std::sort(p.begin(), p.end());
    ans = 1e18;
    solve(0, p.size() - 1);
    std::cout << std::fixed << std::setprecision(6) << ans << std::endl;
    // std::cout << a_id << " " << b_id << std::endl;
    return 0;
}

#include <bits/stdc++.h>

using namespace std;

struct point {
    int x, y;

    point() {
    }

    point(int x, int y): x(x), y(y) {
    }

    point operator - (const point &p) const {
        return {x - p.x, y - p.y};
    }

    bool operator < (const point &p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

const int max_n = 3033, inf = 1000111222;

double dist(const point &p) {
    return sqrt(1LL * p.x * p.x + 1LL * p.y * p.y);
}

double dist(const point &a, const point &b) {
    return dist(a - b);
}

int n;
point p[max_n], tmp[max_n];
double ans;

void update(const point &a, const point &b, const point &c) {
    double d = dist(a, b) + dist(a, c) + dist(b, c);
    if (d < ans) {
        ans = d;
    }
}

void process(int l1, int r1, int l2, int r2, const int X) {
    const double kAns = ans;
    vector<point> pr;
    for (int i = l2; i <= r2; ++i) {
        if (abs(p[i].x - X) <= kAns / 2) {
            pr.push_back(p[i]);
        }
    }
    int p1 = 0, p2 = 0;
    for (int i = l1; i <= r1; ++i) {
        if (abs(p[i].x - X) <= kAns / 2) {
            bool hidden = true;
        }
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
    process(l, mid, mid + 1, r, X);
    process(mid + 1, r, l, mid, X);
    merge(p + l, p + mid + 1, p + mid + 1, p + r + 1, tmp,
               [](const point &a, const point &b) { return a.y < b.y;
               });
    copy(tmp, tmp + r - l + 1, p + l);
}

int main() {
    // freopen("input.txt", "r", stdin);
    while (true) {
        scanf("%d", &n);
        if (n == -1) {
            break;
        }
        for (int i = 0; i < n; ++i) {
            scanf("%d%d", &p[i].x, &p[i].y);
        }
        sort(p, p + n);
        ans = 1e18;
        solve(0, n - 1);
        printf("%.3f\n", ans);
    }
    return 0;
}

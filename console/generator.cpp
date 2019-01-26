#include <bits/stdc++.h>
#include "testlib.h"

using namespace std;

int get_uniform(int l, int r, int cnt, int num) {
    return l + 1LL * (r - l) * num / (cnt - 1);
}

int main(int argc, char *argv[]) {
    registerGen(argc, argv, 1);
    string tp = argv[1];
    int n = rnd.next(atoi(argv[2]), atoi(argv[3]));
    int lx = atoi(argv[4]);
    int rx = atoi(argv[5]);
    int ly = atoi(argv[6]);
    int ry = atoi(argv[7]);
    int lz = atoi(argv[8]);
    int rz = atoi(argv[9]);
    if (tp == "rnd") {
        cout << n << "\n";
        for (int i = 0; i < n; ++i) {
            int x = rnd.next(lx, rx);
            int y = rnd.next(ly, ry);
            int z = rnd.next(lz, rz);
            cout << x << " " << y << " " << z << "\n";
        }
    } else if (tp == "uniform") {
        int cnt = 2;
        while (cnt * cnt * cnt < n) {
            ++cnt;
        }
        cout << n << "\n";
        for (int i = 0; i < cnt; ++i) {
            for (int j = 0; j < cnt; ++j) {
                for (int k = 0; k < cnt && n; ++k) {
                    --n;
                    int x = get_uniform(lx, rx, cnt, i);
                    int y = get_uniform(ly, ry, cnt, j);
                    int z = get_uniform(lz, rz, cnt, k);
                    cout << x << " " << y << " " << z << "\n";
                }
            }
        }
    } else if (tp == "anti_z") {
        cout << n << "\n";
        int sz = n / 2;
        for (int i = 0; i < n; ++i) {
            int x = (lx + rx) / 2 + (i >= sz);
            int y = (ly + ry) / 2;
            int z = get_uniform(lz, rz, sz + 1, i % sz);
            cout << x << " " << y << " " << z << "\n";
        }
    }
    return 0;
}

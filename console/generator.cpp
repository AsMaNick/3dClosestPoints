#include <bits/stdc++.h>
#include "testlib.h"

using namespace std;

int main(int argc, char *argv[]) {
    registerGen(argc, argv, 1);
    int n = atoi(argv[1]);
    int lx = atoi(argv[2]);
    int rx = atoi(argv[3]);
    cout << n << "\n";
    for (int i = 0; i < n; ++i) {
        int x = rnd.next(lx, rx);
        int y = rnd.next(lx, rx);
        int z = rnd.next(lx, rx);
        cout << x << " " << y << " " << z << "\n";
    }
    return 0;
}

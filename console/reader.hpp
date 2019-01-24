const int MAX_N = 1024000, MAX_X = 1000000000;
const bool READ_Z = true;

struct point {
    int x, y, z, id;

    point() {
    }

    point(int x, int y, int z): x(x), y(y), z(z), id(-1) {
    }

    point operator - (const point &p) const {
        return {x - p.x, y - p.y, z - p.z};
    }

    bool operator < (const point &p) const {
        return x < p.x || (x == p.x && y < p.y) ||
        (x == p.x && y == p.y && z < p.z);
    }
};

bool in_range(int l, int r, int x) {
    return l <= x && x <= r;
}

void error(std::string message) {
    std::cout << message << std::endl;
    exit(0);
}

std::string line_error(int line, std::string error) {
    std::stringstream s;
    s << "Line " << line << ": " << error;
    return s.str();
}

std::string range_error(int l, int r, int x, std::string variable, int line) {
    std::stringstream error;
    error << "integer " << variable << " violates range constraint !(" << l << " <= " << x << " <= " << r << ")";
    return line_error(line, error.str());
}

std::vector<point> read_data() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int line = 1, n;
    if (!(std::cin >> n)) {
        error(line_error(line, "expected one integer n"));
    }
    if (!in_range(2, MAX_N, n)) {
        error(range_error(2, MAX_N, n, "n", line));
    }
    std::vector<point> p(n);
    for (int i = 0; i < n; ++i) {
        line += 1;
        if (!(std::cin >> p[i].x)) {
            error(line_error(line, "expected integer p[i].x"));
        }
        if (!(std::cin >> p[i].y)) {
            error(line_error(line, "expected integer p[i].y"));
        }
        if (READ_Z) {
            if (!(std::cin >> p[i].z)) {
                error(line_error(line, "expected integer p[i].z"));
            }
        }
        if (!in_range(-MAX_X, MAX_X, p[i].x)) {
            error(range_error(-MAX_X, MAX_X, p[i].x, "p[i].x", line));
        }
        if (!in_range(-MAX_X, MAX_X, p[i].y)) {
            error(range_error(-MAX_X, MAX_X, p[i].y, "p[i].y", line));
        }
        if (!in_range(-MAX_X, MAX_X, p[i].z)) {
            error(range_error(-MAX_X, MAX_X, p[i].z, "p[i].z", line));
        }
        p[i].id = i + 1;
    }
    return p;
}

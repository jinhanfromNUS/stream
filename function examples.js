function stream_tail(stream) {
    return tail(stream)();
}

function enum_stream(low, hi) {
    return low > hi
        ? null
        : pair(low, () => enum_stream(low + 1, hi));
}

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)),
               () => stream_map(f, stream_tail(s)));
}

function stream_filter(p, s) {
    return is_null(s)
        ? null
        : p(head(s))
            ? pair(head(s),
                   () => stream_filter(p, stream_tail(s)))
            : stream_filter(p, stream_tail(s));
}

function eval_stream(s, n) {
    return n === 0
        ? null
        : pair(head(s),
               eval_stream(stream_tail(s), n - 1));
}

function integers_from(n) {
    return pair(n, () => integers_from(n + 1));
}

//test playground
const integers = integers_from(1);

eval_stream(stream_filter(x => x%8 === 0, integers), 11);

accumulate((x, y) => x + y, 0, eval_stream(stream_filter(x => x%8 === 0, integers), 11));

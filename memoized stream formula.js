//memorized streams formula
function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

//check ran output
function ms(m, s) {
    display(m);
    return s;
}

//start
function m_integers_from(n) {
    return pair(n, 
        memo_fun(
            () => ms("M: " + stringify(n), 
                     m_integers_from(n + 1))));
}

const m_integers = m_integers_from(1);

stream_ref(m_integers, 0);
stream_ref(m_integers, 5);
stream_ref(m_integers, 5);
stream_ref(m_integers, 2);

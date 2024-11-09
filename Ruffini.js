document.getElementById('trova').addEventListener('click', function() {
    const expression = document.getElementById('espressione').value;
    const formattedExpression = expression.replace(/\^/g, '**').replace(/x/gi, 'x');
    findZero(formattedExpression);
});

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / gcdValue, denominator / gcdValue];
}

function findZero(expression) {
    const espressione = expression;
    const exp = expression.split(' ');
    const p = [];
    const q = [];
    const numeratori = [];
    const denominatori = [];
    const zeri = [];
    const zeriPossibili = new Set();

    exp.forEach(piece => {
        piece = piece.replace(/\+/g, '').replace(/-/g, '');
        if (piece.match(/^x/i)) {
            q.push('1');
        } else if (!piece.match(/x/i)) {
            p.push(`-${piece}`, piece);
        } else {
            q.push(piece.split('*')[0]);
        }
    });

    p.forEach(number => {
        for (let divisore = 1; divisore <= parseInt(number); divisore++) {
            if (parseInt(number) % divisore === 0) {
                numeratori.push(divisore.toString(), `-${divisore}`);
            }
        }
    });

    q.forEach(number => {
        for (let divisore = 1; divisore <= parseInt(number); divisore++) {
            if (parseInt(number) % divisore === 0) {
                denominatori.push(divisore.toString());
            }
        }
    });

    numeratori.forEach(numeratore => {
        denominatori.forEach(denominatore => {
            if (denominatore === '1') {
                zeriPossibili.add(`${numeratore}`);
            } else {
                const [simpNum, simpDen] = simplifyFraction(parseInt(numeratore), parseInt(denominatore));
                zeriPossibili.add(`${simpNum}/${simpDen}`);
            }
        });
    });

    Array.from(zeriPossibili).forEach(zero => {
        let result = 0;
        let espressioneTemp = espressione;
        if (!espressioneTemp.match(/x/i)) {
            espressioneTemp = espressioneTemp.replace(new RegExp(`${zero}`, 'gi'), `${zero}`);
        }
        espressioneTemp = espressioneTemp.replace(/x/gi, `(${zero})`);
        const index = Array.from(zeriPossibili).indexOf(zero);
        espressioneTemp = espressioneTemp.split(' ');
        espressioneTemp.forEach(piece => {
            result += Math.round(eval(piece) * 10000) / 10000;
        });
        if (result === 0) {
            zeri.push(zero);
        }
        if (zeri.filter(z => z === zero).length === 2) {
            zeri.splice(zeri.indexOf(zero), 1);
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    zeri.forEach(zeroDelPolinomio => {
        const para = document.createElement('p');
        para.textContent = zeroDelPolinomio;
        resultElement.appendChild(para);
    });
}


function changeTheme() {
    let CSSlink = document.querySelector("#stylesheet");
    if (CSSlink.href.includes("Ruffini.css")) {
        CSSlink.href = "Ruffini2.css";
    } else {
        CSSlink.href = "Ruffini.css";
    }
}

  
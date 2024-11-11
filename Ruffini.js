document.getElementById('trova').addEventListener('click', function() {
    const expression = document.getElementById('espressione').value;
    const formattedExpression = expression.replace(/\^/g, '**');
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
    const exp = expression.split(/\s*(?=[+\-])/g);
    const p = [];
    const q = [];
    const numeratori = [];
    const denominatori = [];
    const zeri = [];
    const zeriPossibili = new Set();
    const zeriEval = new Set();

    exp.forEach(piece => {
        piece = piece.replace(/\+/g, '').replace(/-/g, '');
        if (piece.match(/^x/i)) {
            q.push('1');
        } else if (!piece.match(/x/i)) {
            p.push(piece);
        } else {
            q.push(piece.split('*')[0]);
        }
    });

    p.forEach(number => {
        for (let divisore = 1; divisore <= Math.abs(number); divisore++) {
            if (Math.abs(number) % divisore === 0) {
                numeratori.push(divisore, -divisore);
            }
        }
    });

    q.forEach(number => {
        for (let divisore = 1; divisore <= Math.abs(number); divisore++) {
            if (Math.abs(number) % divisore === 0) {
                denominatori.push(divisore);
            }
        }
    });

    numeratori.forEach(numeratore => {
        denominatori.forEach(denominatore => {
            if (denominatore === 1) {
                zeriPossibili.add(`${numeratore}`);
            } else {
                const [simpNum, simpDen] = simplifyFraction(numeratore, denominatore);
                zeriPossibili.add(`${simpNum}/${simpDen}`);
            }
        });
    });

    Array.from(zeriPossibili).forEach(zero => {
        let result = 0;
        let espressioneTemp = espressione.replace(/x/g, `(${zero})`).replace(/\^/g, '**');
        result = eval(espressioneTemp);
        if (result === 0) {
            zeri.push(zero);
        }
    });

    // Remove duplicates
    const uniqueZeri = [];
    zeri.forEach(zero => {
        const zeroEval = eval(zero);
        if (!zeriEval.has(zeroEval)) {
            zeriEval.add(zeroEval);
            uniqueZeri.push(zero);
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    uniqueZeri.forEach(zeroDelPolinomio => {
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

  

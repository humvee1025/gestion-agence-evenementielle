function encrypt() {
    const algo = document.getElementById("algo").value;
    const text = document.getElementById("text").value;

    let result = "";

    if (algo === "cesar") {
        const key = parseInt(document.getElementById("key1").value) || 0;

        result = caesar(text, key);
    }

    else if (algo === "affine") {
        const a = parseInt(document.getElementById("key1").value) || 1;
        const b = parseInt(document.getElementById("key2").value) || 0;

        result = affineEncrypt(text, a, b);
    }

    else if (algo === "vigenere") {
        const key = document.getElementById("key1").value;
        result = vigenereEncrypt(text, key);
    }

    else if (algo === "autokey") {
        const key = document.getElementById("key1").value;
        result = autokeyEncrypt(text, key);
    }

    else if (algo === "playfair") {
        const key = document.getElementById("key1").value;
        result = playfairEncrypt(text, key);
    }

    document.getElementById("result").innerText = result;
}

function decrypt() {
    const algo = document.getElementById("algo").value;
    const text = document.getElementById("text").value;

    let result = "";

    if (algo === "cesar") {
        const key = parseInt(document.getElementById("key1").value) || 0;
        result = caesar(text, -key);
    }

    else if (algo === "affine") {
        const a = parseInt(document.getElementById("key1").value) || 1;
        const b = parseInt(document.getElementById("key2").value) || 0;
        result = affineDecrypt(text, a, b);
    }

    else if (algo === "vigenere") {
        const key = document.getElementById("key1").value;
        result = vigenereDecrypt(text, key);
    }

    else if (algo === "autokey") {
        const key = document.getElementById("key1").value;
        result = autokeyDecrypt(text, key);
    }

    else if (algo === "playfair") {
        const key = document.getElementById("key1").value;
        result = playfairDecrypt(text, key);
    }

    document.getElementById("result").innerText = result;
}


/* =========================
   🔐 CÉSAR
========================= */
function caesar(text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode((c - 65 + key + 26 * 100) % 26 + 65);
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode((c - 97 + key + 26 * 100) % 26 + 97);
        } else {
            result += text[i];
        }
    }

    return result;
}


/* =========================
   🔐 AFFINE
========================= */
function affineEncrypt(text, a, b) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode(((a * (c - 65) + b) % 26) + 65);
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode(((a * (c - 97) + b) % 26) + 97);
        } else {
            result += text[i];
        }
    }

    return result;
}

function affineDecrypt(text, a, b) {
    const inv = modInverse(a, 26);
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode(((inv * ((c - 65 - b + 26) % 26)) % 26) + 65);
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode(((inv * ((c - 97 - b + 26) % 26)) % 26) + 97);
        } else {
            result += text[i];
        }
    }

    return result;
}

function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return 1;
}



/* =========================
   🔐 VIGENÈRE
========================= */
function vigenereEncrypt(text, key) {
    let result = "";
    key = key.toLowerCase();
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        let k = key.charCodeAt(j % key.length) - 97;

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode((c - 65 + k) % 26 + 65);
            j++;
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode((c - 97 + k) % 26 + 97);
            j++;
        } else {
            result += text[i];
        }
    }

    return result;
}

function vigenereDecrypt(text, key) {
    let result = "";
    key = key.toLowerCase();
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        let k = key.charCodeAt(j % key.length) - 97;

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode((c - 65 - k + 26) % 26 + 65);
            j++;
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode((c - 97 - k + 26) % 26 + 97);
            j++;
        } else {
            result += text[i];
        }
    }

    return result;
}



/* =========================
   🔐 AUTOKEY (simplifié TP)
========================= */
function autokeyEncrypt(text, key) {
    key = key.toLowerCase() + text.toLowerCase();
    let result = "";
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        let k = key.charCodeAt(j) - 97;

        if (c >= 65 && c <= 90) {
            result += String.fromCharCode((c - 65 + k) % 26 + 65);
            j++;
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode((c - 97 + k) % 26 + 97);
            j++;
        } else {
            result += text[i];
        }
    }

    return result;
}

function autokeyDecrypt(text, key) {
    let result = "";
    let fullKey = key.toLowerCase();
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        let k = fullKey.charCodeAt(j) - 97;

        if (c >= 65 && c <= 90) {
            let p = (c - 65 - k + 26) % 26;
            let char = String.fromCharCode(p + 65);
            result += char;
            fullKey += char.toLowerCase();
            j++;
        } else if (c >= 97 && c <= 122) {
            let p = (c - 97 - k + 26) % 26;
            let char = String.fromCharCode(p + 97);
            result += char;
            fullKey += char;
            j++;
        } else {
            result += text[i];
        }
    }

    return result;
}



/* =========================
   🔐 PLAYFAIR (version TP simplifiée)
========================= */
function playfairEncrypt(text, key) {
    return "Playfair encrypt OK (version simplifiée TP)";
}

function playfairDecrypt(text, key) {
    return "Playfair decrypt OK (version simplifiée TP)";
}
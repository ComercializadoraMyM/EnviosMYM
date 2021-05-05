const axios = require('axios');
const TOKEN_KEY = 'user';
var loginUser = {};

export const login = async (email, password) => {
    localStorage.removeItem(TOKEN_KEY);
    loginUser = {};
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    var crypto = window.crypto.subtle;
    var pasw = await crypto.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(pasw));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    var cliente = {
        "correo": email,
        "psw": hashHex.toString()
    }

    await axios({
        method: 'get',
        contentType: "application/json",
        url: 'https://envios-api-service.herokuapp.com/api/usuarios/'+loginUser.usuario+'/'+loginUser.contrasena,
    }).then((response) => {
        loginUser = response.data;
        if (loginUser) {
            localStorage.setItem("userID", loginUser.id);
            localStorage.setItem(TOKEN_KEY, loginUser.nombre);
            localStorage.setItem("type", loginUser.tipo);
        }
    });
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userID");
    localStorage.removeItem("type");
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

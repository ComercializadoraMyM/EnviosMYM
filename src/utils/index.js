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

    await axios({
        method: 'get',
        contentType: "application/json",
        url: 'https://envios-api-service.onrenderapp.com/api/usuarios/'+email+'/'+hashHex.toString(),
    }).then((response) => {
        loginUser = response.data;
        console.log(loginUser[0]);
        if (loginUser.length > 0) {
            localStorage.setItem(TOKEN_KEY, loginUser[0].nombre);
            localStorage.setItem('nombre', loginUser[0].usuario);
            localStorage.setItem("_id", loginUser[0]._id);
            localStorage.setItem("type", loginUser[0].tipo);
        }
    });
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("_id");
    localStorage.removeItem("type");
    localStorage.removeItem("nombre");
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

const keyName = "user";
const login = (obj) => {
    let str = JSON.stringify(obj);
    localStorage.setItem(keyName, str)
}


const logout = () => {
    localStorage.removeItem(keyName);
}

const getUser = () => {
    let str = localStorage.getItem(keyName);
    let obj = str ? JSON.parse(str) : null;
    return obj;
}

export { login, logout, getUser }
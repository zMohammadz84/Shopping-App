import http from "./http";

const LoginService = (user) => http.post("user/login", user);

export default LoginService;

import http from "./http";

const SignupService = (user) => http.post("user/register", user);

export default SignupService;

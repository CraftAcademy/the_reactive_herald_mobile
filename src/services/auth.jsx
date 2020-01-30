import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "https://reactive-herald-api.herokuapp.com/",
  prefixUrl: "/api/v1",
  debug: false
});

export default auth;
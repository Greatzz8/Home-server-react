function myHeaders() {
  let my_token = document.cookie.substring(6);
  let my_header = { Authorization: `Bearer ${my_token}` };
  return { my_token, my_header };
}
const server_ip = "http://127.0.0.1:8081";

export { myHeaders, server_ip };

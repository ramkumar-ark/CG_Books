
const token = localStorage.getItem("token");
const header = {
    'Authorization': `Bearer ${token}`
}
export default header;
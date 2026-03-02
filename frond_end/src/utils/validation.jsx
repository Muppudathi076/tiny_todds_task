export const  Validation = (email, password) => {
let errors ={}
if(!email){
    errors.email = "Email is requirend"
}
if(!password){
    errors.password = "Password is requirend"
}
// else if(password.length < 6){
//     errors.password = "Password must be at least 6 letter"
// }
// else if (!/[A-Z]/.test(password)) {
//     errors.password = "Password must contain at least one uppercase letter"
// }
// else if(!/[0-9]/.test(password)){
//     errors.password = "Password must contain at least one number"
// }
// else if(!/[!@#$%^&*]/.test(password)){
//     errors.password = "Password must contain at least one special character"
// }

return errors
}
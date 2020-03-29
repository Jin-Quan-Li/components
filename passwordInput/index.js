import PasswordInput from "./src/main.vue";

PasswordInput.install = (Vue) => {
    PasswordInput.component(PasswordInput.name,PasswordInput)
}
export default PasswordInput
import NumberKeyboard from "./src/main.vue";

NumberKeyboard.install = (Vue) => {
    NumberKeyboard.component(NumberKeyboard.name,NumberKeyboard)
}
export default NumberKeyboard
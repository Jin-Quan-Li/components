import Popup from "./src/main.vue";

Popup.install = (Vue) => {
    Popup.component(Popup.name,Popup)
}
export default Popup
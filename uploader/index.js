import Uploader from "./src/main.vue";

Uploader.install = (Vue) => {
    Uploader.component(Uploader.name,Uploader)
}
export default Uploader
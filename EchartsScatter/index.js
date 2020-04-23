import EchartsScatter from "./src/main.vue";

EchartsScatter.install = (Vue) => {
    EchartsScatter.component(EchartsScatter.name,EchartsScatter)
}
export default EchartsScatter
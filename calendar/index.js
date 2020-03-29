import Calendar from "./src/main.vue";

Calendar.install = (Vue) => {
    Calendar.component(Calendar.name,Calendar)
}
export default Calendar
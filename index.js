import Calendar from "./calendar";
import PasswordInput from "./passwordInput";
import NumberKeyboard from "./numberKeyboard";
import Uploader from "./uploader";
import Toast from "./toast";
import Loading from "./loading";
import Popup from "./popup";

const comments = [
    Calendar,
    PasswordInput,
    NumberKeyboard,
    Uploader,
    Toast,
    Loading,
    Popup
]

const install = (Vue, opts = {}) => {
    comments.forEach( component => {
        Vue.component(component.name,component)
    })
    Vue.prototype.$Toast = Toast.install;
    Vue.prototype.$Loading = Loading.install;
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    Calendar,
    PasswordInput,
    NumberKeyboard,
    Uploader,
    Toast,
    Loading,
    Popup
}
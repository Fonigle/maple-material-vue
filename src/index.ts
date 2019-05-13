import 'vue-tsx-support/enable-check';

import { PluginObject } from 'vue';

import MdcButton from './components/button/button.vue';
import MdcFab from './components/floating-action-button/floating-action-button.vue';
import MdcIconButton from './components/icon-button/icon-button.vue';
import MdcIconButtonToggle from './components/icon-button-toggle/icon-button-toggle.vue';
import MdcCheckbox from './components/checkbox/checkbox.vue';
import MdcRadio from './components/radio/radio.vue';
import MdcSwitch from './components/switch/switch.vue';
import MdcInput from './components/input/input.vue';
import MdcTextarea from './components/textarea/textarea.vue';

interface MapleMaterialVueConfig {
    prefix?: string
}


const MapleMaterialVue: PluginObject<MapleMaterialVueConfig> = {
    install(Vue, options) {
        const prefix = (options || {}).prefix || 'mdc';

        Vue.component(`${prefix}-button`, MdcButton);
        Vue.component(`${prefix}-fab`, MdcFab);
        Vue.component(`${prefix}-icon-button`, MdcIconButton);
        Vue.component(`${prefix}-icon-button-toggle`, MdcIconButtonToggle);
        Vue.component(`${prefix}-checkbox`, MdcCheckbox);
        Vue.component(`${prefix}-radio`, MdcRadio);
        Vue.component(`${prefix}-switch`, MdcSwitch);
        Vue.component(`${prefix}-input`, MdcInput);
        Vue.component(`${prefix}-textarea`, MdcTextarea);
    },
}


export default MapleMaterialVue

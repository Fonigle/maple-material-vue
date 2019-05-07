import 'vue-tsx-support/enable-check';

import { PluginObject } from 'vue';

import MpButton from './components/button/button.vue';
import MpFab from './components/floating-action-button/floating-action-button.vue';
import MpIconButton from './components/icon-button/icon-button.vue';
import MpIconButtonToggle from './components/icon-button-toggle/icon-button-toggle.vue';

interface MapleMaterialVueConfig {
    prefix?: string
}


const MapleMaterialVue: PluginObject<MapleMaterialVueConfig> = {
    install(Vue, options) {
        const prefix = (options || {}).prefix || 'mdc';

        Vue.component(`${prefix}-button`, MpButton);
        Vue.component(`${prefix}-fab`, MpFab);
        Vue.component(`${prefix}-icon-button`, MpIconButton);
        Vue.component(`${prefix}-icon-button-toggle`, MpIconButtonToggle)
    },
}


export default MapleMaterialVue

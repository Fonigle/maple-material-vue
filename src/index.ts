///<reference path="../node_modules/vue-tsx-support/enable-check.d.ts" />
///<reference path="../node_modules/vue-tsx-support/options/allow-unknown-props.d.ts" />
///<reference path="../node_modules/vue-tsx-support/options/allow-element-unknown-attrs.d.ts" />

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
import MdcList from './components/list/list.vue';
import MdcListItem from './components/list/list-item.vue';
import MdcListGroup from './components/list/list-group.vue';
import MdcListDivider from './components/list/list-divider.vue';

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
        Vue.component(`${prefix}-list`, MdcList);
        Vue.component(`${prefix}-list-item`, MdcListItem);
        Vue.component(`${prefix}-list-group`, MdcListGroup);
        Vue.component(`${prefix}-list-divider`, MdcListDivider);
    },
}


export default MapleMaterialVue

<template>
    <div ref="form-field"
         class="mdc-form-field">
        <radio-core v-bind="{ id, disabled, name, value }"
                    v-model="currentValue"
                    @radio-core-mounted="handleCoreMounted"></radio-core>
        <label :for="id"
               :class="['mdc-radio__label',{'mdc-radio__label--disabled':disabled}]">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </label>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
import twowayFactory from "mixins/two-way";
import { MDCRadio } from "@material/radio";
import { MDCFormField } from '@material/form-field';
import IdMixin from "mixins/id";

import RadioCore from './radio-core.vue';

/**
 * component <mdc-radio>
 *
 * <mdc-radio>组件
 * @export
 * @class MdcRadio
 * @extends {Mixins(twowayFactory(), IdMixin)}
 */
@Component({
    components: { RadioCore }
})
export default class MdcRadio extends Mixins(twowayFactory(), IdMixin) {
    /**
     * disabled mark
     *
     * 禁用状态标记
     * @type {boolean}
     * @memberof MdcRadio
     */
    @Prop({
        type: Boolean,
        default: false
    })
    disabled!: boolean;

    /**
     * name of the native input control
     *
     * 原生input组件的name
     * @type {string}
     * @memberof MdcRadio
     */
    @Prop({
        type: String
    })
    name?: string

    /**
     * value of native input control
     *
     * 原生input组件的绑定值
     * @type {*}
     * @memberof MdcRadio
     */
    @Prop()
    value?: any

    /**
     * content of the label
     *
     * 标签内容
     * @type {string}
     * @memberof MdcRadio
     */
    @Prop({
        type: String
    })
    label?: string

    /**
     * html element of form-filed
     *
     * 'form-filed' HTML元素
     * @readonly
     * @memberof MdcRadio
     */
    get eleFormField() {
        return this.$refs['form-field'] as Element;
    }

    /**
     * handler for 'radio-core-mounted' event
     *
     * 'radio-core-mounted' 事件处理
     * @param {MDCRadio} radio
     * @memberof MdcRadio
     */
    handleCoreMounted(radio: MDCRadio) {
        const formField = new MDCFormField(this.eleFormField);
        formField.input = radio;
    }
}
</script>
<style lang="scss">
    @import "@material/form-field/mdc-form-field";

    .mdc-radio__label {
        &.mdc-radio__label--disabled {
            opacity: 0.5;
        }
    }
</style>
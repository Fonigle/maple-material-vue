<template>
    <div ref="form-field"
         class="mdc-form-field">
        <checkbox-core v-bind="{ id, disabled, name, value }"
                       v-model="currentValue"
                       @checkbox-core-mounted="handleCoreMounted"></checkbox-core>
        <label :for="id"
               :class="['mdc-checkbox__label',{'mdc-checkbox__label--disabled':disabled}]">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import { MDCFormField } from '@material/form-field';
    import { MDCCheckbox } from '@material/checkbox';

    import twowayFactory from "mixins/two-way";
    import IdMixin from "mixins/id";

    import CheckboxCore from './checkbox-core.vue';

    /**
     * component <mdc-checkbox>
     *
     * <mdc-checkbox>组件
     * @export
     * @class MdcCheckbox
     * @extends {Mixins(twowayFactory())}
     */
    @Component({
        components: { CheckboxCore }
    })
    export default class MdcCheckbox extends Mixins(twowayFactory(), IdMixin) {
        /**
         * disabled mark
         *
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcCheckbox
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly disabled!: boolean;

        /**
         * name of the native input control
         *
         * 原生input组件的name
         * @type {string}
         * @memberof MdcCheckbox
         */
        @Prop({
            type: String
        })
        readonly name?: string

        /**
         * value of native input control
         *
         * 原生input组件的绑定值
         * @type {*}
         * @memberof MdcCheckbox
         */
        @Prop()
        readonly value?: any

        /**
         * content of the label
         *
         * 标签内容
         * @type {string}
         * @memberof MdcCheckbox
         */
        @Prop({
            type: String
        })
        readonly label?: string

        /**
         * html element of form-filed
         *
         * 'form-filed' HTML元素
         * @readonly
         * @memberof MdcCheckbox
         */
        get formFieldElement() {
            return this.$refs['form-field'] as HTMLDivElement;
        }

        /**
         * handler for 'checkbox-core-mounted' event
         *
         * 'checkbox-core-mounted' 事件处理
         * @param {MDCRadio} checkbox
         * @memberof MdcCheckbox
         */
        handleCoreMounted(checkbox: MDCCheckbox) {
            const formField = new MDCFormField(this.formFieldElement);
            formField.input = checkbox;
        }
    }
</script>
<style lang="scss">
    @import "@material/form-field/mdc-form-field";

    .mdc-checkbox__label {
        &.mdc-checkbox__label--disabled {
            opacity: 0.5;
        }
    }
</style>
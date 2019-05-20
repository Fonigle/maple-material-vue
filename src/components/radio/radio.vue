<template>
    <div ref="form-field"
         class="mdc-form-field">
        <div ref="radio"
             class="mdc-radio">
            <input class="mdc-radio__native-control"
                   type="radio"
                   :id="id"
                   :name="name"
                   :value="value"
                   v-model="currentValue"
                   :disabled="disabled">
            <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
            </div>
        </div>
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
    import { MDCFormField } from '@material/form-field';
    import { MDCRadio } from '@material/radio';
    import IdMixin from "@/mixins/id";

    /**
     * component <mdc-radio>
     *
     * <mdc-radio>组件
     * @export
     * @class MdcRadio
     * @extends {Mixins(twowayFactory())}
     */
    @Component
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
        * html element of checkbox
        *
        * 'checkbox' HTML元素
        * @readonly
        * @memberof MdcRadio
        */
        get eleCheckbox() {
            return this.$refs['radio'] as Element;
        }

        /**
         * mounted lifecycle.
         * - initialize ripple based on MDCFormField.
         *
         * 生命周期: mounted.
         * - 基于MDCFormField初始化点击波纹效果
         * @memberof MdcRadio
         */
        mounted() {
            setTimeout(() => {
                const radio = new MDCRadio(this.eleCheckbox);
                const formField = new MDCFormField(this.eleFormField);
                formField.input = radio;
            }, 34);
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/radio/mdc-radio";

    .mdc-radio__label {
        &.mdc-radio__label--disabled {
            opacity: 0.5;
        }
    }
</style>
<template>
    <div ref="form-field"
         class="mdc-form-field">
        <div ref="checkbox"
             class="mdc-checkbox">
            <input type="checkbox"
                   class="mdc-checkbox__native-control"
                   :id="id"
                   :value="value"
                   v-model="currentValue" />
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark"
                     viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path"
                          fill="none"
                          d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
            </div>
        </div>
        <label :for="id">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import { MDCFormField } from '@material/form-field';
    import { MDCCheckbox } from '@material/checkbox';
    import twowayFactory from "@/mixins/two-way";

    /**
     * component <mdc-fab>
     *
     * <mdc-fab>组件
     * @export
     * @class MdcCheckbox
     * @extends {Mixins(twowayFactory())}
     */
    @Component
    export default class MdcCheckbox extends Mixins(twowayFactory()) {
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
        disabled!: boolean;

        /**
         * id of the native input control
         *
         * 原生input组件的id
         * @type {string}
         * @memberof MdcCheckbox
         */
        @Prop({
            type: String,
            default: () => Math.random().toString(36).substr(2)
        })
        id!: string;

        /**
         * value of native input control
         *
         * 原生input组件的绑定值
         * @type {*}
         * @memberof MdcCheckbox
         */
        @Prop()
        value?: any

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
        label?: string

        /**
         * html element of form-filed
         *
         * 'form-filed' HTML元素
         * @readonly
         * @memberof MdcCheckbox
         */
        get eleFormField() {
            return this.$refs['form-field'] as Element;
        }

        /**
        * html element of checkbox
        *
        * 'checkbox' HTML元素
        * @readonly
        * @memberof MdcCheckbox
        */
        get eleCheckbox() {
            return this.$refs['checkbox'] as Element;
        }

        /**
         * mounted lifecycle.
         * - initialize ripple based on MDCFormField.
         *
         * 生命周期: mounted.
         * - 基于MDCFormField初始化点击波纹效果
         * @memberof MdcCheckbox
         */
        mounted() {
            setTimeout(() => {
                const checkbox = new MDCCheckbox(this.eleCheckbox);
                const formField = new MDCFormField(this.eleFormField);
                formField.input = checkbox;
            }, 34);
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/checkbox/mdc-checkbox";
</style>
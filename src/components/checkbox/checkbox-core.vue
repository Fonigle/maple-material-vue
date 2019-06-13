<template>
    <div ref="checkbox"
         class="mdc-checkbox">
        <input type="checkbox"
               class="mdc-checkbox__native-control"
               :id="id"
               :name="name"
               :value="value"
               v-model="currentValue"
               :disabled="disabled" />
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
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import twowayFactory from "mixins/two-way";

    import { MDCCheckbox } from '@material/checkbox';

    @Component
    export default class MdcCheckboxCore extends Mixins(twowayFactory()) {
        /**
         * id of the native input control
         *
         * 原生input组件的id
         * @type {string}
         * @memberof MdcCheckboxCore
         */
        @Prop()
        readonly id?: string;

        /**
         * disabled mark
         *
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcCheckboxCore
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
         * @memberof MdcCheckboxCore
         */
        @Prop({
            type: String
        })
        readonly name?: string;

        /**
         * value of native input control
         *
         * 原生input组件的绑定值
         * @type {*}
         * @memberof MdcCheckboxCore
         */
        @Prop()
        readonly value?: any;

        /**
         * html element of checkbox
         *
         * 'checkbox' HTML元素
         * @readonly
         * @memberof MdcCheckboxCore
         */
        get checkboxElement() {
            return this.$refs['checkbox'] as HTMLInputElement;
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
                const checkbox = new MDCCheckbox(this.checkboxElement);
                this.$emit('checkbox-core-mounted', checkbox)
            }, 17)
        }
    }
</script>
<style lang="scss">
    @import "@material/checkbox/mdc-checkbox";
</style>
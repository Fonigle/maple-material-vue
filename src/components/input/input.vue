<template>
    <div :class="['mdc-text-field__wrapper', {'mdc-text-field__wrapper--fullwidth': type==='fullwidth'}]">
        <div ref="text-field"
             :class="inputClassName">
            <i v-if="leadingIcon && type!=='fullwidth'"
               :class="['mdc-text-field__icon', leadingIcon]"
               tabindex="-1"
               role="button"></i>
            <input type="text"
                   :id="id"
                   class="mdc-text-field__input"
                   :placeholder="(type==='fullwidth' && !noLabel)? placeholder: ''"
                   :disabled="disabled"
                   :maxlength="maxlength"
                   v-model="currentValue">
            <i v-if="trailingIcon && type==='outlined'"
               :class="['mdc-text-field__icon', trailingIcon]"
               tabindex="-1"
               role="button"></i>
            <div class="mdc-notched-outline"
                 v-if="type==='outlined'">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch"
                     v-if="!noLabel">
                    <label :for="id"
                           :class="['mdc-floating-label', {'mdc-floating-label--float-above': preFilled}]">{{placeholder}}</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
            <label :class="['mdc-floating-label', {'mdc-floating-label--float-above': preFilled}]"
                   :for="id"
                   v-else-if="type!=='fullwidth' && !noLabel">{{placeholder}}</label>
            <i v-if="trailingIcon && type==='default'"
               :class="['mdc-text-field__icon', trailingIcon]"
               tabindex="-1"
               role="button"></i>
            <div class="mdc-line-ripple"
                 v-if="type!=='outlined'">
            </div>
        </div>
        <div class="mdc-text-field-helper-line"
             v-if="helper || (counter && maxlength)">
            <div class="mdc-text-field-helper-text"
                 v-if="helper">{{helper}}</div>
            <div v-if="counter && maxlength"
                 class="mdc-text-field-character-counter"></div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import { MDCTextField } from '@material/textfield';
    import IdMixin from 'mixins/id';
    import twowayFactory from "@/mixins/two-way";

    /**
     * component <mdc-input>
     * 
     * <mdc-input> 组件
     * @export
     * @class MdcInput
     * @extends {Mixins(twowayFactory(), IdMixin)}
     */
    @Component
    export default class MdcInput extends Mixins(twowayFactory(), IdMixin) {
        /**
         * maxlength of the native input control.
         *
         * 原生 input 组件的 maxlength 属性
         * @type {number}
         * @memberof MdcInput
         */
        @Prop({
            type: Number
        })
        readonly maxlength?: number;

        /**
         * control if it's without label.
         * 
         * 控制是否为无标签输入框
         * @type {boolean}
         * @memberof MdcInput
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly noLabel!: boolean;

        /**
         * type of input style.
         *
         * 输入框样式类别
         * @type {('default' | 'fullwidth' | 'outlined')}
         * @memberof MdcInput
         */
        @Prop({
            type: String,
            default: 'default'
        })
        readonly type!: 'default' | 'fullwidth' | 'outlined';

        /**
         * disabled mark.
         * 
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcInput
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly disabled!: boolean;

        /**
         * helper text to display under input when focused.
         *
         * 聚焦时在输入框下方显示的提示文字
         * @type {string}
         * @memberof MdcInput
         */
        @Prop()
        readonly helper?: string;

        /**
         * show character counter.
         *
         * 显示字符计数器
         * @type {boolean}
         * @memberof MdcInput
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly counter!: boolean;

        /**
         * className of icon display at the leading of input.
         *
         * 显示在标签上的内容 或 传递给原生input控件的placeholder属性
         * @type {string}
         * @memberof MdcInput
         */
        @Prop()
        readonly leadingIcon?: string;

        /**
         * className of icon display at the trailing of input.
         *
         * 显示在标签上的内容 或 传递给原生input控件的placeholder属性
         * @type {string}
         * @memberof MdcInput
         */
        @Prop()
        readonly trailingIcon?: string;

        /**
         * content to display on label or pass it to native input control.
         *
         * 显示在标签上的内容 或 传递给原生input控件的placeholder属性
         * @type {string}
         * @memberof MdcInput
         */
        @Prop()
        readonly placeholder?: string;


        /**
         * filled when init.
         *
         * 初始化时已有填充值。
         * @private
         * @memberof MdcInput
         */
        private preFilled = false;

        /**
         * className list of root element.
         *
         * 组件根元素类名
         * @readonly
         * @memberof MdcInput
         */
        get inputClassName() {
            const result = ['mdc-text-field'];
            this.type === 'fullwidth' && result.push('mdc-text-field--fullwidth');
            this.type === 'outlined' && result.push('mdc-text-field--outlined');

            this.noLabel && result.push('mdc-text-field--no-label');

            this.disabled && result.push('mdc-text-field--disabled');

            this.leadingIcon && result.push('mdc-text-field--with-leading-icon');
            this.trailingIcon && result.push('mdc-text-field--with-trailing-icon');

            return result;
        }

        /**
         * element of text-field
         *
         * text-field 主元素
         * @readonly
         * @memberof MdcInput
         */
        get elementTextField() {
            return this.$refs['text-field'] as Element;
        }

        /**
         * mounted lifecycle.
         * - initialize MDCTextField.
         *
         * 生命周期: mounted
         * - 初始化 MDCTextField
         * @memberof MdcInput
         */
        mounted() {
            try {
                if (this.currentValue.toString().length) {
                    this.preFilled = true;
                }
            }
            catch{ }

            setTimeout(() => {
                new MDCTextField(this.elementTextField);
            }, 51);

        }
    }
</script>
<style lang="scss">
    @import "@material/textfield/mdc-text-field";
    .mdc-text-field__wrapper {
        display: inline-flex;
        flex-direction: column;
        vertical-align: top;
    }

    .mdc-text-field__wrapper--fullwidth {
        width: 100%;
    }

    .mdc-text-field--focused:not(.mdc-text-field--disabled) {
        .mdc-floating-label {
            color: var(--mdc-theme-primary, #6200ee) !important;
        }
    }
</style>
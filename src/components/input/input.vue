<template>
    <div class="mdc-text-field__wrapper">
        <div ref="text-field"
             :class="inputClassName">
            <input type="text"
                   :id="id"
                   class="mdc-text-field__input"
                   :placeholder="(type==='fullwidth' && !noLabel)? placeholder: ''"
                   :disabled="disabled"
                   :maxlength="maxlength"
                   v-model="currentValue">
            <div class="mdc-notched-outline"
                 v-if="type==='outlined'">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch"
                     v-if="!noLabel">
                    <label :for="id"
                           class="mdc-floating-label">{{placeholder}}</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
            </div>
            <label class="mdc-floating-label"
                   :for="id"
                   v-else-if="type!=='fullwidth' && !noLabel">{{placeholder}}</label>
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
        readonly maxlength?: number

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
        readonly type!: 'default' | 'fullwidth' | 'outlined'

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
        readonly helper?: string

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
         * content to display on label or pass it to native input control.
         *
         * 显示在标签上的内容 或 传递给原生input控件的placeholder属性
         * @type {string}
         * @memberof MdcInput
         */
        @Prop()
        readonly placeholder?: string;

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
            new MDCTextField(this.elementTextField);
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
</style>
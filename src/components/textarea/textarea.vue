<template>
    <div ref='text-field'
         :class="textareaClassName">
        <div class="mdc-text-field-character-counter"
             v-if="counter"></div>
        <textarea :id="id"
                  :class="inputClassName"
                  :rows="rows"
                  :cols="cols"
                  :maxlength="maxlength"
                  :disabled="disabled"
                  v-model="currentValue"></textarea>
        <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch"
                 v-if="!noLabel">
                <label :for="id"
                       class="mdc-floating-label">{{placeholder}}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import { MDCTextField } from '@material/textfield';
    import IdMixin from "mixins/id";
    import twowayFactory from "mixins/two-way";

    /**
     * component <mdc-textarea>
     *
     * <mdc-textarea> 组件
     * @export
     * @class MdcTextarea
     * @extends {Mixins(twowayFactory(), IdMixin)}
     */
    @Component
    export default class MdcTextarea extends Mixins(twowayFactory(), IdMixin) {
        /**
         * content to display on label
         *
         * 标签上需要显示的内容
         * @type {string}
         * @memberof MdcTextarea
         */
        @Prop()
        readonly placeholder?: string;

        /**
         * disabled mark.
         * 
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly disabled?: boolean;

        /**
         * control if it's without label.
         * 
         * 控制是否为无标签文本域
         * @type {boolean}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly noLabel!: boolean;

        /**
         * 'maxlength' prop of the native textarea control.
         *
         * 原生 textarea 控件的 maxlength 属性
         * @type {number}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Number
        })
        readonly maxlength?: number;

        /**
         * resize type of the native textarea control.
         *
         * 原生 textarea 控件的 resize 类型
         * @type {('none' | 'vertical' | 'horizontal' | 'both')}
         * @memberof MdcTextarea
         */
        @Prop({
            type: String,
            default: 'none'
        })
        readonly resize?: 'none' | 'vertical' | 'horizontal' | 'both';

        /**
         * 'rows' prop of the native textarea control.
         *
         * 原生 textarea 控件的 rows 属性
         * @type {number}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Number,
            default: 4
        })
        readonly rows!: number

        /**
         * 'cols' prop of the native textarea control.
         *
         * 原生 textarea 控件的 cols 属性
         * @type {number}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Number,
            default: 20
        })
        readonly cols!: number

        /**
         * show character counter.
         *
         * 显示字符计数器
         * @type {boolean}
         * @memberof MdcTextarea
         */
        @Prop({
            type: Boolean,
            default: false
        })
        counter!: boolean

        /**
         * className list of root element.
         *
         * 组件根元素类名
         * @readonly
         * @memberof MdcTextarea
         */
        get textareaClassName() {
            const result = ['mdc-text-field', 'mdc-text-field--textarea'];
            this.disabled && result.push('mdc-text-field--disabled');

            return result;
        }

        /**
         * className list of input element.
         *
         * input元素类名
         * @readonly
         * @memberof MdcTextarea
         */
        get inputClassName() {
            const result = ['mdc-text-field__input'];
            this.resize == 'vertical' && result.push('mdc-text-field__input--resize-vertical');
            this.resize == 'horizontal' && result.push('mdc-text-field__input--resize-horizontal');
            this.resize == 'both' && result.push('mdc-text-field__input--resize-both');

            return result;
        }

        /**
         * element of text-field
         * 
         * text-field 主元素
         * @readonly
         * @memberof MdcTextarea
         */
        get eleTextField() {
            return this.$refs['text-field'] as Element;
        }

        /**
         * mounted lifecycle.
         * - initialize MDCTextField.
         *
         * 生命周期: mounted
         * - 初始化 MDCTextField
         * @memberof MdcTextarea
         */
        mounted() {
            setTimeout(() => {
                new MDCTextField(this.eleTextField);
            }, 51);
        }
    }
</script>
<style lang="scss">
    @import "@material/textfield/mdc-text-field";

    .mdc-text-field {
        &.mdc-text-field--textarea {
            vertical-align: top;
        }

        textarea {
            resize: none;

            &.mdc-text-field__input--resize-vertical {
                resize: vertical;
            }

            &.mdc-text-field__input--resize-horizontal {
                resize: horizontal;
            }

            &.mdc-text-field__input--resize-both {
                resize: both;
            }
        }
    }
</style>
<template>
    <button ref="button"
            :class="buttonClassName"
            v-on="events">
        <i v-if="icon"
           :class="['mdc-button__icon', icon]"
           aria-hidden="true"></i>
        <span class="mdc-button__label">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </span>
        <i v-if="trailingIcon"
           :class="['mdc-button__icon', trailingIcon]"></i>
    </button>
</template>
<script lang="ts">
    import { Component, Prop, Mixins } from "vue-property-decorator";
    import rippleFactory from 'mixins/ripple';

    /**
     * component <mdc-button>
     *
     * <mdc-button>组件
     *
     * @export
     * @class MdcButton
     * @extends {Mixins(rippleFactory('button'))}
     */
    @Component
    export default class MdcButton extends Mixins(rippleFactory('button')) {
        /**
         * label display on button.
         *
         * 按钮文字
         * @type {string}
         * @memberof MdcButton
         */
        @Prop({
            type: String,
        })
        readonly label?: string;

        /**
         * typeof button style.
         *
         * 按钮样式
         * @type {('raised' | 'unelevated' | 'outlined')}
         * @memberof MdcButton
         */
        @Prop({
            type: String
        })
        readonly type?: 'raised' | 'unelevated' | 'outlined';

        /**
         * control if the button is slightly smaller.
         *
         * 小号按钮
         * @type {boolean}
         * @memberof MdcButton
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly dense?: boolean;


        /**
         * icon display before label text.
         *
         * 在标签文字前展示的图标
         * @type {string}
         * @memberof MdcButton
         */
        @Prop({
            type: String
        })
        readonly icon?: string;

        /**
         * icon display after label text.
         *
         * 在标签文字后展示的图标
         * @type {string}
         * @memberof MdcButton
         */
        @Prop({
            type: String
        })
        readonly trailingIcon?: string;

        /**
         * className list of root element.
         *
         * 组件根元素类名
         * @readonly
         * @memberof MdcButton
         */
        get buttonClassName() {
            const list = ['mdc-button'];
            if (this.type) {
                list.push(`mdc-button--${this.type}`);
            }

            if (this.dense) {
                list.push('mdc-button--dense');
            }

            return list.join(' ');
        }

        /**
         * events list of component.
         *
         * 组件事件列表
         * @readonly
         * @memberof MdcButton
         */
        get events() {
            return {
                'click': () => { this.$emit('click') }
            }
        }
    }
</script>
<style lang="scss">
    @import "@material/button/mdc-button";
</style>

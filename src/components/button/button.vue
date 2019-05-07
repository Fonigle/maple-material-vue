<template>
    <button ref="button"
            :class="buttonClassName"
            v-on="events">
        <span class="mdc-button__label">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </span>
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
         * label to display on button.
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

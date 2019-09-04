<template>
    <button ref="fab"
            :class="fabClassName"
            v-on="$listeners">
        <i v-if="icon"
           :class="['mdc-fab__icon', icon]"></i>
        <span v-if="extended"
              class="mdc-fab__label">
            <template v-if="label">{{label}}</template>
            <slot v-else
                  name="label"></slot>
        </span>
        <i v-if="trailingIcon"
           :class="['mdc-fab__icon', trailingIcon]"></i>
    </button>
</template>
<script lang="ts">
    import { Component, Prop, Mixins } from "vue-property-decorator";
    import rippleFactory from "mixins/ripple";

    /**
     * component <mdc-fab>
     *
     * <mdc-fab>组件
     * @export
     * @class MdcFab
     * @extends {Mixins(rippleFactory('fab'))}
     */
    @Component
    export default class MdcFab extends Mixins(rippleFactory('fab')) {
        /**
         * mini-type of fab.
         * - for smaller size.
         *
         * 迷你模式
         * - 更小尺寸
         * @type {boolean}
         * @memberof MdcFab
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly mini!: boolean;

        /**
         * extended-type of fab.
         * - extend on horizontal for more content.
         *
         * 扩展模式
         * - 横向延伸以容纳更多内容
         * @type {boolean}
         * @memberof MdcFab
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly extended!: boolean;

        /**
         * className of icon display on fab.
         *
         * 显示在浮动按钮上的图标的类名
         * @type {string}
         * @memberof MdcFab
         */
        @Prop()
        readonly icon!: string;

        /**
         * className of icon display after fab label.
         *
         * 后置图标的类名
         * @type {string}
         * @memberof MdcFab
         */
        @Prop()
        readonly trailingIcon!: string;

        /**
         * label to display on button.
         *
         * 按钮文字
         * @type {string}
         * @memberof MdcFab
         */
        @Prop()
        readonly label?: string;

        /**
         * control if fab is exited.
         * - set 'true' to make it exited.
         * - with animation when toggle status.
         *
         * 控制按钮是否退出
         * - 置为'true'使其退出
         * - 状态切换时会展示动画。
         * @type {boolean}
         * @memberof MdcFab
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly exited!: boolean;

        /**
         * className list of root element.
         *
         * 组件根元素类名
         * @readonly
         * @memberof MdcFab
         */
        get fabClassName() {
            const list = ['mdc-fab'];

            if (this.mini) {
                list.push('mdc-fab--mini');
            }

            if (this.extended) {
                list.push('mdc-fab--extended');
            }

            if (this.exited) {
                list.push('mdc-fab--exited');
            }

            return list.join(' ');
        }
    }

</script>
<style lang="scss">
    @import "@material/fab/mdc-fab";
</style>

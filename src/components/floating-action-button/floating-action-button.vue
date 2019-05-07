<template>
    <button ref="fab"
            :class="fabClassName"
            v-on="events">
        <i class="mdc-fab__icon"></i>
        <span v-if="extended"
              class="mdc-fab__label">{{label}}</span>
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
         * label to display on button.
         *
         * 按钮文字
         * @type {string}
         * @memberof MdcFab
         */
        @Prop({
            type: String
        })
        readonly label?: string;

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

        /**
         * events list of component.
         *
         * 组件事件列表
         * @readonly
         * @memberof MdcFab
         */
        get events() {
            return {
                'click': () => { this.$emit('click') }
            }
        }
    }

</script>
<style lang="scss">
    @import "@material/fab/mdc-fab";
</style>

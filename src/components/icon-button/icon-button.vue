<template>
    <button ref="icon-button"
            class="mdc-icon-button"
            v-on="events">
        <i v-if="icon"
           :class="icon"></i>
        <slot v-else></slot>
    </button>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import rippleFactory from "mixins/ripple";

    /**
     * component <mdc-icon-button>
     *
     * <mdc-icon-button>组件
     * @export
     * @class MdcIconButton
     * @extends {Vue}
     */
    @Component
    export default class MdcIconButton extends Mixins(rippleFactory('icon-button', true)) {
        /**
         * className of icon.
         *
         * 图标类名
         * @type {string}
         * @memberof MdcIconButton
         */
        @Prop({
            type: String
        })
        readonly icon?: string

        /**
         * events list of component.
         *
         * 组件事件列表
         * @readonly
         * @memberof MdcIconButton
         */
        get events() {
            return {
                'click': () => { this.$emit('click') }
            }
        }
    }

</script>
<style lang="scss">
    @import "@material/icon-button/mdc-icon-button";
</style>

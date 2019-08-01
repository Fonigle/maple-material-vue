<template>
    <div class="mdc-list-group">
        <h3 class="mdc-list-group__subheader">{{title}}</h3>
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    /**
     * component <mdc-list-group>
     *
     * <mdc-list-group>组件
     * @export
     * @class MdcListGroup
     * @extends {Vue}
     */
    @Component
    export default class MdcListGroup extends Vue {

        /**
         * title of list group
         *
         * 列表组标题
         * @type {string}
         * @memberof MdcListGroup
         */
        @Prop()
        readonly title!: string;
    }
</script>
<style lang="scss">
</style>
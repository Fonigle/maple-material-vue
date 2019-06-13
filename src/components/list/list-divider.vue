<template>
    <li v-if="inList"
        role="separator"
        class="mdc-list-divider"></li>
    <hr v-else
        class="mdc-list-divider">
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import MdcList from './list.vue';

    /**
     * component <mdc-list-divider>
     *
     * <mdc-list-divider>组件
     * @export
     * @class MdcListDivider
     * @extends {Vue}
     */
    @Component
    export default class MdcListDivider extends Vue {
        /**
         * if is child of <mdc-list> component
         *
         * 是否为<mdc-list>组件的直接子级
         * @readonly
         * @memberof MdcListDivider
         */
        get inList() {
            const $parent = this.$parent as MdcList;

            if ($parent && $parent.componentName === 'mdc-list') {
                return true;
            }
            return false;
        }
    }
</script>
<style lang="scss">
</style>
<template>
    <ul ref="mdc-list"
        :class="mainClassList"
        :role="role"
        @[actionEvent]="handleActionEvent">
        <slot></slot>
    </ul>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";
    import { MDCList } from '@material/list';
    import twowayFactory from "mixins/two-way";
    import IdMixin from "mixins/id";

    /**
     * component <mdc-list>
     *
     * <mdc-list>组件
     * @export
     * @class MdcList
     * @extends {Mixins(twowayFactory(), IdMixin)}
     */
    @Component
    export default class MdcList extends Mixins(twowayFactory(), IdMixin) {
        /**
         * name of component. mostly used to identification（eg. identifying whether the parent component is this component）.
         *
         * 组件的名称。通常用于身份识别（例如用于识别某个组件的父组件是否为此组件）
         * @memberof MdcList
         */
        componentName = 'mdc-list';

        /**
         * instance of MDCList.
         *
         * MDCList实例。
         * @type {(MDCList | null)}
         * @memberof MdcList
         */
        private mdcListInstance: MDCList | null = null;

        /**
         * action event name of MDCList.
         *
         * MDCList状态改变事件的名称
         * @private
         * @memberof MdcList
         */
        private actionEvent = 'MDCList:action';


        /**
         * contorl if list item display in two line text.
         *
         * 控制列表项是否以两行文字的形式显示
         * @type {boolean}
         * @memberof MdcList
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly twoLine!: boolean;

        /**
         * type of list
         *
         * 列表类型
         * @type {('default' | 'single-selection' | 'radio' | 'checkbox')}
         * @memberof MdcList
         */
        @Prop({
            default: 'default'
        })
        readonly type!: 'default' | 'single-selection' | 'radio' | 'checkbox';

        /**
         * className list of root element.
         *
         * 组件根元素类名
         * @readonly
         * @memberof MdcButton
         */
        get mainClassList() {
            const result = ['mdc-list'];
            if (this.twoLine) result.push('mdc-list--two-line');
            return result;
        }

        /**
         * HTML element of list
         *
         * 列表的HTML元素
         * @readonly
         * @memberof MdcList
         */
        get mdcListElement() {
            return this.$refs['mdc-list'] as Element;
        }

        /**
         * 'role' attr of list
         *
         * 列表的'role'属性
         * @readonly
         * @memberof MdcList
         */
        get role() {
            const { type } = this;

            if (type === 'single-selection') return 'listbox';
            else if (type === 'radio') return 'radiogroup';
            else if (type === 'checkbox') return 'group';
            else return;
        }

        /**
         * methods for set value of currentValue
         *
         * 设置currentValue值的方法
         * @param {*} val
         * @memberof MdcList
         */
        setValue(val: any) {
            this.currentValue = val;
        }

        /**
         * handler of MDCList action event
         *
         * MDCList action 事件处理函数
         * @param {CustomEvent} e
         * @memberof MdcList
         */
        private handleActionEvent(e: CustomEvent) {
            if (this.type === 'single-selection') {
                this.currentValue = e.detail.index;
            }
        }

        /**
         * mounted lifecycle.
         * - initialize MDCList.
         * - start singleSelection & set selectedIndex when type is 'single-selection'
         *
         * 生命周期: mounted.
         * - 实例化MDCList.
         * - 当type被设置为'single-selection'时，开启MDCList并初始化选中项
         * @memberof MdcRadio
         */
        mounted() {
            this.mdcListInstance = new MDCList(this.mdcListElement);

            if (this.type === 'single-selection') {
                this.mdcListInstance.singleSelection = true;
                this.mdcListInstance.selectedIndex = this.currentValue;
            }

        }

        /**
         * watcher of currentValue
         * - set selectedIndex when type is 'single-selection'
         *
         * currentValue 监视器
         * - 当type被设置为'single-selection'时，同步selectedIndex的值
         * @param {*} newVal
         * @memberof MdcList
         */
        @Watch('currentValue')
        watchCurrentValue(newVal: any) {
            if (this.mdcListInstance) {
                if (this.type === 'single-selection') {
                    this.mdcListInstance.selectedIndex = newVal;
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "@material/list/mdc-list.scss";
</style>
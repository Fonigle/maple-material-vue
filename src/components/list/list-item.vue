<script lang="tsx">
    import { CreateElement } from 'vue';
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import rippleFactory from "mixins/ripple";
    import IdMixin from "mixins/id";

    import MdcRadioCore from '@/components/radio/radio-core.vue';
    import MdcCheckboxCore from '@/components/checkbox/checkbox-core.vue';
    import MdcList from './list.vue';

    /**
     * component <mdc-list-item>
     *
     * <mdc-list-item>组件
     * @export
     * @class MdcListItem
     * @extends {Mixins(rippleFactory('mdc-list-item'), IdMixin)}
     */
    @Component
    export default class MdcListItem extends Mixins(rippleFactory('mdc-list-item'), IdMixin) {
        /**
         * render function
         *
         * 渲染函数
         * @param {CreateElement} h
         * @returns
         * @memberof MdcListItem
         */
        render(h: CreateElement) {
            if (parent) {
                let labels;
                if (this.text) { labels = this.text; }
                else if (this.primary || this.secondary) {
                    labels = [
                        <span class="mdc-list-item__primary-text">{this.primary}</span>,
                        <span class="mdc-list-item__secondary-text">{this.secondary}</span>
                    ];
                }
                else { labels = this.$slots.default }

                let labelsWrapper;
                if (this.parentType === 'radio' || this.parentType === 'checkbox') {
                    labelsWrapper = h('label', { class: 'mdc-list-item__text', attrs: { for: this.id } }, labels)
                }
                else {
                    labelsWrapper = h('span', { class: 'mdc-list-item__text' }, labels)
                }

                let controls;

                const radioCore = <MdcRadioCore name={this.parentId} id={this.id} value={this.value} vModel={this.parentValue}></MdcRadioCore>;
                const checkboxCore = <MdcCheckboxCore name={this.parentId} id={this.id} value={this.value} vModel={this.parentValue}></MdcCheckboxCore>;

                switch (this.parentType) {
                    case 'radio': { controls = (<span class="mdc-list-item__graphic">{radioCore}</span>); break; }
                    case 'checkbox': { controls = (<span class="mdc-list-item__graphic">{checkboxCore}</span>); break; }
                    default: break;
                }

                let role;
                if (this.parentType === 'radio') role = 'radio';
                if (this.parentType === 'checkbox') role = 'checkbox';

                return (
                    <li ref="mdc-list-item"
                        class="mdc-list-item"
                        role={role}>
                        {controls}
                        {labelsWrapper}
                    </li >
                )
            }
        }

        /**
         * text of single line
         *
         * 单行文字
         * @type {string}
         * @memberof MdcListItem
         */
        @Prop()
        readonly text?: string;

        /**
         * primary text of two line
         *
         * 双行模式主要文字
         * @type {string}
         * @memberof MdcListItem
         */
        @Prop()
        readonly primary?: string;

        /**
         * secondary text of two line
         *
         * 双行模式次要文字
         * @type {string}
         * @memberof MdcListItem
         */
        @Prop()
        readonly secondary?: string;

        /**
         * value of list item (radio type or checkbox type)
         *
         * 列表项的值（用于radio/checkbox类型）
         * @type {*}
         * @memberof MdcListItem
         */
        @Prop()
        readonly value?: any;

        /**
         * parent component
         *
         * 父组件
         * @readonly
         * @memberof MdcListItem
         */
        get parent() {
            let result: MdcList | null = null;

            const $parent = this.$parent as MdcList;

            if ($parent && $parent.componentName === 'mdc-list') {
                result = $parent;
            }

            return result;
        }

        /**
         * 'type' prop of parent component
         *
         * 父组件'type'属性
         * @readonly
         * @memberof MdcListItem
         */
        get parentType() {
            return this.parent ? this.parent.type : null;
        }

        /**
         * 'currentValue' prop of parent component
         *
         * 父组件'currentValue'属性
         * @memberof MdcListItem
         */
        get parentValue() {
            if (this.parent && this.parent.currentValue) {
                return this.parent.currentValue;
            }
            else {
                return null;
            }
        }

        set parentValue(val: any) {
            if (this.parent) {
                this.parent.currentValue = val;
            }
        }

        /**
         * 'id' prop of parent component
         *
         * 父组件'id'属性
         * @readonly
         * @memberof MdcListItem
         */
        get parentId() {
            return this.parent ? this.parent.id : null;
        }
    }
</script>
<style lang="scss">
</style>
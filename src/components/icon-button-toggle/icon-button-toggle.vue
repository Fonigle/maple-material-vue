<template>
    <mdc-icon-button ref="icon-button-toggle"
                     @[toggleEvent].native="handleChange"
                     v-on="events">
        <i v-if="iconOn"
           :class="['mdc-icon-button__icon','mdc-icon-button__icon--on', iconOn]"></i>
        <i v-if="iconOff"
           :class="['mpi-heart-outline', 'mdc-icon-button__icon', iconOff]"></i>
        <slot v-if="!iconOn && !iconOff"></slot>
    </mdc-icon-button>
</template>
<script lang="ts">
    import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
    import twowayFactory from 'mixins/two-way';

    import MdcIconButton from '../icon-button/icon-button.vue';
    import { MDCIconButtonToggle } from '@material/icon-button';

    /**
     * component <mdc-icon-button-toggle>
     *
     * 组件 <mdc-icon-button-toggle>
     * @export
     * @class MpIconButtonToggle
     * @extends {Mixins(twowayFactory<boolean>())}
     */
    @Component({
        components: {
            MdcIconButton
        }
    })
    export default class MpIconButtonToggle extends Mixins(twowayFactory<boolean>()) {
        /**
         * icon className for status:on
         *
         * 状态为开时的图标类名
         * @type {string}
         * @memberof MpIconButtonToggle
         */
        @Prop({ type: String })
        iconOn?: string;

        /**
         * icon className for status:off
         *
         * 状态为关时的图标类名
         * @type {string}
         * @memberof MpIconButtonToggle
         */
        @Prop({ type: String })
        iconOff?: string;

        /**
         * instance of MDCIconButtonToggle.
         *
         * MDCIconButtonToggle 的实例
         * @type {(MDCIconButtonToggle|null)}
         * @memberof MpIconButtonToggle
         */
        toggleButton!: MDCIconButtonToggle | null;

        /**
         * custom event name of MDCIconButtonToggle's status change.
         *
         * MDCIconButtonToggle 状态变更时的自定义事件名称
         * @memberof MpIconButtonToggle
         */
        toggleEvent = 'MDCIconButtonToggle:change';

        /**
         * root element of component.
         *
         * 组件根元素
         * @readonly
         * @memberof MpIconButtonToggle
         */
        get elementIconButtonToggle() {
            const componentIconButton = this.$refs['icon-button-toggle'] as MdcIconButton;
            return componentIconButton.$el;
        }

        /**
         * events list of component.
         *
         * 组件事件列表
         * @readonly
         * @memberof MpIconButtonToggle
         */
        get events() {
            return {
                'click': () => { this.$emit('click') }
            }
        }

        /**
         * mounted lifecycle.
         * - initialize MDCIconButtonToggle.
         * - initialize status according to two-way binding value.
         *
         * 生命周期：mounted
         * - 初始化 MDCIconButtonToggle
         * - 根据双向绑定的值初始化组件开关状态
         * @private
         * @memberof MpIconButtonToggle
         */
        private mounted() {
            const { elementIconButtonToggle } = this;
            this.toggleButton = new MDCIconButtonToggle(elementIconButtonToggle);

            if (this.currentValue) {
                this.toggleButton.on = true;
            }

        }

        /**
         * handler for MpIconButtonToggle value change event
         *
         * MpIconButtonToggle 值变化时的处理函数
         * @private
         * @param {CustomEvent} e
         * @memberof MpIconButtonToggle
         */
        private handleChange(e: CustomEvent) {
            const { detail } = e;
            this.currentValue = detail.isOn;
            this.$emit('change', this.currentValue);
        }

        /**
         * watch currentValue
         * - change toggle status when two-way binding value change.
         *
         * 监听 currentValue
         * - 当双向绑定的值改变时同步变更组件的开关状态
         * @param {boolean} newVal
         * @memberof MpIconButtonToggle
         */
        @Watch('currentValue')
        watchCurrentValue(newVal: boolean) {
            if (this.toggleButton) this.toggleButton.on = newVal;
        }
    }

</script>

<template>
    <div ref="form-field"
         class="mdc-form-field">
        <div ref="switch"
             class="mdc-switch">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb">
                    <input type="checkbox"
                           :id="id"
                           class="mdc-switch__native-control"
                           role="switch"
                           v-model="currentValue">
                </div>
            </div>
        </div>
        <label :class="['mdc-switch__label', {'mdc-switch__label--disabled': disabled}]"
               :for="id">
            <template v-if="label">{{label}}</template>
            <slot v-else></slot>
        </label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Watch, Prop } from "vue-property-decorator";
    import { MDCSwitch } from '@material/switch';
    import { MDCFormField } from '@material/form-field';
    import twowayFactory from "mixins/two-way";
    import IdMixin from "mixins/id";

    /**
     * component <mdc-switch>
     *
     * <mdc-switch>组件
     * @export
     * @class MdcSwitch
     * @extends {Mixins(twowayFactory<boolean>(), IdMixin)}
     */
    @Component
    export default class MdcSwitch extends Mixins(twowayFactory<boolean>(), IdMixin) {
        /**
         * disabled mark
         * 
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcSwitch
         */
        @Prop({
            type: Boolean,
            default: false
        })
        readonly disabled!: boolean;

        /**
         * content of the label
         * 
         * 标签内容
         * @type {boolean}
         * @memberof MdcSwitch
         */
        @Prop({
            type: String,
        })
        readonly label!: string;

        /**
         * instance of MDCSwitch which initialized when the component mounted.
         *
         * 在组件加载时初始化的 MDCSwitch 实例
         * @private
         * @type {(MDCSwitch | null)}
         * @memberof MdcSwitch
         */
        private switchInstance: MDCSwitch | null = null;

        /**
         * html element of form-filed
         *
         * 'form-filed' HTML元素
         * @readonly
         * @memberof MdcCheckbox
         */
        get eleFormField() {
            return this.$refs['form-field'] as Element;
        }

        /**
         * html element of switch
         * 
         * 'switch' HTML元素
         * @readonly
         * @memberof MdcSwitch
         */
        get eleSwitch() {
            return this.$refs['switch'] as Element;
        }

        /**
         * check the disabled status, sync switchInstance.disabled config with it.
         *
         * 检查禁用状态，同步实例中相关设置
         * @private
         * @memberof MdcSwitch
         */
        private checkDisabled() {
            const { disabled } = this;
            if (this.switchInstance) {
                if (disabled) this.switchInstance.disabled = true;
                else this.switchInstance.disabled = false;
            }
        }

        /**
         * mounted lifecycle.
         * - initialize MDCSwitch instance.
         * - initialize formField with it for label styles.
         *
         * 生命周期：mounted
         * - 初始化 MDCSwitch 实例
         * - 初始化 formField 以调整标签样式
         * 
         * @memberof MdcSwitch
         */
        mounted() {
            setTimeout(() => {
                this.switchInstance = new MDCSwitch(this.eleSwitch);
                const formField = new MDCFormField(this.eleFormField);
                formField.input = this.switchInstance;

                this.checkDisabled();
            }, 17);
        }

        /**
         * watcher for currentValue.
         * - sync switchInstance.checked config with currentValue. (for bind-in value changed outside of the component)
         *
         * 监听 currentValue
         * - 同步 switchInstance.checked 配置项。（用于在组件外部改变绑定值的情况）
         * @param {boolean} newVal
         * @memberof MdcSwitch
         */
        @Watch('currentValue')
        watchCurrentValue(newVal: boolean) {
            if (this.switchInstance) {
                if (newVal) this.switchInstance.checked = true;
                else this.switchInstance.checked = false;
            }
        }

        /**
         * watcher for disabled.
         *
         * 监听 disabled
         * @memberof MdcSwitch
         */
        @Watch('disabled')
        watchDisabled() {
            this.checkDisabled();
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/switch/mdc-switch";

    .mdc-switch {
        margin: 0 4px 0 24px;
    }

    .mdc-switch__label {
        &.mdc-switch__label--disabled {
            opacity: 0.5;
        }
    }
</style>
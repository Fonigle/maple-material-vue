<template>
    <div ref="form-field"
         class="mdc-form-field">
        <div ref="switch"
             class="mdc-switch">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb">
                    <input type="checkbox"
                           id="basic-switch"
                           class="mdc-switch__native-control"
                           role="switch"
                           v-model="currentValue">
                </div>
            </div>
        </div>
        <label for="basic-switch">off/on</label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Watch, Prop } from "vue-property-decorator";
    import { MDCSwitch } from '@material/switch';
    import { MDCFormField } from '@material/form-field';
    import twowayFactory from "mixins/two-way";

    @Component
    export default class MdcSwitch extends Mixins(twowayFactory<boolean>()) {
        @Prop({
            type: Boolean,
            default: false
        })
        disabled!: boolean;

        switchInstance: MDCSwitch | null = null;

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

        get eleSwitch() {
            return this.$refs['switch'] as Element;
        }

        checkDisabled() {
            const { disabled } = this;
            if (this.switchInstance) {
                if (disabled) this.switchInstance.disabled = true;
                else this.switchInstance.disabled = false;
            }
        }

        mounted() {
            this.switchInstance = new MDCSwitch(this.eleSwitch);
            const formField = new MDCFormField(this.eleFormField);
            formField.input = this.switchInstance;

            this.checkDisabled();
        }

        @Watch('currentValue')
        watchCurrentValue(newVal: boolean) {
            if (this.switchInstance) {
                if (newVal) this.switchInstance.checked = true;
                else this.switchInstance.checked = false;
            }
        }

        @Watch('disabled')
        watchDisabled() {
            this.checkDisabled();
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/switch/mdc-switch";
</style>
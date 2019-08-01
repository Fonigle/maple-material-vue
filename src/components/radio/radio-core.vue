<template>
    <div ref="radio"
         class="mdc-radio">
        <input class="mdc-radio__native-control"
               type="radio"
               :id="id"
               :name="name"
               :value="value"
               v-model="currentValue"
               :disabled="disabled">
        <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
    import twowayFactory from "mixins/two-way";
    import { MDCRadio } from "@material/radio";

    /**
     * inner-component <mdc-radio-core>
     *
     * <mdc-radio>组件
     * @export
     * @class MdcRadio
     * @extends {Mixins(twowayFactory())}
     */
    @Component
    export default class MdcRadioCore extends Mixins(twowayFactory()) {
        /**
         * id of the native input control
         *
         * 原生input组件的id
         * @type {boolean}
         * @memberof MdcRadioCore
         */
        @Prop()
        id?: string;

        /**
         * disabled mark
         *
         * 禁用状态标记
         * @type {boolean}
         * @memberof MdcRadioCore
         */
        @Prop({
            type: Boolean,
            default: false
        })
        disabled!: boolean;

        /**
         * name of the native input control
         *
         * 原生input组件的name
         * @type {string}
         * @memberof MdcRadioCore
         */
        @Prop({
            type: String
        })
        name?: string

        /**
         * value of native input control
         *
         * 原生input组件的绑定值
         * @type {*}
         * @memberof MdcRadioCore
         */
        @Prop()
        value?: any

        /**
         * content of the label
         *
         * 标签内容
         * @type {string}
         * @memberof MdcRadioCore
         */
        @Prop({
            type: String
        })
        label?: string

        /**
         * html element of form-filed
         *
         * 'form-filed' HTML元素
         * @readonly
         * @memberof MdcRadioCore
         */
        get checkboxElement() {
            return this.$refs['radio'] as HTMLInputElement;
        }

        /**
         * mounted lifecycle.
         * - initialize MDCRadio.
         * - emit 'radio-core-mounted' event
         *
         * 生命周期: mounted.
         * - 初始化MDCRadio
         * - 发送'radio-core-mounted'事件
         * @memberof MdcRadioCore
         */
        mounted() {
            setTimeout(() => {
                const radio = new MDCRadio(this.checkboxElement);
                this.$emit('radio-core-mounted', radio);
            }, 17);
        }
    }
</script>
<style lang="scss">
    @import "@material/radio/mdc-radio";
</style>
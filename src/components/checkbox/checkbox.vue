<template>
    <div ref="form-field"
         class="mdc-form-field">
        <div ref="checkbox"
             class="mdc-checkbox">
            <input type="checkbox"
                   class="mdc-checkbox__native-control"
                   id="checkbox-1" />
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark"
                     viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path"
                          fill="none"
                          d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
            </div>
        </div>
        <label for="checkbox-1">Checkbox 1</label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { MDCFormField } from '@material/form-field';
    import { MDCCheckbox } from '@material/checkbox';


    @Component
    export default class MdcCheckbox extends Vue {

        get eleFormField() {
            return this.$refs['form-field'] as Element;
        }

        get eleCheckbox() {
            return this.$refs['checkbox'] as Element;
        }

        mounted() {
            const checkbox = new MDCCheckbox(this.eleCheckbox);
            const formField = new MDCFormField(this.eleFormField);
            formField.input = checkbox;
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/checkbox/mdc-checkbox";
</style>
<template>
    <div ref='text-field'
         class="mdc-text-field mdc-text-field--textarea">
        <textarea id="textarea"
                  class="mdc-text-field__input"
                  rows="8"></textarea>
        <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
                <label for="textarea"
                       class="mdc-floating-label">Textarea Label</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { MDCTextField } from '@material/textfield';

    @Component
    export default class MdcTextarea extends Vue {
        get eleTextField() {
            return this.$refs['text-field'] as Element;
        }

        mounted() {
            new MDCTextField(this.eleTextField);
        }
    }
</script>
<style lang="scss" scoped>
    @import "@material/textfield/mdc-text-field";
</style>
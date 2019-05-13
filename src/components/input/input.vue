<template>
    <div ref="text-field"
         class="mdc-text-field ">
        <input type="text"
               id="my-text-field"
               class="mdc-text-field__input">
        <label class="mdc-floating-label"
               for="my-text-field">Hint text</label>
        <div class="mdc-line-ripple"></div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { MDCTextField } from '@material/textfield';

    @Component
    export default class MdcInput extends Vue {

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
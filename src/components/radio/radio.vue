<template>
    <div class="mdc-form-field">
        <div class="mdc-radio">
            <input class="mdc-radio__native-control"
                   type="radio"
                   id="radio-1"
                   name="radios">
            <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
            </div>
        </div>
        <label for="radio-1">Radio 1</label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class MdcRadio extends Vue {
    }
</script>
<style lang="scss" scoped>
    @import "@material/form-field/mdc-form-field";
    @import "@material/radio/mdc-radio";
</style>
<template>
    <div class="app">
        <!-- <mdc-button type="unelevated"
                    icon="mpi-heart"
                    @click="handleButtonClick">确定</mdc-button>
        <mdc-button type="unelevated"
                    @click="handleButtonClick"
                    trailing-icon="mpi-heart"
                    dense>确定</mdc-button> -->
        <!-- <mdc-fab trailing-icon="mpi-heart"
                 mini
                 extended
                 label="Test"></mdc-fab> -->
        <!-- <mdc-icon-button-toggle v-model="test">
            <i class="mdc-icon-button__icon mdc-icon-button__icon--on mpi-heart"></i>
            <i class="mdc-icon-button__icon mpi-heart-outline"></i>
        </mdc-icon-button-toggle>
        <button @click="test=!test">try</button> -->
        <mdc-checkbox v-model="test"
                      value="2"
                      :disabled="disabled">2</mdc-checkbox>
        <mdc-radio v-model="test"
                   value="1"
                   :disabled="disabled">1</mdc-radio>
        <mdc-switch disabled>11111</mdc-switch>
        <button @click="disabled=!disabled"></button>
    </div>
</template>
<script lang="tsx">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        test = false;

        disabled = true;

        handleButtonClick() {
            console.log(1);
        }
    }
</script>
<style lang="scss">
    body {
        background: #fff !important;
    }
</style>

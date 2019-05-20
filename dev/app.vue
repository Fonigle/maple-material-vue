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
        <mdc-input type="outlined"
                   placeholder="测试"
                   :maxlength="15"
                   counter
                   disabled
                   v-model="input"></mdc-input>
        {{input}}
        <mdc-textarea type="outlined"
                      placeholder="测试"
                      :maxlength="140"
                      v-model="textarea"></mdc-textarea>
        {{textarea}}
        <button @click="disabled= !disabled"></button>
    </div>
</template>
<script lang="tsx">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        test = false;

        disabled = true;

        input = '1111';

        textarea = '22222';

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

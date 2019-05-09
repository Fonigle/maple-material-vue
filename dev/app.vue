<template>
    <div class="app">
        <mdc-button type="unelevated"
                    icon="mpi-heart"
                    @click="handleButtonClick">确定</mdc-button>
        <mdc-button type="unelevated"
                    @click="handleButtonClick"
                    trailing-icon="mpi-heart"
                    dense>确定</mdc-button>
        <mdc-icon-button-toggle v-model="test">
            <i class="mdc-icon-button__icon mdc-icon-button__icon--on mpi-heart"></i>
            <i class="mdc-icon-button__icon mpi-heart-outline"></i>
        </mdc-icon-button-toggle>
        <button @click="test=!test">try</button>

    </div>
</template>
<script lang="tsx">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        test = true;

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

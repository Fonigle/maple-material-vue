<template>
    <div class="app">
        <mdc-list type="checkbox">
            <mdc-list-item :value="1"
                           text="111"></mdc-list-item>
            <mdc-list-item :value="2"
                           text="222"></mdc-list-item>
        </mdc-list>
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

        s = [];

        t = [];

        handleButtonClick() {
            console.log(1);
        }
    }
</script>
<style lang="scss">
    body {
        background: #fff !important;
    }

    :root {
        --mdc-theme-primary: #2196f3;
    }
</style>

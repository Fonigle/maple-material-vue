<template>
    <div class="app">
        <section>
            <h4>Icon Button</h4>
            <div>
                <mdc-icon-button>
                    <i class="icon-heart"></i>
                </mdc-icon-button>
            </div>
        </section>
        <section>
            <h4>Button</h4>
            <div>
                <mdc-button @click="consoleEvent"
                            label="1">Test</mdc-button>
            </div>
        </section>
    </div>
</template>
<script lang="tsx">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    @Component
    export default class DevApp extends Vue {
        consoleEvent() {
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

    section {
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(#000, 0.12);

        h4 {
            font-size: 18px;
        }
    }
</style>

<template>
    <div class="app">
        <section>
            <h4>Icon Button Toggle</h4>
            <p>
                <mdc-icon-button-toggle v-model="iconButtonToggleStatus"
                                        icon-on="icon-heart"
                                        icon-off="icon-heart-outline"
                                        v-on="commonEvents"
                                        @change="consoleEvent('icon-button-toggle changed!')"></mdc-icon-button-toggle>
                <button @click="iconButtonToggleStatus = !iconButtonToggleStatus">ouside toggle</button>
                currentValue: {{iconButtonToggleStatus}}
            </p>
        </section>
        <section>
            <h4>Icon Button</h4>
            <p>
                <mdc-icon-button v-on="commonEvents">
                    <i class="icon-heart"></i>
                </mdc-icon-button>
            </p>
        </section>
        <section>
            <h4>Float Action Button</h4>
            <p>
                <mdc-fab icon="icon-heart"
                         v-on="commonEvents">
                </mdc-fab>
                <mdc-fab icon="icon-heart"
                         mini>
                </mdc-fab>
                <mdc-fab icon="icon-heart"
                         extended
                         label="test">
                </mdc-fab>
            </p>
        </section>
        <section>
            <h4>Button</h4>
            <p>
                <mdc-button v-on="commonEvents">Test</mdc-button>
                <mdc-button type="raised">raised</mdc-button>
                <mdc-button type="unelevated">unelevated</mdc-button>
                <mdc-button type="outlined">outlined</mdc-button>
            </p>
            <p>
                <mdc-button type="raised">NORMAL</mdc-button>
                <mdc-button dense
                            type="raised">dense</mdc-button>
            </p>
        </section>
    </div>
</template>
<script lang="tsx">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    @Component
    export default class DevApp extends Vue {

        iconButtonToggleStatus = false;

        consoleEvent(text: string) {
            console.log(text);
        }

        get commonEvents() {
            return {
                'click': () => { console.log('click') },
                'focus': () => { console.log('focus') },
                'blur': () => { console.log('blur') },
            }
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
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(#000, 0.12);

        h4 {
            font-size: 18px;
        }
    }
</style>

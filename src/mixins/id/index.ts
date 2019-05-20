import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class IdMixin extends Vue {
    @Prop({
        type: String,
        default: () => Math.random().toString(36).substr(2)
    })
    id!: string
}
import { Vue, Component, Prop } from 'vue-property-decorator';

/**
 * mixin for add 'id' prop with random string default value;
 *
 * Mixin: id, 添加一个默认值设定为默认字符串的 'id' 属性
 * @export
 * @class IdMixin
 * @extends {Vue}
 */
@Component
export default class IdMixin extends Vue {
    @Prop({
        type: String,
        default: () => Math.random().toString(36).substr(2)
    })
    id!: string;
}
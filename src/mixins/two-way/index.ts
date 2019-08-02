import { Vue, Component, Prop, Model } from 'vue-property-decorator';

/**
 * factory returns TwoWayMixin with appointed value type.
 *
 * 返回指定数据类型的 TwoWayMixin
 * @export
 * @template T
 * @returns
 */
export default function twowayFactory<T = any>() {
    /**
     * mixin for two-way value binding.
     *
     * mixin: 数据双向绑定
     * @class TwoWayMixin
     * @extends {Vue}
     */
    @Component
    class TwoWayMixin extends Vue {
        /**
         * bind-in value.
         *
         * 父级绑入数据
         * @type {T}
         * @memberof TwoWayMixin
         */
        @Model('valueChanged')
        readonly bindValue!: T;

        /**
         * temporary variable for value operation
         *
         * 用于进行操作的临时变量
         * @memberof TwoWayMixin
         */
        get currentValue() {
            return this.bindValue;
        }
        set currentValue(value) {
            this.$emit('valueChanged', value);
        }
    }

    return TwoWayMixin;
}

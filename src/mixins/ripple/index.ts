import { Vue, Component, Prop, Model } from 'vue-property-decorator';

import { MDCRipple } from '@material/ripple';

/**
 * factory returns RippleMixin with appointed config.
 *
 * 返回带有指定配置项的RippleMixin
 *
 * @export
 * @param {string} ref ref of the element for ripple initialization.
 * @param {boolean} [unbounded=false] unbounded mode
 * @returns RippleMixin
 */
export default function rippleFactory(ref: string, unbounded: boolean = false) {

    /**
     * mixin for instantiating MDCRipple to the appointed element.
     *
     * mixin：在指定元素上初始化 MDCRipple
     * @class RippleMixin
     * @extends {Vue}
     */
    @Component
    class RippleMixin extends Vue {

        /**
         * instance of MDCRipple.
         *
         * MDCRipple实例
         *
         * @private
         * @type {((MDCRipple | null))}
         * @memberof RippleMixin
         */
        private rippleInstance: (MDCRipple | null) = null;

        /**
         * html element for MDCRipple initialization.
         *
         * 初始化 MDCRipple 的元素
         *
         * @readonly
         * @private
         * @memberof RippleMixin
         */
        private get rippleElement() {
            return this.$refs[ref] as (Element | undefined);
        }

        /**
         * mounted lifecycle.
         * - try to initialize MDCRipple when the appointed element existed.
         * - if the 'unbounded' param got 'true', pass it to the config of rippleInstance.
         *  and we try to initialize it after a few ms delay to fix a bug of style error when css styles of elements loading after these code execute.
         *  (it may not work well all the times, so if you have better solutions, create a PR for it.)
         *
         * 生命周期：mounted
         * - 指定的元素存在时，尝试初始化 MDCRipple。
         * - 如果'unbounded'参数置为'true'，将向ripple实例传递此参数。
         *  为了避免在代码执行前样式表未加载导致出现样式问题，此时我们将在几毫秒的延迟后初始化 ripple。
         *  （这种方法是不够严谨的，如果你有更好的解决方案，欢迎提交PR。）
         *
         * @private
         * @memberof RippleMixin
         */
        private mounted() {
            if (!unbounded) {
                if (this.rippleElement) {
                    this.rippleInstance = new MDCRipple(this.rippleElement);
                }
            }
            else {
                setTimeout(() => {
                    if (this.rippleElement) {
                        this.rippleInstance = new MDCRipple(this.rippleElement);
                        this.rippleInstance.unbounded = true;
                    }
                }, 17);
            }
        }

        /**
         * beforeDestory lifecycle.
         * - destroy rippleInstance when components are about to destory.
         * - for memory recycling.
         *
         * 生命周期：beforeDestory
         * - 组件销毁前销毁 rippleInstance
         * - 用于回收内存
         *
         * @private
         * @memberof RippleMixin
         */
        private beforeDestory() {
            if (!!this.rippleInstance) {
                try {
                    this.rippleInstance.destroy();
                }
                catch{ }
            }
        }


    }

    return RippleMixin;
}

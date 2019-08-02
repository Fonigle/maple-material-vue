import { PropOptions as BasePropOptions, PropType } from 'vue';
import { VueDecorator } from 'vue-class-component';
import { Constructor } from 'vue-property-decorator';

// Overwrite the definition of 'Prop' to allow 'type: null'.
//
// This is required for a complex type with reflect-metadata.
// For example
//
//   @Prop()
//   readonly foo: string | null;
//
// with relfect-metadata produce
//
//   foo: {
//     type: String
//   }
//
// and [Vue warn]: Invalid prop: type check failedc for "foo". Expected String, got Null
// will be shown when 'null' is passed to the 'foo'.
//
// With this hack, simpli use 'type: null' to prevent that warning like
//
//   @Prop({ type: null })
//   readonly foo: string | null;
//
// Or better to
//
//   @Prop({
//     type: null,
//     validator(v) {
//       return v == null || typeof v === 'string';
//     },
//   })
//   readonly foo: string | null;
//
// Ref https://github.com/kaorun343/vue-property-decorator/issues/213
declare module 'vue-property-decorator' {
  type PropOptions<T = any> = Omit<BasePropOptions<T>, 'type'> & {
    type?: PropType<T> | null;
  };
  export function Prop(
    options?: PropOptions | Constructor[] | Constructor,
  ): VueDecorator;
}

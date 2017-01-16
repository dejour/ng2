import {makeDecorator, makePropDecorator} from '../../src/util/decorators';
import {reflector } from '../../src/reflection/reflection'

class DecoratedParent {}
class DecoratedChild extends DecoratedParent {}

const TerminalDecorator = makeDecorator('TerminalDecorator', {terminal: true});
  const TestDecorator = makeDecorator(
      'TestDecorator', {marker: undefined}, Object, (fn: any) => fn.Terminal = TerminalDecorator);


describe('Property decorators', () => {
    // https://github.com/angular/angular/issues/12224
    it('should work on the "watch" property', () => {
      const Prop = makePropDecorator('Prop', [['value', undefined]]);

      class TestClass {
        @Prop('firefox!')
        watch: any;
      }

      const p = reflector.propMetadata(TestClass);
      expect(p['watch']).toEqual([new Prop('firefox!')]);
    });

    it('should work with any default plain values', () => {
      const Default = makePropDecorator('Default', [['value', 5]]);
      expect(new Default(0)['value']).toEqual(0);
    });

    it('should work with any object values', () => {
      // make sure we don't walk up the prototype chain
      const Default = makePropDecorator('Default', [{value: 5}]);
      const value = Object.create({value: 10});
      expect(new Default(value)['value']).toEqual(5);
    });
    
  });
 
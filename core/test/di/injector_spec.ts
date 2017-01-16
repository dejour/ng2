import {Injector} from '../../src/di/injector';

describe('Injector.NULL', () => {
    it('should throw if no arg is given', () => {
      expect(() => Injector.NULL.get('someToken')).toThrowError('No provider for someToken!');
    });

    it('should throw if THROW_IF_NOT_FOUND is given', () => {
      expect(() => Injector.NULL.get('someToken', Injector.THROW_IF_NOT_FOUND))
          .toThrowError('No provider for someToken!');
    });

    it('should return the default value',
       () => { expect(Injector.NULL.get('someToken', 'notFound')).toEqual('notFound'); });
});

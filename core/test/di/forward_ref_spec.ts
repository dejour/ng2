import {Type} from '../../type';
import {forwardRef, resolveForwardRef} from '../../src/di/forward_ref';
describe('forwardRef', function() {
    it('should wrap and unwrap the reference', () => {
        const ref = forwardRef(() => String);
        expect(ref instanceof Type).toBe(true);
        expect(resolveForwardRef(ref)).toBe(String);
    });
});

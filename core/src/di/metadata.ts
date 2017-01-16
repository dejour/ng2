import {makeDecorator, makeParamDecorator} from '../util/decorators';
/**
 * Type of the Inject metadata.
 *
 * @stable
 */

export const Inject = makeParamDecorator('Inject', [['token', undefined]]);

export const Optional = makeParamDecorator('Optional', []);

export const Injectable = makeDecorator('Injectable', []);

export const Self = makeParamDecorator('Self', []);

export const SkipSelf = makeParamDecorator('SkipSelf', []);

export const Host = makeParamDecorator('Host', []);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ReflectiveInjectorDynamicStrategy, ReflectiveInjectorInlineStrategy, ReflectiveInjector_, ReflectiveProtoInjector, ReflectiveInjector} from '../../src/di/reflective_injector';
import {ResolvedReflectiveProvider_} from '../../src/di/reflective_provider';
import {expect} from '../../../platform-browser/testing/matchers';

import {forwardRef} from '../../src/di/forward_ref';
import {Injector} from '../../src/di/injector';
import {ReflectiveKey} from '../../src/di/reflective_key';
import {Provider} from '../../src/di/provider';
import {Inject, Injectable, Optional, Self} from '../../src/di/metadata';
import {isPresent, stringify} from '../../../facade/lang';

class Engine {}

class BrokenEngine {
  constructor() { throw new Error('Broken Engine'); }
}

class DashboardSoftware {}

@Injectable()
class Dashboard {
  constructor(software: DashboardSoftware) {}
}

class TurboEngine extends Engine {}

@Injectable()
class Car {
  engine: Engine;
  constructor(engine: Engine) { this.engine = engine; }
}

@Injectable()
class CarWithOptionalEngine {
  engine: any /** TODO #9100 */;
  constructor(@Optional() engine: Engine) { this.engine = engine; }
}

@Injectable()
class CarWithDashboard {
  engine: Engine;
  dashboard: Dashboard;
  constructor(engine: Engine, dashboard: Dashboard) {
    this.engine = engine;
    this.dashboard = dashboard;
  }
}

@Injectable()
class SportsCar extends Car {
  engine: Engine;
  constructor(engine: Engine) { super(engine); }
}

@Injectable()
class CarWithInject {
  engine: Engine;
  constructor(@Inject(TurboEngine) engine: Engine) { this.engine = engine; }
}

@Injectable()
class CyclicEngine {
  constructor(car: Car) {}
}

class NoAnnotations {
  constructor(secretDependency: any) {}
}

function factoryFn(a: any) {}

  const dynamicProviders = [
    {provide: 'provider0', useValue: 1}, {provide: 'provider1', useValue: 1},
    {provide: 'provider2', useValue: 1}, {provide: 'provider3', useValue: 1},
    {provide: 'provider4', useValue: 1}, {provide: 'provider5', useValue: 1},
    {provide: 'provider6', useValue: 1}, {provide: 'provider7', useValue: 1},
    {provide: 'provider8', useValue: 1}, {provide: 'provider9', useValue: 1},
    {provide: 'provider10', useValue: 1}
  ];

  [{strategy: 'inline', providers: [], strategyClass: ReflectiveInjectorInlineStrategy}, {
    strategy: 'dynamic',
    providers: dynamicProviders,
    strategyClass: ReflectiveInjectorDynamicStrategy
  }].forEach((context) => {
    function createInjector(
        providers: Provider[], parent: ReflectiveInjector = null): ReflectiveInjector_ {
      const resolvedProviders = ReflectiveInjector.resolve(providers.concat(context['providers']));
      if (isPresent(parent)) {
        return <ReflectiveInjector_>parent.createChildFromResolved(resolvedProviders);
      } else {
        return <ReflectiveInjector_>ReflectiveInjector.fromResolvedProviders(resolvedProviders);
      }
    }

    describe(`injector ${context['strategy']}`, () => {
      it('should use the right strategy', () => {
        const injector = createInjector([]);
        expect(injector.internalStrategy).toBeAnInstanceOf(context['strategyClass']);
      });

      

    });

  });

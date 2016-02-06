'use strict';

import objActions from '../obj-actions';

describe('obj-actions', function () {
  beforeEach(function () {
    this.dispatchCount = 0;
    this.dispatch = action => {
      ++this.dispatchCount;
      return action;
    }
  })

  it('Does not overwrite type', function () {
    const actions = objActions(this.dispatch, {
      one: a => ({ type: 'foo', a })
    });

    expect(actions.one('z')).toEqual({ type: 'foo', a: 'z' });
  });

  it('Adds the type property to all method return values', function () {
    const actions = objActions(this.dispatch, {
      nil: () => {},
      one: a => ({ a }),
      two: b => ({ b }),
      foo: {
        bar: c => ({c})
      }
    })

    expect(actions.nil()).toEqual({ type: 'nil' });
    expect(this.dispatchCount).toEqual(1);
    expect(actions.one('hi')).toEqual({ type: 'one', a: 'hi' });
    expect(this.dispatchCount).toEqual(2);
    expect(actions.two('bye')).toEqual({ type: 'two', b: 'bye' });
    expect(this.dispatchCount).toEqual(3);
    expect(actions.foo.bar('baz')).toEqual({
      type: 'foo_bar',
      c: 'baz'
    });
    expect(this.dispatchCount).toEqual(4);
  });
});

import test from 'ava';
import timeSpan from 'time-span';
import inRange from 'in-range';
import functionTimeout from './index.js';

test('timeout', t => {
	const fixtureFunction = () => {
		// eslint-disable-next-line no-constant-condition, no-empty
		while (true) {}
	};

	const fixtureFunctionWithTimeout = functionTimeout(fixtureFunction, {timeout: 100});

	const end = timeSpan();

	t.throws(() => {
		fixtureFunctionWithTimeout();
	}, {
		code: 'ERR_SCRIPT_EXECUTION_TIMEOUT',
	});

	t.true(inRange(end(), {start: 80, end: 120}));
});

test('no timeout', t => {
	const fixtureFunction = (a, b) => [a, b];
	t.deepEqual(functionTimeout(fixtureFunction)(1, 2), [1, 2]);
});

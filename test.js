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

test('multiple', t => {
	const run = functionTimeout((a, b) => [a, b], {timeout: 100});
	t.deepEqual(run(1, 2), [1, 2]);
	t.deepEqual(run(1, 3), [1, 3]);
	t.deepEqual(run(1, 4), [1, 4]);
	t.deepEqual(run(1, 5), [1, 5]);
});

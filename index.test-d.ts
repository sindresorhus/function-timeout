import {expectType} from 'tsd';
import functionTimeout from './index.js';

const function1_ = functionTimeout((number: number) => number * 2, {timeout: 100});
expectType<number>(function1_(2));

const function2_ = functionTimeout((number: number) => number * 2);
expectType<number>(function2_(2));

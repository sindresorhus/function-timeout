import {expectType} from 'tsd';
import functionTimeout from './index.js';

const fn = functionTimeout((number: number) => number * 2, {timeout: 100});

expectType<number>(fn(2));

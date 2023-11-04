import {expectType} from 'tsd';
import functionTimeout from './index.js';

const function_ = functionTimeout((number: number) => number * 2, {timeout: 100});

expectType<number>(function_(2));

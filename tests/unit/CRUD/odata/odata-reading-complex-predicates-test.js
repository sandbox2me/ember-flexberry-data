import executeTest from './execute-odata-test';
import readingComplexPredicates from '../base/base-reading-complex-predicates-test';

executeTest('reading | predicates | complex predicates', (store, assert) => {
  readingComplexPredicates(store, assert);
});

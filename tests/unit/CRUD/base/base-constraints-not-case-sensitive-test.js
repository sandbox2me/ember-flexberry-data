import Ember from 'ember';
import QueryBuilder from 'ember-flexberry-data/query/builder';
import { ComplexPredicate, StringPredicate } from 'ember-flexberry-data/query/predicate';
import Condition from 'ember-flexberry-data/query/condition';

function initTestData(store) {
  return Ember.RSVP.Promise.all([
    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Vasya',
      eMail: 'OlyA@mail.ru',
    }).save(),

    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Oleg',
      eMail: 'TOlYA@mail.ru',
    }).save(),

    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Kolya',
      eMail: 'TOLYA',
    }).save(),

    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Andrey',
      eMail: '4tolya@mail.ru',
    }).save(),

    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Dima',
      eMail: '5@mail.ru',
    }).save(),

    store.createRecord('ember-flexberry-dummy-application-user', {
      name: 'Tolya',
      eMail: '6@mail.ru',
    }).save()
  ]);
}

export default function baseCaseSensitiveConstraintsTest(store, assert) {
  let done = assert.async();

  Ember.run(() => {
    initTestData(store)

      .then(() => {
        let searchString = `tOlYa`;
        let sp1 = new StringPredicate('name').contains(searchString);
        let sp2 = new StringPredicate('eMail').contains(searchString);
        let cp1 = new ComplexPredicate(Condition.Or, sp1, sp2);

        let builder = new QueryBuilder(store, 'ember-flexberry-dummy-application-user').where(cp1);
        return store.query('ember-flexberry-dummy-application-user', builder.build())
          .then((data) => {
            assert.equal(data.get('length'), 4);
            assert.ok(data.any(item => item.get('name') === 'Tolya'));
            assert.ok(data.any(item => item.get('name') === 'Kolya'));
            assert.ok(data.any(item => item.get('name') === 'Oleg'));
            assert.ok(data.any(item => item.get('name') === 'Andrey'));
          });
      })
      .then(() => {
        let searchString = `tolya`;
        let sp1 = new StringPredicate('name').contains(searchString);
        let sp2 = new StringPredicate('eMail').contains(searchString);
        let cp1 = new ComplexPredicate(Condition.Or, sp1, sp2);

        let builder = new QueryBuilder(store, 'ember-flexberry-dummy-application-user').where(cp1);
        return store.query('ember-flexberry-dummy-application-user', builder.build())
          .then((data) => {
            assert.equal(data.get('length'), 4);
            assert.ok(data.any(item => item.get('name') === 'Tolya'));
            assert.ok(data.any(item => item.get('name') === 'Kolya'));
            assert.ok(data.any(item => item.get('name') === 'Oleg'));
            assert.ok(data.any(item => item.get('name') === 'Andrey'));
          });
      })
      .then(() => {
        let searchString = `TOLYA`;
        let sp1 = new StringPredicate('name').contains(searchString);
        let sp2 = new StringPredicate('eMail').contains(searchString);
        let cp1 = new ComplexPredicate(Condition.Or, sp1, sp2);

        let builder = new QueryBuilder(store, 'ember-flexberry-dummy-application-user').where(cp1);
        return store.query('ember-flexberry-dummy-application-user', builder.build())
          .then((data) => {
            assert.equal(data.get('length'), 4);
            assert.ok(data.any(item => item.get('name') === 'Tolya'));
            assert.ok(data.any(item => item.get('name') === 'Kolya'));
            assert.ok(data.any(item => item.get('name') === 'Oleg'));
            assert.ok(data.any(item => item.get('name') === 'Andrey'));
          });
      })
      .catch(e => console.log(e, e.message))
      .finally(done);
  });
}

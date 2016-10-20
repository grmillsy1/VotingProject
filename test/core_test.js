import { expect } from 'chai';
import {List, Map} from 'immutable';

import { setEntries, next } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ["water", "coffee"];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of("water", "coffee")
      }));
    });
  });

  describe('next', () => {
    const state = Map({
      entries: List.of("water", "coffee", "rain")
    });

    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of("water", "coffee")
      }),
      entries: List.of("rain")
    }));
  });
});

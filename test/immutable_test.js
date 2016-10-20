import { expect } from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  describe('A number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('A list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    };

    it('is immutable', () => {
      let state = List.of('Pret', 'costa', 'water')
      let nextState = addMovie(state, 'sunshine')

      expect(nextState).to.equal(List.of(
        'Pret', 'costa', 'water', 'sunshine'
      ));
      expect(state).to.equal(List.of(
        'Pret', 'costa', 'water'
      ));
    });
  });
});

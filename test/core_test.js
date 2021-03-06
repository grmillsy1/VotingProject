import { expect } from 'chai';
import {List, Map} from 'immutable';

import { setEntries, next, vote } from '../src/core';

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

  describe('vote', () => {

    it('creates a tally for voted pairs', () => {
      const state = Map({
      vote: Map({
        pair: List.of('water', 'coffee'),
        tally: Map({
          'water': 1
        })
      }),
      entries: List()
    });
  });

  it('adds to existing tally for that entry', () => {
    const state = Map({
      vote: Map({
        pair: List.of('water', 'coffee'),
        tally: Map({
          'water': 4,
          'coffee': 1
        }),
      }),
      entries: List()
    });
    const nextState = vote(state, 'coffee');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('water', 'coffee'),
          tally: Map({
            'water': 4,
            'coffee': 2
          })
        }),
        entries: List()
      }));
    });
  });

  it('puts winner of vote back into entries', () => {
    const state = Map({
      vote: Map({
        pair: List.of('water', 'coffee'),
        tally: Map({
          'water': 4,
          'coffee': 2
        })
      }),
      entries: List.of('orange', 'tea', 'coke')
    })
    const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('orange', 'tea'),
        }),
        entries: List.of('coke', 'water')
      }));
  });


  it('puts both from tied vote back to entries', () => {
    const state = Map({
      vote: Map({
        pair: List.of('water', 'coffee'),
        tally: Map({
          'water': 3,
          'coffee': 3
        })
      }),
      entries: List.of('orange juice', 'coke', 'tea')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('orange juice', 'coke')
      }),
      entries: List.of('tea', 'water', 'coffee')
    }));
  });

    it('automatically sets winner when no more entries left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('coffee', 'water'),
          tally: Map({
            'coffee': 4,
            'water': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: "coffee"
      }));
    });
  });

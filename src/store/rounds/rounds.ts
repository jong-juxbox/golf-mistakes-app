import actions from './actions';
import state from './state';
import mutations from './mutations';

const rounds = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default rounds;

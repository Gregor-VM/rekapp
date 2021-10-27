import {createStore} from 'redux';
import rootReducers from './reducers';

export type RootState = ReturnType<typeof rootReducers>;

export default createStore(rootReducers);
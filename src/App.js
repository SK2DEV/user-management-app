import logo from './logo.svg';
import './App.css';
import Login from './component/login';
import { Provider } from 'react-redux';
import store from './store/store';
import User from './module/user/user';
import AppRoutes from './AppRoutes';

function App() {
  return (
  
 <Provider store={store}>
 <AppRoutes />
 </Provider>
  );
}

export default App;

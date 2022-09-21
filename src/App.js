import './App.css';
import './app/core/stylesheets/App.scss';
import './app/core/stylesheets/dataTable.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './app/core/utils/loading';
import Layout from './app/core/utils/layout';
import SignInView from './app/features/auth/views/signinView';
import EquipmentsIndexView from './app/features/equipments/views/indexView';
import EquipmentsShowView from './app/features/equipments/views/showView';
import EquipmentsNewView from './app/features/equipments/views/newView';
import AdminsIndexView from './app/features/admins/views/indexView';

function App() {
  return (
    <Router>
      <div className="App">
        <Loading />
        <Routes>
          <Route path="/sign_in" element={<SignInView />} />

          <Route path="/" element={<Layout />} >
            <Route path="equipments">
              <Route path="" element={<EquipmentsIndexView />} />
              <Route path="new" element={<EquipmentsNewView />} />
              <Route path=":serialNo" element={<EquipmentsShowView />} />
            </Route>
            
            <Route path="admins">
              <Route path="" element={<AdminsIndexView />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

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
import { useEffect } from 'react';
import DashboardIndexView from './app/features/dashboard/views/indexView';
import EquipmentsEditView from './app/features/equipments/views/editView';

function App() {
  useEffect(() => {
    document.title = 'DMMI System';
  });

  return (
    <Router>
      <div className="App">
        <Loading />
        <Routes>
          <Route path="/sign_in" element={<SignInView />} />

          <Route path="/" element={<Layout />} >
            <Route path="">
              <Route path="" element={<DashboardIndexView />} />
            </Route>

            <Route path="equipments">
              <Route path="" element={<EquipmentsIndexView />} />
              <Route path="new" element={<EquipmentsNewView />} />
              <Route path=":id" element={<EquipmentsShowView />} />
              <Route path=":id/edit" element={<EquipmentsEditView />} />
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

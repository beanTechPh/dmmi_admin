import './App.css';
import './app/core/stylesheets/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './app/core/utils/loading';
import SignInView from './app/features/auth/views/signinView';

function App() {
  return (
    <Router>
      <div className="App">
        <Loading />
        <Routes>
          <Route path="/sign_in" element={<SignInView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

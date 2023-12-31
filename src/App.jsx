import MusicSearch from './Components/MusicSearch'
import TrackQueue from './Components/TrackQueue'
import ErrorMessage from './Components/ErrorMessage'
import LoginForm from './Components/LoginForm';
import AdminPanel from './Components/AdminPanel'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MusicSearch />} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/enqueueError" element={<ErrorMessage />} />
          <Route path="/trackQueue" element={<TrackQueue />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

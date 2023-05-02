import ContactList from './layout/ContactList/ContactList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ContactList />
      <ToastContainer />
    </>
  );
}

export default App;

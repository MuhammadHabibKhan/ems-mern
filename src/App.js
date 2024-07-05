import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login"
import Dashboard from './Components/Dashboard';
import TodoList from './Components/TodoList';
import AttendanceForm from './Components/AttendanceForm';
import NewProfile from './Components/NewProfile';
import NewAdmin from './Components/NewAdmin';
import NewWorker from './Components/NewWorker';
import NewOrder from './Components/NewOrder';
import NewClient from './Components/NewClient';
import EditProfile from './Components/EditProfile';
import EditAdmin from './Components/EditAdmin';
import EditWorker from './Components/EditWorker';
import EditClient from './Components/EditClient';
import EmpData from './Components/EmpData';
import EditOrder from './Components/EditOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/Dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/ToDo' element={<TodoList/>}></Route>
        <Route exact path='/Attendance' element={<AttendanceForm/>}></Route>
        <Route exact path='/NewProfile' element={<NewProfile/>}></Route>
        <Route exact path='/NewAdmin' element={<NewAdmin/>}></Route>
        <Route exact path='/NewWorker' element={<NewWorker/>}></Route>
        <Route exact path='/NewOrder' element={<NewOrder/>}></Route>
        <Route exact path='/NewClient' element={<NewClient/>}></Route>
        <Route exact path='/EditProfile' element={<EditProfile/>}></Route>
        <Route exact path='/EditAdmin' element={<EditAdmin/>}></Route>
        <Route exact path='/EditWorker' element={<EditWorker/>}></Route>
        <Route exact path='/EditClient' element={<EditClient/>}></Route>
        <Route exact path='/EmpData' element={<EmpData/>}></Route>
        <Route exact path='/EditOrder' element={<EditOrder/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

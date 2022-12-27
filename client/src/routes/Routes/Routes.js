import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../../components/AddTask/AddTask';
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';
import Home from '../../components/Home/Home/Home';
import MyTasks from '../../components/MyTasks/MyTasks';
import NotCompletedTasks from '../../components/NotCompletedTasks/NotCompletedTasks';
import Register from '../../components/Register/Register';
import SignIn from '../../components/SignIn/SignIn';
import Main from '../../Layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/addtask',
        element: <AddTask></AddTask>,
      },
      {
        path: '/mytask',
        element: <MyTasks></MyTasks>,
      },
      {
        path: '/completedtask',
        element: <CompletedTasks></CompletedTasks>,
      },
      {
        path: '/notcompletedtask',
        element: <NotCompletedTasks></NotCompletedTasks>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>,
      },
    ],
  },
]);

export default router;

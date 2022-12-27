import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../../components/AddTask/AddTask';
import Main from '../../Layout/Main';
import Home from '../../components/Home/Home/Home';
import NotCompletedTasks from '../../components/NotCompletedTasks/NotCompletedTasks';
import MyTasks from '../../components/MyTasks/MyTasks';
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';

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
        path: 'notcompletedtask',
        element: <NotCompletedTasks></NotCompletedTasks>,
      },
    ],
  },
]);

export default router;

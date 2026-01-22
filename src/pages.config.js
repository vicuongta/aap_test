import Chat from './pages/Chat';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import DemoFeedback from './pages/DemoFeedback';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import ErrorExtraction from './pages/ErrorExtraction';
import ErrorUnsupportedFile from './pages/ErrorUnsupportedFile';
import Help from './pages/Help';
import Home from './pages/Home';
import Landing from './pages/Landing';
import ManageAccount from './pages/ManageAccount';
import Privacy from './pages/Privacy';
import Settings from './pages/Settings';
import TaskExtraction from './pages/TaskExtraction';
import TaskList from './pages/TaskList';
import Terms from './pages/Terms';
import ToastDemo from './pages/ToastDemo';
import UploadSyllabus from './pages/UploadSyllabus';
import WeeklyPlanner from './pages/WeeklyPlanner';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Chat": Chat,
    "Courses": Courses,
    "Dashboard": Dashboard,
    "DemoFeedback": DemoFeedback,
    "Error404": Error404,
    "Error500": Error500,
    "ErrorExtraction": ErrorExtraction,
    "ErrorUnsupportedFile": ErrorUnsupportedFile,
    "Help": Help,
    "Home": Home,
    "Landing": Landing,
    "ManageAccount": ManageAccount,
    "Privacy": Privacy,
    "Settings": Settings,
    "TaskExtraction": TaskExtraction,
    "TaskList": TaskList,
    "Terms": Terms,
    "ToastDemo": ToastDemo,
    "UploadSyllabus": UploadSyllabus,
    "WeeklyPlanner": WeeklyPlanner,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};
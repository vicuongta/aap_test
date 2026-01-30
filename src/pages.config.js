import AboutUs from './pages/AboutUs';
import Chat from './pages/Chat';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import DemoFeedback from './pages/DemoFeedback';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import ErrorExtraction from './pages/ErrorExtraction';
import ErrorUnsupportedFile from './pages/ErrorUnsupportedFile';
import Features from './pages/Features';
import Help from './pages/Help';
import Home from './pages/Home';
import Landing from './pages/Landing';
import ManageAccount from './pages/ManageAccount';
import Privacy from './pages/Privacy';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TaskExtraction from './pages/TaskExtraction';
import TaskList from './pages/TaskList';
import Terms from './pages/Terms';
import ToastDemo from './pages/ToastDemo';
import UploadSyllabus from './pages/UploadSyllabus';
import WeeklyPlanner from './pages/WeeklyPlanner';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AboutUs": AboutUs,
    "Chat": Chat,
    "Courses": Courses,
    "Dashboard": Dashboard,
    "DemoFeedback": DemoFeedback,
    "Error404": Error404,
    "Error500": Error500,
    "ErrorExtraction": ErrorExtraction,
    "ErrorUnsupportedFile": ErrorUnsupportedFile,
    "Features": Features,
    "Help": Help,
    "Home": Home,
    "Landing": Landing,
    "ManageAccount": ManageAccount,
    "Privacy": Privacy,
    "ResetPassword": ResetPassword,
    "Settings": Settings,
    "SignIn": SignIn,
    "SignUp": SignUp,
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
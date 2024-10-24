import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import Layout from "@/containers/Layout";
import Dashboard from "@/containers/Dashboard";
import Courses from "@/containers/Courses";
import BankOffers from "@/containers/BankOffers";
// import Feed from "@/containers/Feed";
import CourseChapter from "@/containers/CourseChapter";

import UnAuthenticatedRoute from "@/components/UnAuthenticatedRoute";
import Login from "@/containers/Login";
import Signup from "@/containers/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<AuthenticatedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/bank-offers" element={<BankOffers />} />
          {/* <Route path="/feed" element={<Feed />} /> */}
        </Route>
        <Route
          path="/course/:courseid/chapter/:chapterid"
          element={<CourseChapter />}
        ></Route>
      </Route>
      <Route path="" element={<UnAuthenticatedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

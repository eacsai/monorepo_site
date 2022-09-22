import { Navigate } from "react-router-dom";
import Home from "pages/home";
import Pages from "pages/pages";
import PageAll from "pages/pages/c-cpns/page-all";
import Detail from "pages/pages/c-cpns/detail";
import Works from "pages/works";
import Contact from "pages/contact";
import Login from "pages/login";
const routes = [
  {
    path: "/",
    render: () => <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/pages",
    element: Pages,
    routes: [
      {
        path: "/pages",
        exact: true,
        render: () => (
          <Navigate to="/pages/pageAll"/>
        )
      },
      {
        path: "/pages/pageAll/",
        element: PageAll,
      },
      {
        path: "/pages/detail/",
        element: Detail,
      },
    ],
  },
  {
    path: "/detail",
    element: Detail,
  },
  {
    path: "/works",
    element: Works,
  },
  {
    path: "/contact",
    element: Contact,
  },
  {
    path: "/login/:switch",
    element: Login,
  }
];

export default routes;

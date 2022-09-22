//第三方
import React, { memo, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
//工具类
import store from "./store";
//组件
import AppHeader from "./components/App-header";
import Home from "pages/home";
import Pages from "pages/pages";
import PageAll from "pages/pages/c-cpns/page-all";
import Detail from "pages/pages/c-cpns/detail";
import Works from "pages/works";
import Contact from "pages/contact";
import Login from "pages/login";

export default memo(function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <Suspense fallback={<div>page loading</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pages" element={<Pages />}>
            <Route path="" element={ <Navigate to="/pages/pageAll"/>} />
            <Route path="pageAll" element={<PageAll />} />
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="/detail" element={<Detail />} />
          <Route path="/works" element={<Works />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login/:switch" element={<Login />} />
        </Routes>
      </Suspense>
    </Provider>
  );
});

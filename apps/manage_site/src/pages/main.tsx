import React, { memo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import AddArticle from "./addArticle";
import ArticleList from "./articleList";
import EditComment from "./editComment";
import EditUser from "./editUser";
import AddPic from "./addPic";
import EditType from "./editType"
export default memo(function Main() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Admin />}>
            {/* <Route index element={<AddArticle />} /> */}
            <Route path="index" element={<AddArticle />} />
            <Route path="add" element={<AddArticle />}>
              <Route path=":id" element={<AddArticle />} />
            </Route>
            <Route path="list" element={<ArticleList />} />
            <Route path="editComment" element={<EditComment />} />
            <Route path="editUser" element={<EditUser />} />
            <Route path="addPic" element={<AddPic />} />
            <Route path="addType" element={<EditType />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
});

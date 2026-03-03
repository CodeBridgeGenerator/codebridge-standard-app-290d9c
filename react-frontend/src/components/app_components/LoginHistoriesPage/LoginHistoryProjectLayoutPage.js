import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import LoginHistoriesPage from "./LoginHistoriesPage";

const LoginHistoryProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <LoginHistoriesPage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(LoginHistoryProjectLayoutPage);
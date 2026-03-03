import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import SuperiorsPage from "./SuperiorsPage";

const SuperiorProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <SuperiorsPage />
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

export default connect(mapState, mapDispatch)(SuperiorProjectLayoutPage);
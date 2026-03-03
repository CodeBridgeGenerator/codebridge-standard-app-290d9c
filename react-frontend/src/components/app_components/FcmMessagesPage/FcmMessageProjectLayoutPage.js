import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import FcmMessagesPage from "./FcmMessagesPage";

const FcmMessageProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <FcmMessagesPage />
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

export default connect(mapState, mapDispatch)(FcmMessageProjectLayoutPage);
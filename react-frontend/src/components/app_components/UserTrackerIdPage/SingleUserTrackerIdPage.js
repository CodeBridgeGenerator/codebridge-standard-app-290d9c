import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleUserTrackerIdPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [userId, setUserId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userTrackerId")
            .get(urlParams.singleUserTrackerIdId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"userId"] }})
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId)
            ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.userId
                ? [{ _id: res.userId._id, name: res.userId.name }]
                : [];
        setUserId(userId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserTrackerId", type: "error", message: error.message || "Failed get userTrackerId" });
            });
    }, [props,urlParams.singleUserTrackerIdId]);


    const goBack = () => {
        navigate("/app/userTrackerId");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">User Tracker</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>userTrackerId/{urlParams.singleUserTrackerIdId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Page Name</label><p className="m-0 ml-3" >{_entity?.pageName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TrackerCode</label><p className="m-0 ml-3" >{_entity?.trackerCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">User Agent</label><p className="m-0 ml-3" >{_entity?.userAgent}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Language</label><p className="m-0 ml-3" >{_entity?.language}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Time Zone</label><p className="m-0 ml-3" >{_entity?.timeZone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Cookeis Enabled</label><p className="m-0 ml-3" >{_entity?.cookeisEnabled}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Do Not Track</label><p className="m-0 ml-3" >{_entity?.doNotTrack}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Hard Concurrency</label><p className="m-0 ml-3" >{_entity?.hardConcurrency}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Market Code</label><p className="m-0 ml-3" >{_entity?.marketCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is logged In</label><p className="m-0" ><i id="isLoggedIn" className={`pi ${_entity?.isLoggedIn?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">User Id</label>
                    {userId.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleUserTrackerIdId}
        user={props.user}
        alert={props.alert}
        serviceName="userTrackerId"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
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

export default connect(mapState, mapDispatch)(SingleUserTrackerIdPage);

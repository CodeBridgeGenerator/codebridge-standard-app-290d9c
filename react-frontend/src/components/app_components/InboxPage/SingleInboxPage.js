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


const SingleInboxPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [from, setFrom] = useState([]);
const [toUser, setToUser] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("inbox")
            .get(urlParams.singleInboxId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"from","toUser"] }})
            .then((res) => {
                set_entity(res || {});
                const from = Array.isArray(res.from)
            ? res.from.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.from
                ? [{ _id: res.from._id, name: res.from.name }]
                : [];
        setFrom(from);
const toUser = Array.isArray(res.toUser)
            ? res.toUser.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.toUser
                ? [{ _id: res.toUser._id, name: res.toUser.name }]
                : [];
        setToUser(toUser);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Inbox", type: "error", message: error.message || "Failed get inbox" });
            });
    }, [props,urlParams.singleInboxId]);


    const goBack = () => {
        navigate("/app/inbox");
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
                    <h3 className="m-0">Inbox</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>inbox/{urlParams.singleInboxId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Subject</label><p className="m-0 ml-3" >{_entity?.subject}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Content</label><p className="m-0 ml-3"  dangerouslySetInnerHTML={{__html: _entity?.content}}></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Service</label><p className="m-0 ml-3" >{_entity?.service}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Read</label><p className="m-0" ><i id="read" className={`pi ${_entity?.read?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Flagged</label><p className="m-0" ><i id="flagged" className={`pi ${_entity?.flagged?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Sent</label><p className="m-0" ><i id="sent" className={`pi ${_entity?.sent?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">From</label>
                    {from.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">To User</label>
                    {toUser.map((elem) => (
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
        recordId={urlParams.singleInboxId}
        user={props.user}
        alert={props.alert}
        serviceName="inbox"
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

export default connect(mapState, mapDispatch)(SingleInboxPage);

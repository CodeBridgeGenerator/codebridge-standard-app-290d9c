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

import UploadFilesToS3 from "../../../services/UploadFilesToS3";
import { InputNumber } from 'primereact/inputnumber';

const SingleChataiPromptsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [chatAiEnabler, setChatAiEnabler] = useState([]);
const [chatAiConfig, setChatAiConfig] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("chataiPrompts")
            .get(urlParams.singleChataiPromptsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"chatAiEnabler","chatAiConfig"] }})
            .then((res) => {
                set_entity(res || {});
                const chatAiEnabler = Array.isArray(res.chatAiEnabler)
            ? res.chatAiEnabler.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.chatAiEnabler
                ? [{ _id: res.chatAiEnabler._id, name: res.chatAiEnabler.name }]
                : [];
        setChatAiEnabler(chatAiEnabler);
const chatAiConfig = Array.isArray(res.chatAiConfig)
            ? res.chatAiConfig.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.chatAiConfig
                ? [{ _id: res.chatAiConfig._id, name: res.chatAiConfig.name }]
                : [];
        setChatAiConfig(chatAiConfig);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ChataiPrompts", type: "error", message: error.message || "Failed get chataiPrompts" });
            });
    }, [props,urlParams.singleChataiPromptsId]);


    const goBack = () => {
        navigate("/app/chataiPrompts");
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
                    <h3 className="m-0">Chat Ai Prompts</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>chataiPrompts/{urlParams.singleChataiPromptsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Session</label><p className="m-0 ml-3" >{_entity?.session}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Prompt</label><p className="m-0 ml-3"  dangerouslySetInnerHTML={{__html: _entity?.prompt}}></p></div>
<div className="col-12"><label className="text-sm text-gray-600">Ref Docs</label><div className="m-0 ml-3" ><UploadFilesToS3 type={'single'}/></div></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Response Text</label><p className="m-0 ml-3" >{_entity?.responseText}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">System Id</label><p className="m-0 ml-3" >{_entity?.systemId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Type</label><p className="m-0 ml-3" >{_entity?.type}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Role</label><p className="m-0 ml-3" >{_entity?.role}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Model</label><p className="m-0 ml-3" >{_entity?.model}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Params</label><p className="m-0 ml-3" >{_entity?.params}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Stop Reason</label><p className="m-0 ml-3" >{_entity?.stopReason}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Stop Sequence</label><p className="m-0 ml-3" >{_entity?.stopSequence}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Input Tokens</label><p className="m-0 ml-3" >{Number(_entity?.inputTokens)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Output Tokens</label><p className="m-0 ml-3" >{Number(_entity?.outputTokens)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Cost</label><p className="m-0 ml-3" ><InputNumber id="cost" value={Number(_entity?.cost)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0" ><i id="status" className={`pi ${_entity?.status?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Error</label><p className="m-0 ml-3" >{_entity?.error}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">User Remarks</label><p className="m-0 ml-3" >{_entity?.userRemarks}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Thumbs Down</label><p className="m-0" ><i id="thumbsDown" className={`pi ${_entity?.thumbsDown?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Thumbs Up</label><p className="m-0" ><i id="thumbsUp" className={`pi ${_entity?.thumbsUp?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Copies</label><p className="m-0" ><i id="copies" className={`pi ${_entity?.copies?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Emailed</label><p className="m-0" ><i id="emailed" className={`pi ${_entity?.emailed?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Chat AI Enabler</label>
                    {chatAiEnabler.map((elem) => (
                        <Link key={elem._id} to={`/chataiEnabler/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Chat Ai Config</label>
                    {chatAiConfig.map((elem) => (
                        <Link key={elem._id} to={`/chataiConfig/${elem._id}`}>
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
        recordId={urlParams.singleChataiPromptsId}
        user={props.user}
        alert={props.alert}
        serviceName="chataiPrompts"
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

export default connect(mapState, mapDispatch)(SingleChataiPromptsPage);

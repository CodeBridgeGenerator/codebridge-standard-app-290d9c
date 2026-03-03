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

import ChataiPromptsPage from "../ChataiPromptsPage/ChataiPromptsPage";

const SingleChataiConfigPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [chatAiEnabler, setChatAiEnabler] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("chataiConfig")
            .get(urlParams.singleChataiConfigId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"chatAiEnabler"] }})
            .then((res) => {
                set_entity(res || {});
                const chatAiEnabler = Array.isArray(res.chatAiEnabler)
            ? res.chatAiEnabler.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.chatAiEnabler
                ? [{ _id: res.chatAiEnabler._id, name: res.chatAiEnabler.name }]
                : [];
        setChatAiEnabler(chatAiEnabler);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ChataiConfig", type: "error", message: error.message || "Failed get chataiConfig" });
            });
    }, [props,urlParams.singleChataiConfigId]);


    const goBack = () => {
        navigate("/app/chataiConfig");
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
                    <h3 className="m-0">Chat Ai Config</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>chataiConfig/{urlParams.singleChataiConfigId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Bedrock Model Id</label><p className="m-0 ml-3" >{_entity?.bedrockModelId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Model Params Json</label><p className="m-0 ml-3" >{_entity?.modelParamsJson}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Human</label><p className="m-0 ml-3" >{_entity?.human}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Task</label><p className="m-0 ml-3" >{_entity?.task}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">No Condition</label><p className="m-0 ml-3" >{_entity?.noCondition}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Yes Condition</label><p className="m-0 ml-3" >{_entity?.yesCondition}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Documents</label><p className="m-0 ml-3" >{_entity?.documents}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Example</label><p className="m-0 ml-3" >{_entity?.example}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Preamble</label><p className="m-0 ml-3" >{_entity?.preamble}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Chat Ai Enabler</label>
                    {chatAiEnabler.map((elem) => (
                        <Link key={elem._id} to={`/chataiEnabler/${elem._id}`}>
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

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Chatai Prompts" leftIcon="pi pi-building-columns mr-2">
                        <ChataiPromptsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleChataiConfigId}
        user={props.user}
        alert={props.alert}
        serviceName="chataiConfig"
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

export default connect(mapState, mapDispatch)(SingleChataiConfigPage);

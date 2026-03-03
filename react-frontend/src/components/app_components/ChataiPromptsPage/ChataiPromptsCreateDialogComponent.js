import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Editor } from 'primereact/editor';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ChataiPromptsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [chatAiEnabler, setChatAiEnabler] = useState([])
const [chatAiConfig, setChatAiConfig] = useState([])

    useEffect(() => {
        let init  = {status: false,thumbsDown: false,thumbsUp: false,copies: false,emailed: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [chatAiEnabler,chatAiConfig], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            session: _entity?.session,chatAiEnabler: _entity?.chatAiEnabler?._id,chatAiConfig: _entity?.chatAiConfig?._id,prompt: _entity?.prompt,refDocs: _entity?.refDocs,responseText: _entity?.responseText,systemId: _entity?.systemId,type: _entity?.type,role: _entity?.role,model: _entity?.model,params: _entity?.params,stopReason: _entity?.stopReason,stopSequence: _entity?.stopSequence,inputTokens: _entity?.inputTokens,outputTokens: _entity?.outputTokens,cost: _entity?.cost,status: _entity?.status || false,error: _entity?.error,userRemarks: _entity?.userRemarks,thumbsDown: _entity?.thumbsDown || false,thumbsUp: _entity?.thumbsUp || false,copies: _entity?.copies || false,emailed: _entity?.emailed || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("chataiPrompts").create(_data);
        const eagerResult = await client
            .service("chataiPrompts")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "chatAiEnabler",
                    service : "chataiEnabler",
                    select:["name"]},{
                    path : "chatAiConfig",
                    service : "chataiConfig",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Chat Ai Prompts updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Chat Ai Prompts" });
        }
        setLoading(false);
    };

    const onFilerefDocsLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };

    const setrefDocsId = (id) => { setValByKey("refDocs", id);  };

    useEffect(() => {
                    // on mount chataiEnabler
                    client
                        .service("chataiEnabler")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleChataiEnablerId } })
                        .then((res) => {
                            setChatAiEnabler(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ChataiEnabler", type: "error", message: error.message || "Failed get chataiEnabler" });
                        });
                }, []);

useEffect(() => {
                    // on mount chataiConfig
                    client
                        .service("chataiConfig")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleChataiConfigId } })
                        .then((res) => {
                            setChatAiConfig(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ChataiConfig", type: "error", message: error.message || "Failed get chataiConfig" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const chatAiEnablerOptions = chatAiEnabler.map((elem) => ({ name: elem.name, value: elem.value }));
const chatAiConfigOptions = chatAiConfig.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Chat Ai Prompts" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="chataiPrompts-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="session">Session:</label>
                <InputText id="session" className="w-full mb-3 p-inputtext-sm" value={_entity?.session} onChange={(e) => setValByKey("session", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["session"]) ? (
              <p className="m-0" key="error-session">
                {error["session"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="chatAiEnabler">Chat AI Enabler:</label>
                <Dropdown id="chatAiEnabler" value={_entity?.chatAiEnabler?._id} optionLabel="name" optionValue="value" options={chatAiEnablerOptions} onChange={(e) => setValByKey("chatAiEnabler", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["chatAiEnabler"]) ? (
              <p className="m-0" key="error-chatAiEnabler">
                {error["chatAiEnabler"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="chatAiConfig">Chat Ai Config:</label>
                <Dropdown id="chatAiConfig" value={_entity?.chatAiConfig?._id} optionLabel="name" optionValue="value" options={chatAiConfigOptions} onChange={(e) => setValByKey("chatAiConfig", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["chatAiConfig"]) ? (
              <p className="m-0" key="error-chatAiConfig">
                {error["chatAiConfig"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="prompt">Prompt:</label>
                    <Editor id="prompt" value={_entity?.prompt} onTextChange={(e) => setValByKey("prompt", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["prompt"]) ? (
                  <p className="m-0" key="error-prompt">
                    {error["prompt"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="refDocs">Ref Docs:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="chataiPrompts" onUploadComplete={setrefDocsId} onFileLoaded={onFilerefDocsLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["refDocs"]) ? (
                      <p className="m-0" key="error-refDocs">
                        {error["refDocs"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="responseText">Response Text:</label>
                <InputTextarea id="responseText" rows={5} cols={30} value={_entity?.responseText} onChange={ (e) => setValByKey("responseText", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["responseText"]) ? (
              <p className="m-0" key="error-responseText">
                {error["responseText"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="systemId">System Id:</label>
                <InputText id="systemId" className="w-full mb-3 p-inputtext-sm" value={_entity?.systemId} onChange={(e) => setValByKey("systemId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["systemId"]) ? (
              <p className="m-0" key="error-systemId">
                {error["systemId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="type">Type:</label>
                <InputText id="type" className="w-full mb-3 p-inputtext-sm" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["type"]) ? (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="role">Role:</label>
                <InputText id="role" className="w-full mb-3 p-inputtext-sm" value={_entity?.role} onChange={(e) => setValByKey("role", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["role"]) ? (
              <p className="m-0" key="error-role">
                {error["role"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="model">Model:</label>
                <InputText id="model" className="w-full mb-3 p-inputtext-sm" value={_entity?.model} onChange={(e) => setValByKey("model", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["model"]) ? (
              <p className="m-0" key="error-model">
                {error["model"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="params">Params:</label>
                <InputTextarea id="params" rows={5} cols={30} value={_entity?.params} onChange={ (e) => setValByKey("params", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["params"]) ? (
              <p className="m-0" key="error-params">
                {error["params"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stopReason">Stop Reason:</label>
                <InputTextarea id="stopReason" rows={5} cols={30} value={_entity?.stopReason} onChange={ (e) => setValByKey("stopReason", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stopReason"]) ? (
              <p className="m-0" key="error-stopReason">
                {error["stopReason"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stopSequence">Stop Sequence:</label>
                <InputTextarea id="stopSequence" rows={5} cols={30} value={_entity?.stopSequence} onChange={ (e) => setValByKey("stopSequence", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stopSequence"]) ? (
              <p className="m-0" key="error-stopSequence">
                {error["stopSequence"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="inputTokens">Input Tokens:</label>
                <InputNumber id="inputTokens" className="w-full mb-3 p-inputtext-sm" value={_entity?.inputTokens} onChange={(e) => setValByKey("inputTokens", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["inputTokens"]) ? (
              <p className="m-0" key="error-inputTokens">
                {error["inputTokens"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="outputTokens">Output Tokens:</label>
                <InputNumber id="outputTokens" className="w-full mb-3 p-inputtext-sm" value={_entity?.outputTokens} onChange={(e) => setValByKey("outputTokens", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["outputTokens"]) ? (
              <p className="m-0" key="error-outputTokens">
                {error["outputTokens"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cost">Cost:</label>
                <InputNumber id="cost" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.cost} onValueChange={(e) => setValByKey("cost", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cost"]) ? (
              <p className="m-0" key="error-cost">
                {error["cost"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Checkbox id="status" className="ml-3" checked={_entity?.status} onChange={(e) => setValByKey("status", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="error">Error:</label>
                <InputTextarea id="error" rows={5} cols={30} value={_entity?.error} onChange={ (e) => setValByKey("error", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["error"]) ? (
              <p className="m-0" key="error-error">
                {error["error"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userRemarks">User Remarks:</label>
                <InputTextarea id="userRemarks" rows={5} cols={30} value={_entity?.userRemarks} onChange={ (e) => setValByKey("userRemarks", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userRemarks"]) ? (
              <p className="m-0" key="error-userRemarks">
                {error["userRemarks"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="thumbsDown">Thumbs Down:</label>
                <Checkbox id="thumbsDown" className="ml-3" checked={_entity?.thumbsDown} onChange={(e) => setValByKey("thumbsDown", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["thumbsDown"]) ? (
              <p className="m-0" key="error-thumbsDown">
                {error["thumbsDown"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="thumbsUp">Thumbs Up:</label>
                <Checkbox id="thumbsUp" className="ml-3" checked={_entity?.thumbsUp} onChange={(e) => setValByKey("thumbsUp", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["thumbsUp"]) ? (
              <p className="m-0" key="error-thumbsUp">
                {error["thumbsUp"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="copies">Copies:</label>
                <Checkbox id="copies" className="ml-3" checked={_entity?.copies} onChange={(e) => setValByKey("copies", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["copies"]) ? (
              <p className="m-0" key="error-copies">
                {error["copies"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="emailed">Emailed:</label>
                <Checkbox id="emailed" className="ml-3" checked={_entity?.emailed} onChange={(e) => setValByKey("emailed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emailed"]) ? (
              <p className="m-0" key="error-emailed">
                {error["emailed"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChataiPromptsCreateDialogComponent);

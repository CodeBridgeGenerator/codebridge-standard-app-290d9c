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

const ChataiConfigCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [chatAiEnabler, setChatAiEnabler] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [chatAiEnabler], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.chatAiEnabler)) {
                error["chatAiEnabler"] = `Chat Ai Enabler field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name,chatAiEnabler: _entity?.chatAiEnabler?._id,bedrockModelId: _entity?.bedrockModelId,modelParamsJson: _entity?.modelParamsJson,human: _entity?.human,task: _entity?.task,noCondition: _entity?.noCondition,yesCondition: _entity?.yesCondition,documents: _entity?.documents,example: _entity?.example,preamble: _entity?.preamble,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("chataiConfig").create(_data);
        const eagerResult = await client
            .service("chataiConfig")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "chatAiEnabler",
                    service : "chataiEnabler",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Chat Ai Config updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Chat Ai Config" });
        }
        setLoading(false);
    };

    

    

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

    return (
        <Dialog header="Create Chat Ai Config" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="chataiConfig-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="chatAiEnabler">Chat Ai Enabler:</label>
                <Dropdown id="chatAiEnabler" value={_entity?.chatAiEnabler?._id} optionLabel="name" optionValue="value" options={chatAiEnablerOptions} onChange={(e) => setValByKey("chatAiEnabler", {_id : e.value})}  required  />
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
                <label htmlFor="bedrockModelId">Bedrock Model Id:</label>
                <InputText id="bedrockModelId" className="w-full mb-3 p-inputtext-sm" value={_entity?.bedrockModelId} onChange={(e) => setValByKey("bedrockModelId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["bedrockModelId"]) ? (
              <p className="m-0" key="error-bedrockModelId">
                {error["bedrockModelId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="modelParamsJson">Model Params Json:</label>
                <InputText id="modelParamsJson" className="w-full mb-3 p-inputtext-sm" value={_entity?.modelParamsJson} onChange={(e) => setValByKey("modelParamsJson", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["modelParamsJson"]) ? (
              <p className="m-0" key="error-modelParamsJson">
                {error["modelParamsJson"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="human">Human:</label>
                <InputText id="human" className="w-full mb-3 p-inputtext-sm" value={_entity?.human} onChange={(e) => setValByKey("human", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["human"]) ? (
              <p className="m-0" key="error-human">
                {error["human"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="task">Task:</label>
                <InputText id="task" className="w-full mb-3 p-inputtext-sm" value={_entity?.task} onChange={(e) => setValByKey("task", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["task"]) ? (
              <p className="m-0" key="error-task">
                {error["task"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="noCondition">No Condition:</label>
                <InputText id="noCondition" className="w-full mb-3 p-inputtext-sm" value={_entity?.noCondition} onChange={(e) => setValByKey("noCondition", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["noCondition"]) ? (
              <p className="m-0" key="error-noCondition">
                {error["noCondition"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="yesCondition">Yes Condition:</label>
                <InputText id="yesCondition" className="w-full mb-3 p-inputtext-sm" value={_entity?.yesCondition} onChange={(e) => setValByKey("yesCondition", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["yesCondition"]) ? (
              <p className="m-0" key="error-yesCondition">
                {error["yesCondition"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="documents">Documents:</label>
                <InputText id="documents" className="w-full mb-3 p-inputtext-sm" value={_entity?.documents} onChange={(e) => setValByKey("documents", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["documents"]) ? (
              <p className="m-0" key="error-documents">
                {error["documents"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="example">Example:</label>
                <InputText id="example" className="w-full mb-3 p-inputtext-sm" value={_entity?.example} onChange={(e) => setValByKey("example", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["example"]) ? (
              <p className="m-0" key="error-example">
                {error["example"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="preamble">Preamble:</label>
                <InputText id="preamble" className="w-full mb-3 p-inputtext-sm" value={_entity?.preamble} onChange={(e) => setValByKey("preamble", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["preamble"]) ? (
              <p className="m-0" key="error-preamble">
                {error["preamble"]}
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

export default connect(mapState, mapDispatch)(ChataiConfigCreateDialogComponent);

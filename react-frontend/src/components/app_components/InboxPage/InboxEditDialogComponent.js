/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const InboxEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [from, setFrom] = useState([])
const [toUser, setToUser] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setFrom(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            from: _entity?.from?._id,
toUser: _entity?.toUser?._id,
subject: _entity?.subject,
content: _entity?.content,
service: _entity?.service,
read: _entity?.read,
flagged: _entity?.flagged,
sent: _entity?.sent,
links: _entity?.links,
        };

        setLoading(true);
        try {
            
        await client.service("inbox").patch(_entity._id, _data);
        const eagerResult = await client
            .service("inbox")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "from",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info inbox updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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

    const fromOptions = from.map((elem) => ({ name: elem.name, value: elem.value }));
const toUserOptions = toUser.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Inbox" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="inbox-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="from">From:</label>
                <Dropdown id="from" value={_entity?.from?._id} optionLabel="name" optionValue="value" options={fromOptions} onChange={(e) => setValByKey("from", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["from"]) && (
              <p className="m-0" key="error-from">
                {error["from"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="toUser">To User:</label>
                <Dropdown id="toUser" value={_entity?.toUser?._id} optionLabel="name" optionValue="value" options={toUserOptions} onChange={(e) => setValByKey("toUser", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["toUser"]) && (
              <p className="m-0" key="error-toUser">
                {error["toUser"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subject">Subject:</label>
                <InputText id="subject" className="w-full mb-3 p-inputtext-sm" value={_entity?.subject} onChange={(e) => setValByKey("subject", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subject"]) && (
              <p className="m-0" key="error-subject">
                {error["subject"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="content">Content:</label>
                    <Editor id="content" value={_entity?.content} onTextChange={(e) => setValByKey("content", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["content"]) && (
                  <p className="m-0" key="error-content">
                    {error["content"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="service">Service:</label>
                <InputText id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} onChange={(e) => setValByKey("service", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["service"]) && (
              <p className="m-0" key="error-service">
                {error["service"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="read">Read:</label>
                <Checkbox id="read" className="ml-3" checked={_entity?.read} onChange={(e) => setValByKey("read", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["read"]) && (
              <p className="m-0" key="error-read">
                {error["read"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="flagged">Flagged:</label>
                <Checkbox id="flagged" className="ml-3" checked={_entity?.flagged} onChange={(e) => setValByKey("flagged", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["flagged"]) && (
              <p className="m-0" key="error-flagged">
                {error["flagged"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="sent">Sent:</label>
                <Checkbox id="sent" className="ml-3" checked={_entity?.sent} onChange={(e) => setValByKey("sent", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sent"]) && (
              <p className="m-0" key="error-sent">
                {error["sent"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="links">Links:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["links"]) && (
              <p className="m-0" key="error-links">
                {error["links"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(InboxEditDialogComponent);

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';


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

const UserTrackerIdEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            pageName: _entity?.pageName,
trackerCode: _entity?.trackerCode,
userAgent: _entity?.userAgent,
language: _entity?.language,
timeZone: _entity?.timeZone,
cookeisEnabled: _entity?.cookeisEnabled,
doNotTrack: _entity?.doNotTrack,
hardConcurrency: _entity?.hardConcurrency,
marketCode: _entity?.marketCode,
isLoggedIn: _entity?.isLoggedIn,
userId: _entity?.userId?._id,
        };

        setLoading(true);
        try {
            
        await client.service("userTrackerId").patch(_entity._id, _data);
        const eagerResult = await client
            .service("userTrackerId")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userId",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userTrackerId updated successfully" });
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

    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit User Tracker" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userTrackerId-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="pageName">Page Name:</label>
                <InputText id="pageName" className="w-full mb-3 p-inputtext-sm" value={_entity?.pageName} onChange={(e) => setValByKey("pageName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["pageName"]) && (
              <p className="m-0" key="error-pageName">
                {error["pageName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="trackerCode">TrackerCode:</label>
                <InputText id="trackerCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.trackerCode} onChange={(e) => setValByKey("trackerCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["trackerCode"]) && (
              <p className="m-0" key="error-trackerCode">
                {error["trackerCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userAgent">User Agent:</label>
                <InputText id="userAgent" className="w-full mb-3 p-inputtext-sm" value={_entity?.userAgent} onChange={(e) => setValByKey("userAgent", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userAgent"]) && (
              <p className="m-0" key="error-userAgent">
                {error["userAgent"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="language">Language:</label>
                <InputText id="language" className="w-full mb-3 p-inputtext-sm" value={_entity?.language} onChange={(e) => setValByKey("language", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["language"]) && (
              <p className="m-0" key="error-language">
                {error["language"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="timeZone">Time Zone:</label>
                <InputText id="timeZone" className="w-full mb-3 p-inputtext-sm" value={_entity?.timeZone} onChange={(e) => setValByKey("timeZone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["timeZone"]) && (
              <p className="m-0" key="error-timeZone">
                {error["timeZone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cookeisEnabled">Cookeis Enabled:</label>
                <InputText id="cookeisEnabled" className="w-full mb-3 p-inputtext-sm" value={_entity?.cookeisEnabled} onChange={(e) => setValByKey("cookeisEnabled", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cookeisEnabled"]) && (
              <p className="m-0" key="error-cookeisEnabled">
                {error["cookeisEnabled"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="doNotTrack">Do Not Track:</label>
                <InputText id="doNotTrack" className="w-full mb-3 p-inputtext-sm" value={_entity?.doNotTrack} onChange={(e) => setValByKey("doNotTrack", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["doNotTrack"]) && (
              <p className="m-0" key="error-doNotTrack">
                {error["doNotTrack"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="hardConcurrency">Hard Concurrency:</label>
                <InputText id="hardConcurrency" className="w-full mb-3 p-inputtext-sm" value={_entity?.hardConcurrency} onChange={(e) => setValByKey("hardConcurrency", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["hardConcurrency"]) && (
              <p className="m-0" key="error-hardConcurrency">
                {error["hardConcurrency"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="marketCode">Market Code:</label>
                <InputText id="marketCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.marketCode} onChange={(e) => setValByKey("marketCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["marketCode"]) && (
              <p className="m-0" key="error-marketCode">
                {error["marketCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isLoggedIn">Is logged In:</label>
                <Checkbox id="isLoggedIn" className="ml-3" checked={_entity?.isLoggedIn} onChange={(e) => setValByKey("isLoggedIn", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isLoggedIn"]) && (
              <p className="m-0" key="error-isLoggedIn">
                {error["isLoggedIn"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userId">User Id:</label>
                <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userId"]) && (
              <p className="m-0" key="error-userId">
                {error["userId"]}
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

export default connect(mapState, mapDispatch)(UserTrackerIdEditDialogComponent);

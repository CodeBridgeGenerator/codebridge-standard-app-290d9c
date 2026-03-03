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

const PermissionServicesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([])
const [roleId, setRoleId] = useState([])
const [profile, setProfile] = useState([])
const [positionId, setPositionId] = useState([])

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
 useEffect(() => {
                    //on mount roles
                    client
                        .service("roles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleRolesId } })
                        .then((res) => {
                            setRoleId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);
 useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setProfile(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);
 useEffect(() => {
                    //on mount positions
                    client
                        .service("positions")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePositionsId } })
                        .then((res) => {
                            setPositionId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Positions", type: "error", message: error.message || "Failed get positions" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            service: _entity?.service,
create: _entity?.create,
read: _entity?.read,
update: _entity?.update,
delete: _entity?.delete,
import: _entity?.import,
export: _entity?.export,
seeder: _entity?.seeder,
userId: _entity?.userId?._id,
roleId: _entity?.roleId?._id,
profile: _entity?.profile?._id,
positionId: _entity?.positionId?._id,
        };

        setLoading(true);
        try {
            
        await client.service("permissionServices").patch(_entity._id, _data);
        const eagerResult = await client
            .service("permissionServices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userId",
                    service : "users",
                    select:["name"]},{
                    path : "roleId",
                    service : "roles",
                    select:["name"]},{
                    path : "profile",
                    service : "profiles",
                    select:["name"]},{
                    path : "positionId",
                    service : "positions",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info permissionServices updated successfully" });
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
const roleIdOptions = roleId.map((elem) => ({ name: elem.name, value: elem.value }));
const profileOptions = profile.map((elem) => ({ name: elem.name, value: elem.value }));
const positionIdOptions = positionId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Permission Services" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="permissionServices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="service">Service:</label>
                <InputText id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} onChange={(e) => setValByKey("service", e.target.value)}  required  />
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
                <label htmlFor="create">create:</label>
                <Checkbox id="create" className="ml-3" checked={_entity?.create} onChange={(e) => setValByKey("create", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["create"]) && (
              <p className="m-0" key="error-create">
                {error["create"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="read">read:</label>
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
                <label htmlFor="update">update:</label>
                <Checkbox id="update" className="ml-3" checked={_entity?.update} onChange={(e) => setValByKey("update", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["update"]) && (
              <p className="m-0" key="error-update">
                {error["update"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="delete">delete:</label>
                <Checkbox id="delete" className="ml-3" checked={_entity?.delete} onChange={(e) => setValByKey("delete", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["delete"]) && (
              <p className="m-0" key="error-delete">
                {error["delete"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="import">import:</label>
                <Checkbox id="import" className="ml-3" checked={_entity?.import} onChange={(e) => setValByKey("import", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["import"]) && (
              <p className="m-0" key="error-import">
                {error["import"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="export">export:</label>
                <Checkbox id="export" className="ml-3" checked={_entity?.export} onChange={(e) => setValByKey("export", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["export"]) && (
              <p className="m-0" key="error-export">
                {error["export"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="seeder">seeder:</label>
                <Checkbox id="seeder" className="ml-3" checked={_entity?.seeder} onChange={(e) => setValByKey("seeder", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["seeder"]) && (
              <p className="m-0" key="error-seeder">
                {error["seeder"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="roleId">Role Id:</label>
                <Dropdown id="roleId" value={_entity?.roleId?._id} optionLabel="name" optionValue="value" options={roleIdOptions} onChange={(e) => setValByKey("roleId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["roleId"]) && (
              <p className="m-0" key="error-roleId">
                {error["roleId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profile">Profile:</label>
                <Dropdown id="profile" value={_entity?.profile?._id} optionLabel="name" optionValue="value" options={profileOptions} onChange={(e) => setValByKey("profile", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profile"]) && (
              <p className="m-0" key="error-profile">
                {error["profile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="positionId">Position Id:</label>
                <Dropdown id="positionId" value={_entity?.positionId?._id} optionLabel="name" optionValue="value" options={positionIdOptions} onChange={(e) => setValByKey("positionId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["positionId"]) && (
              <p className="m-0" key="error-positionId">
                {error["positionId"]}
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

export default connect(mapState, mapDispatch)(PermissionServicesEditDialogComponent);

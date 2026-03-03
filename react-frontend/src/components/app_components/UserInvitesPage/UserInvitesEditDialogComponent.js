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
import { InputNumber } from 'primereact/inputnumber';


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

const UserInvitesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [position, setPosition] = useState([])
const [role, setRole] = useState([])
const [company, setCompany] = useState([])
const [branch, setBranch] = useState([])
const [department, setDepartment] = useState([])
const [section, setSection] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount positions
                    client
                        .service("positions")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePositionsId } })
                        .then((res) => {
                            setPosition(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Positions", type: "error", message: error.message || "Failed get positions" });
                        });
                }, []);
 useEffect(() => {
                    //on mount roles
                    client
                        .service("roles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleRolesId } })
                        .then((res) => {
                            setRole(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);
 useEffect(() => {
                    //on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCompaniesId } })
                        .then((res) => {
                            setCompany(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
                        });
                }, []);
 useEffect(() => {
                    //on mount branches
                    client
                        .service("branches")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleBranchesId } })
                        .then((res) => {
                            setBranch(res.data.map((e) => { return { name: e['companyId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Branches", type: "error", message: error.message || "Failed get branches" });
                        });
                }, []);
 useEffect(() => {
                    //on mount departments
                    client
                        .service("departments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDepartmentsId } })
                        .then((res) => {
                            setDepartment(res.data.map((e) => { return { name: e['deptName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Departments", type: "error", message: error.message || "Failed get departments" });
                        });
                }, []);
 useEffect(() => {
                    //on mount sections
                    client
                        .service("sections")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleSectionsId } })
                        .then((res) => {
                            setSection(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Sections", type: "error", message: error.message || "Failed get sections" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            emailToInvite: _entity?.emailToInvite,
status: _entity?.status,
position: _entity?.position?._id,
role: _entity?.role?._id,
company: _entity?.company?._id,
branch: _entity?.branch?._id,
department: _entity?.department?._id,
section: _entity?.section?._id,
sendMailCounter: _entity?.sendMailCounter,
        };

        setLoading(true);
        try {
            
        await client.service("userInvites").patch(_entity._id, _data);
        const eagerResult = await client
            .service("userInvites")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "position",
                    service : "positions",
                    select:["name"]},{
                    path : "role",
                    service : "roles",
                    select:["name"]},{
                    path : "company",
                    service : "companies",
                    select:["name"]},{
                    path : "branch",
                    service : "branches",
                    select:["companyId"]},{
                    path : "department",
                    service : "departments",
                    select:["deptName"]},{
                    path : "section",
                    service : "sections",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userInvites updated successfully" });
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

    const positionOptions = position.map((elem) => ({ name: elem.name, value: elem.value }));
const roleOptions = role.map((elem) => ({ name: elem.name, value: elem.value }));
const companyOptions = company.map((elem) => ({ name: elem.name, value: elem.value }));
const branchOptions = branch.map((elem) => ({ name: elem.name, value: elem.value }));
const departmentOptions = department.map((elem) => ({ name: elem.name, value: elem.value }));
const sectionOptions = section.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit User Invites" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userInvites-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emailToInvite">Email To Invite:</label>
                <InputText id="emailToInvite" className="w-full mb-3 p-inputtext-sm" value={_entity?.emailToInvite} onChange={(e) => setValByKey("emailToInvite", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emailToInvite"]) && (
              <p className="m-0" key="error-emailToInvite">
                {error["emailToInvite"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Checkbox id="status" className="ml-3" checked={_entity?.status} onChange={(e) => setValByKey("status", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="position">Position:</label>
                <Dropdown id="position" value={_entity?.position?._id} optionLabel="name" optionValue="value" options={positionOptions} onChange={(e) => setValByKey("position", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["position"]) && (
              <p className="m-0" key="error-position">
                {error["position"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="role">Role:</label>
                <Dropdown id="role" value={_entity?.role?._id} optionLabel="name" optionValue="value" options={roleOptions} onChange={(e) => setValByKey("role", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["role"]) && (
              <p className="m-0" key="error-role">
                {error["role"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="company">Company:</label>
                <Dropdown id="company" value={_entity?.company?._id} optionLabel="name" optionValue="value" options={companyOptions} onChange={(e) => setValByKey("company", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["company"]) && (
              <p className="m-0" key="error-company">
                {error["company"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="branch">Branch:</label>
                <Dropdown id="branch" value={_entity?.branch?._id} optionLabel="name" optionValue="value" options={branchOptions} onChange={(e) => setValByKey("branch", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["branch"]) && (
              <p className="m-0" key="error-branch">
                {error["branch"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="department">Department:</label>
                <Dropdown id="department" value={_entity?.department?._id} optionLabel="name" optionValue="value" options={departmentOptions} onChange={(e) => setValByKey("department", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["department"]) && (
              <p className="m-0" key="error-department">
                {error["department"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="section">Section:</label>
                <Dropdown id="section" value={_entity?.section?._id} optionLabel="name" optionValue="value" options={sectionOptions} onChange={(e) => setValByKey("section", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["section"]) && (
              <p className="m-0" key="error-section">
                {error["section"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sendMailCounter">Send Mail Counter:</label>
                <InputNumber id="sendMailCounter" className="w-full mb-3 p-inputtext-sm" value={_entity?.sendMailCounter} onChange={(e) => setValByKey("sendMailCounter", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sendMailCounter"]) && (
              <p className="m-0" key="error-sendMailCounter">
                {error["sendMailCounter"]}
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

export default connect(mapState, mapDispatch)(UserInvitesEditDialogComponent);

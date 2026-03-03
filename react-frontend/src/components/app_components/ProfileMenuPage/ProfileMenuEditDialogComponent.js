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
import { MultiSelect } from 'primereact/multiselect';


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

const ProfileMenuEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [user, setUser] = useState([])
const [roles, setRoles] = useState([])
const [positions, setPositions] = useState([])
const [profiles, setProfiles] = useState([])
const [company, setCompany] = useState([])
const [branch, setBranch] = useState([])
const [section, setSection] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUser(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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
                            setRoles(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);
 useEffect(() => {
                    //on mount positions
                    client
                        .service("positions")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePositionsId } })
                        .then((res) => {
                            setPositions(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Positions", type: "error", message: error.message || "Failed get positions" });
                        });
                }, []);
 useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setProfiles(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
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
                            setBranch(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Branches", type: "error", message: error.message || "Failed get branches" });
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
            user: _entity?.user?._id,
menuItems: _entity?.menuItems,
company: _entity?.company?._id,
branch: _entity?.branch?._id,
section: _entity?.section?._id,
        };

        setLoading(true);
        try {
            
        await client.service("profileMenu").patch(_entity._id, _data);
        const eagerResult = await client
            .service("profileMenu")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "user",
                    service : "users",
                    select:["name"]},{
                    path : "roles",
                    service : "roles",
                    select:["name"]},{
                    path : "positions",
                    service : "positions",
                    select:["name"]},{
                    path : "profiles",
                    service : "profiles",
                    select:["name"]},{
                    path : "company",
                    service : "companies",
                    select:["name"]},{
                    path : "branch",
                    service : "branches",
                    select:["name"]},{
                    path : "section",
                    service : "sections",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info profileMenu updated successfully" });
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

    const userOptions = user.map((elem) => ({ name: elem.name, value: elem.value }));
const rolesOptions = roles.map((elem) => ({ name: elem.name, value: elem.value }));
const positionsOptions = positions.map((elem) => ({ name: elem.name, value: elem.value }));
const profilesOptions = profiles.map((elem) => ({ name: elem.name, value: elem.value }));
const companyOptions = company.map((elem) => ({ name: elem.name, value: elem.value }));
const branchOptions = branch.map((elem) => ({ name: elem.name, value: elem.value }));
const sectionOptions = section.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Profile Menu" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="profileMenu-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="user">user:</label>
                <Dropdown id="user" value={_entity?.user?._id} optionLabel="name" optionValue="value" options={userOptions} onChange={(e) => setValByKey("user", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["user"]) && (
              <p className="m-0" key="error-user">
                {error["user"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="roles">roles:</label>
                <MultiSelect id="roles" value={_entity?.roles?.map((i) =>i._id)} options={rolesOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("roles", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["roles"]) && (
              <p className="m-0" key="error-roles">
                {error["roles"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="positions">positions:</label>
                <MultiSelect id="positions" value={_entity?.positions?.map((i) =>i._id)} options={positionsOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("positions", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["positions"]) && (
              <p className="m-0" key="error-positions">
                {error["positions"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profiles">profiles:</label>
                <MultiSelect id="profiles" value={_entity?.profiles?.map((i) =>i._id)} options={profilesOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("profiles", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profiles"]) && (
              <p className="m-0" key="error-profiles">
                {error["profiles"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="menuItems">Menu Items:</label>
                <InputText id="menuItems" className="w-full mb-3 p-inputtext-sm" value={_entity?.menuItems} onChange={(e) => setValByKey("menuItems", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["menuItems"]) && (
              <p className="m-0" key="error-menuItems">
                {error["menuItems"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="company">company:</label>
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
                <label htmlFor="branch">branch:</label>
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
                <label htmlFor="section">section:</label>
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

export default connect(mapState, mapDispatch)(ProfileMenuEditDialogComponent);

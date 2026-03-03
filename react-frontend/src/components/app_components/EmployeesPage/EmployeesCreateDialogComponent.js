import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


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

const EmployeesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.empNo)) {
                error["empNo"] = `Emp No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fullName)) {
                error["fullName"] = `Full Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.resigned)) {
                error["resigned"] = `Resigned field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.empGroup)) {
                error["empGroup"] = `Emp Group field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.empCode)) {
                error["empCode"] = `Emp Code field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            empNo: _entity?.empNo,name: _entity?.name,fullName: _entity?.fullName,company: _entity?.company,department: _entity?.department,section: _entity?.section,position: _entity?.position,supervisor: _entity?.supervisor,dateJoined: _entity?.dateJoined,dateTerminated: _entity?.dateTerminated,resigned: _entity?.resigned,empGroup: _entity?.empGroup,empCode: _entity?.empCode,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("employees").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Employees created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Employees" });
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

    

    return (
        <Dialog header="Create Employees" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="employees-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empNo">Emp No:</label>
                <InputText id="empNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.empNo} onChange={(e) => setValByKey("empNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empNo"]) ? (
              <p className="m-0" key="error-empNo">
                {error["empNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
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
                <label htmlFor="fullName">Full Name:</label>
                <InputText id="fullName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullName} onChange={(e) => setValByKey("fullName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullName"]) ? (
              <p className="m-0" key="error-fullName">
                {error["fullName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="company">Company:</label>
                <InputText id="company" className="w-full mb-3 p-inputtext-sm" value={_entity?.company} onChange={(e) => setValByKey("company", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["company"]) ? (
              <p className="m-0" key="error-company">
                {error["company"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="department">Department:</label>
                <InputText id="department" className="w-full mb-3 p-inputtext-sm" value={_entity?.department} onChange={(e) => setValByKey("department", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["department"]) ? (
              <p className="m-0" key="error-department">
                {error["department"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="section">Section:</label>
                <InputText id="section" className="w-full mb-3 p-inputtext-sm" value={_entity?.section} onChange={(e) => setValByKey("section", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["section"]) ? (
              <p className="m-0" key="error-section">
                {error["section"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="position">Position:</label>
                <InputText id="position" className="w-full mb-3 p-inputtext-sm" value={_entity?.position} onChange={(e) => setValByKey("position", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["position"]) ? (
              <p className="m-0" key="error-position">
                {error["position"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supervisor">Supervisor:</label>
                <InputText id="supervisor" className="w-full mb-3 p-inputtext-sm" value={_entity?.supervisor} onChange={(e) => setValByKey("supervisor", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supervisor"]) ? (
              <p className="m-0" key="error-supervisor">
                {error["supervisor"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateJoined">Date Joined:</label>
                <InputText id="dateJoined" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateJoined} onChange={(e) => setValByKey("dateJoined", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateJoined"]) ? (
              <p className="m-0" key="error-dateJoined">
                {error["dateJoined"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateTerminated">Date Terminated:</label>
                <InputText id="dateTerminated" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateTerminated} onChange={(e) => setValByKey("dateTerminated", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateTerminated"]) ? (
              <p className="m-0" key="error-dateTerminated">
                {error["dateTerminated"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="resigned">Resigned:</label>
                <InputText id="resigned" className="w-full mb-3 p-inputtext-sm" value={_entity?.resigned} onChange={(e) => setValByKey("resigned", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["resigned"]) ? (
              <p className="m-0" key="error-resigned">
                {error["resigned"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empGroup">Emp Group:</label>
                <InputText id="empGroup" className="w-full mb-3 p-inputtext-sm" value={_entity?.empGroup} onChange={(e) => setValByKey("empGroup", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empGroup"]) ? (
              <p className="m-0" key="error-empGroup">
                {error["empGroup"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empCode">Emp Code:</label>
                <InputText id="empCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.empCode} onChange={(e) => setValByKey("empCode", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empCode"]) ? (
              <p className="m-0" key="error-empCode">
                {error["empCode"]}
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

export default connect(mapState, mapDispatch)(EmployeesCreateDialogComponent);

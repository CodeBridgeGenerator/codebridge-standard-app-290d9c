/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const StaffinfoEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            empNo: _entity?.empNo,
name: _entity?.name,
nameNric: _entity?.nameNric,
compCode: _entity?.compCode,
compName: _entity?.compName,
deptCode: _entity?.deptCode,
deptDesc: _entity?.deptDesc,
sectCode: _entity?.sectCode,
sectDesc: _entity?.sectDesc,
designation: _entity?.designation,
email: _entity?.email,
resign: _entity?.resign,
supervisor: _entity?.supervisor,
dateJoin: _entity?.dateJoin,
empGroup: _entity?.empGroup,
empGradeCode: _entity?.empGradeCode,
terminationDate: _entity?.terminationDate,
        };

        setLoading(true);
        try {
            
        const result = await client.service("staffinfo").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info staffinfo updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Staff Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="staffinfo-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empNo">Emp No:</label>
                <InputNumber id="empNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.empNo} onChange={(e) => setValByKey("empNo", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empNo"]) && (
              <p className="m-0" key="error-empNo">
                {error["empNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nameNric">Name NRIC:</label>
                <InputText id="nameNric" className="w-full mb-3 p-inputtext-sm" value={_entity?.nameNric} onChange={(e) => setValByKey("nameNric", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nameNric"]) && (
              <p className="m-0" key="error-nameNric">
                {error["nameNric"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="compCode">Comp Code:</label>
                <InputNumber id="compCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.compCode} onChange={(e) => setValByKey("compCode", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["compCode"]) && (
              <p className="m-0" key="error-compCode">
                {error["compCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="compName">Comp Name:</label>
                <InputText id="compName" className="w-full mb-3 p-inputtext-sm" value={_entity?.compName} onChange={(e) => setValByKey("compName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["compName"]) && (
              <p className="m-0" key="error-compName">
                {error["compName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deptCode">Dept Code:</label>
                <InputText id="deptCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.deptCode} onChange={(e) => setValByKey("deptCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deptCode"]) && (
              <p className="m-0" key="error-deptCode">
                {error["deptCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deptDesc">Dept Desc:</label>
                <InputText id="deptDesc" className="w-full mb-3 p-inputtext-sm" value={_entity?.deptDesc} onChange={(e) => setValByKey("deptDesc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deptDesc"]) && (
              <p className="m-0" key="error-deptDesc">
                {error["deptDesc"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sectCode">Sect Code:</label>
                <InputNumber id="sectCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.sectCode} onChange={(e) => setValByKey("sectCode", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sectCode"]) && (
              <p className="m-0" key="error-sectCode">
                {error["sectCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sectDesc">Sect Desc:</label>
                <InputText id="sectDesc" className="w-full mb-3 p-inputtext-sm" value={_entity?.sectDesc} onChange={(e) => setValByKey("sectDesc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sectDesc"]) && (
              <p className="m-0" key="error-sectDesc">
                {error["sectDesc"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="designation">Designation:</label>
                <InputText id="designation" className="w-full mb-3 p-inputtext-sm" value={_entity?.designation} onChange={(e) => setValByKey("designation", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["designation"]) && (
              <p className="m-0" key="error-designation">
                {error["designation"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="email">Email:</label>
                <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["email"]) && (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="resign">Resign:</label>
                <InputText id="resign" className="w-full mb-3 p-inputtext-sm" value={_entity?.resign} onChange={(e) => setValByKey("resign", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["resign"]) && (
              <p className="m-0" key="error-resign">
                {error["resign"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supervisor">Supervisor:</label>
                <InputText id="supervisor" className="w-full mb-3 p-inputtext-sm" value={_entity?.supervisor} onChange={(e) => setValByKey("supervisor", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supervisor"]) && (
              <p className="m-0" key="error-supervisor">
                {error["supervisor"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateJoin">Date Join:</label>
                <InputNumber id="dateJoin" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateJoin} onChange={(e) => setValByKey("dateJoin", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateJoin"]) && (
              <p className="m-0" key="error-dateJoin">
                {error["dateJoin"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empGroup">Emp Group:</label>
                <InputText id="empGroup" className="w-full mb-3 p-inputtext-sm" value={_entity?.empGroup} onChange={(e) => setValByKey("empGroup", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empGroup"]) && (
              <p className="m-0" key="error-empGroup">
                {error["empGroup"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="empGradeCode">Emp Grade Code:</label>
                <InputText id="empGradeCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.empGradeCode} onChange={(e) => setValByKey("empGradeCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["empGradeCode"]) && (
              <p className="m-0" key="error-empGradeCode">
                {error["empGradeCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="terminationDate">Termination Date:</label>
                <InputText id="terminationDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.terminationDate} onChange={(e) => setValByKey("terminationDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["terminationDate"]) && (
              <p className="m-0" key="error-terminationDate">
                {error["terminationDate"]}
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

export default connect(mapState, mapDispatch)(StaffinfoEditDialogComponent);

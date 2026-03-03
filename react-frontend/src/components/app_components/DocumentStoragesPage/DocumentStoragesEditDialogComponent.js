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
import { Calendar } from "primereact/calendar";


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

const DocumentStoragesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
size: _entity?.size,
path: _entity?.path,
lastModifiedDate: _entity?.lastModifiedDate,
lastModified: _entity?.lastModified,
eTag: _entity?.eTag,
versionId: _entity?.versionId,
url: _entity?.url,
tableId: _entity?.tableId,
tableName: _entity?.tableName,
        };

        setLoading(true);
        try {
            
        const result = await client.service("documentStorages").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info documentStorages updated successfully" });
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
        <Dialog header="Edit Document Storages" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="documentStorages-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
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
                <label htmlFor="size">Size:</label>
                <InputNumber id="size" className="w-full mb-3 p-inputtext-sm" value={_entity?.size} onChange={(e) => setValByKey("size", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["size"]) && (
              <p className="m-0" key="error-size">
                {error["size"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="path">Path:</label>
                <InputText id="path" className="w-full mb-3 p-inputtext-sm" value={_entity?.path} onChange={(e) => setValByKey("path", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["path"]) && (
              <p className="m-0" key="error-path">
                {error["path"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lastModifiedDate">Last Modified Date:</label>
                <Calendar id="lastModifiedDate"  value={_entity?.lastModifiedDate ? new Date(_entity?.lastModifiedDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("lastModifiedDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lastModifiedDate"]) && (
              <p className="m-0" key="error-lastModifiedDate">
                {error["lastModifiedDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lastModified">Last Modified:</label>
                <InputNumber id="lastModified" className="w-full mb-3 p-inputtext-sm" value={_entity?.lastModified} onChange={(e) => setValByKey("lastModified", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lastModified"]) && (
              <p className="m-0" key="error-lastModified">
                {error["lastModified"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="eTag">eTag:</label>
                <InputText id="eTag" className="w-full mb-3 p-inputtext-sm" value={_entity?.eTag} onChange={(e) => setValByKey("eTag", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["eTag"]) && (
              <p className="m-0" key="error-eTag">
                {error["eTag"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="versionId">versionId:</label>
                <InputText id="versionId" className="w-full mb-3 p-inputtext-sm" value={_entity?.versionId} onChange={(e) => setValByKey("versionId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["versionId"]) && (
              <p className="m-0" key="error-versionId">
                {error["versionId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="url">URL:</label>
                <InputText id="url" className="w-full mb-3 p-inputtext-sm" value={_entity?.url} onChange={(e) => setValByKey("url", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["url"]) && (
              <p className="m-0" key="error-url">
                {error["url"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tableId">Table Id:</label>
                <InputText id="tableId" className="w-full mb-3 p-inputtext-sm" value={_entity?.tableId} onChange={(e) => setValByKey("tableId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tableId"]) && (
              <p className="m-0" key="error-tableId">
                {error["tableId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tableName">Table Name:</label>
                <InputText id="tableName" className="w-full mb-3 p-inputtext-sm" value={_entity?.tableName} onChange={(e) => setValByKey("tableName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tableName"]) && (
              <p className="m-0" key="error-tableName">
                {error["tableName"]}
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

export default connect(mapState, mapDispatch)(DocumentStoragesEditDialogComponent);

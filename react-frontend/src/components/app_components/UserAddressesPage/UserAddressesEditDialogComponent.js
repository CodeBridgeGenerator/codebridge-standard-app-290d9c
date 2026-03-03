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
import { InputTextarea } from 'primereact/inputtextarea';


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

const UserAddressesEditDialogComponent = (props) => {
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
            userId: _entity?.userId?._id,
street1: _entity?.street1,
street2: _entity?.street2,
postalCode: _entity?.postalCode,
city: _entity?.city,
state: _entity?.state,
province: _entity?.province,
country: _entity?.country,
        };

        setLoading(true);
        try {
            
        await client.service("userAddresses").patch(_entity._id, _data);
        const eagerResult = await client
            .service("userAddresses")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userId",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info userAddresses updated successfully" });
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
        <Dialog header="Edit User Addresses" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userAddresses-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userId">User:</label>
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
                <label htmlFor="street1">Street 1:</label>
                <InputTextarea id="street1" rows={5} cols={30} value={_entity?.street1} onChange={ (e) => setValByKey("street1", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["street1"]) && (
              <p className="m-0" key="error-street1">
                {error["street1"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="street2">Street 2:</label>
                <InputTextarea id="street2" rows={5} cols={30} value={_entity?.street2} onChange={ (e) => setValByKey("street2", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["street2"]) && (
              <p className="m-0" key="error-street2">
                {error["street2"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postalCode">Postal Code:</label>
                <InputText id="postalCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.postalCode} onChange={(e) => setValByKey("postalCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postalCode"]) && (
              <p className="m-0" key="error-postalCode">
                {error["postalCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="city">City:</label>
                <InputText id="city" className="w-full mb-3 p-inputtext-sm" value={_entity?.city} onChange={(e) => setValByKey("city", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["city"]) && (
              <p className="m-0" key="error-city">
                {error["city"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="state">State:</label>
                <InputText id="state" className="w-full mb-3 p-inputtext-sm" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["state"]) && (
              <p className="m-0" key="error-state">
                {error["state"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="province">Province:</label>
                <InputText id="province" className="w-full mb-3 p-inputtext-sm" value={_entity?.province} onChange={(e) => setValByKey("province", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["province"]) && (
              <p className="m-0" key="error-province">
                {error["province"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" className="w-full mb-3 p-inputtext-sm" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["country"]) && (
              <p className="m-0" key="error-country">
                {error["country"]}
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

export default connect(mapState, mapDispatch)(UserAddressesEditDialogComponent);

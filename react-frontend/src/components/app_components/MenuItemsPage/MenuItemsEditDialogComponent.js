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

const MenuItemsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userContext, setUserContext] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount profileMenu
                    client
                        .service("profileMenu")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfileMenuId } })
                        .then((res) => {
                            setUserContext(res.data.map((e) => { return { name: e['user'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ProfileMenu", type: "error", message: error.message || "Failed get profileMenu" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            userContext: _entity?.userContext?._id,
menuItems: _entity?.menuItems,
        };

        setLoading(true);
        try {
            
        await client.service("menuItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("menuItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userContext",
                    service : "profileMenu",
                    select:["user"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info menuItems updated successfully" });
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

    const userContextOptions = userContext.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Menu Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="menuItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userContext">User Context:</label>
                <Dropdown id="userContext" value={_entity?.userContext?._id} optionLabel="name" optionValue="value" options={userContextOptions} onChange={(e) => setValByKey("userContext", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userContext"]) && (
              <p className="m-0" key="error-userContext">
                {error["userContext"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="menuItems">menuItems:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["menuItems"]) && (
              <p className="m-0" key="error-menuItems">
                {error["menuItems"]}
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

export default connect(mapState, mapDispatch)(MenuItemsEditDialogComponent);

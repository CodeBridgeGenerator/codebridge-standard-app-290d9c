import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";


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

const CompanyAddressesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [company, setCompany] = useState([])

    useEffect(() => {
        let init  = {isDefault: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [company], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            company: _entity?.company?._id,street1: _entity?.street1,street2: _entity?.street2,poscode: _entity?.poscode,city: _entity?.city,state: _entity?.state,province: _entity?.province,country: _entity?.country,isDefault: _entity?.isDefault || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("companyAddresses").create(_data);
        const eagerResult = await client
            .service("companyAddresses")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "company",
                    service : "companies",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Company Addresses updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Company Addresses" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount companies
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

    const companyOptions = company.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Company Addresses" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="companyAddresses-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="company">Company:</label>
                <Dropdown id="company" value={_entity?.company?._id} optionLabel="name" optionValue="value" options={companyOptions} onChange={(e) => setValByKey("company", {_id : e.value})}  />
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
                <label htmlFor="street1">Street 1:</label>
                <InputTextarea id="street1" rows={5} cols={30} value={_entity?.street1} onChange={ (e) => setValByKey("street1", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["street1"]) ? (
              <p className="m-0" key="error-street1">
                {error["street1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="street2">Street 2:</label>
                <InputTextarea id="street2" rows={5} cols={30} value={_entity?.street2} onChange={ (e) => setValByKey("street2", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["street2"]) ? (
              <p className="m-0" key="error-street2">
                {error["street2"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="poscode">Poscode:</label>
                <InputText id="poscode" className="w-full mb-3 p-inputtext-sm" value={_entity?.poscode} onChange={(e) => setValByKey("poscode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["poscode"]) ? (
              <p className="m-0" key="error-poscode">
                {error["poscode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="city">City:</label>
                <InputText id="city" className="w-full mb-3 p-inputtext-sm" value={_entity?.city} onChange={(e) => setValByKey("city", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["city"]) ? (
              <p className="m-0" key="error-city">
                {error["city"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="state">State:</label>
                <InputText id="state" className="w-full mb-3 p-inputtext-sm" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["state"]) ? (
              <p className="m-0" key="error-state">
                {error["state"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="province">Province:</label>
                <InputText id="province" className="w-full mb-3 p-inputtext-sm" value={_entity?.province} onChange={(e) => setValByKey("province", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["province"]) ? (
              <p className="m-0" key="error-province">
                {error["province"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" className="w-full mb-3 p-inputtext-sm" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["country"]) ? (
              <p className="m-0" key="error-country">
                {error["country"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isDefault">Is Default:</label>
                <Checkbox id="isDefault" className="ml-3" checked={_entity?.isDefault} onChange={(e) => setValByKey("isDefault", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isDefault"]) ? (
              <p className="m-0" key="error-isDefault">
                {error["isDefault"]}
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

export default connect(mapState, mapDispatch)(CompanyAddressesCreateDialogComponent);

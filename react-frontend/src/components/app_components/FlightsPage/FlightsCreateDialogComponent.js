import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


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

const FlightsCreateDialogComponent = (props) => {
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
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            flightNumber: _entity?.flightNumber,callsign: _entity?.callsign,aircraftType: _entity?.aircraftType,departure: _entity?.departure,destination: _entity?.destination,eobtUtc: _entity?.eobtUtc,route: _entity?.route,cruisingAltitude: _entity?.cruisingAltitude,fuelOnBoardKg: _entity?.fuelOnBoardKg,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("flights").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Flights created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Flights" });
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
        <Dialog header="Create Flights" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="flights-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="flightNumber">Flight Number:</label>
                <InputText id="flightNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.flightNumber} onChange={(e) => setValByKey("flightNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["flightNumber"]) ? (
              <p className="m-0" key="error-flightNumber">
                {error["flightNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="callsign">Callsign:</label>
                <InputText id="callsign" className="w-full mb-3 p-inputtext-sm" value={_entity?.callsign} onChange={(e) => setValByKey("callsign", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["callsign"]) ? (
              <p className="m-0" key="error-callsign">
                {error["callsign"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aircraftType">Aircraft Type:</label>
                <InputText id="aircraftType" className="w-full mb-3 p-inputtext-sm" value={_entity?.aircraftType} onChange={(e) => setValByKey("aircraftType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aircraftType"]) ? (
              <p className="m-0" key="error-aircraftType">
                {error["aircraftType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="departure">Departure:</label>
                <InputText id="departure" className="w-full mb-3 p-inputtext-sm" value={_entity?.departure} onChange={(e) => setValByKey("departure", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["departure"]) ? (
              <p className="m-0" key="error-departure">
                {error["departure"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="destination">Destination:</label>
                <InputText id="destination" className="w-full mb-3 p-inputtext-sm" value={_entity?.destination} onChange={(e) => setValByKey("destination", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["destination"]) ? (
              <p className="m-0" key="error-destination">
                {error["destination"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="eobtUtc">EOBT UTC:</label>
                <InputNumber id="eobtUtc" className="w-full mb-3 p-inputtext-sm" value={_entity?.eobtUtc} onChange={(e) => setValByKey("eobtUtc", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["eobtUtc"]) ? (
              <p className="m-0" key="error-eobtUtc">
                {error["eobtUtc"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="route">Route:</label>
                <InputText id="route" className="w-full mb-3 p-inputtext-sm" value={_entity?.route} onChange={(e) => setValByKey("route", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["route"]) ? (
              <p className="m-0" key="error-route">
                {error["route"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cruisingAltitude">Cruising Altitude:</label>
                <InputText id="cruisingAltitude" className="w-full mb-3 p-inputtext-sm" value={_entity?.cruisingAltitude} onChange={(e) => setValByKey("cruisingAltitude", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cruisingAltitude"]) ? (
              <p className="m-0" key="error-cruisingAltitude">
                {error["cruisingAltitude"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fuelOnBoardKg">Fuel On Board Kg:</label>
                <InputNumber id="fuelOnBoardKg" className="w-full mb-3 p-inputtext-sm" value={_entity?.fuelOnBoardKg} onChange={(e) => setValByKey("fuelOnBoardKg", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fuelOnBoardKg"]) ? (
              <p className="m-0" key="error-fuelOnBoardKg">
                {error["fuelOnBoardKg"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
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

export default connect(mapState, mapDispatch)(FlightsCreateDialogComponent);

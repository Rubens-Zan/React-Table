import React, { useState } from 'react';
import {UAParser} from 'ua-parser-js'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowRight} from '@fortawesome/free-solid-svg-icons'; 
import ExpandedRowContent from '../expandedRowContent';

/**
 * @file module:src/components/extendedTableRow/index.jsx  
 * @param {array} props.thisUserData - Array containing data from the user __currentAccess, currentAddress, currentJob, productsBuyed__
 * @returns - extended row, when click in the button will show the content of the field name clicked 
 */
export default function ExtendedTableRow(props){  
    // Variables to pass the specified content needed to custom expanded box
    let accessData = props.thisUserData.currentAccess; 
    let addressData = props.thisUserData.currentAddress; 
    let jobData = props.thisUserData.currentJob; 
    let productData = props.thisUserData.productsBuyed; 
    let parser = new UAParser();
    let uaString = props.thisUserData.currentAccess.user_access_user_agent;
    let OS = parser.setUA(uaString).getOS();
    props.thisUserData.currentAccess.userOs = OS.name+' '+OS.version;
    const [boxColapsed, setBoxColapsed] = useState(null); 
    
    /**
     * @function module:src/components/extendedTableRow/extendedTableRow~handleClick
     * @summary - when the button is clicked, open only the clicked field in the device window 
     */
    function handleClick(newIndex) {
        let currentIndex = boxColapsed; 
        if (newIndex !== currentIndex)
            currentIndex = newIndex; 
        else
            currentIndex = null; 
        setBoxColapsed(currentIndex);
    }

    return (   
        <div style={style.container}>
            <div style={style.boxWrapper}>
                <h1 style={style.extendedLineTitle}>
                    Acesso do Usuário
                </h1>
                <button onClick={()=>handleClick(0)}  style={style.boxButton}>
                    { (boxColapsed === 0) ? 
                        <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                        : 
                        <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                    }
                </button>
                { (boxColapsed === 0) ? 
                    <ExpandedRowContent
                        fieldList = {[
                            {label: "Rede",fieldKey: "user_access_business_technoloy"},
                            {label: "Login",fieldKey: "user_access_login"},
                            {label: "SO",fieldKey: "userOs"},
                            {label: "IP",fieldKey: "user_access_ip_address"}
                        ]}
                        fieldValues = {accessData}
                    />
                    :
                    null
                }
            </div>
            <div style={style.boxWrapper}>
                <h1 style={style.extendedLineTitle}>
                    Endereço do Usuário
                </h1>
                <button onClick={()=>handleClick(1)}  style={style.boxButton}>
                    { (boxColapsed === 1) ? 
                        <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                        : 
                        <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                    }
                </button>
                { (boxColapsed === 1) ? 
                    <ExpandedRowContent
                        fieldList = {[
                            {label: "País",fieldKey: "user_address_country"},
                            {label: "Estado",fieldKey: "user_address_state"},
                            {label: "Cidade",fieldKey: "user_address_city"},
                            {label: "Rua",fieldKey: "user_address_street_name"},
                            {label: "Endereço",fieldKey: "user_address_street_address"}
                        ]}
                        fieldValues = {addressData}
                    /> 
                    : 
                    null
                }
            </div>
            <div style={style.boxWrapper}> 
                <h1 style={style.extendedLineTitle}>
                    Emprego 
                </h1>
                <button onClick={()=>handleClick(2)}  style={style.boxButton}>
                    { (boxColapsed === 2)? 
                        <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                        : 
                        <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                    }
                </button>
                { (boxColapsed === 2)? 
                    <ExpandedRowContent
                        fieldList = {[
                            {label: "Emprego",fieldKey: "user_job_title"},
                            {label: "Endereço do emprego",fieldKey: "user_job_address"}
                        ]}
                        fieldValues = {jobData}
                    /> 
                    : 
                    null
                }
            </div>
            <div style={style.boxWrapper}> 
                <h1 style={style.extendedLineTitle}>
                    Produto Comprado
                </h1>
                <button onClick={()=>handleClick(3)}  style={style.boxButton}>
                    { (boxColapsed === 3) ? 
                        <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                        : 
                        <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                    }
                </button>
                { (boxColapsed === 3) ? 
                    <ExpandedRowContent
                    fieldList = {[
                        {label: "Empresa",fieldKey: "user_product_buyed_company_name"},
                        {label: "Nome",fieldKey: "user_product_buyed_product_name"},
                        {label: "Material",fieldKey: "user_product_buyed_product_material"},
                        {label: "Descrição",fieldKey: "user_product_buyed_product_description"} 
                    ]}
                    fieldValues = {productData}
                    /> 
                    :
                    null
                }
            </div>
        </div>
    )
}


const style = {
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row"
    },
    boxWrapper:{
        position: "relative",
        backgroundColor: "#ffa3a3"
    },
    extendedLineTitle:{
        display: "flex",
        textAlign: "center",
        justifyContent: "center", 
        fontSize : "18px",
        color: "#000000",
        padding: "16px 0"
    },
    boxButton:{
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "50%",
        position: "absolute",
        left: "10px",
        top: "8px"
    }
};

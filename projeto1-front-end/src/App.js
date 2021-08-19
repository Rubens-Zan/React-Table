//Imports
import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAlt, faUserAltSlash } from '@fortawesome/free-solid-svg-icons'; 
import ModalCar from './components/carModal';   
import CustomAlerts from './components/customAlerts';
import TableRow from './components/tableRow'; 
import data from './user/users.js';
import job from './user/users_job.js';
import address from './user/users_address.js';
import cars from './user/users_cars.js';
import access from './user/users_access.js';
import products from './user/users_products_buyed.js';

class Table extends Component{
  constructor(props){ 
    super(props);

    this.myUserList = data.map(user=>{
      const myUser = user;  
      
      if (job[myUser.user_job_id] )
        myUser.currentJob = job[myUser.user_job_id]; 
      else 
        myUser.currentJob = {}; 
      
      if (address[myUser.user_address_id] )
        myUser.currentAddress= address[myUser.user_address_id]; 
      else 
        myUser.currentAddress = {}; 
      
      if (cars[myUser.user_car_id] ){
        myUser.currentCar = cars[myUser.user_car_id]; 
        myUser.currentCar = {...myUser.currentCar,userID: myUser.user_id}
      }
      else 
        myUser.currentCar = {}; 
      
      if (access[myUser.user_access_id] )
        myUser.currentAccess = access[myUser.user_access_id]; 
      else 
        myUser.currentAccess = {}; 
      
      if (products[myUser.user_product_buyed_id] )
        myUser.productsBuyed = products[myUser.user_product_buyed_id]; 
      else 
        myUser.productsBuyed = {};     
    return myUser;
  });
  
  // States
  this.state = {
    showModalCar : null,
    allUsers : this.myUserList,
    showCustomAlert: false
  }; 
  console.log(this.state.allUsers)

  // Binds
  this.setUsersChanges = this.setUsersChanges.bind(this)
  this.showModal = this.showModal.bind(this)
  this.closeModal = this.closeModal.bind(this)
  this.defaultAlert = this.defaultAlert.bind(this)
  this.showAlert = this.showAlert.bind(this)

};

  //Functions
  setUsersChanges (carChanged)
  {
    const newList = this.state.allUsers ;  
    const search = (element) =>  element.user_id === carChanged.userID; 
    let index = newList.findIndex(search);
    newList[index].currentCar = carChanged; 
    this.setState({allUsers: newList, showCustomAlert: true}); 
    setTimeout(()=>{
      this.setState({showCustomAlert: false}); 
    },5000) 
    this.closeModal();
  };

  showModal(carObject){
    console.log("SHOW MODAL : ",carObject);
    this.setState({
      showModalCar: carObject
      })
  };

  closeModal(){
    this.setState({
      showModalCar: null
    })
  };

  defaultAlert (alertObject)
  {
    this.setState({
      showCustomAlert: false  
    })
  }; 

  showAlert(){
    this.setState({
      showCustomAlert: true
    })
  };

  getuserdatas(){
    return (
      this.myUserList.map((user,i)=>
        {return ( 
          <TableRow
            key={user.user_id}  
            index={i}  
            userData={this.myUserList}    
          > 
            <td >{user.user_first_name}</td> 
            <td>{user.user_birth_date}</td>
            <td>{user.user_gender}</td>
            <td>{ user.currentJob.user_job_title ?  user.currentJob.user_job_title : ''}</td>
            <td>{ user.currentJob.user_job_salary && user.currentJob.user_job_salary_currency_symbol ?  user.currentJob.user_job_salary_currency_symbol +' '+ user.currentJob.user_job_salary : ''}</td>
            <td>{ user.currentAddress.user_address_city ?  user.currentAddress.user_address_city : ''}</td>
            <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={(event) => event.stopPropagation()}>
              <button
                style={{ cursor: "pointer", textDecoration: "none", border: "2px solid #ff6e6e" }}
                onClick={() => this.showModal(user.currentCar)} >Mostrar
              </button>
            </td>
            <td style={{ position: "relative"}}> 
              {(i % 2 === 0) && (i % 4 === 0) ? 
                <FontAwesomeIcon icon={faUserAlt} style={{fontSize:"20px",color:"#15a36f", position:"absolute",top: "50%", left: "50%",transform: "translate(-50%, -50%)"}}/> 
                : 
                <FontAwesomeIcon icon={faUserAltSlash} style={{fontSize:"20px",color:"#a8140c", position:"absolute",top: "50%", left: "50%",transform: "translate(-50%, -50%)"}}/>
              }
            </td>
          </TableRow> 
        )}
      )
    )
  };

  render(){
    return (
      <div style={{width:"100%", height:"100%"}}>
        {this.state.showCustomAlert ?
          <CustomAlerts
            textAlert= "Carro foi alterado com sucesso! "
            successAlert = {true}
            alertObject ={
              this.state.showCustomAlert
            }
            showCustomAlert = {
              this.showAlert
            }
            closeTime = {4000}
          /> 
          :
          null
        } 
        {this.state.showModalCar ?
          <ModalCar 
            carObject={
              this.state.showModalCar
            }
            closeHandler = {
              this.closeModal
            } 
            saveChanges = {
              this.setUsersChanges
            }
          />
          : 
          null
        }
        <table style={{width:"100%", backgroundColor:"#a3a3a3"}}>
          <thead>
            <tr style={{color:"#f5f0f4",fontSize:"15px",backgroundColor:"red",padding:"10px 10px"}}>
              <th>Nomes</th>
              <th>Data de Nascimento</th>
              <th>Genero</th>
              <th>Trabalho</th>
              <th>Salario</th>
              <th>Endereço</th>
              <th>Carro</th>
              <th>Disponível</th>
            </tr>
          </thead>
          <tbody>
              {this.getuserdatas()}
          </tbody> 
        </table>
      </div>
    )
  };
}

export default Table;

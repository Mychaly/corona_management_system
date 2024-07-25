import React, { useEffect, useState } from "react";
import PersonService from "../Services/personService";
import coronaService from "../Services/coronaService";
import PhotoUploader from "./images";
import Summary from "./summary";
import './styles.css';


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

//img
import { useDropzone } from 'react-dropzone';


const ShowPersons = () => {
  const [newPerson, setNewPerson] = useState({
    id: 0,
    fullName: "",
    tz: "",
    city: "",
    street: "",
    houseNumber: 0,
    dateOfBirth: "",
    phone: "",
    mobilePhone: "",
  });
  const [newCorona, setNewCorona] = useState({
    id: 0,
    positiveResultDate: "",
    recoveryDate: "",
    dateA: "",
    dateB: "",
    dateC: "",
    dateD: "",
    manufacturerA: "",
    manufacturerB:"",
    manufacturerC: "",
    manufacturerD: "",
    personId: ""
  });
  const [isUpdate,setIsUpdate]=useState(false);
  const [allPersons, setallPersons] = useState([]);
  const[allCoronas,SetAllCoronas]=useState([]);
  const [open, setOpen] = React.useState(false);//window
  //validation
  const [fullNameError, setFullNameError] = useState(false);
  const [tzError, setTzError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [mphoneError, setmPhoneError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [recoveryError, setRecoveryError] = useState(false);
  const [positiveError, setPositiveError] = useState(false);
  //table section
  const [expanded, setExpanded] = React.useState(false);

 

  async function getallDetails() {
    const persons = await PersonService.getPersons();
    setallPersons(persons);
    const coronas=await coronaService.getAllCorona();
    SetAllCoronas(coronas)
  }

  async function addPerson(e) {
    e.preventDefault();
    await PersonService.addPerson(newPerson).then (() => {
       getallDetails();
       getallDetails();
       addCorona();
    })

   
    
}

  async function updatePerson(e) {
    e.preventDefault();
    await PersonService.updatePerson(newPerson.id,newPerson).then(await getallDetails())
    
    const updateP = allPersons.map(person => {
        if (person.id === newPerson.id) {
            return newPerson;
        }
        return person;
    });
    setallPersons(updateP);
    if(await coronaService.getCorona(newPerson.id))
       await coronaService.updateCorona(newPerson.id, newCorona);
    else
      await addCorona();
    setIsUpdate(false);  
  }

  async function deleteTodo(id) {
    await PersonService.deletePerson(id);
    await getallDetails();
  }

  async function addCorona() {
    var p;
    try {
       p = await PersonService.getPerson(newPerson.tz);
    } catch (error) {
      await getallDetails();
      p = await PersonService.getPerson(newPerson.tz);
     
    }
    const updatedCorona = { 
        id: 0,
        positiveResultDate: newCorona.positiveResultDate,
        recoveryDate: newCorona.recoveryDate,
        dateA:newCorona.dateA,
        dateB:newCorona.dateB,
        dateC:newCorona.dateC,
        dateD:newCorona.dateD ,
        manufacturerA: newCorona.manufacturerA,
        manufacturerB:newCorona.manufacturerB,
        manufacturerC: newCorona.manufacturerC,
        manufacturerD:newCorona.manufacturerD ,
        personId: p.id //personId
    };
    setNewCorona(updatedCorona);
    await coronaService.addCorona(updatedCorona);  
  }

 async function startUpdate(person) {
    const coronaToFull= await coronaService.getCorona(person.id)
    setNewCorona(coronaToFull)
    setNewPerson(person);
    setIsUpdate(true);
    handleClickOpen();
    setValidFalse();
  }
  
 async function save(e){
    if(isUpdate==true){ 
       await updatePerson(e);}
    else{await addPerson(e);
    }
    setPut();
    await getallDetails();
    handleClose();
  }



   useEffect(() => {
    getallDetails();
  }, [open]); 

  // useEffect(() => {
  //  // getallDetails();
  //  console.log("hi")
  // },[]); 


   function getCorona(person){
    const c= allCoronas.find(x=>x.personId==person.id)
    return c;   
  }
  function getIdPerson(person){ 
    const c=allPersons.find(x=>x.tz==person.tz)
    console.log('id',c)
    return c.id
  }

  function setPut(){
    setNewPerson({
      id: 0,
      fullName: "",
      tz: "",
      city: "",
      street: "",
      houseNumber: 0,
      dateOfBirth: "",
      phone: "",
      mobilePhone: ""
    });
    setNewCorona({
      id: 0,
      positiveResultDate: "",
      recoveryDate: "",
      dateA: "",
      dateB: "",
      dateC: "",
      dateD: "",
      manufacturerA: "",
      manufacturerB:"",
      manufacturerC: "",
      manufacturerD: "",
      personId: ""
    })
    
  }

  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

  };
  
  //window
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  const handleClickOpen = () => {
      setValidTrue();
      setOpen(true);    
  };
  
  const handleClose = () => { 
      setValidFalse();
      setIsUpdate(false)
      setOpen(false);
      setPut();    
    };

    //validation
    const currentDate = new Date().toISOString().split('T')[0]; //current date
    const setValidTrue=()=>{   
        setFullNameError(true);
        setTzError(true)
        setPhoneError(true)
        setmPhoneError(false)
        setDateError(true)
        setRecoveryError(false)
        setPositiveError(false)
    }
    const setValidFalse=()=>{    
        setFullNameError(false);
        setTzError(false)
        setPhoneError(false)
        setmPhoneError(false)
        setDateError(false)
        setRecoveryError(false)
        setPositiveError(false)
    }
    const validDateRecovery=(e)=>{
        if(e.target.value>currentDate)
          {setRecoveryError(true);console.log("yes")}
        else if (newPerson.dateOfBirth&&e.target.value!=""&&(e.target.value<newPerson.dateOfBirth)) 
          {setRecoveryError(true);}
        else if(newPerson.positiveResultDate&&e.target.value!=""&&e.target.value>newPerson.positiveResultDate)
          {setRecoveryError(true);}       
        else {setRecoveryError(false);} 
    }
    const validDatePositive=(e)=>{
      if(e.target.value>currentDate)
         {setPositiveError(true);console.log("yes")}
      else if (newPerson.dateOfBirth&&e.target.value!=""&&(e.target.value<newPerson.dateOfBirth||e.target.value>currentDate)) 
        {setPositiveError(true);}
      else if(newPerson.recoveryDate&&e.target.value!=""&&e.target.value<newPerson.recoveryDatee)
        {setPositiveError(true);}       
      else {setPositiveError(false);} 
  }
      

  return (
    <section >
      <header >
        <h1>CORONA MANAGEMENT SYSTEM</h1>
        <Summary></Summary>
      </header>
      <section className="section">     
   <ul >
        <Accordion>
        <AccordionSummary>
          <Typography sx={{ width: '15%', flexShrink: 0 }}>
          {"NAME"}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {"ID"}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {"DATE"}
          </Typography>
          <Typography sx={{ width: '17%', flexShrink: 0 }}>
          {"ADRESS"}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {"PHONE"}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {"MOBILE PHONE"}
          </Typography>
          <Typography sx={{ width:'10%'  }}></Typography>
          <Typography sx={{ color: 'blue'  }}>
          <Button variant="outlined" id="add" onClick={handleClickOpen} >+</Button>
          
          </Typography>
          </AccordionSummary>
        </Accordion>          
          {allPersons.map((person) => {
            return (
              <li key={person.id}>
          <Accordion expanded={expanded === person.id} onChange={handleChange(person.id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor:'#9adee6'  ,border:'solid white 1px'}}>
          <Typography sx={{ width: '15%', flexShrink: 0 }}>
          {person.fullName}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {person.tz}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {person.dateOfBirth}
          </Typography>
          <Typography sx={{ width: '17%', flexShrink: 0 }}>
          {person.city+' '+person.street+' '+ person.houseNumber}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {person.phone}
          </Typography>
          <Typography sx={{ width: '10%', flexShrink: 0 }}>
          {person.mobilePhone}
          </Typography  >
           <Typography sx={{ width: '5%', flexShrink: 0 }}>
          </Typography>
          <Typography sx={{ color: 'blue'  }}>
            <button onClick={() => deleteTodo(person.id)}>delete</button>
            <button onClick={() => startUpdate(person)}>update</button>
             <PhotoUploader tz={person.tz}></PhotoUploader>       
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="more">
           <p className="datesA">  recovery date: { getCorona(person)?.recoveryDate+" | "}
            positive result date:{getCorona(person)?.positiveResultDate}</p>
            <table>
              <thead>
               <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>manufacturer</td>
                  <td>{getCorona(person)?.manufacturerA}</td>
                  <td>{getCorona(person)?.manufacturerB}</td>
                  <td>{getCorona(person)?.manufacturerC}</td>
                  <td>{getCorona(person)?.manufacturerD}</td>
               </tr>
                <tr>
                  <td>date</td>
                  <td>{getCorona(person)?.dateA}</td>
                  <td>{getCorona(person)?.dateB}</td>
                  <td>{getCorona(person)?.dateC}</td> 
                   <td>{getCorona(person)?.dateD}</td> 
                </tr>
              </tbody>
            </table>
          </Typography>
        </AccordionDetails>
      </Accordion>
              </li>
            );
          })}
        </ul>
      </section>
   
            
            <React.Fragment>
     
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{isUpdate ? <p>update</p>:<p>add</p>}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <form>
           
               <p>name <input type="text" placeholder='שם מלא' value={newPerson.fullName}
                onChange={(e) => {
                  if (e.target.value === "") {setFullNameError(true);}
                   else {setFullNameError(false);
                   } 
                   setNewPerson({ ...newPerson, fullName: e.target.value });}}></input>{fullNameError && <span className="error-message">*invalid</span>}</p>
               <p>tz <input type="text" id="tz" maxLength={9} placeholder='תעודת זהות' value={newPerson.tz} 
                onChange={(e) =>{
                  var x=allPersons.find(x=>x.tz==e.target.value) 
                  if((e.target.value === "")||(x!=null)){setTzError(true);}
                  else if(isNaN(e.target.value)||e.target.value.length<9){setTzError(true);}
                  else {setTzError(false);} setNewPerson({ ...newPerson, tz: e.target.value })}}></input>{tzError && <span className="error-message">*invalid</span>}</p>
               <p>date<input type="date" value={newPerson.dateOfBirth} 
                onChange={(e) =>{
                  if (e.target.value === ""||e.target.value>currentDate) {setDateError(true);}
                  else {setDateError(false);} 
                 setNewPerson({ ...newPerson, dateOfBirth: e.target.value })}}></input>{dateError && <span className="error-message">*invalid</span>}</p>
               <p>city <input type="text" placeholder='עיר ' value={newPerson.city} onChange={(e) => setNewPerson({ ...newPerson, city: e.target.value })}></input></p>
               <p>street <input type="text" placeholder='רחוב ' value={newPerson.street} onChange={(e) => setNewPerson({ ...newPerson, street: e.target.value })}></input> {"  "}
                 number<input type="number" id="housNum" min={0} max={999}  maxLength={3}  value={newPerson.houseNumber} onChange={(e) => setNewPerson({ ...newPerson, houseNumber: e.target.value })}></input>{(newPerson.houseNumber==""||(newPerson.houseNumber<0||newPerson.houseNumber>999)) && <span className="error-message">*invalid</span>}</p>
                <p>phone <input type="text" maxLength={9} value={newPerson.phone} 
                onChange={(e) =>{ 
                  if (e.target.value === ""||isNaN(e.target.value)||e.target.value.length!=9) {setPhoneError(true);}
                  else setPhoneError(false);
                  setNewPerson({ ...newPerson, phone: e.target.value })}}></input>{phoneError && <span className="error-message">*invalid</span>}</p>
                <p>m-phone <input type="text" maxLength={10} placeholder=' פלאפון' value={newPerson.mobilePhone}
               onChange={(e) =>{ 
                  if (e.target.value!= "" && isNaN(e.target.value)) {setmPhoneError(true);}
                  else setmPhoneError(false);
                  setNewPerson({ ...newPerson, mobilePhone: e.target.value })}}></input>{mphoneError && <span className="error-message">*invalid</span>}</p>

                <p>positive result <input type="date" value={newCorona.positiveResultDate} onChange={(e) =>{validDatePositive(e); setNewCorona({ ...newCorona, positiveResultDate: e.target.value })}}></input>{positiveError && <span className="error-message">*invalid</span>}</p>
                <p>recovery <input  type="date" value={newCorona.recoveryDate} onChange={(e) =>{validDateRecovery(e); setNewCorona({ ...newCorona, recoveryDate: e.target.value })}}></input>{recoveryError && <span className="error-message">*invalid</span>}</p> 

                <p>manufacturer <input type="text"  value={newCorona.manufacturerA} onChange={(e) => setNewCorona({ ...newCorona, manufacturerA: e.target.value })}></input> date <input type="date" value={newCorona.dateA} onChange={(e) => setNewCorona({ ...newCorona, dateA: e.target.value })}></input>{(newCorona.dateA!=""&&(newCorona.dateA>currentDate||newCorona.dateA<newPerson.dateOfBirth))&& <span className="error-message">*invalid</span>}</p>
                <p>manufacturer <input type="text"  value={newCorona.manufacturerB} onChange={(e) => setNewCorona({ ...newCorona, manufacturerB: e.target.value })}></input> date <input type="date" value={newCorona.dateB} onChange={(e) => setNewCorona({ ...newCorona, dateB: e.target.value })}></input>{(newCorona.dateB!=""&&(newCorona.dateB>currentDate||newCorona.dateB<newPerson.dateOfBirth))&& <span className="error-message">*invalid</span>}</p>
                <p>manufacturer <input type="text"  value={newCorona.manufacturerC} onChange={(e) => setNewCorona({ ...newCorona, manufacturerC: e.target.value })}></input> date <input type="date" value={newCorona.dateC} onChange={(e) => setNewCorona({ ...newCorona, dateC: e.target.value })}></input>{(newCorona.dateC!=""&&(newCorona.dateC>currentDate||newCorona.dateC<newPerson.dateOfBirth))&& <span className="error-message">*invalid</span>}</p>
                <p>manufacturer <input type="text"  value={newCorona.manufacturerD} onChange={(e) => setNewCorona({ ...newCorona, manufacturerD: e.target.value })}></input> date <input type="date" value={newCorona.dateD} onChange={(e) => setNewCorona({ ...newCorona, dateD: e.target.value })}></input>{(newCorona.dateD!=""&&(newCorona.dateD>currentDate||newCorona.dateD<newPerson.dateOfBirth))&& <span className="error-message">*invalid</span>}</p>
                                                                                                                                                                                                                                                                                            
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={save} disabled={newPerson.fullName === "" || newPerson.tz === ""|| isNaN(newPerson.tz) || newPerson.phone === "" || 
          newPerson.phone.length!=9||isNaN(newPerson.phone) || isNaN(newPerson.mobilePhone)|| newPerson.dateOfBirth > currentDate ||
          (newCorona.recoveryDate && (newCorona.recoveryDate > currentDate||(newPerson.dateOfBirth&&newCorona.recoveryDate<newPerson.dateOfBirth)) )||
          (newCorona.dateA!=""&&(newCorona.dateA>currentDate||newCorona.dateA<newPerson.dateOfBirth))||
          (newCorona.dateB!=""&&(newCorona.dateB>currentDate||newCorona.dateB<newPerson.dateOfBirth))||
          (newCorona.dateC!=""&&(newCorona.dateC>currentDate||newCorona.dateC<newPerson.dateOfBirth))||
          (newCorona.dateD!=""&&(newCorona.dateD>currentDate||newCorona.dateD<newPerson.dateOfBirth))||
          (newPerson.houseNumber==""||(newPerson.houseNumber<0||newPerson.houseNumber>999))}>save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </section>
  );
};
export default ShowPersons;

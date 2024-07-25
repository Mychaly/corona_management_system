import axios from "axios";

//const apiUrl = "https://localhost:5000";//כאן להזין את שדה הפורט וכך נוכל להתחבר לאפליקציה
const apiUrl="https://localhost:7069/api/Corona"

export default {
  getAllCorona: async () => {
    const result = await axios.get(`${apiUrl}`);
    console.log("GET",result.data)
    return result.data;
  },

  getCorona: async (id) => {
    const result = await axios.get(`${apiUrl}/`+id);
  //const result = await axios.get(`${apiUrl}/Course`);
    console.log("get",result)
    return result.data;
  },

  addCorona: async (corona) => {
  return  axios.post(`${apiUrl}`,{
        id: 0,
        positiveResultDate: corona.positiveResultDate,
        recoveryDate: corona.recoveryDate,
        dateA: corona.dateA,
        dateB: corona.dateB,
        dateC: corona.dateC,
        dateD: corona.dateD,
        manufacturerA: corona.manufacturerA,
        manufacturerB:corona.manufacturerB,
        manufacturerC: corona.manufacturerC,
        manufacturerD: corona.manufacturerD,
        personId: corona.personId//id של newperson
  }).then(res => {
               console.log("addCorona", corona);
            })
   
  },

  updateCorona: async (idP,corona) => {
    console.log(idP)
    console.log(corona)
    axios.put(`${apiUrl}/`+idP,{
        id: 0,
        positiveResultDate: corona.positiveResultDate,
        recoveryDate: corona.recoveryDate,
        dateA: corona.dateA,
        dateB: corona.dateB,
        dateC: corona.dateC,
        dateD: corona.dateD,
        manufacturerA: corona.manufacturerA,
        manufacturerB:corona.manufacturerB,
        manufacturerC: corona.manufacturerC,
        manufacturerD: corona.manufacturerD,
        personId: idP
}).then(res => {
             console.log("updateCorona", corona);
          })
    return {};
  },

  deleteCorona: async (id) => {    
    const result=await axios.delete(`${apiUrl}/`+id)
    console.log("deleteCorona");
  },
};

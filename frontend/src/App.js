import './App.css';
import useSWR from 'swr';
import { useState } from 'react';

const App = () => {
  const [FistName,setFirstname] = useState(null);
  const [Surname,setSurname] = useState(null);
  const [Reg,setReg] = useState(null);
  const [Contact,setContact] = useState(null);
  const [Email,setEmail] = useState(null);

  const handleInsert = () => {
    fetch('/api/students/',{
      method:'POST',
      body:JSON.stringify({
        'firstname':FistName,
        'surname':Surname,
        'registration':Reg,
        'contact':Contact,
        'email':Email
      }),
      headers:{
        'Content-Type':'application/json',
        'op-type':'insert'
      }
    }).then(res=>res.json())
    .then(res=>{
      if(res.status){
        const heading = document.getElementById('heading')
        const tr = document.createElement('tr');
        const firstname = document.createElement('td');
        firstname.textContent = FistName;
        const surname = document.createElement('td');
        surname.textContent = Surname;
        const reg = document.createElement('td');
        reg.textContent = Reg;
        const contact = document.createElement('td');
        contact.textContent = Contact;
        const email = document.createElement('td');
        email.textContent = Email;
        const del = document.createElement('button');
        del.textContent = "Delete"
        del.setAttribute('id',Reg)
        del.addEventListener('click',handleDelete)
        tr.append(firstname,surname,reg,contact,email,del)
        heading.insertAdjacentElement('afterend',tr)
      }
    })
  }

  const handleDelete = (e)=> {
    const registration = e.target.id
    fetch('api/students',{
      method:'POST',
      body:JSON.stringify({
        registration:registration
      }),
      headers:{
        'Content-type':'application/json',
        'op-type':'delete'
      }
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.status){
        const deleteStudent = document.getElementById(`tr-${registration}`);
        document.getElementById('tbody').removeChild(deleteStudent)
      }
    })
  }

  const {data,error} = useSWR('/api/students/get',(url)=>fetch(url).then(res=>res.json()))
  if(error){
    return(
      <div>
        error - {error}
      </div>
    )
  }
  if(!data){
    return(
      <div>
        Loading
      </div>
    )
  }
  if(data.status){
    return(
      <div className='body'>
        <div className='container'>
            <table id='table'>
              <thead>
                <tr id='heading'>
                  <th>
                    FirstName
                  </th>
                  <th>
                    Surname
                  </th>
                  <th>
                    Registration Number
                  </th>
                  <th>
                    Contact
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Option
                  </th>
                </tr>
              </thead>
              <tbody id='tbody'>
              {data.details?.map((row, index) => (
                <tr key={index} id={`tr-${row.registration}`}>
                  <td>{row.firstname}</td>
                  <td>{row.surname}</td>
                  <td>{row.registration}</td>
                  <td>{row.contact}</td>
                  <td>{row.email}</td>
                  <td><button onClick={handleDelete} id={row.registration} >Delete</button></td>
                </tr>
              ))}
                <tr>
                  <td><input onChange={(e)=>{setFirstname(e.target.value)}} type='text' /></td>
                  <td><input onChange={(e)=>{setSurname(e.target.value)}} type='text'/></td>
                  <td><input onChange={(e)=>{setReg(e.target.value)}} type='text'/></td>
                  <td><input onChange={(e)=>{setContact(e.target.value)}} type='number'/></td>
                  <td><input onChange={(e)=>{setEmail(e.target.value)}} type='text'/></td>
                  <td><button onClick={handleInsert}>insert</button></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default App;

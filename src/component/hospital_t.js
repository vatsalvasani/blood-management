import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

// Component's Base CSS
import '../css/user.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];
let result = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Hospitals/`+sessionStorage.getItem('id'),{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      },)
        .then((res)=>
        {
            tasks = res.data;    
            console.log(tasks)      
        });   
        result = [];
        // console.log(tasks.a)
        tasks.a = (tasks.a).toString();
        tasks.a_positve = (tasks.a_positve).toString();
        tasks.b = (tasks.b).toString();
        tasks.b_positve = (tasks.b_positve).toString();
        tasks.c = (tasks.c).toString();
        tasks.c_positve = (tasks.c_positve).toString();
        tasks.ab = (tasks.ab).toString();
        tasks.aB_positve = (tasks.aB_positve).toString();

        result.push(tasks)
        let result1 = Array.from(result);
      console.log(result1)
      return Promise.resolve(result1);
    },
    update: async (data) => {
      const task = result.find(t => t.hospitalId === data.hospitalId);
      task.hospital_Name = data.hospital_Name;
      task.contat_no = data.contat_no;
      task.address = data.address;
      task.state = data.state;
      task.city = data.city;
      task.a = (data.a === 'true');
      task.a_positve = (data.a_positve === 'true');
      task.b = (data.b === 'true');
      task.b_positve = (data.b_positve === 'true');
      task.c = (data.c === 'true');
      task.c_positve = (data.c_positve === 'true');
      task.ab = (data.ab === 'true');
      task.aB_positve = (data.aB_positve === 'true');
      console.log(task)
    await axios.put(`${process.env.REACT_APP_API_URL}/api/Hospitals/`+task.hospitalId,task,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  },)
        .then((res)=>
        {    
            console.log(res)      
        });
        return Promise.resolve(tasks);
    },
    delete: async(data) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Hospitals/`+data.hospitalId,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      },)
        .then((res)=>
        {    
            console.log(res)      
        });
      service.fetchItems();   
      return Promise.resolve(tasks);
    },
  };

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Example5 = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Hospital Information"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="hospitalId"
          label="Hospital Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="hospital_Name"
          label="Hospital Name"
          placeholder="Your Name"
        />
        <Field
          name="contat_no"
          label="Contact No."
        />
      <Field
          name="address"
          label="Address"
        />
        <Field
          name="city"
          label="City"
        />
        <Field
          name="state"
          label="State"
        />
        <Field
          name="a"
          label="A"
        />
        <Field
          name="a_positve"
          label="A+"
        />
        <Field
          name="b"
          label="B"
        />
        <Field
          name="b_positve"
          label="B+"
        />
        <Field
          name="c"
          label="C"
        />
        <Field
          name="c_positve"
          label="C+"
        />
        <Field
          name="ab"
          label="AB"
        />
        <Field
          name="aB_positve"
          label="AB+"
        />
      </Fields>

      <UpdateForm
        title="Hospital Update Process"
        message="Update Your Profile"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
          if (!((values.a=="true"||values.a=="false") && (values.a_positve=="true"||values.a_positve=="false") && (values.b=="true"||values.b=="false") && (values.b_positve=="true"||values.b_positve=="false") && (values.c=="true"||values.c=="false") && (values.c_positve=="true"||values.c_positve=="false") && (values.ab=="true"||values.ab=="false") && (values.aB_positve=="true"||values.aB_positve=="false")) ){
            errors.description = "Blood Groups Field Can Only Take true or false";
           } 
          if (!values.hospitalId) {
            errors.id = 'Please, provide id';
          }

          if (!values.hospital_Name) {
            errors.title = 'Please, provide Your Name';
          }

          if (!values.contat_no) {
            errors.description = 'Please, provide contact No.';
          }
          if (!values.address) {
            errors.description = 'Please, provide Address';
          }
          if (!values.state) {
            errors.description = 'Please, provide Your State';
          }
          if (!values.city) {
            errors.description = 'Please, provide Your City';
          }
          console.log(errors)
          return errors;
        }}
      />

      <DeleteForm
        title="Account Delete Process"
        message="Are you sure you want to delete Your Account?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.hospitalId) {
            errors.hospitalId = 'Please, provide Your id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
export default Example5;
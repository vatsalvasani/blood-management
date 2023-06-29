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
        await axios.get(`${process.env.REACT_APP_API_URL}/api/User/`+sessionStorage.getItem('id'),{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res)=>
        {
            tasks = res.data;    
            console.log(tasks)      
        });   
        result = [];
        result.push(tasks)
        let result1 = Array.from(result);
      console.log(result1)
      return Promise.resolve(result1);
    },
    update: async (data) => {
      const task = result.find(t => t.user1Id === data.user1Id);
      console.log(task)
      task.user_Name = data.user_Name;
      task.contact_no = data.contact_no;
      task.address = data.address;
      task.blood_type = data.blood_type;
      task.state = data.state;
      task.city = data.city;
    await axios.put(`${process.env.REACT_APP_API_URL}/api/User/`+task.user1Id,task,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
  })
        .then((res)=>
        {    
            console.log(res)      
        });
        return Promise.resolve(tasks);
    },
    delete: async(data) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/User/`+data.user1Id,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
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

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Your Personal Information"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="user1Id"
          label="User Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="user_Name"
          label="User Name"
          placeholder="Your Name"
        />
        <Field
          name="contact_no"
          label="Contact No"
        />
      <Field
          name="address"
          label="Address"
        />
        <Field
          name="blood_type"
          label="Blood Type"
        />
        <Field
          name="state"
          label="State"
        />
        <Field
          name="city"
          label="City"
        />
      </Fields>

      <UpdateForm
        title="User Update Process"
        message="Update Your Profile"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.user1Id) {
            errors.id = 'Please, provide id';
          }

          if (!values.user_Name) {
            errors.title = 'Please, provide Your Name';
          }

          if (!values.contact_no) {
            errors.description = 'Please, provide contact No.';
          }
          if (!values.address) {
            errors.description = 'Please, provide Address';
          }
          if (!values.blood_type) {
            errors.description = 'Please, provide Blood Type';
          }
          if (!values.city) {
            errors.description = 'Please, provide Your City';
          }
          if (!values.state) {
            errors.description = 'Please, provide Your State';
          }

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
          if (!values.user1Id) {
            errors.user1Id = 'Please, provide Your id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
export default Example;
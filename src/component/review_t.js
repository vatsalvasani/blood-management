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

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Review1/getreview/`+sessionStorage.getItem('id'),{
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
        let result = [];
        result.push(tasks)
      console.log(result)
      return Promise.resolve(tasks);
    },
    update: async (data) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/Review1/review/`+data.review1Id+'/'+data.description,{},{
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
    delete: async(data) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Review1/`+data.review1Id,{
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

const Example1 = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Review Added By You"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="review1Id"
          label="Review Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="user1Id"
          label="User Id"
          placeholder="Title"
          hideInCreateForm
          readOnly
        />
        <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
        />
      </Fields>

      <UpdateForm
        title="Review Update Process"
        message="Update Review"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.review1Id) {
            errors.id = 'Please, provide id';
          }

          if (!values.user1Id) {
            errors.title = 'Please, provide task\'s title';
          }

          if (!values.description) {
            errors.description = 'Please, provide task\'s description';
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Review Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.review1Id) {
            errors.review1Id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
export default Example1;
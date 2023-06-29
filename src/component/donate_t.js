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
import '../css/user.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];

  const service = {
    fetchItems: async (payload) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Donors/donate/`+sessionStorage.getItem('id'),{
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
  };

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Example3 = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Your Contribution Towards Society"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="donorId"
          label="Donation Id"
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
          name="donationDate"
          label="Date And Time Of Donation"
          render={DescriptionRenderer}
        />
      </Fields>
    </CRUDTable>
  </div>
);
export default Example3;
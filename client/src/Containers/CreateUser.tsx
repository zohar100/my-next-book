import { useState, FC } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../Graphql/Mutation';



const CreateUser: FC = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: ''
    });
    const [createUser, {error}] = useMutation(CREATE_USER);
    
    
    const handleForm = (e: any) => {
    setForm({...form, [e.target.name]: e.target.value});    
    }
    
    const handleSubmit = () => {
        // createUser({variables: {
        //     name: form.name,
        //     username: form.username,
        //     password: form.password
        // }});
    }

    return (
        <div className='createUser'>
            <input 
            type="text" 
            placeholder='name' 
            name='name' 
            onChange={e => handleForm(e)}/>
            <input 
            type="text" 
            placeholder='username' 
            name='username' 
            onChange={e => handleForm(e)}/>
            <input 
            type="text" 
            placeholder='password' 
            name='password' 
            onChange={e => handleForm(e)}/>
            <button 
            onClick={() => handleSubmit()}>Create User</button>
        </div> 
    )
};

export default CreateUser;

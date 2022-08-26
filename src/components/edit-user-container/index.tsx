import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { User } from '../../interfaces/user';
import { editUserData } from '../../store/actions/users/users.actions';
import _ from "lodash";

import "./index.scss";

interface PropTypes {
    user: User;
    onClose: () => void;
}

export const EditUserContainer = (props: PropTypes) => {
    const dispatch = useDispatch<any>();
    const {user, onClose} = props;

    const userData: Partial<User> & Pick<User, 'id'> = {
        name: user.name,
        location: user.location,
        phone: user.phone,
        cell: user.cell,
        email: user.email,
        id: user.id
    };

    const { formState, onInputChange, name, email, location, phone, cell} = useForm(userData);

    const handleInputChange = (event: any ) => {
        if (event.target.name === "first" || event.target.name === "last") {
            onInputChange(event, "name")
        } else if (event.target.name === "country" || event.target.name === "city") {
            onInputChange(event, "location")
        } else {
            onInputChange(event);
        }
    } 

    const handleSubmitEditUser = (event: any) => {
        event.preventDefault();
        dispatch(editUserData(formState));
        onClose();
    }

    return (
        <div className='edit-user-container'>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmitEditUser}>
                <div className='container'>
                    <div className='col'>
                        <div className='form-field'>
                            <label>
                                Nombre
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Nombre"
                                name="first"
                                value={ name.first }
                                onChange={ handleInputChange }
                            /> 
                        </div>
                        <div className='form-field'>
                            <label>
                                Apellido
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Apellido"
                                name="last"
                                value={ name.last }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className='form-field'>
                            <label>
                                Email
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            /> 
                        </div>
                        <div className='form-field'>
                            <label>
                                Ciudad
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Ciudad"
                                name="city"
                                value={ location.city }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-field'>
                            <label>
                                País
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="País"
                                name="country"
                                value={ location.country }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className='form-field'>
                            <label>
                                Celular
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Celular"
                                name="cell"
                                value={ cell }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className='form-field'>
                            <label>
                                Teléfono
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Teléfono"
                                name="phone"
                                value={ phone }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </div>
                <button type='submit' disabled={_.isEqual(userData, formState)}>
                    Guardar
                </button>
            </form>
        </div>
    )
}

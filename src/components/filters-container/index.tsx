import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setFilters } from '../../store/actions/users/users.actions';
import { RootState } from '../../store/reducers/root.reducer';

import "./index.scss";

interface PropTypes {
    onClose: () => void;
}

export const FiltersContainer = (props: PropTypes) => {
    const filters = useSelector((state: RootState) => state.users.filters);

    const { onClose} = props;
    
    const dispatch = useDispatch<any>();

    const { formState, onInputChange, first, last, email, city, country, phone, cell} = useForm(filters);

    const handleSubmitEditFilters = (event: any) => {
        event.preventDefault();
        dispatch(setFilters(formState));
        onClose();
    }

    return (
        <div className='filters-container'>
            <h2>Filtrar</h2>
            <form onSubmit={handleSubmitEditFilters}>
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
                                value={ first || undefined }
                                onChange={ onInputChange }
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
                                value={ last || undefined }
                                onChange={ onInputChange }
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
                                value={ email || undefined}
                                onChange={ onInputChange }
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
                                value={ city || undefined}
                                onChange={ onInputChange }
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
                                value={ country || undefined }
                                onChange={ onInputChange }
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
                                value={ cell || undefined }
                                onChange={ onInputChange }
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
                                value={ phone || undefined }
                                onChange={ onInputChange }
                            />
                        </div>
                    </div>
                </div>
                <button type='submit' disabled={_.isEqual(filters, formState)}>
                    Guardar
                </button>
            </form>
        </div>
    )
}

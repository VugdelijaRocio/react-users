import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../components/cards-list';
import { FiltersContainer } from '../../components/filters-container';
import { getUsersData } from '../../store/actions/users/users.actions';
import { RootState } from '../../store/reducers/root.reducer';
import { Dialog } from '../../ui/dialog';

import "./index.scss";

export const Home = () => {    
    const dispatch = useDispatch<any>();
    const [displayFilterModal, setDisplayFilterModal] = useState(false);
    const users = useSelector((state: RootState) => state.users.users);

    useEffect(() => {
        dispatch(getUsersData());
    }, [])


    const handleToggleModal = () => {
        console.log(displayFilterModal? "CERRO MODAL" : "ABRIO MODAL")
        setDisplayFilterModal(!displayFilterModal)
    }
   
    return (
        <div className='pages-home'>
            <div className='header'>
                <button onClick={handleToggleModal}>
                    Filtrar
                    <div>
                        <FaFilter />
                    </div>
                </button>
            </div>
            <CardsList />
            {displayFilterModal && users && (
                <Dialog onClose={handleToggleModal} >
                    <FiltersContainer onClose={handleToggleModal}/>
                </Dialog>
            )}
        </div>
    )
}

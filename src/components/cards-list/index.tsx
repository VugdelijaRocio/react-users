import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces/user';
import { RootState } from '../../store/reducers/root.reducer';
import { FiltersInitials } from '../../store/reducers/users.reducer';
import { Dialog } from '../../ui/dialog';
import { EditUserContainer } from '../edit-user-container';
import { UserCard } from '../user-card';

import "./index.scss";

interface SelectedUser {
    value: boolean,
    user?: User
}

export const CardsList = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const filters = useSelector((state: RootState) => state.users.filters);
    const [displayEditModal, setDisplayEditModal] = useState<SelectedUser>({value: false, user: undefined});
    const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>(users || []);

    const handleToggleModal = (user?: User) => {

        setDisplayEditModal({
            value: !displayEditModal,
            user: user,
        })
    }

    useEffect(() => {
        const noFilters = _.isEqual(filters, FiltersInitials);
        if ((noFilters && users) || !users) {
            setFilteredUsers(users)
        }
        else {
            const byPhone = filterBy(users, 'phone', filters.phone );
            const byEmail = filterBy(byPhone, 'email', filters.email);
            const byCell = filterBy(byEmail, 'cell', filters.cell);
            const byFirstName = filterByName(byCell,'first', filters.first);
            const byLastName = filterByName(byFirstName,'last', filters.last);
            const byCountry = filterByLocation(byLastName,'country', filters.country);
            const newFiltered = filterByLocation(byCountry,'city', filters.city);
            setFilteredUsers(newFiltered);
        }
    }, [filters, users])
    
    const filterBy= (users: User[], filter: "phone" | "cell" | "email", filterText?: string) => {
        if (!filterText) {
            return users;
        } else return users.filter((u) => (u[filter]?.toLowerCase().includes(filterText.toLowerCase())));
    }

    const filterByLocation = (users: User[], filter: "city" | "country", filterText?: string ) => {
        if (!filterText) {
            return users;
        } else return users.filter((u) => (u.location[filter]?.toLowerCase().includes(filterText.toLowerCase())));
    }

    const filterByName = (users: User[], filter: 'first' | 'last', filterText?: string ) => {
        if (!filterText) {
            return users;
        } else return users.filter((u) => (u.name[filter]?.toLowerCase().includes(filterText.toLowerCase())));
    }

    return (
        <div className='cards-list'>
            {
                filteredUsers && filteredUsers.length > 0 && filteredUsers.map((u) => (
                    <UserCard key={u.id} user={u} onClickEditUser={handleToggleModal}/>
                ))
            }
            {
            displayEditModal.user && filteredUsers && filteredUsers.length > 0 && (
                <Dialog onClose={handleToggleModal}  onClickOutside={handleToggleModal}>
                    <EditUserContainer user={displayEditModal.user} onClose={handleToggleModal}></EditUserContainer>
                </Dialog>
            )}
        </div>
    )
}

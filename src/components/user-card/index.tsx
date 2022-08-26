import React from 'react';
import { User } from '../../interfaces/user';
import { FaUserEdit } from 'react-icons/fa';

import './index.scss';

interface PropTypes {
    user: User;
    onClickEditUser: (user?: User) => void;
}

export const UserCard = (props: PropTypes ) => {
    const {user, onClickEditUser} = props;

    const handleEditUser = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClickEditUser(user);
    };


    return (
        <div className='user-card'>
            <div className='card-header'>
                <button onClick={handleEditUser}>
                    <FaUserEdit />
                </button>
                <h3 className='name'>{`${user.name.first} ${user.name.last}`}</h3>
            </div>
            <div className='card-content'>
                <div className='img-wrapper'>
                    <img src={user.picture.large} alt="user"/>
                </div>
                <div className='details-wrapper'>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        {user.cell ? user.cell : user.phone}
                    </div>
                    <div>
                        {user.location.city}, {user.location.country}
                    </div>
                </div>
            </div>
        </div>
    )
}

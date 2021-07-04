import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid'
import UserItem from './UserItem';
import Create from './Create';
import Update from './Update';
import Favourites from './Favourites';
import UserFavListWrapper from './Style/User/UserFavListWrapper';
import ListTitle from './Style/User/ListTitle';
import ListWrapper from './Style/User/ListWrapper';
import EmptyText from './Style/Common/EmptyText';


function User() {
    //states
    const [name, setName] = useState('');
    const [editObj, setEditObj] = useState('');

    const [nameErr, setNameErr] = useState(false);
    const [nameErrMsg, setNameErrMsg] = useState('');
    const [updateNameErr, setUpdateNameErr] = useState(false);
    const [updateErrMsg, setUpdateErrMsg] = useState('');

    const dispatch = useDispatch();

    const state = useSelector(function (state) {
        return state.user;
    });
    const stateModal = useSelector(function (state) {
        return state.user.modal;
    });



    const clickHandler = () => {
        const submitedName = name.trim();
        const length = submitedName.length;

        if (length >= 3 && length <= 25) {
            const user = {
                id: nanoid(),
                name: name,
                isFav: false
            }

            dispatch({ type: "CREATE_USER", payload: user });
            setName("");
        }
        else if (length > 25 || (length < 3 && length > 0)) {
            setNameErrMsg('Name must be greater than 3 and less than or equal to 25 characters');
            setNameErr(true);
        }
        else {
            setNameErr(true);
            setNameErrMsg('Name is required');
        }
    }

    const deleteHandler = (user) => {
        dispatch({
            type: "DELETE_USER",
            payload: user
        })
    }


    const updateHandler = () => {
        const submitedName = editObj.name.trim();
        const length = submitedName.length;
        // validation input length for update name
        if (length >= 3 && length <= 25) {
            dispatch({
                type: "UPDATE_USER",
                payload: editObj
            })

            dispatch({
                type: 'MODAL',
                payload: false
            })

            setEditObj({
                name: '',
                id: '',
                isFav: false
            });
            setUpdateNameErr(false);
            setUpdateErrMsg('');
        }
        else if (length > 25 || (length < 3 && length > 0)) {
            setUpdateErrMsg('Name must be greater than 3 and less than or equal to 25 characters');
            setUpdateNameErr(true);
        }
        else {
            setUpdateNameErr(true);
            setUpdateErrMsg('Name is required');

        }





    }

    const cancelHandler = () => {
        dispatch({
            type: 'MODAL_CANCEL',
            payload: false
        })
        setUpdateNameErr(false);
        setUpdateErrMsg('');
    }



    return (
        <UserFavListWrapper>
            <ListWrapper>
                <Create 
                    name={name} 
                    clickHandler={clickHandler}
                    setName={setName} 
                    nameErrMsg={nameErrMsg} 
                    setNameErr={setNameErr} 
                    nameErr={nameErr}
                />
                
                <ListTitle>User List</ListTitle>
                {
                    state.length > 0
                        ? <UserItem state={state} deleteHandler={deleteHandler} setEditObj={setEditObj} />
                        : <EmptyText>User list is empty</EmptyText>
                }

                <Update 
                    stateModal={stateModal} 
                    editObj={editObj} 
                    setEditObj={setEditObj} 
                    cancelHandler={cancelHandler} 
                    updateHandler={updateHandler} 
                    updateNameErr={updateNameErr} 
                    setUpdateNameErr={setUpdateNameErr} 
                    updateErrMsg={updateErrMsg}
                    setUpdateErrMsg={setUpdateErrMsg}
            />
            </ListWrapper>


            <Favourites nameErr={nameErr}/>
        </UserFavListWrapper>
    )
}

export default User;

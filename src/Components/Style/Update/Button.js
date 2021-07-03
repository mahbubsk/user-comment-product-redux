import styled from 'styled-components';

const Button = styled.button`
    outline: none;
    border:none;
    padding:5px 10px;
    font-size:16px;
    background-color: transparent;
    margin-top:15px;
    cursor:pointer;
    border-radius: 3px;
    color:#000;
    margin-left: 5px;
    transition: all 0.3s;
    border:${props=>props.saveButton ? '1px solid #319795' : '1px solid #c53030'};

    &:hover{
        background:${props=>props.saveButton ? 'rgba(49, 151, 149,0.05)' : 'rgba(197, 48, 48,0.1)'};
    }
`

export default Button;
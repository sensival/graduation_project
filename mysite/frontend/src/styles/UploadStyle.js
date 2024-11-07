import styled from 'styled-components';

export const UploadContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;

    h3 {
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 10px;
    }

    input,
    textarea {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
`;

import React, {useContext} from 'react';
import ITodo from '../interfaces/ITodo';

import {
    IonLabel,
    IonButton
} from '@ionic/react';

import TodoContext from '../context/TodoContext';
import axios from "axios";

const TodoCard: React.FC<ITodo> = (props) => {

    //@ts-ignore
    const {setTodoList} = useContext(TodoContext);

    const deleteTodo = async (id: number) => {
        try {
            const resultDelete = await axios.delete(`http://152.70.121.221/api/v1/todos/${id}`, {});
            const result =  await axios.get('http://152.70.121.221/api/v1/todos/', {});
            setTodoList(result.data);
        } catch (e) {
            //@ts-ignore
            console.log(e.status);
        }
    };

    const editTodo = async (id: number) => {
        try {
            const resultEdit = await axios.put(`http://152.70.121.221/api/v1/todos/${id}`, {});
            const result =  await axios.get('http://152.70.121.221/api/v1/todos/', {});
            setTodoList(result.data);
        } catch (e) {
            //@ts-ignore
            console.log(e.status);
        }
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 250px",
            margin: "15px"
        }}>

            <div style={{display: "inline-block"}}>
                <IonLabel style={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    display: "block",
                    textAlign: "left"
                }}>{props.title}</IonLabel>

                <div style={{textAlign: "left"}}>{props.description}</div>

                <IonLabel style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    display: "block", textAlign: "justify"
                }}>{props.date}</IonLabel>
            </div>
            <div style={{justifySelf: "end", alignSelf: "center"}}>
                <IonButton color={"success"} onClick={() => editTodo(props.id)}>{props.done ? "Done" : "Not done"}</IonButton>
                <IonButton color={"danger"} onClick={() => deleteTodo(props.id)}>{"Delete"}</IonButton>
            </div>

        </div>
    );
}

export default TodoCard;

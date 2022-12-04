import React, {useState, createContext, useEffect, useMemo} from 'react';
import ITodo from '../interfaces/ITodo';
import {HTTP} from '@awesome-cordova-plugins/http';
//import {HTTP} from 'cordova-plugin-advanced-http';
import axios from 'axios';

const TodoContext = createContext({});

export const TodoProvider: React.FC = ({children}) => {

    const [todoList, setTodoList] = useState<ITodo []>([]);

    const getTodos = async () => {
        try {
            const result = await axios.get('http://152.70.121.221/api/v1/todos/', {});
            console.log(result);
            setTodoList(result.data);
        } catch (e) {
            //@ts-ignore
            console.log(e.status);
        }
    };

    useEffect(() => {
       // setTodoList(todoData);
        getTodos();
    }, []);

    const value: any = useMemo(() => ({
        todoList, setTodoList
    }), [todoList]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>);
}

export default TodoContext;

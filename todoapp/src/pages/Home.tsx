import {useContext, useEffect} from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import TodoContext from "../context/TodoContext";
import TodoCard from "../components/TodoCard";
import ITodo from "../interfaces/ITodo";

const Home: React.FC = () => {

    //@ts-ignore
    const {todoList, setTodoList} = useContext(TodoContext);

    const activeTodos: ITodo[] = todoList.filter((item: ITodo) => item.done);
    const inactiveTodos: ITodo[] = todoList.filter((item: ITodo) => !item.done);

    useEffect(() => {
        console.log(todoList);
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>All my todos list</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={{textAlign: "center"}}>
                <div style={{padding: "10px"}}>

                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Blank</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <ExploreContainer/>

                    <IonLabel style={{
                        fontSize: "28px",
                        textAlign: "center",
                        marginTop: "10px"
                        
                    }}>Active</IonLabel>

                    <IonList>
                        { // Loading todos
                            activeTodos.length !== 0 ?
                            activeTodos.map((item) => <TodoCard
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                done={item.done}/>)
                            : <IonLabel>No todo in this category</IonLabel>
                        }
                    </IonList>

                    <IonLabel style={{
                        fontSize: "28px",
                        textAlign: "center",
                        marginTop: "10px"
                    }}>Inactive</IonLabel>

                    <IonList>
                        { // Loading todos
                            inactiveTodos.length !== 0 ?
                            inactiveTodos.map((item) => <TodoCard
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                done={item.done}/>)
                                : <IonLabel>No todo in this category</IonLabel>

                        }
                    </IonList>

                    <IonButton style={{align: "center"}} routerLink={"/add"}>Create new Todo</IonButton>
                </div>
            </IonContent>

        </IonPage>
    );
};

export default Home;

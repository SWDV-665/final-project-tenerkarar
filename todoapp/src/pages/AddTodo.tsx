import {useCallback, useContext, useState} from 'react';
import {IonBackButton, IonButtons, NavContext} from '@ionic/react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonLabel,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';

import ExploreContainer from '../components/ExploreContainer';
import './AddTodo.css';
import axios from 'axios';
import TodoContext from '../context/TodoContext';

const AddTodo: React.FC = () => {

    const {navigate} = useContext(NavContext);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    //@ts-ignore
    const {todoList, setTodoList} = useContext(TodoContext);

    const updateTitle = ((e: any) => {
        setTitle(e.target.value);
    });

    const updateDescription = ((e: any) => {
        setDescription(e.target.value);
    });

    // Call this function when required to redirect with the back animation
    const redirect = useCallback(
        () => navigate('/home', 'back'),
        [navigate]
    );

    const addTodo = async (title: string, description: string) => {
        try {
            const result = await axios.post('http://152.70.121.221/api/v1/todos/',
                {title: title, description: description});

            return await axios.get('http://152.70.121.221/api/v1/todos/', {});
            //setTodoList(result.data);
        } catch (e) {
            //@ts-ignore
            console.log(e.status);
        }
    };

    const submission = async (e: any) => {
        e.preventDefault();

        if (title && description) {

            try {
                const result = await addTodo(title, description);
                //@ts-ignore
                setTodoList(result.data);
                setShowToast(true);
                setDescription("");
                setTitle("");

                setTimeout(() => {
                    redirect();
                }, 700)

            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="home" />
                        <IonTitle>New Todo</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={{textAlign: "center"}}>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Todo added successfully!"
                    duration={700}
                    animated
                />

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Todo Add</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer/>

                <IonLabel style={{
                    fontSize: "28px",
                    textAlign: "center",
                    marginTop: "10px"
                }}>Active</IonLabel>

                <IonInput placeholder={"Title"} name={"title"} value={title}
                          onIonChange={(e) => updateTitle(e)}></IonInput>
                <IonInput placeholder={"Description"} name={"description"} value={description}
                          onIonChange={updateDescription}></IonInput>
                <IonButton onClick={submission}>Add Todo</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default AddTodo;

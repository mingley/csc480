
import React, {useState} from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from '../task/Task'
import AddTaskForm from '../add-task-from/AddTaskForm'


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width:220px;
    display:flex;
    flex-direction: column;
    background-color:white;
`;
const Title = styled.h3`
    display:inline-block;
    tex
    padding: 8px;
    
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    min-height:100px;
`;

const Button = styled.button`
    height:20%;
    width:7%;
    font-size:60%;
    background-color: Black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    transition: ease color 250ms;
    &:hover {
        cursor: default;
        color:black;
        background-color:white;
        opacity: 0.7;  
    }
    `;

    const AddTaskButton = styled(Button)`
    flex-grow: 0;
    color:white;
   
    height:30%;
    width:100%;
    font-size:70%;
    `

   

function Column(props) {
    const [isOpen, setIsOpen] = useState(false);


    const removeColumn = () => {
        //TODO make function remove current column
        //Should there be a notification if there is tasks remaining in column?
        console.log("column removed jk!!");
    }
    
    const addTask = () => {
        //TODO make function add a task to column
        setIsOpen(!isOpen);
        console.log("You have added a task");
    }


    return (
        <Draggable draggableId={props.column.id} index={props.index}>
          
            {(provided) => (
                <Container
                
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div>
                        
                    {isOpen && <AddTaskForm 
                    handleClose={addTask}
                     />}
                     
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <Button onClick={removeColumn}>x</Button>
                    <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
                    
                    </div>
                    
                    <Droppable droppableId={props.column.id} type='task'>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>

            )}
        </Draggable>
    )
}



export default Column
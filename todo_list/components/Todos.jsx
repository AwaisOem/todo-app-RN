import { Box, ScrollView ,Text,VStack } from 'native-base';
import { BanIcon } from 'react-native-heroicons/outline';
import Todo from './Todo';
const Todos = ({todos , removeTodo , updateTodo}) => {
  return (
    <VStack style={{height:"60vh" ,width : "100%",alignItems: 'center'}}>
    
        {(todos && todos.length !==0) ? 
        (
            <ScrollView h={"100%"} w={"85%"}>
                {todos.map((t , i) =>(<Todo todo={t} key={`Todo-${i}`} removeTodo={removeTodo} updateTodo={updateTodo} />))}
            </ScrollView>
        )
        :(
        <VStack style={{justifyContent:"center"  ,opacity:0.6 ,height:"100%"}}>
            <BanIcon size ={"3rem"}/>
            No Todo
        </VStack>)
        }
    </VStack>
  )
}

export default Todos
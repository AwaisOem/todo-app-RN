import { AlertDialog, Box, Button, Checkbox, FormControl, HStack, Input, Modal } from 'native-base'
import React , {useContext, useRef, useState} from 'react'
import { Pressable, Text } from 'react-native'
import {StarIcon, TrashIcon} from 'react-native-heroicons/solid'
import Theme from '../contexts/Theme'
const Todo = ({todo,removeTodo , updateTodo}) => {
    const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [EditValue, setEditValue] = useState(todo.body);
    const [EditStar, setEditStar] = useState(todo.isStared);
    const initialFocus = useRef(null)
    let a = useContext(Theme);
    const handleCheckboxChange = (state , id  ,obj) => {
        let temp = {...obj  ,  isCompleted : state}
        updateTodo(id,temp);
    }
    const handleEdit =(id)=>updateTodo(id,{body:EditValue,isCompleted:false , isStared : EditStar})
  return (
    <HStack style={{boxShadow: "0 0 4px 0px #0000005e",justifyContent: 'space-between',borderRadius: '5px',paddingHorizontal : "10px" ,paddingVertical : "8px", backgroundColor:a.d ? '#ffffff25':'#00000025', marginTop: '20px', width : "100%"  , alignItems: "center"  }}>
        {todo.isCompleted ? (
            <Checkbox value="info" colorScheme="info" defaultIsChecked onChange={()=>handleCheckboxChange(false , todo.id , todo)} />
        ):(
            <Checkbox value="info" colorScheme="info" onChange={()=>handleCheckboxChange(true , todo.id ,todo)}/>
        )}
        <Pressable onLongPress={()=>{!todo.isCompleted && updateTodo(todo.id , {...todo , isStared : !todo.isStared})}} style={{width: "20px",height: "100%"}}>
        {todo.isStared && (<StarIcon style={{width: "100%", height: "100%"}} fill="yellow" color="yellow" />)}
        </Pressable>
        <HStack style={{width:"70%" , gap : "5px"}} >
            <Pressable onLongPress={()=>{!todo.isCompleted && setShowEdit(true)}} style={todo.isCompleted ? {textDecorationLine : "line-through" ,color:a.d ? "white":"#011627" }:{textDecorationLine : "none" ,color:a.d ?  "white" : "#011627"}}>{todo.body}</Pressable>
        <Modal initialFocusRef={initialFocus} isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Todo</FormControl.Label>
              <Input  ref={initialFocus} value={EditValue} onChange={(e)=>setEditValue(e.target.value)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {setShowEdit(false);}}>
                Cancel
              </Button>
              <Button onPress={() => {setShowEdit(false);handleEdit(todo.id)}}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
        </Modal>
        </HStack>
        <Pressable style={{height:"85%"}} onPress={() =>setIsOpenDeleteBox(true)}>
            <TrashIcon/>
        </Pressable>
        <AlertDialog  isOpen={isOpenDeleteBox} onClose={()=>setIsOpenDeleteBox(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Todo</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove todo from list.
            Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={() => setIsOpenDeleteBox(false)} >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={()=>{removeTodo(todo.id);setIsOpenDeleteBox(false)}}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
        </AlertDialog>
    </HStack>
  )
}

export default Todo
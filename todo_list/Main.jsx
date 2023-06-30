import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {VStack , Box,useToast , HStack, Heading, Input, Button, Icon} from "native-base";
import { Text,  View, SafeAreaView, Switch  , Pressable } from "react-native";
import * as Solid from "react-native-heroicons/solid";
import * as Outline from "react-native-heroicons/outline";
import Todos from "./components/Todos";
import Theme from './contexts/Theme'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Main() {
  const toast  = useToast();
  const [todos, setTodos] = React.useState()
  React.useEffect(() => {
    try
    { 
      AsyncStorage.getItem("todos").then(todo=>setTodos(JSON.parse(todo) || []));
    }catch(err)
    { console.warn("Error in fetching initial data")}
  }, [])
  
  const [stared, setStared] = React.useState(false);
  const [inputvalue, setInputvalue] = React.useState("");
  const [page, setPage] = React.useState(2);
  const removeTodo =(id)=>
  {
    setTodos([...todos.filter(v=>v.id !== id)])
    setTodosAsync([...todos.filter(v=>v.id !== id)]);
  }
  const createTodo = (obj)=>
  {
    setTodos([ obj, ...todos]);
    setTodosAsync([ obj, ...todos]);
  }
  const updateTodo =(id , obj)=>
  {
    let temp = [...todos];
      const index = temp.map((v,i)=> ((v.id === id) && i));
      temp[index] = obj;
    setTodos(temp);
      setTodosAsync(temp);
    }
    const setTodosAsync = async (temp) =>
    {
      try
      {
        await AsyncStorage.setItem("todos" , JSON.stringify(temp));
      }
      catch (err)
      {
        console.warn("Error in setting the data into stoarge");
      }
    }
  const handleTodo=()=>
  {
    if (inputvalue !== "") {
      let todo = {
        id : 1/Math.random() ,
        body : inputvalue,
        isStared : stared ? true:false,
        isCompleted : false
      }
      createTodo(todo);
    }
    else
    {
      alert("field cann't be empty")
      // FIXME::
      // toast.show({
      //   discription : "Enter Some text" ,
      //   title : "invalid entry",
      //   status : "warning" ,
      //   isClosable : true,
      //   placement : "top"
      // });
    }
    setInputvalue("");
    setStared(false);
  }

  const [dark, setDark] = React.useState();
  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((theme) => {
      if(theme){
        (theme ==="dark") ? setDark(true):setDark(false);
      }
      else{
        //system theme
        setDark(false);
      }
    })
  }, [])
  const themeSet =async ()=>
  {
    try{
      if(dark===false)
      {
        await AsyncStorage.setItem("theme" , "dark" );
      }
      else{
        await AsyncStorage.setItem("theme" , "light" );
      }
    }
    catch (err)
    {
      console.log("Error in setting theme");
    }
  }
  return (
    <Theme.Provider value ={{d : dark}}>
        <VStack style={{backgroundColor: dark ? "#011627":"#FDFFFC"  ,color:dark ? "#FDFFFC":"#011627"}}>
          <VStack style = {{boxShadow: "0 0 10px 0px #0000005e",justifyContent : 'space-evenly' , alignItems : 'center' , width: "100%", height: "30vh" , backgroundColor : "#6CC551" , borderBottomEndRadius : '40px' , borderBottomStartRadius : '40px'}}>
            <Pressable onPress={()=>{setDark(p=>!p);themeSet()}} style={{position : "absolute", top : "28%" , right : "7%" , width: "50px" ,height  : "50Px" ,alignItems: "end" ,}}>
              {dark ? (<Outline.SunIcon/>):(<Solid.MoonIcon/>)}
            </Pressable>
            <Heading style={{textShadow: "0 0 5px #0000005e",fontSize : "2rem" , color :dark ? "#011627": "white"}}><Text style={{color:"#F71735"}}>Todo</Text> List</Heading>
            <HStack  style={{width : "80%" ,gap: "7px" }} >
              <Box style={{flex:1}}>
                <Input h={"100%"} type={"text"} placeholder="Todo"  style = {{boxShadow : "0 0 5px 0 #00000025" , backgroundColor : "#0116276b" , color : "white"}}
                 value={inputvalue}
                 onChange={e=>setInputvalue(e.target.value)}
                 InputRightElement={
                  <Pressable onPress={()=>setStared(p=>!p)} style={{ justifyContent:"center",backgroundColor : "#0116276b" , color : "white", height:"100%",paddingRight:10}}>
                  <Outline.StarIcon fill={stared ? "yellow":"#0116276b"} color={stared ? "yellow":""}/>
                  </Pressable>
                }
                 />
              </Box>
              <Button onPress={handleTodo} style={{boxShadow: "0 0 10px 0px #0000005e",backgroundColor : "#F71735" , color : "#FDFFFC"}}><Solid.PlusIcon/></Button>
            </HStack>
          </VStack>
          {page===1 ? 
          ( <Todos removeTodo={removeTodo} updateTodo={updateTodo} todos={todos && todos.filter(t=>t.isStared===true && t.isCompleted===false)}/>)
          :page===2 ? 
          ( <Todos removeTodo={removeTodo} updateTodo={updateTodo} todos={todos && todos.filter(t=>t.isCompleted===false)}/>)
          :page===3 ? 
          ( <Todos removeTodo={removeTodo} updateTodo={updateTodo} todos={todos}/>)
          :page===4 && 
          ( <Todos removeTodo={removeTodo} updateTodo={updateTodo} todos={todos && todos.filter(t=>t.isCompleted===true)}/>)}
          <HStack  style={{borderTopRightRadius: "20%", borderTopLeftRadius: "20%",boxShadow: "0 0 10px 0px #0000005e", width : "100%" ,color :dark ? "#011627": "white" ,justifyContent : "space-evenly",backgroundColor : "#6CC551" ,height : "10vh"}}>
            <Pressable onPress={()=>setPage(1)} style={{opacity : page===1 ? "1":"0.5",color : page===1 && "white" ,width : "100px" ,padding:"10px",alignItems : "center",justifyContent : "center",height : "100%"}}>
              <Solid.StarIcon/>
              <Text style={{color : (page===1 || !dark) ? "white":"#011627"}}>Starred</Text>
            </Pressable>
            <Pressable onPress={()=>setPage(2)} style={{opacity : page===2 ? "1":"0.5",color : page===2 &&  "white",width : "100px" ,padding:"10px",alignItems : "center",justifyContent : "center",height : "100%"}}>
              <Solid.ClockIcon/>
              <Text style={{color : (page===2 || !dark) ? "white":"#011627"}}>Pending</Text>
            </Pressable>
            <Pressable onPress={()=>setPage(3)} style={{opacity : page===3 ? "1":"0.5", color : page===3 &&  "white",width : "100px" ,padding:"10px", alignItems : "center",justifyContent : "center",height : "100%"}}>
              <Solid.DocumentTextIcon/>
              <Text style={{color : (page===3 || !dark) ? "white":"#011627"}}>All</Text>
            </Pressable>
            <Pressable  onPress={()=>setPage(4)}style={{opacity : page===4 ? "1":"0.5",color : page===4 &&  "white",width : "100px" ,padding:"10px", alignItems : "center",justifyContent : "center",height : "100%"}}>
              <Solid.ClipboardCheckIcon/>
              <Text  style={{color :(page===4 || !dark) ? "white":"#011627"}}>Completed</Text>
            </Pressable>
          </HStack>
        </VStack>
        </Theme.Provider>
  );
}

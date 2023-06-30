import {NativeBaseProvider} from "native-base";
import { View } from "react-native";
import Main from './Main'
export default function App() {
  return (
      <NativeBaseProvider>
        <View style={{alignSelf : "center",boxShadow : " 0 0 10px 0 #00000030" ,maxWidth: "912px" , width: "100vw"}}>
          <Main/>
        </View>
      </NativeBaseProvider>
  );
}

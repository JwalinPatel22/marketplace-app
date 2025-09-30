// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, FlatList, Image } from "react-native";
// import { Button, Text, Card } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type ComplaintType = {
//   id: string;
//   description: string;
//   category: string;
//   location: { latitude: number; longitude: number; address?: string };
//   images: string[];
// };

// type HomeStackParamList = {
//   HomeMain: undefined;
//   ComplaintFlow: undefined;
//   ComplaintsList: undefined;
// };

// const Stack = createNativeStackNavigator<HomeStackParamList>();

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   button: {
//     marginVertical: 10,
//   },
// });

// // --- Home Page ---
// type HomeMainProps = NativeStackScreenProps<HomeStackParamList, "HomeMain">;

// function HomeMain({ navigation }: HomeMainProps) {
//   return (
//     <View style={styles.container}>
//       <Text
//         variant="headlineMedium"
//         style={{ textAlign: "center", marginBottom: 30 }}
//       >
//         Complaint Portal
//       </Text>
//       <Button
//         mode="contained"
//         style={styles.button}
//         onPress={() => navigation.navigate("ComplaintFlow")}
//       >
//         Create New Complaint
//       </Button>
//       <Button
//         mode="outlined"
//         style={styles.button}
//         onPress={() => navigation.navigate("ComplaintsList")}
//       >
//         View Previous Complaints
//       </Button>
//     </View>
//   );
// }

// // --- Complaints List Page ---
// type ComplaintsListProps = NativeStackScreenProps<
//   HomeStackParamList,
//   "ComplaintsList"
// >;

// function ComplaintsList({ navigation }: ComplaintsListProps) {
//   const [complaints, setComplaints] = useState<ComplaintType[]>([]);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       loadComplaints();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const loadComplaints = async () => {
//     try {
//       const json = await AsyncStorage.getItem("complaints");
//       if (json) {
//         setComplaints(JSON.parse(json));
//       } else {
//         setComplaints([]);
//       }
//     } catch (e) {
//       console.error("Failed to load complaints", e);
//     }
//   };

//   return (
//     <FlatList
//       style={{ flex: 1, backgroundColor: "#f5f5f5" }}
//       data={complaints}
//       keyExtractor={(item) => item.id}
//       contentContainerStyle={{ padding: 16 }}
//       renderItem={({ item }) => (
//         <Card style={{ marginBottom: 16 }}>
//           <Card.Title title={item.category} subtitle={item.description} />
//           <Card.Content>
//             <Text>📍 {item.location.address || "Unknown location"}</Text>
//             <Text>
//               ({item.location.latitude.toFixed(2)},{" "}
//               {item.location.longitude.toFixed(2)})
//             </Text>
//             {item.images.length > 0 && (
//               <View style={{ flexDirection: "row", marginTop: 8 }}>
//                 {item.images.map((uri, idx) => (
//                   <Image
//                     key={idx}
//                     source={{ uri }}
//                     style={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 6,
//                       marginRight: 8,
//                     }}
//                   />
//                 ))}
//               </View>
//             )}
//           </Card.Content>
//         </Card>
//       )}
//       ListEmptyComponent={
//         <Text style={{ textAlign: "center", marginTop: 40 }}>
//           No complaints yet.
//         </Text>
//       }
//     />
//   );
// }

// // --- Home Stack ---
// export default function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="HomeMain"
//         component={HomeMain}
//         options={{ title: "Home" }}
//       />
//       <Stack.Screen
//         name="ComplaintFlow"
//         component={require("./complaint").default} // Lazy load your complaint flow
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ComplaintsList"
//         component={ComplaintsList}
//         options={{ title: "My Complaints" }}
//       />
//     </Stack.Navigator>
//   );
// }

import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Welcome to catabytes application</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>
        SignOut
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    borderRadius: 8,
    backgroundColor: "coral",
    textAlign: "center",
  },
});

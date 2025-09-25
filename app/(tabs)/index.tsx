// import React from "react";
// import { StyleSheet, View, FlatList, Image } from "react-native";
// import { Button, Text, Card } from "react-native-paper";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type HomeStackParamList = {
//   HomeMain: undefined;
//   ComplaintFlow: undefined;
//   ComplaintsList: undefined;
// };

// const Stack = createNativeStackNavigator<HomeStackParamList>();

// // Dummy data (replace with backend later)
// const dummyComplaints = [
//   {
//     id: "1",
//     description: "Huge pothole on Main Street",
//     category: "Potholes",
//     location: {
//       latitude: 12.9716,
//       longitude: 77.5946,
//       address: "Main Street, Bangalore",
//     },
//     images: ["https://via.placeholder.com/100"],
//   },
//   {
//     id: "2",
//     description: "Streetlight not working near park",
//     category: "Broken Streetlight",
//     location: {
//       latitude: 19.076,
//       longitude: 72.8777,
//       address: "Park Road, Mumbai",
//     },
//     images: [],
//   },
// ];

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
//   return (
//     <FlatList
//       style={{ flex: 1, backgroundColor: "#f5f5f5" }}
//       data={dummyComplaints}
//       keyExtractor={(item) => item.id}
//       contentContainerStyle={{ padding: 16 }}
//       renderItem={({ item }) => (
//         <Card style={{ marginBottom: 16 }}>
//           <Card.Title title={item.category} subtitle={item.description} />
//           <Card.Content>
//             <Text>📍 {item.location.address}</Text>
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

import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ComplaintType = {
  id: string;
  description: string;
  category: string;
  location: { latitude: number; longitude: number; address?: string };
  images: string[];
};

type HomeStackParamList = {
  HomeMain: undefined;
  ComplaintFlow: undefined;
  ComplaintsList: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
  },
});

// --- Home Page ---
type HomeMainProps = NativeStackScreenProps<HomeStackParamList, "HomeMain">;

function HomeMain({ navigation }: HomeMainProps) {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        Complaint Portal
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("ComplaintFlow")}
      >
        Create New Complaint
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate("ComplaintsList")}
      >
        View Previous Complaints
      </Button>
    </View>
  );
}

// --- Complaints List Page ---
type ComplaintsListProps = NativeStackScreenProps<
  HomeStackParamList,
  "ComplaintsList"
>;

function ComplaintsList({ navigation }: ComplaintsListProps) {
  const [complaints, setComplaints] = useState<ComplaintType[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadComplaints();
    });
    return unsubscribe;
  }, [navigation]);

  const loadComplaints = async () => {
    try {
      const json = await AsyncStorage.getItem("complaints");
      if (json) {
        setComplaints(JSON.parse(json));
      } else {
        setComplaints([]);
      }
    } catch (e) {
      console.error("Failed to load complaints", e);
    }
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      data={complaints}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Card style={{ marginBottom: 16 }}>
          <Card.Title title={item.category} subtitle={item.description} />
          <Card.Content>
            <Text>📍 {item.location.address || "Unknown location"}</Text>
            <Text>
              ({item.location.latitude.toFixed(2)},{" "}
              {item.location.longitude.toFixed(2)})
            </Text>
            {item.images.length > 0 && (
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {item.images.map((uri, idx) => (
                  <Image
                    key={idx}
                    source={{ uri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 6,
                      marginRight: 8,
                    }}
                  />
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No complaints yet.
        </Text>
      }
    />
  );
}

// --- Home Stack ---
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="ComplaintFlow"
        component={require("./complaint").default} // Lazy load your complaint flow
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComplaintsList"
        component={ComplaintsList}
        options={{ title: "My Complaints" }}
      />
    </Stack.Navigator>
  );
}

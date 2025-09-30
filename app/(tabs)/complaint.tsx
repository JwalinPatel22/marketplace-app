// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Image, ScrollView } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { TextInput, Button, Text, Chip } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";

// // ------------------ Styles ------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//     justifyContent: "center",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   input: {
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 8,
//   },
//   chip: {
//     margin: 4,
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     margin: 8,
//     borderRadius: 8,
//   },
//   imageRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
// });

// // ------------------ Stack Types ------------------
// type ComplaintStackParamList = {
//   Description: undefined;
//   Category: { description: string };
//   Upload: { description: string; category: string };
//   Success: undefined;
// };

// const Stack = createNativeStackNavigator<ComplaintStackParamList>();

// // ------------------ Step 1: Description ------------------
// type DescriptionProps = NativeStackScreenProps<
//   ComplaintStackParamList,
//   "Description"
// >;

// function DescriptionScreen({ navigation }: DescriptionProps) {
//   const [description, setDescription] = useState("");

//   return (
//     <View style={styles.content}>
//       <Text variant="titleLarge" style={styles.title}>
//         Describe the issue
//       </Text>
//       <TextInput
//         label="Description"
//         value={description}
//         onChangeText={setDescription}
//         mode="outlined"
//         style={styles.input}
//         multiline
//       />
//       <Button
//         mode="contained"
//         onPress={() => navigation.navigate("Category", { description })}
//         disabled={!description.trim()}
//       >
//         Next
//       </Button>
//     </View>
//   );
// }

// // ------------------ Step 2: Category ------------------
// type CategoryProps = NativeStackScreenProps<
//   ComplaintStackParamList,
//   "Category"
// >;

// function CategoryScreen({ navigation, route }: CategoryProps) {
//   const { description } = route.params;
//   const categories = [
//     "Potholes",
//     "Overflowing Trash",
//     "Faulty Electric Cables",
//     "Broken Streetlight",
//     "Water Leakage",
//   ];

//   return (
//     <View style={styles.content}>
//       <Text variant="titleLarge" style={styles.title}>
//         Select Category
//       </Text>
//       <View style={{ flexDirection: "column", alignItems: "center" }}>
//         {categories.map((cat) => (
//           <Chip
//             key={cat}
//             style={[styles.chip, { alignSelf: "flex-start" }]}
//             onPress={() =>
//               navigation.navigate("Upload", { description, category: cat })
//             }
//           >
//             {cat}
//           </Chip>
//         ))}
//       </View>
//     </View>
//   );
// }

// // ------------------ Step 3: Upload Images + Location ------------------
// type UploadProps = NativeStackScreenProps<ComplaintStackParamList, "Upload">;

// function UploadScreen({ navigation, route }: UploadProps) {
//   const { description, category } = route.params;
//   const [images, setImages] = useState<string[]>([]);
//   const [location, setLocation] = useState<{
//     latitude: number;
//     longitude: number;
//     address?: string;
//   } | null>(null);

//   // Ask for location on mount
//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         alert("Permission to access location was denied");
//         return;
//       }
//       const loc = await Location.getCurrentPositionAsync({});
//       let address: string | undefined;
//       try {
//         const [reverse] = await Location.reverseGeocodeAsync(loc.coords);
//         if (reverse) {
//           address = `${reverse.name || ""}, ${reverse.street || ""}, ${
//             reverse.city || ""
//           }`;
//         }
//       } catch {}
//       setLocation({
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//         address,
//       });
//     })();
//   }, []);

//   // Pick Image
//   const pickImage = async () => {
//     if (images.length >= 2) {
//       alert("You can only upload up to 2 images");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImages((prev) => [...prev, result.assets[0].uri]);
//     }
//   };

//   const handleSubmit = () => {
//     const complaintData = {
//       description,
//       category,
//       images,
//       location,
//     };

//     console.log("Final complaint:", complaintData);
//     // TODO: send to backend

//     navigation.replace("Success"); // ✅ go to success page
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.content}>
//       <Text variant="titleLarge" style={styles.title}>
//         Upload Evidence
//       </Text>
//       <Text>Description: {description}</Text>
//       <Text>Category: {category}</Text>
//       <Text>
//         Location:{" "}
//         {location
//           ? `${location.address || ""} (${location.latitude.toFixed(
//               3
//             )}, ${location.longitude.toFixed(3)})`
//           : "Fetching..."}
//       </Text>

//       {/* Images Preview */}
//       <View style={styles.imageRow}>
//         {images.map((uri, idx) => (
//           <Image key={idx} source={{ uri }} style={styles.imagePreview} />
//         ))}
//       </View>

//       <Button mode="outlined" onPress={pickImage} style={styles.button}>
//         Add Image ({images.length}/2)
//       </Button>

//       <Button
//         mode="contained"
//         onPress={handleSubmit}
//         disabled={!location}
//         style={styles.button}
//       >
//         Submit Complaint
//       </Button>
//     </ScrollView>
//   );
// }

// // ------------------ Step 4: Success ------------------
// type SuccessProps = NativeStackScreenProps<ComplaintStackParamList, "Success">;

// function SuccessScreen({ navigation }: SuccessProps) {
//   return (
//     <View style={styles.content}>
//       <Text variant="titleLarge" style={styles.title}>
//         Complaint Submitted 🎉
//       </Text>
//       <Button mode="contained" onPress={() => navigation.popToTop()}>
//         Report Another Complaint
//       </Button>
//     </View>
//   );
// }

// // ------------------ Root Flow ------------------
// export default function ComplaintFlow() {
//   return (
//     <Stack.Navigator initialRouteName="Description">
//       <Stack.Screen
//         name="Description"
//         component={DescriptionScreen}
//         options={{ title: "New Complaint" }}
//       />
//       <Stack.Screen name="Category" component={CategoryScreen} />
//       <Stack.Screen name="Upload" component={UploadScreen} />
//       <Stack.Screen
//         name="Success"
//         component={SuccessScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// app/(tabs)/complaint.tsx

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  TextInput,
  Button,
  Text,
  Chip,
  ProgressBar,
  useTheme,
  IconButton,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
  },
  chip: {
    margin: 6,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 8,
  },
  progressContainer: {
    marginBottom: 12,
  },
});

type ComplaintStackParamList = {
  Description: undefined;
  Category: { description: string };
  Upload: { description: string; category: string };
  Success: undefined;
};

const Stack = createNativeStackNavigator<ComplaintStackParamList>();

// Shared progress indicator
function StepProgress({ step }: { step: number }) {
  const steps = ["Describe", "Category", "Upload", "Done"];
  return (
    <View style={styles.progressContainer}>
      <ProgressBar progress={step / (steps.length - 1)} />
      <Text style={{ textAlign: "center", marginTop: 6 }}>{steps[step]}</Text>
    </View>
  );
}

// --- Step 1: Description ---
type DescriptionProps = NativeStackScreenProps<
  ComplaintStackParamList,
  "Description"
>;

function DescriptionScreen({ navigation }: DescriptionProps) {
  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <StepProgress step={0} />
        <Text variant="titleLarge" style={styles.title}>
          What’s the issue?
        </Text>
        <TextInput
          label="Describe the problem"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={4}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Category", { description })}
          disabled={!description.trim()}
        >
          Next
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Step 2: Category ---
type CategoryProps = NativeStackScreenProps<
  ComplaintStackParamList,
  "Category"
>;

function CategoryScreen({ navigation, route }: CategoryProps) {
  const { description } = route.params;
  const categories = [
    "Potholes",
    "Overflowing Trash",
    "Faulty Cables",
    "Broken Streetlight",
    "Water Leakage",
  ];

  return (
    <View style={styles.content}>
      <StepProgress step={1} />
      <Text variant="titleLarge" style={styles.title}>
        Select a category
      </Text>
      <View style={styles.chipContainer}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            style={styles.chip}
            mode="outlined"
            onPress={() =>
              navigation.navigate("Upload", { description, category: cat })
            }
          >
            {cat}
          </Chip>
        ))}
      </View>
    </View>
  );
}

// --- Step 3: Upload ---
type UploadProps = NativeStackScreenProps<ComplaintStackParamList, "Upload">;

function UploadScreen({ navigation, route }: UploadProps) {
  const { description, category } = route.params;
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location denied");
        setLoadingLocation(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      let address: string | undefined;
      try {
        const [reverse] = await Location.reverseGeocodeAsync(loc.coords);
        if (reverse) {
          address = `${reverse.street || ""}, ${reverse.city || ""}`;
        }
      } catch {}

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        address,
      });
      setLoadingLocation(false);
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages([...images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const handleSubmit = () => {
    const complaintData = {
      description,
      category,
      location,
      images,
    };

    console.log("Final complaint:", complaintData);

    navigation.navigate("Success");
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <StepProgress step={2} />
      <Text variant="titleLarge" style={styles.title}>
        Upload evidence
      </Text>
      <Text style={{ marginBottom: 12 }}>Category: {category}</Text>

      <Button mode="outlined" onPress={pickImage}>
        Add Images
      </Button>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {images.map((uri, i) => (
          <View key={i}>
            <Image source={{ uri }} style={styles.imagePreview} />
            <IconButton
              icon="close"
              size={16}
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() =>
                setImages(images.filter((_, index) => index !== i))
              }
            />
          </View>
        ))}
      </View>

      <View style={{ marginVertical: 16 }}>
        {loadingLocation ? (
          <ActivityIndicator />
        ) : location ? (
          <Text>
            Location: {location.address} ({location.latitude.toFixed(3)},{" "}
            {location.longitude.toFixed(3)})
          </Text>
        ) : (
          <Text>Location unavailable</Text>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!location}
        style={styles.button}
      >
        Submit Complaint
      </Button>
    </ScrollView>
  );
}

// --- Step 4: Success ---
type SuccessProps = NativeStackScreenProps<ComplaintStackParamList, "Success">;

function SuccessScreen({ navigation }: SuccessProps) {
  return (
    <View
      style={[
        styles.content,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <StepProgress step={3} />
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Complaint Submitted!
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.popToTop()}
        style={styles.button}
      >
        Report Another
      </Button>
    </View>
  );
}

export default function ComplaintFlow() {
  return (
    <Stack.Navigator initialRouteName="Description">
      <Stack.Screen
        name="Description"
        component={DescriptionScreen}
        options={{ title: "New Complaint" }}
      />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

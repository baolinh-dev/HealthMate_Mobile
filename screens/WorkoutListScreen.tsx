// screens/WorkoutListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { fetchExercises, Exercise } from '../apis/exerciseApi'; // Import the fetch function and Exercise type

const WorkoutListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]); // State to store the list of exercises
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  // Fetch exercises when the component mounts
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercises(); // Fetch data using the fetchExercises function
        setExercises(data); // Update the exercises state with fetched data
      } catch (error) {
        console.error('Error loading exercises:', error); // Log errors if any
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    loadExercises(); // Call the function to load exercises
  }, []); // Empty dependency array so this runs only once when the component mounts

  // Render each exercise item
  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate('StartTrain', { exercise: item })} 
    >
      <Image
        source={{
          uri: item.exerciseImage, // Use the exercise image URL
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          Sets: {item.sets}, Time/Set: {item.timePerSet} mins, Rest: {item.restTimePerSet} mins
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises} // Pass exercises array to FlatList
        keyExtractor={(item) => item.name} // Use the exercise name as the unique key
        renderItem={renderExercise} // Render each exercise using the renderExercise function
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default WorkoutListScreen;

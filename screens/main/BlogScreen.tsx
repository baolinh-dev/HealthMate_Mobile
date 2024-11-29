import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const BlogScreen = () => {
  const blogs = [
    { id: '1', title: 'Blog Post 1', content: 'This is the content of blog post 1.' },
    { id: '2', title: 'Blog Post 2', content: 'This is the content of blog post 2.' },
    { id: '3', title: 'Blog Post 3', content: 'This is the content of blog post 3.' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.blogPost}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  blogPost: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default BlogScreen;

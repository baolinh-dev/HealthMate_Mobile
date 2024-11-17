import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.text}>Box 1</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.text}>Box 2</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.text}>Box 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Cho phép View chiếm toàn bộ không gian có sẵn
    flexDirection: 'row', // Đặt các phần tử con ngang hàng theo chiều ngang
    justifyContent: 'space-between', // Phân bố khoảng cách đều giữa các phần tử
    alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc ở giữa
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  box1: {
    flex: 2, // Box này sẽ chiếm không gian còn lại
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  box2: {
    flex: 1, // Box này chiếm gấp đôi không gian của box1
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  box3: {
    flex: 1, // Box này chiếm không gian còn lại giống như box1
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

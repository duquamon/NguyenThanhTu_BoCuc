import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('portrait');
  const [text, setText] = useState('');

  // Cập nhật hướng màn hình khi thay đổi kích thước
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(height >= width ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => {
      subscription.remove();
    };
  }, [height, width]);

  const isPortrait = orientation === 'portrait';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}  // Đảm bảo không bị che khi nhập liệu
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}  // Đẩy lên để tránh bị che bởi thanh tabs
    >
      <StatusBar
        barStyle={isPortrait ? 'dark-content' : 'light-content'}
        backgroundColor={isPortrait ? '#f8f8f8' : '#333'}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Thêm padding để hình ảnh không bị che khuất */}
        <View style={{ paddingTop: 50 }}>
          {/* Hình ảnh từ URL */}
          <Image
            source={{ uri: 'https://reactjs.org/logo-og.png' }}
            style={[
              styles.image,
              { width: width * 0.8, height: (width * 0.8) * (isPortrait ? 0.75 : 0.5) }
            ]}
          />

          {/* Bố cục nút bấm */}
          <View
            style={[
              isPortrait ? styles.portrait : styles.landscape,
              { flexDirection: isPortrait ? 'column' : 'row' }
            ]}
          >
            <View style={[styles.buttonContainer, { width: isPortrait ? '100%' : width / 2 }]}>
              <Button title="Button 1" onPress={() => {}} />
            </View>
            <View style={[styles.buttonContainer, { width: isPortrait ? '100%' : width / 2 }]}>
              <Button title="Button 2" onPress={() => {}} />
            </View>
          </View>

          {/* Trường nhập liệu */}
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            value={text}
            onChangeText={setText}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles cho project
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.select({
      ios: 20,
      android: 10,
    }),
    backgroundColor: '#f8f8f8',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    padding: 10,
  },
  portrait: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default App;

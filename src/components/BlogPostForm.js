import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Enter Title</Text>
          <TextInput
            style={styles.textInputStyle}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={styles.textStyle}>Enter Content</Text>
          <TextInput
            style={styles.textInputStyle}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <Button
            style={styles.buttonStyle}
            title="Save"
            onPress={ () => onSubmit(title,content) }
          />
        </View>
      );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }   
};

const styles = StyleSheet.create({
    viewStyle: {
        margin: 20,
        flex: 1,
      },
      textInputStyle: {
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 18,
        padding: 5,
      },
      textStyle: {
        fontSize: 18,
      },
      buttonStyle: {
        alignSelf: "center",
      },
});

export default BlogPostForm;
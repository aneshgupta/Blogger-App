import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);

  useEffect( ()=> {
    getBlogPosts();

    const listeners = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listeners.remove();
    };

  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.blogRow}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <MaterialIcons
                    name="delete-outline"
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} style={{ marginRight: 10 }} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  blogRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  iconStyle: {
    fontSize: 26,
  },
  title: {
    fontSize: 18,
  },
});

export default IndexScreen;
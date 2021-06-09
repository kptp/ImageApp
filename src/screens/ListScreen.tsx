import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { StyleSheet, View, Image, Button, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation';
import { useStoreContext, IImage } from '../services';

const dateSort = (a: Date, b: Date) => {
  return b.getTime() - a.getTime();
}

function ImagePreviewComponent({ img, id, open }: { img: IImage, id: string, open: (id: string) => void }) {
  const width = (Dimensions.get('window').width / 3);
  return (
    <TouchableOpacity onPress={() => open(id)} style={{ width: width, height: width }} >
      <Image source={{ uri: img.uri }} style={{ width: width - 2, height: width - 2, margin: 1 }} />
    </TouchableOpacity>
  )
}

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'List'
>;

export function ListScreen({ navigation }: { navigation: ListScreenNavigationProp }) {
  const store = useStoreContext();
  const open = useCallback((id: string) => navigation.navigate("Image", { id }), [navigation]);

  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageList}>
      { 
        Object.entries(store.images)// Vaihda listan tyyppiä
          .sort(([idA, a], [idB, b]) => dateSort(a.createdAt, b.createdAt))
          .map(([id, img]) => (
            <ImagePreviewComponent key={id} img={img} id={id} open={open} />
          )
        )
      }
      </View>
      <Button title="Take image" onPress={() => navigation.navigate("Camera")} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageList: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'flex-start',
    justifyContent: "flex-start",
  }
});
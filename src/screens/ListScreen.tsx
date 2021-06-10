import { Fontisto } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Image, Button, Dimensions, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation';
import { useStoreContext, IImage } from '../services';

const dateSort = (a: Date, b: Date) => {
  return b.getTime() - a.getTime();
}

function ImageGridPreviewComponent({ img, id, open }: { img: IImage, id: string, open: (id: string) => void }) {
  const width = (Dimensions.get('window').width / 3);
  return (
    <TouchableOpacity onPress={() => open(id)} style={{ width: width, height: width }} >
      <Image source={{ uri: img.uri }} style={{ width: width - 2, height: width - 2, margin: 1 }} />
    </TouchableOpacity>
  )
}

function ImageListPreviewComponent({ img, id, open }: { img: IImage, id: string, open: (id: string) => void }) {
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={() => open(id)} style={{ width: width, height: width }} >
      <Image source={{ uri: img.uri }} style={{ width: width - 2, height: width - 2, margin: 1 }} />
      <View style={{ position: "absolute", bottom: 0, backgroundColor: "#0005", width: "100%" }}>
        { img.caption && <Text style={{ color: "#fff", fontSize: 20, margin: 5 }}>{img.caption}</Text> }
      </View>
    </TouchableOpacity>
  )
}


type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'List'
>;

type ListType = "grid" | "list";
export function ListScreen({ navigation }: { navigation: ListScreenNavigationProp }) {
  const store = useStoreContext();
  const open = useCallback((id: string) => navigation.navigate("Image", { id }), [navigation]);
  const images = useMemo(() => {
    return Object.entries(store.images) // Vaihda listan tyyppiä?
      .sort(([idA, a], [idB, b]) => dateSort(a.createdAt, b.createdAt))
  }, [store.images]);
  const [listType, setListType] = useState<ListType>("grid")
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => {
        return (
          <TouchableOpacity onPress={() => setListType((state) => state === "grid" ? "list" : "grid" )} >
            {
              listType === "grid" ?
                <Fontisto name="nav-icon" style={{ marginRight: 20, fontSize: 18 }}/> :
                <Fontisto name="nav-icon-grid" style={{ marginRight: 20, fontSize: 18 }} />
            }
          </TouchableOpacity>
        );
      }
    });
  }, [listType])
  return (
    <View style={styles.imageContainer}>
      <FlatList
        key={listType}
        numColumns={listType === "grid" ? 3 : 1}
        extraData={open}
        data={images}
        renderItem={(item) => {
          const [id, img] = item.item;
          return listType === "grid" ?
            <ImageGridPreviewComponent key={id} img={img} id={id} open={open} /> :
            <ImageListPreviewComponent key={id} img={img} id={id} open={open} />;
        }}
        keyExtractor={([id]) => id}
      />
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
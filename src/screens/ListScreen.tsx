import { Fontisto } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "../components/IconButton";
import { ImageOverlay, ImageOverlayText } from "../components/ImageOverlay";
import { RootStackParamList } from "../navigation/types";
import { useStoreContext, IImage } from "../stores";

const dateSort = (a: Date, b: Date) => b.getTime() - a.getTime();

interface PreviewProps {
  img: IImage;
  id: string;
  open: (id: string) => void;
}

function ImageGridPreviewComponent({ img, id, open }: PreviewProps): React.ReactElement {
  const width = Dimensions.get("window").width / 3;
  return (
    <TouchableOpacity onPress={() => open(id)}>
      <Image source={{ uri: img.uri }} style={{ width: width - 2, height: width - 2, margin: 1 }} />
    </TouchableOpacity>
  );
}

function ImageListPreviewComponent({ img, id, open }: PreviewProps): React.ReactElement {
  const { width } = Dimensions.get("window");
  return (
    <TouchableOpacity onPress={() => open(id)}>
      <Image
        source={{ uri: img.uri }}
        style={{ width: width - 2, height: undefined, aspectRatio: img.ratio, margin: 1 }}
      />
      {img.caption && (
        <ImageOverlay>
          <ImageOverlayText>{img.caption}</ImageOverlayText>
        </ImageOverlay>
      )}
    </TouchableOpacity>
  );
}

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, "List">;

type ListType = "grid" | "list";

export function ListScreen({ navigation }: { navigation: ListScreenNavigationProp }): React.ReactElement {
  const store = useStoreContext();
  const [listType, setListType] = useState<ListType>("grid");
  const open = useCallback((id: string) => navigation.navigate("Image", { id }), [navigation]);
  const images = useMemo(
    () => Object.entries(store.images).sort(([, a], [, b]) => dateSort(a.createdAt, b.createdAt)),
    [store.images]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setListType((state) => (state === "grid" ? "list" : "grid"))}>
          {listType === "grid" ? (
            <Fontisto name="nav-icon" style={styles.headerIcon} />
          ) : (
            <Fontisto name="nav-icon-grid" style={styles.headerIcon} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [listType]);

  return (
    <View style={styles.imageContainer}>
      <FlatList
        key={listType}
        numColumns={listType === "grid" ? 3 : 1}
        extraData={open}
        data={images}
        renderItem={(item) => {
          const [id, img] = item.item;
          return listType === "grid" ? (
            <ImageGridPreviewComponent key={id} img={img} id={id} open={open} />
          ) : (
            <ImageListPreviewComponent key={id} img={img} id={id} open={open} />
          );
        }}
        keyExtractor={([id]) => id}
      />
      <IconButton icon="camera" onPress={() => navigation.navigate("Camera")} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 20,
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageList: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

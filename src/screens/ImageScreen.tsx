import React, { useCallback, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TextInput, Button, Dimensions } from 'react-native';
import { RootStackParamList } from '../navigation';
import { useStoreContext } from '../services';
import ImageZoom from 'react-native-image-pan-zoom';

type ImageScreenRouteProp = RouteProp<
  RootStackParamList,
  'Image'
>;

interface BottomOverlayProps {
  caption: string;
  editing: boolean;
  changeCaption: (s: string) => void;
  startCaptionEdit: () => void;
  setCaption: () => void;
}
function BottomOverlay({ editing, changeCaption, setCaption, startCaptionEdit, caption }: BottomOverlayProps) {
  return (
    <View style={{ backgroundColor: "#1115", width: "100%", position: "absolute", bottom: 0, left: 0 }} >
      { editing ? (
        <React.Fragment>
          <TextInput autoFocus multiline={true} style={styles.overlayText} value={caption} onChangeText={changeCaption}/>
          <Button title={"Done"} onPress={setCaption} />
        </React.Fragment>
       ) : (
        <React.Fragment>
          { !!caption && <Text style={styles.overlayText}>{ caption }</Text> }
          <Button title={"Edit text"} onPress={startCaptionEdit} />
        </React.Fragment>
       )}
    </View>
  )
}

export function ImageScreen({ route }: { route: ImageScreenRouteProp }) {
  const store = useStoreContext();
  const { id } = route.params;
  const image = store.images[id];
  const [editing, setEditing] = useState<boolean>(false);
  const [fullScreen, setFullscreen] = useState<boolean>(false);
  const [caption, setCaption] = useState(image.caption || "");
  const doneEditing = useCallback(() => {
    store.setCaption(id, caption);
    setEditing(false);
  }, [setEditing, id, caption, store]);

  return (
    <View style={styles.imageContainer}>
      <ImageZoom 
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').height}
        onClick={() => setFullscreen((state) => !state)}
      >
        <Image source={{ uri: image.uri }} style={styles.image}/> 
      </ImageZoom>
      { !fullScreen && (
        <React.Fragment>
          <BottomOverlay
            editing={editing}
            caption={caption}
            setCaption={doneEditing}
            changeCaption={setCaption}
            startCaptionEdit={() => setEditing(true)}
          />
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
    width: "100%",
    backgroundColor: "#1115",
  },
  overlayText: {
    fontSize: 20,
    color: "#fff",
    margin: 5,
  }
});
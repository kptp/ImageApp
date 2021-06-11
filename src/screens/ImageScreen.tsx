import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { RootStackParamList } from '../navigation';
import { useStoreContext } from '../services';
import ImageZoom from 'react-native-image-pan-zoom';
import { StackScreenProps } from '@react-navigation/stack';
import { ImageOverlay, ImageOverlayText, overlayStyles } from '../components/ImageOverlay';

interface BottomOverlayProps {
  caption: string;
  editing: boolean;
  changeCaption: (s: string) => void;
  startCaptionEdit: () => void;
  setCaption: () => void;
}
function BottomOverlay({ editing, changeCaption, setCaption, startCaptionEdit, caption }: BottomOverlayProps) {
  return (
    <ImageOverlay >
      { editing ? (
        <React.Fragment>
          <TextInput autoFocus multiline={true} style={overlayStyles.overlayText} value={caption} onChangeText={changeCaption}/>
          <Button title={"Done"} onPress={setCaption} />
        </React.Fragment>
       ) : (
        <React.Fragment>
          { !!caption && <ImageOverlayText style={styles.overlayText}>{ caption }</ImageOverlayText> }
          <Button title={"Edit text"} onPress={startCaptionEdit} />
        </React.Fragment>
       )}
    </ImageOverlay>
  )
}

type ImageScreenProps = StackScreenProps<
  RootStackParamList,
  'Image'
>;

export function ImageScreen({ route, navigation }: ImageScreenProps) {
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

  const toggleFullscreen = useCallback(() => {
    navigation.setOptions({ headerShown: fullScreen });
    setFullscreen((state) => !state);
  }, [setFullscreen, fullScreen]);

  return (
    <View style={styles.imageContainer}>
      <ImageZoom 
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').height}
        onClick={toggleFullscreen}
      >
        <Image source={{ uri: image.uri }} style={styles.image}/> 
      </ImageZoom>
      { !fullScreen && (
        <BottomOverlay
          editing={editing}
          caption={caption}
          setCaption={doneEditing}
          changeCaption={setCaption}
          startCaptionEdit={() => setEditing(true)}
        />
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
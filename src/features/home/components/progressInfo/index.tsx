import { Button } from '@components/button';
import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { DocumentItem, ProgressOptionKeyEnum } from '@features/home/types';
import colors from '@themes/color';
import images from '@themes/images';
import { checkPermission } from '@utils/handlePermission';
import { getFullName } from '@utils/handleStrings';
import { modalUtil } from '@utils/modalUtil';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker, {
  Image as PickerImage,
} from 'react-native-image-crop-picker';
import ExpenseForm from '../progressForm/ExpenseForm';
import MileageForm from '../progressForm/MileageForm';
import NoteForm from '../progressForm/NoteForm';
import SelectFileContent from '../selectFileContent';

interface ProgressInfoProps {
  progressKey: ProgressOptionKeyEnum;
  values: any;
  setFieldValue: (key: string, value: any) => void;
}

const ProgressInfo = ({
  progressKey,
  values,
  setFieldValue,
}: ProgressInfoProps) => {
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentItem[]>(
    [],
  );

  const onSetNote = (description: string) => {
    setFieldValue('description', description);
  };

  const onSetExpense = (expense: string) => {
    setFieldValue('metadata.expense', expense);
  };

  const onSetMileage = (mileage: string) => {
    setFieldValue('metadata.mileage', mileage);
  };

  const _fullname = useMemo(() => getFullName(values.client), [values.client]);

  let moreContent = <></>;
  switch (progressKey) {
    case ProgressOptionKeyEnum.EXPENSE:
      moreContent = (
        <ExpenseForm
          expense={values.metadata.expense}
          setExpense={onSetExpense}
        />
      );
      break;
    case ProgressOptionKeyEnum.MILEAGE:
      moreContent = (
        <MileageForm
          mileage={values.metadata.mileage}
          setMileage={onSetMileage}
        />
      );
      break;
    default:
      break;
  }

  const onTakePhoto = async () => {
    const granted = await checkPermission('camera');
    if (!granted) return;

    ImagePicker.openCamera({
      width: 1000,
      height: 800,
      cropping: true,
      compressImageQuality: 0.75,
    })
      .then(image => {
        const newDocument = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          uri: image.path,
          fileName: image.filename || `Image_${Date.now()}`,
          type: image.mime,
          title: image.filename || `Image_${Date.now()}`,
        };

        setSelectedDocuments([...selectedDocuments, newDocument]);
        modalUtil.hideModal();
      })
      .catch(error => {
        modalUtil.hideModal();
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(
            'Error',
            'Something went wrong while selecting images from gallery',
          );
        }
      });
  };

  const onSelectPhoto = async () => {
    const granted = await checkPermission('gallery');
    if (!granted) return;

    ImagePicker.openPicker({
      width: 1000,
      height: 800,
      cropping: false,
      mediaType: 'photo',
      multiple: true,
      compressImageQuality: 0.75,
    })
      .then(images => {
        const pickedImages: PickerImage[] = Array.isArray(images)
          ? images
          : [images];

        const newDocuments: DocumentItem[] = pickedImages.map(image => ({
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          uri: image.path,
          fileName: image.filename || `Image_${Date.now()}`,
          type: image.mime,
          title: image.filename || `Image_${Date.now()}`,
        }));

        setSelectedDocuments([...selectedDocuments, ...newDocuments]);

        modalUtil.hideModal();
      })
      .catch(error => {
        modalUtil.hideModal();
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(
            'Error',
            'Something went wrong while selecting images from gallery',
          );
        }
      });
  };

  const onSelect = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <SelectFileContent
          onSelectPhoto={onSelectPhoto}
          onTakePhoto={onTakePhoto}
        />
      ),
    });
  };

  const onRemoveDocument = (id: string) => () => {
    setSelectedDocuments(prev => prev.filter(document => document.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.viewProgress}>
        {moreContent}
        <View style={styles.client}>
          <FastImage source={images.avatar} style={styles.icon16} />
          <Typo variant="regular_14">
            <Typo variant="semibold_14">Client:</Typo> {_fullname}
          </Typo>
        </View>
        <Spacer height={8} />
        <Divider />
        <Spacer height={8} />
        <NoteForm note={values.description} setNote={onSetNote} />
        <Spacer height={24} />
        <Typo variant="semibold_14">Attachments</Typo>
        <Spacer height={4} />
        <Typo variant="regular_12" color={colors.secondaryText}>
          Attach any relevant documents or images here
        </Typo>
        {selectedDocuments?.length > 0 && (
          <>
            <Spacer height={12} />
            <View style={styles.containerDoc}>
              {selectedDocuments.map(document => (
                <View key={document.id} style={styles.viewDoc}>
                  <Button
                    onPress={onRemoveDocument(document.id)}
                    style={styles.btnDoc}
                    activeOpacity={0.7}
                  >
                    <FastImage
                      source={images.close}
                      style={styles.icon8}
                      tintColor={colors.white}
                    />
                  </Button>
                  <FastImage
                    source={{ uri: document.uri }}
                    style={styles.imgDoc}
                  />
                </View>
              ))}
            </View>
          </>
        )}
        <Spacer height={12} />
        <Button onPress={onSelect} preset="secondary" style={styles.btnAttach}>
          <Typo variant="semibold_12">Attach Files</Typo>
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  viewProgress: {
    marginHorizontal: SpacingDefault.normal,
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  client: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
  btnAttach: {
    height: 36,
  },
  viewDoc: {
    width: '25%',
    aspectRatio: 1,
    padding: 4,
  },
  containerDoc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  btnDoc: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon8: {
    width: 8,
    height: 8,
  },
  imgDoc: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default ProgressInfo;

import { Button } from '@components/button';
import { Divider } from '@components/divider';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { showSnack } from '@components/snackBar';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import TextField from '@components/textField';
import { Typo } from '@components/typo/typo';
import useDebounce from '@hooks/useDebounce';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ApiStatus } from '@services/ApiStatus';
import { showErrorMessage } from '@services/errorHandler';
import { shiftService } from '@services/shift';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@themes/color';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import { modalUtil } from '@utils/modalUtil';
import useAuthStore from '@zustand/authStore';
import { AxiosError } from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SignatureCapture from 'react-native-signature-capture';
import SaveSignatureContent from './components/signatureConfirmConrtent';
import WrapperKeyboardShown from '@components/wrapper/WrapperKeyboardShown';

const AddSignature = () => {
  const { goBack } = useNavigation();
  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.AddSignature>>();

  const { currentUser } = useAuthStore();

  const signRef = useRef<SignatureCapture>(null);

  const role = route.params?.type || 'client';
  const clientName = route.params?.clientName || '';
  const shiftId = route.params?.shiftId || '';
  const scheduleId = route.params?.scheduleId || '';

  const [reviewHeight, setReviewHeight] = useState(0);
  const [isDragged, setIsDragged] = useState(false);
  const [note, setNote] = useState('');
  const noteDebounced = useDebounce(note, 500);
  const noteRef = useRef(note);

  const roleName = useMemo(() => {
    let roleName = '';
    if (role === 'client') {
      roleName = clientName;
    }
    if (role === 'staff') {
      roleName = `${getFullName(currentUser)} (You)`;
    }
    return roleName;
  }, [role, clientName, currentUser]);

  useEffect(() => {
    noteRef.current = note;
  }, [noteDebounced]);

  const queryClient = useQueryClient();

  const { mutate: mutateSignature, isPending: isPendingSignature } =
    useMutation({
      mutationFn: shiftService.postSignature,
      onSuccess: data => {
        if (data.status === ApiStatus.OK) {
          showSnack({
            msg: 'Submit signature successfully',
            position: 'top',
            type: 'success',
            iconColor: colors.green,
          });
          queryClient.invalidateQueries({ queryKey: ['myDetailSchedule'] });
          goBack();
        }
      },
      onError: (error: AxiosError) => {
        showErrorMessage(error);
      },
    });

  const _onDragEvent = (event: { dragged: boolean }) => {
    if (event.dragged) {
      setIsDragged(true);
    }
  };

  const _onSaveEvent = (event: { pathName: string }) => {
    const _params: any = {
      role,
      url: `file://${event.pathName}`,
      // url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
    };

    if (!!noteRef.current) {
      _params.note = noteRef.current;
    }

    mutateSignature({ shiftId, scheduleId, params: _params });
  };

  const _onConfirmSave = () => {
    signRef.current?.saveImage();
  };

  const _onReset = () => {
    signRef.current?.resetImage();
  };

  const _onSave = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: (
        <SaveSignatureContent
          loading={isPendingSignature}
          onConfirm={_onConfirmSave}
        />
      ),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: reviewHeight },
          ]}
        >
          <BackHeader title="Add Signature" />
          <Spacer height={24} />
          <View style={styles.upper}>
            <View style={styles.client}>
              <FastImage source={images.avatar} style={styles.icon16} />
              <Typo variant="regular_14">
                <Typo variant="semibold_14">
                  {role === 'client' ? 'Client' : 'Carer'}:
                </Typo>{' '}
                {roleName}
              </Typo>
            </View>
            <Spacer height={8} />
            <Divider />
            <Spacer height={32} />
            <Typo variant="semibold_16" center>
              Draw your signature
            </Typo>
            <Spacer height={16} />
            <SignatureCapture
              style={styles.signature}
              ref={signRef}
              onSaveEvent={_onSaveEvent}
              onDragEvent={_onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor={colors.background}
              strokeColor={colors.primaryText}
            />
            <Spacer height={8} />
            <Button onPress={_onReset} style={styles.btnClear}>
              <Typo variant="medium_14" color={colors.primaryButton}>
                Clear
              </Typo>
            </Button>
            <Spacer height={16} />
            <TextField
              title="Note"
              placeholder="Enter your note"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </ScrollView>
        <WrapperKeyboardShown callBackHeight={setReviewHeight}>
          <Button
            onPress={_onSave}
            loading={isPendingSignature}
            disabled={!isDragged || isPendingSignature}
            style={styles.btnSave}
            text="Save"
            preset="primary"
          />
          <InsetSubstitute type="bottom" />
        </WrapperKeyboardShown>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
  signature: {
    borderColor: colors.divider,
    borderWidth: 1,
    height: SpacingDefault.height / 4,
    width: SpacingDefault.width - SpacingDefault.normal * 2,
    alignSelf: 'center',
  },
  btnClear: {
    alignItems: 'flex-end',
  },
  btnSave: {
    marginHorizontal: SpacingDefault.normal,
  },
  upper: {
    paddingHorizontal: SpacingDefault.normal,
    flex: 1,
  },
});

export default AddSignature;

import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { SignatureRoleEnum } from '@models/Shift';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { DATE_FORMAT, formatDate } from '@utils/handleDateTime';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetStaffScheduleByScheduleId } from './hooks';

const ShiftSignature = () => {
  const insets = useSafeAreaInsets();
  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.ShiftSignature>>();

  const { navigate } = useNavigation();

  const scheduleId = route.params?.scheduleId || '';
  const shiftId = route.params?.shiftId || '';
  const signatureRequired = route.params?.signatureRequired ?? false;
  const clientSignatureRequired =
    route.params?.clientSignatureRequired ?? false;

  const { data: dataStaffSchedules } = useGetStaffScheduleByScheduleId({
    scheduleId,
  });

  const _signature = dataStaffSchedules?.data?.signature;
  const _clientSignature = dataStaffSchedules?.data?.clientSignature;
  const _client = dataStaffSchedules?.data?.clientNames[0]
    ? dataStaffSchedules.data?.clientNames[0]
    : '';

  const onAddSignature = (type: SignatureRoleEnum) => () => {
    navigate(Screen.AddSignature, {
      type,
      clientName: _client,
      shiftId,
      scheduleId,
    });
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Signatures" />
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <View style={styles.headerImage}>
            <FastImage
              source={images.avatar}
              style={styles.icon20}
              tintColor={colors.white}
            />
          </View>
          <View style={styles.signatureItem}>
            <View>
              <Typo variant="regular_14">Client Signature</Typo>
              <Typo variant="regular_14" color={colors.secondaryText}>
                {clientSignatureRequired ? 'Required' : 'Optional'} -{' '}
                {!isEmpty(_clientSignature) ? 'Provided' : 'Not provided'}
              </Typo>
            </View>
            {isEmpty(_clientSignature) ? (
              <Button
                onPress={onAddSignature(SignatureRoleEnum.CLIENT)}
                style={styles.btnSignature}
              >
                <Typo variant="semibold_10">Add Signature</Typo>
              </Button>
            ) : (
              <FastImage
                source={images.circleCheck}
                style={styles.icon24}
                tintColor={colors.primaryButton}
              />
            )}
          </View>
        </View>
        <Spacer height={16} />
        <View style={styles.headerItem}>
          <View style={styles.headerImage}>
            <FastImage
              source={images.avatar}
              style={styles.icon20}
              tintColor={colors.white}
            />
          </View>
          <View style={styles.signatureItem}>
            <View>
              <Typo variant="regular_14">Staff Signature</Typo>
              <Typo variant="regular_14" color={colors.secondaryText}>
                {signatureRequired ? 'Required' : 'Optional'} -{' '}
                {!isEmpty(_signature) ? 'Provided' : 'Not provided'}
              </Typo>
            </View>
            {isEmpty(_signature) ? (
              <Button
                onPress={onAddSignature(SignatureRoleEnum.STAFF)}
                style={styles.btnSignature}
              >
                <Typo variant="semibold_10">Add Signature</Typo>
              </Button>
            ) : (
              <FastImage
                source={images.circleCheck}
                style={styles.icon24}
                tintColor={colors.primaryButton}
              />
            )}
          </View>
        </View>
      </View>

      <Spacer height={16} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {_clientSignature ? (
          <View style={styles.signatureArea}>
            <Typo variant="semibold_14">Client Signature</Typo>
            <Spacer height={8} />
            <Typo variant="regular_12" color={colors.secondaryText}>
              <Typo variant="regular_12">Date Time: </Typo>
              {formatDate(_clientSignature.createdAt, DATE_FORMAT.FIVE)}
            </Typo>
            {!!_clientSignature.note ? (
              <>
                <Spacer height={4} />
                <Typo variant="regular_12" color={colors.secondaryText}>
                  <Typo variant="regular_12">Note: </Typo>
                  {_clientSignature.note}
                </Typo>
              </>
            ) : (
              <></>
            )}
            <Spacer height={12} />
            <View style={styles.signatureBox}>
              <FastImage
                source={{ uri: _clientSignature.url }}
                style={styles.signatureUrl}
              />
            </View>
            <Spacer height={16} />
          </View>
        ) : (
          <></>
        )}
        {_signature ? (
          <View style={styles.signatureArea}>
            <Typo variant="semibold_14">Staff Signature</Typo>
            <Spacer height={8} />
            <Typo variant="regular_12" color={colors.secondaryText}>
              <Typo variant="regular_12">Date Time: </Typo>
              {formatDate(_signature.createdAt, DATE_FORMAT.FIVE)}
            </Typo>
            {!!_signature.note ? (
              <>
                <Spacer height={4} />
                <Typo variant="regular_12" color={colors.secondaryText}>
                  <Typo variant="regular_12">Note: </Typo>
                  {_signature.note}
                </Typo>
              </>
            ) : (
              <></>
            )}
            <Spacer height={12} />
            <View style={styles.signatureBox}>
              <FastImage
                source={{ uri: _signature.url }}
                style={styles.signatureUrl}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        <Spacer height={insets.bottom + 16} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    backgroundColor: colors.background,
    paddingVertical: 16,
    paddingHorizontal: SpacingDefault.normal,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
  headerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon20: {
    width: 20,
    height: 20,
  },
  btnAdd: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: SpacingDefault.normal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon24: {
    width: 24,
    height: 24,
  },
  signatureArea: {
    paddingHorizontal: SpacingDefault.normal,
  },
  signatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  signatureUrl: {
    width: '100%',
    height: '100%',
  },
  signatureBox: {
    width: SpacingDefault.width - SpacingDefault.normal * 2,
    height: 300,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignature: {
    borderWidth: 1,
    borderColor: colors.divider,
    paddingVertical: 4,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
  },
});

export default ShiftSignature;

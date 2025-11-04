import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { capitalizeFirst, getFullName } from '@utils/handleStrings';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useGetMyShiftProgressById } from './hooks';
import { ProgressOptionKeyEnum } from './types';

const ProgressDetail = () => {
  const { navigate } = useNavigation();
  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.ProgressDetail>>();

  const shiftId = route.params.shiftId || '';
  const shiftProgressId = route.params.shiftProgressId || '';

  const { data: dataDetailProgress } = useGetMyShiftProgressById({
    shiftId,
    shiftProgressId,
  });

  const detailProgress = dataDetailProgress?.data;

  const _fullName = getFullName(detailProgress?.client!);

  const onEdit = () => {
    navigate(Screen.UpdateProgress, { detailProgress: detailProgress! });
  };

  if (!detailProgress) {
    return <></>;
  }

  return (
    <View>
      <BackHeader title="Progress Detail" />
      <Spacer height={24} />
      <View style={styles.info}>
        <View style={styles.header}>
          <Typo variant="medium_14">
            <Typo variant="bold_14">Type:</Typo>{' '}
            {capitalizeFirst(detailProgress?.shiftProgressType)}
          </Typo>
          <Button onPress={onEdit}>
            <FastImage
              source={images.edit}
              style={styles.icon24}
              tintColor={colors.primaryButton}
            />
          </Button>
        </View>
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Client:</Typo> {_fullName}
        </Typo>
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Description:</Typo>{' '}
          {detailProgress.description || 'No description'}
        </Typo>
        <Spacer height={8} />
        {detailProgress.shiftProgressType === ProgressOptionKeyEnum.EXPENSE ? (
          <Typo variant="medium_14">
            <Typo variant="bold_14">Expense:</Typo>{' '}
            {detailProgress.metadata?.expense || '0'}
          </Typo>
        ) : (
          <></>
        )}
        {detailProgress.shiftProgressType === ProgressOptionKeyEnum.MILEAGE ? (
          <Typo variant="medium_14">
            <Typo variant="bold_14">Mileage:</Typo>{' '}
            {detailProgress.metadata?.mileage || '0'}
          </Typo>
        ) : (
          <></>
        )}
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Attachment:</Typo>{' '}
          {detailProgress?.url.length}
        </Typo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAttach: {
    paddingVertical: 8,
    paddingHorizontal: SpacingDefault.small,
    borderWidth: 0.5,
    borderColor: colors.divider,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  info: {
    paddingHorizontal: SpacingDefault.normal,
  },
  icon24: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProgressDetail;

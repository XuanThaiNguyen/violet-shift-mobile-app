import { Divider } from '@components/divider';
import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { EmploymentTypeOptions } from '@features/home/constants';
import { IClient } from '@models/Client';
import { IUser } from '@models/User';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import colors from '@themes/color';
import { EMPTY_STRING } from '@themes/constant';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import useAuthStore from '@zustand/authStore';
import dayjs from 'dayjs';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type ProfileProps = IUser | IClient;

const Profile = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.Profile>>();
  const mode = route.params?.mode || 'mine';
  const clientInfo = route.params?.clientInfo;

  const { currentUser } = useAuthStore();

  const dataProfile: ProfileProps | undefined =
    mode === 'client' ? clientInfo : currentUser?.user;

  const _fullName = getFullName({
    firstName: dataProfile?.firstName || '',
    lastName: dataProfile?.lastName || '',
    middleName: dataProfile?.middleName || '',
  });

  if (isEmpty(dataProfile)) return <></>;

  return (
    <View>
      <BackHeader title="Profile" />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <FastImage
            source={images.avatar}
            style={styles.icon32}
            tintColor={colors.white}
          />
        </View>
        <Spacer width={'large'} />
        <Typo variant="semibold_16" color={colors.primaryButton}>
          {dataProfile.preferredName}
        </Typo>
      </View>
      <Spacer height={8} />
      <View style={styles.general}>
        <Typo variant="medium_16">General Information:</Typo>
        <Spacer height={16} />
        <Divider />
        <Spacer height={16} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Name:</Typo>
          </View>
          <Typo variant="regular_14">{_fullName}</Typo>
        </View>
        <Spacer height={12} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Preferred Name:</Typo>
          </View>
          <Typo variant="regular_14">{dataProfile.preferredName}</Typo>
        </View>
        <Spacer height={12} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Contact:</Typo>
          </View>
          <Typo variant="regular_14">
            {!!dataProfile.phoneNumber ? dataProfile.phoneNumber : EMPTY_STRING}
          </Typo>
        </View>
        <Spacer height={12} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Address:</Typo>
          </View>
          <Typo variant="regular_14">
            {!!dataProfile?.address ? dataProfile.address : EMPTY_STRING}
          </Typo>
        </View>
        <Spacer height={12} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Gender:</Typo>
          </View>
          <Typo variant="regular_14">{dataProfile.gender}</Typo>
        </View>
        {'employmentType' in dataProfile && mode === 'mine' ? (
          <>
            <Spacer height={12} />
            <View style={styles.row}>
              <View style={styles.width}>
                <Typo variant="regular_14">Employment Type:</Typo>
              </View>
              <Typo variant="regular_14">
                {EmploymentTypeOptions[dataProfile.employmentType]}
              </Typo>
            </View>
          </>
        ) : (
          <></>
        )}
        <Spacer height={12} />
        <View style={styles.row}>
          <View style={styles.width}>
            <Typo variant="regular_14">Date of Birth:</Typo>
          </View>
          <Typo variant="regular_14">
            {!!dataProfile.birthdate
              ? dayjs(dataProfile.birthdate).format('DD/MM/YYYY')
              : EMPTY_STRING}
          </Typo>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon32: {
    width: 36,
    height: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: 142,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: SpacingDefault.normal,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  general: {
    backgroundColor: colors.white,
    marginHorizontal: SpacingDefault.normal,
    paddingHorizontal: SpacingDefault.smaller,
    paddingVertical: SpacingDefault.normal,
    borderRadius: 8,
  },
});

export default Profile;

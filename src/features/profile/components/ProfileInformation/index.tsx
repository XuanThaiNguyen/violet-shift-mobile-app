import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Typo } from '@components/typo/typo';
import { Spacer } from '@components/spacer';
import { Divider } from '@components/divider';
import { EMPTY_STRING } from '@themes/constant';
import dayjs from 'dayjs';
import { getFullName } from '@utils/handleStrings';
import { IUser } from '@models/User';
import { IClient } from '@models/Client';
import colors from '@themes/color';
import { SpacingDefault } from '@components/spacing/spacing';
import { EmploymentTypeOptions } from '@features/home/constants';

interface ProfileInformationProps {
  dataProfile: IUser | IClient | undefined;
  currentUser: IUser | null;
  mode: string;
}

const ProfileInformation = ({
  dataProfile,
  currentUser,
  mode,
}: ProfileInformationProps) => {
  return (
    <View style={styles.general}>
      <Typo variant="medium_16">General Information:</Typo>
      <Spacer height={16} />
      <Divider />
      <Spacer height={16} />
      <View style={styles.row}>
        <View style={styles.width}>
          <Typo variant="regular_14">Name:</Typo>
        </View>
        <Typo variant="regular_14">
          {currentUser ? getFullName(currentUser) : EMPTY_STRING}
        </Typo>
      </View>
      <Spacer height={12} />
      <View style={styles.row}>
        <View style={styles.width}>
          <Typo variant="regular_14">Preferred Name:</Typo>
        </View>
        <Typo variant="regular_14">
          {!!dataProfile?.preferredName
            ? dataProfile.preferredName
            : EMPTY_STRING}
        </Typo>
      </View>
      <Spacer height={12} />
      <View style={styles.row}>
        <View style={styles.width}>
          <Typo variant="regular_14">Contact:</Typo>
        </View>
        <Typo variant="regular_14">
          {!!dataProfile?.phoneNumber ? dataProfile.phoneNumber : EMPTY_STRING}
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
        <Typo variant="regular_14">
          {!!dataProfile?.gender ? dataProfile.gender : EMPTY_STRING}
        </Typo>
      </View>
      {dataProfile && 'employmentType' in dataProfile && mode === 'mine' ? (
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
          {!!dataProfile?.birthdate
            ? dayjs(dataProfile.birthdate).format('DD/MM/YYYY')
            : EMPTY_STRING}
        </Typo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: 142,
  },
  general: {
    backgroundColor: colors.white,
    marginHorizontal: SpacingDefault.normal,
    paddingHorizontal: SpacingDefault.smaller,
    paddingVertical: SpacingDefault.normal,
    borderRadius: 8,
  },
});

export default ProfileInformation;

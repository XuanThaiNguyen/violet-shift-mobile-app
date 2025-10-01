import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { navigationRef } from '@navigation/navigationUtil';
import Screen from '@navigation/screen';
import colors from '@themes/color';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MyScheduleItemProps {
  item: any;
  showDate: boolean;
}

const MyScheduleItem = ({ item, showDate }: MyScheduleItemProps) => {
  const onDetailShift = () => {
    navigationRef.current?.navigate(Screen.DetailShift);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Typo
          center
          variant="medium_16"
          color={showDate ? colors.black : colors.transparent}
        >
          {dayjs(item.date).format(`D\nddd`)}
        </Typo>
      </View>
      <Button onPress={onDetailShift} style={styles.rightView}>
        <View style={styles.time}>
          <Typo variant="semibold_10">{item.time}</Typo>
          <Typo variant="regular_10">{item.type}</Typo>
        </View>
        <Spacer height={20} />
        <Typo variant="regular_14">{item.user.name}</Typo>
        <Spacer height={16} />
        <Typo variant="regular_14">{item.address}</Typo>
        <Spacer height={24} />
        <Typo
          variant="regular_14"
          style={styles.textStatus}
          color={colors.green}
        >
          {item.status}
        </Typo>
      </Button>
    </View>
  );
};

export default MyScheduleItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftView: {
    paddingHorizontal: SpacingDefault.large,
    marginTop: 28,
  },
  rightView: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    flex: 1,
    padding: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.divider,
    marginRight: SpacingDefault.normal,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStatus: {
    textAlign: 'right',
  },
});

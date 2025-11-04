import { Button } from '@components/button';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IShiftProgress } from '@models/Shift';
import Screen from '@navigation/screen';
import { useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import { EMPTY_ARRAY } from '@themes/constant';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SelectProgressContent from '../components/selectProgressContent';
import ShiftProgressItem from '../components/shiftProgressItem';
import { useGetMyShiftProgresses } from '../hooks';
import { ProgressOptionKeyEnum } from '../types';
import { Divider } from '@components/divider';

interface ShiftProgressProps {
  shiftId: string;
}

const ShiftProgress = ({ shiftId }: ShiftProgressProps) => {
  const { navigate } = useNavigation();

  const { data: dataProgresses } = useGetMyShiftProgresses({ shiftId });
  const _dataProgresses = dataProgresses?.data || EMPTY_ARRAY;

  const onAddProgress = ({
    key,
    label,
  }: {
    key: ProgressOptionKeyEnum;
    label: string;
  }) => {
    navigate(Screen.AddProgress, { key, label, shiftId });
  };

  const onSelectProgress = () => {
    modalUtil.showModal({
      mode: 'bottom',
      children: <SelectProgressContent onSelectProgress={onAddProgress} />,
    });
  };

  const renderItem = ({ item }: { item: IShiftProgress }) => (
    <ShiftProgressItem item={item} shiftId={shiftId} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyNote}>
      <Typo variant="semibold_16">No Notes!</Typo>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={_dataProgresses}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={renderEmpty}
      />
      <Button onPress={onSelectProgress} style={styles.btnAdd}>
        <FastImage
          source={images.add}
          style={styles.icon24}
          tintColor={colors.white}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  btnAdd: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 32,
    right: SpacingDefault.normal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon24: {
    width: 24,
    height: 24,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  emptyNote: {
    alignItems: 'center',
    marginTop: 24,
  },
});

export default ShiftProgress;

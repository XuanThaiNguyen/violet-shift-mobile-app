import { Divider } from '@components/divider';
import { Typo } from '@components/typo/typo';
import { IShiftProgressEvent } from '@models/Shift';
import colors from '@themes/color';
import { EMPTY_ARRAY } from '@themes/constant';
import { getFullName } from '@utils/handleStrings';
import useAuthStore from '@zustand/authStore';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ShiftProgressEventItem from '../components/shiftProgressEventItem';
import { useGetMyShiftProgressEvents } from '../hooks';

interface ShiftEventsProps {
  shiftId: string;
}

const ShiftEvents = ({ shiftId }: ShiftEventsProps) => {
  const { data: dataProgressEvents } = useGetMyShiftProgressEvents({ shiftId });
  const _dataProgressEvents = dataProgressEvents?.data || EMPTY_ARRAY;
  const { currentUser } = useAuthStore();

  const renderEmpty = () => (
    <View style={styles.emptyEvents}>
      <Typo variant="semibold_16">No Events!</Typo>
    </View>
  );

  const renderItem = ({ item }: { item: IShiftProgressEvent }) => {
    const _fullNameUser =
      item.createdBy._id === currentUser?._id
        ? 'You'
        : getFullName(item.createdBy);

    return <ShiftProgressEventItem item={item} fullNameUser={_fullNameUser} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={_dataProgressEvents}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyEvents: {
    alignItems: 'center',
    marginTop: 24,
  },
});

export default ShiftEvents;

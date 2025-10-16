import { Button } from '@components/button';
import CheckBox from '@components/checkbox';
import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IShiftTask } from '@models/Shift';
import colors from '@themes/color';
import { EMPTY_ARRAY } from '@themes/constant';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useGetTasksByShiftId, useUpdateTaskByShiftId } from '../hooks';

interface ShiftTasksProps {
  shiftId: string;
}

const ShiftTasks = ({ shiftId }: ShiftTasksProps) => {
  const { data: dataShiftTasks, refetch } = useGetTasksByShiftId({ shiftId });

  const _tasks = dataShiftTasks?.data || EMPTY_ARRAY;

  const {
    mutate: updateTaskByShiftId,
    isSuccess,
    isPending,
  } = useUpdateTaskByShiftId();

  const onCheck = (task: IShiftTask) => () => {
    updateTaskByShiftId({
      taskId: task._id,
      isCompleted: !task.isCompleted,
      shiftId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isPending) {
      refetch();
    }
  }, [isSuccess, isPending]);

  const _renderItem = (task: IShiftTask, index: number) => {
    return (
      <View key={task._id} style={styles.item}>
        <View style={styles.title}>
          <Typo
            variant={task.isMandatory ? 'semibold_14' : 'regular_14'}
            style={[
              styles.uncheckedText,
              task.isCompleted && styles.checkedText,
            ]}
          >
            {task.name}
          </Typo>
          <Spacer width={'small'} />
          <Button onPress={onCheck(task)}>
            <CheckBox isSelected={task.isCompleted} />
          </Button>
        </View>
        {index !== _tasks.length - 1 ? <Divider /> : <></>}
      </View>
    );
  };

  return <View style={styles.container}>{_tasks.map(_renderItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
  item: {
    backgroundColor: colors.white,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: SpacingDefault.normal,
  },
  checkedText: {
    textDecorationLine: 'none',
  },
  uncheckedText: {
    textDecorationLine: 'line-through',
  },
});

export default ShiftTasks;

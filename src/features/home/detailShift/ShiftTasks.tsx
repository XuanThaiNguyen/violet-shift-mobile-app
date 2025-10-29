import { Button } from '@components/button';
import CheckBox from '@components/checkbox';
import { Divider } from '@components/divider';
import { showSnack } from '@components/snackBar';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IShiftTask } from '@models/Shift';
import { ApiStatus } from '@services/ApiStatus';
import { showErrorMessage } from '@services/errorHandler';
import { shiftService } from '@services/shift';
import { QueryArrayResponse } from '@services/type';
import { useMutation } from '@tanstack/react-query';
import colors from '@themes/color';
import { EMPTY_ARRAY } from '@themes/constant';
import { AxiosError } from 'axios';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useGetTasksByShiftId } from '../hooks';

interface ShiftTasksProps {
  shiftId: string;
}

const ShiftTasks = ({ shiftId }: ShiftTasksProps) => {
  const { data: dataShiftTasks, refetch } = useGetTasksByShiftId({ shiftId });

  const _tasks = dataShiftTasks?.data || EMPTY_ARRAY;

  const { mutate: updateTaskByShiftId } = useMutation({
    mutationFn: shiftService.updateTaskByShiftId,
    onSuccess: (data: QueryArrayResponse<IShiftTask>) => {
      if (data.status === ApiStatus.OK) {
        showSnack({
          msg: 'Task updated successfully',
          position: 'top',
          type: 'success',
          iconColor: colors.green,
        });
        refetch();
      }
    },
    onError: (error: AxiosError) => {
      showErrorMessage(error);
    },
  });

  const onCheck = (task: IShiftTask) => () => {
    updateTaskByShiftId({
      taskId: task._id,
      isCompleted: !task.isCompleted,
      shiftId,
    });
  };

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

  if (_tasks.length === 0)
    return (
      <View style={styles.container}>
        <Typo center variant="regular_14">
          No tasks!
        </Typo>
      </View>
    );

  return <View style={styles.container}>{_tasks.map(_renderItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
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
    textDecorationLine: 'line-through',
  },
  uncheckedText: {
    textDecorationLine: 'none',
  },
});

export default ShiftTasks;

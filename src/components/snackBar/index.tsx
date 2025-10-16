import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStyles } from './styles';
import { DURATION_HIDE, INITIAL_SNACKBAR } from './constant';
import { Item, PositionMessage, SnackBarProps, TypeMessage } from './type';
import { SnackBarItem } from './snackBarItem';

const SnackBarComponent = forwardRef((props: SnackBarProps, ref) => {
  const styles = useStyles();

  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success',
        position = 'top',
        isIncludedBottomHeight = true,
        icon,
        rightChild,
        disableHeight,
        showRightChild,
        pVer,
        iconColor,
        bgTooltip,
      }: {
        msg: string;
        interval: number;
        type: TypeMessage;
        position: PositionMessage;
        isIncludedBottomHeight: boolean;
        icon?: React.ReactElement;
        rightChild?: any;
        showRightChild?: any;
        disableHeight?: boolean;
        pVer?: number;
        iconColor?: string | undefined;
        bgTooltip?: string;
      }) => {
        setData(d =>
          d.concat([
            {
              id: new Date().getTime(),
              msg,
              type,
              interval,
              position,
              isIncludedBottomHeight,
              icon,
              showRightChild,
              rightChild,
              disableHeight,
              pVer,
              iconColor,
              bgTooltip,
            },
          ]),
        );
      },
      dismiss: () => {
        setData(d => d.slice(0, d.length - 2));
      },
    }),
    [],
  );

  // state
  const [data, setData] = useState<Item[]>([]);
  const inset = useSafeAreaInsets();
  // function
  const _onPop = useCallback((item: Item) => {
    setData(d => d.filter(x => x.id !== item.id));
  }, []);

  const _renderItem = useCallback(
    (item: Item) => (
      //@ts-ignore
      <SnackBarItem key={item.id} {...{ item, onPop: _onPop }} {...props} />
    ),
    [_onPop, props],
  );

  // render
  return (
    <View
      pointerEvents={'box-none'}
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { marginTop: inset.top },
      ]}
    >
      {data.map(_renderItem)}
    </View>
  );
});
type SnackBar = {
  show: (data: {
    msg?: string;
    interval?: number;
    type?: TypeMessage;
    position?: PositionMessage;
    isIncludedBottomHeight?: boolean;
    icon?: React.ReactElement;
    rightChild?: any;
    showRightChild?: any;
    disableHeight?: boolean;
    pVer?: number;
    iconColor?: string | undefined;
    bgTooltip?: string;
  }) => void;
  dismiss: () => void;
};
export const snackBarRef = createRef<SnackBar>();

export const SnackBar = memo(
  (props: SnackBarProps) => <SnackBarComponent ref={snackBarRef} {...props} />,
  isEqual,
);

export const dismissSnack = () => snackBarRef.current?.dismiss();

export const showSnack = ({
  msg,
  interval = INITIAL_SNACKBAR.DURATION,
  type = 'default',
  position = 'top',
  isIncludedBottomHeight = true,
  icon,
  rightChild,
  disableHeight,
  pVer,
  showRightChild,
  iconColor,
  bgTooltip,
}: {
  msg?: string;
  interval?: number;
  type?: TypeMessage;
  position?: PositionMessage;
  isIncludedBottomHeight?: boolean;
  icon?: React.ReactElement;
  rightChild?: any;
  disableHeight?: boolean;
  pVer?: number;
  showRightChild?: any;
  iconColor?: string | undefined;
  bgTooltip?: string;
}) => {
  snackBarRef.current?.show({
    msg,
    interval,
    type,
    position,
    isIncludedBottomHeight,
    icon,
    rightChild,
    disableHeight,
    pVer,
    showRightChild,
    iconColor,
    bgTooltip,
  });
};

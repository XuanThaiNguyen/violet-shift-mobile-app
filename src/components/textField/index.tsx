import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { FontSizeDefault } from '@components/typo/typoSize';
import colors from '@themes/color';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextFieldProps } from './type';

const TextField = ({
  value,
  onBlur,
  onChangeText,
  renderRightChildren,
  error,
  errorMessage,
  placeholder,
  editable,
  iconLeft,
  iconRight,
  title,
  maxLength,
  multiline = false,
  inputStyle,
  keyboardType,
  blockInputStyle,
  secureTextEntry,
}: TextFieldProps) => {
  return (
    <View>
      {!!title ? (
        <>
          <Typo variant="medium_14" color={colors.primaryText}>
            {title}
          </Typo>
          <Spacer height={8} />
        </>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.inputContainer,
          error && styles.errorInput,
          blockInputStyle,
        ]}
      >
        {!!iconLeft && (
          <>
            <FastImage
              source={iconLeft}
              style={styles.icon}
              tintColor={colors.secondaryText}
            />
            <Spacer width="smaller" />
          </>
        )}
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={placeholder}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={colors.secondaryText}
          style={[styles.input, inputStyle]}
        />
        {!!iconRight ? (
          <>
            <Spacer width="smaller" />
            <FastImage
              source={iconRight}
              style={styles.icon}
              tintColor={colors.secondaryText}
            />
          </>
        ) : renderRightChildren ? (
          renderRightChildren()
        ) : (
          <></>
        )}
      </View>
      {error ? (
        <View>
          <Spacer height={4} />
          <Typo variant="semibold_12" color={colors.red}>
            {errorMessage}
          </Typo>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: FontSizeDefault.FONT_16,
    color: colors.primaryText,
  },
  icon: {
    width: 16,
    height: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  errorInput: {
    borderColor: colors.red,
  },
});

export default TextField;

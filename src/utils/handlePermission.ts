import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

const getPermissionType = (
  type: 'gallery' | 'camera',
): Permission | undefined => {
  if (type === 'camera') {
    return Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });
  }

  // GALLERY
  if (Platform.OS === 'android') {
    // Android 13+ uses READ_MEDIA_IMAGES
    if (+Platform.Version >= 33) {
      return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    }
    return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  }

  return PERMISSIONS.IOS.PHOTO_LIBRARY;
};

const handlePermissionStatus = async (
  status: string,
  permissionType: string,
  permission: Permission,
) => {
  switch (status) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return true;

    case RESULTS.DENIED: {
      const req = await request(permission);
      return req === RESULTS.GRANTED;
    }

    case RESULTS.BLOCKED:
      Alert.alert(
        'Permission Blocked',
        `Access to ${permissionType} is blocked. Please enable it in Settings.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => openSettings() },
        ],
      );
      return false;

    default:
      return false;
  }
};

export const checkPermission = async (type: 'gallery' | 'camera') => {
  const permission = getPermissionType(type);
  if (!permission) return false;

  const status = await check(permission);
  return handlePermissionStatus(status, type, permission);
};

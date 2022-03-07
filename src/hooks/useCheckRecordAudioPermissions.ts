import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

export function useCheckRecordAudioPermissions() {
  const [recordAudioPermission, setRecordAudioPermission] = useState(true);

  async function checkPermission() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then(
      (result) => {
        if (!result) {
          setRecordAudioPermission(false);
        }
      }
    );
  }

  useEffect(() => {
    checkPermission();
  }, []);

  function grantedAudioPermission() {
    setRecordAudioPermission(true);
  }

  return {
    recordAudioPermission,
    grantedAudioPermission,
  };
}

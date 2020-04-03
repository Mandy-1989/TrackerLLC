import DeviceInfo from 'react-native-device-info';

export function getVersionCode() {
    return DeviceInfo.getVersion();
}

export function getDeviceInfo() {
    return "Brand:" + DeviceInfo.getBrand() + ", " +
        "Device Id:" + DeviceInfo.getDeviceId() + ", " +
        "Device Name:" + DeviceInfo.getDeviceName() + ", " +
        "Device Manufacturing:" + DeviceInfo.getManufacturer() + ", " +
        "Device Model:" + DeviceInfo.getModel() + ", " +
        "isEmulator:" + DeviceInfo.isEmulator();
}

export function getNumberOfLines(text, fontSize, fontConstant, containerWidth) {
    let cpl = Math.floor(containerWidth / (fontSize / fontConstant));
    const words = text.split(' ');
    const elements = [];
    let line = '';

    while (words.length > 0) {
        if ((line.length + words[0].length + 1) <= cpl || line.length === 0 && words[0].length + 1 >= cpl) {
            let word = words.splice(0, 1);
            if (line.length === 0) {
                line = word;
            } else {
                line = line + " " + word;
            }
            if (words.length === 0) {
                elements.push(line);
            }
        }
        else {
            elements.push(line);
            line = "";
        }
    }
    return elements.length;
}
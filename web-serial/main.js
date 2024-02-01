document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("click-me")
    .addEventListener("click", showSerialDevices);
});

const showSerialDevices = async () => {
  let port = undefined;
  try {
    port = await navigator.serial.requestPort();
  } catch (error) {
    console.log(`Couldn't request port: ${error}`);
  }

  console.log(`Selected port information:\n${port.getInfo()}`);

  const grantedPermissionDevices = await navigator.serial.getPorts();
  console.log(grantedPermissionDevices);

  try {
    await port.open({ baudRate: 9600 });
  } catch (error) {
    console.log(`Couldn't open port: ${error}`);
  }
};

// import { DEVICES_LIST } from "./devices-list.js";

const showDevices = async () => {
  // const devicesSupported = DEVICES_LIST.map((device) => {
  //   return { vendorId: device.vendorId, usagePage: device.usagePage };
  // });
  // console.log(devicesSupported);
  const opts = {
    filters: [],
  };
  const devices = await navigator.hid.requestDevice(opts);
  const myDevice = devices[0];
  console.log(myDevice);
  await myDevice.open();
  myDevice.addEventListener("inputreport", (event) => {
    onHIDEntry(event);
  });
};

document.getElementById("click-me").addEventListener("click", showDevices);

const onHIDEntry = (event) => {
  const { data, device, reportId } = event;
  const uint8Array = new Uint8Array(data.buffer);
  const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
  console.log(`${base64String}     ??    `);
  console.log(data.buffer);
  console.log("\n\n");
};

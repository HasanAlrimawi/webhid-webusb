navigator.usb.getDevices().then((devices) => {
  console.log(`Total devices: ${devices.length}`);
  // devices.forEach((device) => {
  //   console.log(
  //     `product name: ${device.productName}, serial number ${device.serialNumber}`
  //   );
  // });
});

const connectDev = async () => {
  const filters = [
    { vendorId: 0x0079, productId: 0x0006 },
    { vendorId: 0x174f, productId: 0x241a },
    { vendorId: 0x06a8, productId: 0x0420 },
    { vendorId: 0x03f0, productId: 0x5341 },
    { vendorId: 0x1b3f, productId: 0x2008 },
    { vendorId: 0x1a40, productId: 0x0101 },
  ];
  // const deviceFilter = [
  //   { vendorId: 0x0fd9 },
  //   { vendorId: 0x0079 },
  //   { vendorId: 0x174f },
  //   { vendorId: 0x06a8 },
  //   { vendorId: 0x03f0 },
  //   { vendorId: 0x1b3f },
  //   { vendorId: 0x1a40 },
  //   { vendorId: 0x0781 },
  // ];
  // const opts = { filters: deviceFilter };
  // const devices = await navigator.hid.requestDevice(opts);
  // const myDevice = devices[0];
  // await myDevice.open();
  // console.log(myDevice);
  // myDevice.addEventListener("inputreport", handleInpRpt);
  device = await navigator.usb.requestDevice({ filters: [] });
  console.log(device);
  try {
    const openResult = await device.open();
    // await device.selectConfiguration(1); // Select the configuration you're interested in, often 1
    // const interfaces = device.configuration.interfaces;
    // console.log(interfaces);
    console.log(openResult);
  } catch (error) {
    console.log(error);
  }
  await device.selectConfiguration(1);
  await device.claimInterface(3);
  listen();
};

// const connectDev = async () => {
//   let device;

//   navigator.usb
//     .requestDevice({
//       filters: [
//         { vendorId: 0x06a8, productId: 0x0420 },
//         { vendorId: 0x03f0, productId: 0x5341 },
//         { vendorId: 0x1b3f, productId: 0x2008 },
//         { vendorId: 0x1a40, productId: 0x0101 },
//       ],
//     })
//     .then((selectedDevice) => {
//       device = selectedDevice;
//       const openedDevice = await device.open();
//       console.log(openedDevice);
//       return openedDevice; // Begin a session.
//     })
//     .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
//     .then(() => device.claimInterface(3)) // Request exclusive control over interface #2.
//     // .then(() =>
//     //   device.controlTransferOut({
//     //     requestType: "class",
//     //     recipient: "interface",
//     //     request: 0x22,
//     //     value: 0x01,
//     //     index: 0x02,
//     //   })
//     // ) // Ready to receive data
//     .then(() => device.transferIn(0, 64)) // Waiting for 64 bytes of data from endpoint #1.
//     .then((result) => {
//       const decoder = new TextDecoder();
//       console.log("Received: " + decoder.decode(result.data));
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

document.getElementById("click-me").addEventListener("click", async () => {
  await connectDev();
});

const listen = async () => {
  const result = await device.transferIn(3, 64);
  const decoder = new TextDecoder();
  const message = decoder.decode(result.data);
  console.log(message);
};

const handleInpRpt = async (data) => {
  console.log(data);
};

//sudo systemctl stop fwupd.service

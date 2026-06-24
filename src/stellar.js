import { requestAccess, getAddress } from "@stellar/freighter-api";

export const connectWallet = async () => {
  try {
    const access = await requestAccess();

    if (access.error) {
      alert("Connection Failed");
      return null;
    }

    const address = await getAddress();
    return address.address;
  } catch (error) {
    console.log(error);
    return null;
  }
}

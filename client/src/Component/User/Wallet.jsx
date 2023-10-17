import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { walletDetails } from "../../Apis/connections/user";

function Wallet() {
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    walletDetails().then((res) => {
      if (res.data.success == true) {
        const values = res.data.details;
        const walletdet = values.walletHistory;
        setWallet(walletdet);
      } else {
        toast.error("something went wrong in wallet");
      }
    });
  }, []);

  return (
    <div className="w-full h-full">
      <table className="w-2/3 border">
        <thead>
          <tr className="border">
            <th>Date</th>
            <th>Amount Added</th>
            <th>Bike Name</th>
            <th>Ordered Date</th>
            <th>Booking Amount</th>
            <th>Deposit</th>
            <th>helmet</th>
          </tr>
        </thead>
        <tbody>
          {wallet.length > 0 ? (
            wallet.map((item, index) => (
              <tr key={index} className="h-10">
                <td className="text-center">{item._id}</td>
                <td className="text-center">
                  <i className="icon small rupee sign "></i>
                  {item.totalAmount - item.deposit}
                </td>
                <td className="text-center">{item.bikeName}</td>
                <td className="text-center">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>

                <td className="text-center">
                  <i className="icon small rupee sign "></i>
                  {item.totalAmount}
                </td>
                <td className="text-center">
                  <i className="icon small rupee sign "></i>
                  {item.deposit}
                </td>
                <td className="text-center">{item.helmet}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full h-10 flex justify-center font-mono font-bold">
        {" "}
        ToTal Wallet Amount :{" "}
        <span>
          <i className="icon small rupee sign "></i>
          {wallet.reduce((acc, curr) => acc + curr.totalAmount, 0)}
        </span>
      </div>
    </div>
  );
}

export default Wallet;

import React, { useState } from "react";
import "./style.css";
import default_avatar from "./../../res/default_avatar.png";
import { useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router";

const AccountPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    api
      .get("/account/getInformation", {
        headers: {
          "x-access-token": localStorage.token,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.exitcode === 0) {
          setFullname(data.fullname);
          setEmail(data.email);
          setWallet(data.wallet_address);
        } else {
          navigator("/");
        }
      })
      .catch((err) => {
        navigator("/");
      });
  };

  return (
    <div className="h-full">
      <div className="flex flex-row h-2/3 p-2">
        <div className="w-fit h-full p-5 m-2 bg-white rounded-xl">
          <h1>User information</h1>
          <hr className="p-2" />
          <div className="flex justify-center m-2">
            <img
              src={default_avatar}
              alt="avatar"
              style={{ borderRadius: 0.5, width: "128px" }}
            />
          </div>
          <div className="flex justify-center m-2">
            <h1>{fullname}</h1>
          </div>
          <div className="m-2">
            <div>
              <div>
                <span>
                  <b>Email: </b> {email}
                </span>
              </div>
            </div>
            <b>Wallet address: </b>
            <div>{wallet}</div>
          </div>
        </div>
        <div className="p-5 m-2 bg-white flex flex-col rounded-xl">
          <div>
            <h1>Transaction</h1>
            <hr className="p-2" />
          </div>
          <div className="overflow-x-scroll">
            <table>
              <thead>
                <tr>
                  <th>Transaction hash</th>
                  <th>Sender address</th>
                  <th>Receive address</th>
                  <th>Amount</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
              </tbody>
              <tfoot />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

import { fetchData } from "./config";
import Cookies from "js-cookie";

export const createNewSingleCert = async (certdata) => {
  try {
    const token = Cookies.get("token");

    const response = await fetchData("create_new_certificate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certdata),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const updateOldSingleCert = async (certdata) => {
  try {
    const token = Cookies.get("token");

    if (!certdata._id) {
      throw new Error("Certificate ID (_id) is required for update.");
    }

    const response = await fetchData(`update_certificate/${certdata._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certdata),
    });

    return response;
  } catch (error) {
    console.error("Error updating certificate:", error);
    return { success: false, message: error.message };
  }
};

export const sendMailWithCertificate = async (certdata) => {
  try {
    const token = Cookies.get("token");

    const response = await fetchData("bulkCertMail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: certdata,
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const sendMailCertClearance = async (certdata) => {
  try {
    const token = Cookies.get("token");

    const response = await fetchData("bulkCertMailClearance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certdata),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const getCertTempByTempName = async (tempName) => {
  try {
    const token = Cookies.get("token");
    const query = new URLSearchParams({ tempName }).toString();
    const response = await fetchData(`get_one_temp?${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const getSingleCertificateData = async (id) => {
  try {
    const token = Cookies.get("token");
    const query = new URLSearchParams({ Id: id }).toString(); // 'Id=123'
    const response = await fetchData(`get_single_cert_data?${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const updateTextCertificateTemp = async (data) => {
  try {
    const token = Cookies.get("token");
    const response = await fetchData("update_temp_text", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

export const updateStyleCertificateTemp = async (data) => {
  try {
    const token = Cookies.get("token");
    const response = await fetchData("update_temp_css", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

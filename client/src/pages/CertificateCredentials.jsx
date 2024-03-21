import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import API from "../Axios";
import CredentialDetails from "../components/CredentialDetails";
import CredentialImage from "../components/CredentialImage";
import Error from "../assets/Error.png";
import VerifyDialogBox from "../components/Credentials/VerifyDialogBox";

const CertificateCredentials = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [credential, setCredential] = useState({
    title: "",
    description: "",
    recipient: "",
    issueDate: "",
    linkedinId: "",
    link: "",
    twitter: "",
  });

  const openDialog = () => {
    setDialogOpen(true);
  };

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const navigateToSocialMedia = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get(`/verify/${id}`);
      const payloadData = response.data.payload;

      const image = new Image();
      image.src = `${import.meta.env.VITE_BACKEND_URL}/verify_image/${id}`;

      image.onload = () => {
        var linkedinId = "";
        if (payloadData.group_id != "" || payloadData.group_id === null) {
          linkedinId = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${
            payloadData.groupname
          }&organizationId=${
            payloadData.group_id
          }&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth()}&certUrl=${
            import.meta.env.VITE_BACKEND_URL
          }/credential/${id}&certId=${id}`;
        } else {
          linkedinId = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${
            payloadData.groupname
          }&organizationName=${
            payloadData.groupname
          }&issueYear=${new Date().getFullYear()}&issueMonth=${
            new Date().getMonth() + 1
          }&certUrl=${
            import.meta.env.VITE_BACKEND_URL
          }/credential/${id}&certId=${id}`;
        }
        const newCredential = {
          title: payloadData.groupname.toUpperCase(),
          recipient: payloadData.username,
          description: `This credential was issued to ${payloadData.username} for participation in ${payloadData.groupname}`,
          linkedinId: linkedinId,
          issueDate: formatDate(payloadData.date),
          link: image.src,
          twitter: `https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20certificate!%20https%3A%2F%2Fcertisure.vercel.app%2Fcerdential%2F${id}%0A%0A%23certisure%20%23${payloadData.groupname}`,
        };
        setCredential(newCredential);
        setIsLoading(false);
      };
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/credential/${id}`
    );
    toast.info("Link copied", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const downloadImage = () => {
    saveAs(
      `${import.meta.env.VITE_BACKEND_URL}/verify_image/${id}`,
      `${credential.recipient}.webP`
    );
    toast.info("Certificate Downloaded", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  if (error)
    return (
      <div className="max-w-screen flex justify-center items-center flex-col m-8">
        <img src={Error} alt="error" className="w-[500px]"/>
        <p className="text-2xl font-semibold md:text-3xl">{error}</p>
        <p className="mt-4 mb-8 dark:text-gray-400">
          We are unable to find any certificate associated with the provided
          certificate id. If you think its a mistake contact us at
          support@certisure.com
        </p>
      </div>
    );

  return (
    <div>
      <section className="py-10 flex gap-0 flex-col-reverse lg:flex-row lg:gap-2">
        <CredentialDetails
          isLoading={isLoading}
          navigateToSocialMedia={navigateToSocialMedia}
          downloadImage={downloadImage}
          copyLink={copyLink}
          credential={credential}
        />

        <CredentialImage
          isLoading={isLoading}
          openDialog={openDialog}
          id={id}
          credential={credential}
        />

        <VerifyDialogBox
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          title={credential.title}
          recipient={credential.recipient}
        />
      </section>
    </div>
  );
};

export default CertificateCredentials;

import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import VerificationDialog from "../components/VerificationDialog";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import API from "../Axios";
import CredentialDetails from "../components/CredentialDetails";
import CredentialImage from "../components/CredentialImage";

const CertificateCredentials = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [credential, setCredential] = useState({
    title: "",
    description: "",
    recipient: "",
    issueDate: "",
    email: "",
    linkedinId: "",
    link: "",
    twitter: "",
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const changeTheme = (para) => {
    setTheme(para);
  };

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

  const navigateToLinkedIn = () => {
    window.open(credential.linkedinId, "_blank");
  };

  const navigateToTwitter = () => {
    window.open(credential.twitter, "_blank");
  };

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
          email: payloadData.email,
          description: `This credential was issued to ${payloadData.username} for participation in ${payloadData.groupname}`,
          linkedinId: linkedinId,
          issueDate: formatDate(payloadData.date),
          link: image.src,
          twitter: `https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20certificate!%20https%3A%2F%2Fcertisure.vercel.app%2Fcerdential%2F${id}%0A%0A%23certisure%20%23${credential.title}`,
        };
        setCredential(newCredential);
        setIsLoading(false);
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      `${credential.recipient}.jpg`
    );
    toast.info("Certificate Downloaded", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <Navbar theme={theme} changeTheme={changeTheme} />
      <section className="py-10 flex gap-0 flex-col-reverse lg:flex-row lg:gap-2">
        <CredentialDetails
          isLoading={isLoading}
          navigateToLinkedIn={navigateToLinkedIn}
          navigateToTwitter={navigateToTwitter}
          downloadImage={downloadImage}
          copyLink={copyLink}
          credential={credential}
        />

        <CredentialImage
          isLoading={isLoading}
          openDialog={openDialog}
          id={id}
          theme={theme}
          credential={credential}
        />

        <VerificationDialog
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

import { useState } from 'react';

const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const startAnimation = () => {
    const progressDuration = 8000; // 4 seconds
    const totalSteps = 4;

    const interval = setInterval(() => {
      if (activeStep < totalSteps) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        clearInterval(interval);
        // Automatically close the modal after 3 seconds
        setTimeout(() => {
          closeModal();
        }, 6000);
      }
    }, progressDuration / totalSteps);
  };

  const openModal = () => {
    setActiveStep(1); // Reset the activeStep when opening the modal
    setModalOpen(true);
    setTimeout(startAnimation, 0); // Start animation after a short delay
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-md">
            <button className="absolute top-2 right-2" onClick={closeModal}>
              Close
            </button>
            <ul className="steps steps-vertical">
              <li
                className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}
                style={{
                  transition: 'background-color 0.5s ease-in-out 150ms',
                }}
              >
                Register
              </li>
              <li
                className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}
                style={{
                  transition: 'background-color 0.5s ease-in-out 150ms',
                }}
              >
                Choose plan
              </li>
              <li
                className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}
                style={{
                  transition: 'background-color 0.5s ease-in-out 150ms',
                }}
              >
                Purchase
              </li>
              <li
                className={`step ${activeStep >= 4 ? 'step-primary' : ''}`}
                style={{
                  transition: 'background-color 0.5s ease-in-out 150ms',
                }}
              >
                Receive Product
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressSteps;

const AlertModal = ({ message, closeModal }: ModalOptionTypes) => {
  return (
    <div className="">
      <div className="text-center_">{message}</div>
      <div className="text-center flex justify-end mt-6">
        <button
          className="btn btn-primary text-light rounded-full w-full max-w-[100px]"
          type="submit"
          onClick={closeModal}>
          <span className="inline-block flex-shrink-0 text-wrap">close</span>
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
